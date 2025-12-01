<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\customerCustomization;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use File;

// class CustomerCustomizationController extends Controller
// {
//     /**
//      * Store or Update customization (Clean Merge with Image Cleanup)
//      */
//     public function storeOrUpdate(Request $request)
//     {
//         // User or Guest
//         $userId = auth('sanctum')->id();
//         $sessionId = $userId ? null : ($request->header('X-Session-Id') ?? (string) \Illuminate\Support\Str::uuid());

//         $request->validate([
//             'product_id' => 'required|integer',
//         ]);

//         $extraPrice = 0;
//         $customData = collect($request->except([
//             'front_image',
//             'back_image',
//             'front_price',
//             'back_price',
//             'both_price',
//             'product_id',
//             'side'
//         ]))->toArray();

//         $uploadDir = public_path('uploads/customizations');
//         if (!file_exists($uploadDir)) mkdir($uploadDir, 0755, true);

//         $frontImagePath = null;
//         $backImagePath = null;

//         // --- Check for existing customization ---
//         $customization = customerCustomization::where('product_id', $request->product_id)
//             ->when($userId, fn($q) => $q->where('user_id', $userId))
//             ->when(!$userId, fn($q) => $q->where('session_id', $sessionId))
//             ->first();

//         // Decode front image
//         if ($request->filled('front_image')) {
//             $frontData = $request->front_image;
//             if (preg_match('/^data:image\/(\w+);base64,/', $frontData, $type)) {
//                 $frontData = substr($frontData, strpos($frontData, ',') + 1);
//                 $frontData = base64_decode($frontData);
//                 $frontImagePath = 'uploads/customizations/front_' . time() . '.' . $type[1];

//                 // Delete old front image
//                 if ($customization && $customization->front_image && file_exists(public_path($customization->front_image))) {
//                     @unlink(public_path($customization->front_image));
//                 }

//                 file_put_contents(public_path($frontImagePath), $frontData);
//             }
//         }

//         // Decode back image
//         if ($request->filled('back_image')) {
//             $backData = $request->back_image;
//             if (preg_match('/^data:image\/(\w+);base64,/', $backData, $type)) {
//                 $backData = substr($backData, strpos($backData, ',') + 1);
//                 $backData = base64_decode($backData);
//                 $backImagePath = 'uploads/customizations/back_' . time() . '.' . $type[1];

//                 // Delete old back image
//                 if ($customization && $customization->back_image && file_exists(public_path($customization->back_image))) {
//                     @unlink(public_path($customization->back_image));
//                 }

//                 file_put_contents(public_path($backImagePath), $backData);
//             }
//         }

//         // Price calculation
//         if ($request->side === 'front') $extraPrice = $request->front_price ?? 0;
//         elseif ($request->side === 'back') $extraPrice = $request->back_price ?? 0;
//         elseif ($request->side === 'both') $extraPrice = $request->both_price ?? 0;

//         if ($customization) {
//             // Merge old and new custom data
//             $oldData = json_decode($customization->custom_data, true) ?? [];
//             $mergedData = array_merge($oldData, $customData);

//             $customization->update([
//                 'custom_data' => json_encode($mergedData),
//                 'price' => $extraPrice ?: $customization->price,
//                 'front_image' => $frontImagePath ?? $customization->front_image,
//                 'back_image' => $backImagePath ?? $customization->back_image,
//             ]);
//         } else {
//             $customization = customerCustomization::create([
//                 'product_id' => $request->product_id,
//                 'user_id' => $userId,
//                 'session_id' => $sessionId,
//                 'custom_data' => json_encode($customData),
//                 'price' => $extraPrice,
//                 'front_image' => $frontImagePath,
//                 'back_image' => $backImagePath,
//             ]);
//         }

//         return response()->json([
//             'success' => true,
//             'customization' => $customization,
//             'customization_id' => $customization->id,
//             'session_id' => $sessionId,
//         ]);
//     }
// }
class CustomerCustomizationController extends Controller
{
    public function storeOrUpdate(Request $request)
    {
        $userId = auth('sanctum')->id();
        // Cart session cookie ব্যবহার
        $sessionId = $request->cookie('cart_session');

        // যদি guest এবং session না থাকে, তাহলে নতুন session তৈরি
        $cookie = null;
        if (!$userId && !$sessionId) {
            $sessionId = 'cart_' . \Illuminate\Support\Str::random(2);
            $cookie = cookie('cart_session', $sessionId, 60 * 24 * 30, '/', null, false, false, false, 'lax');
        }

        $request->validate([
            'product_id' => 'required|integer',
        ]);

        $extraPrice = 0;
        $customData = collect($request->except([
            'front_image',
            'back_image',
            'front_price',
            'back_price',
            'both_price',
            'product_id',
            'side'
        ]))->toArray();

        $uploadDir = public_path('uploads/customizations');
        if (!file_exists($uploadDir)) mkdir($uploadDir, 0755, true);

        $frontImagePath = null;
        $backImagePath = null;

        // --- Fetch existing customization --- 
        $customization = CustomerCustomization::where('product_id', $request->product_id)
            ->when($userId, fn($q) => $q->where('user_id', $userId))
            ->when(!$userId, fn($q) => $q->where('session_id', $sessionId))
            ->first();

        // --- Handle front/back image ---
        if ($request->filled('front_image')) {
            $frontData = $request->front_image;
            if (preg_match('/^data:image\/(\w+);base64,/', $frontData, $type)) {
                $frontData = substr($frontData, strpos($frontData, ',') + 1);
                $frontData = base64_decode($frontData);
                $frontImagePath = 'uploads/customizations/front_' . time() . '.' . $type[1];
                if ($customization && $customization->front_image && file_exists(public_path($customization->front_image))) {
                    @unlink(public_path($customization->front_image));
                }
                file_put_contents(public_path($frontImagePath), $frontData);
            }
        }

        if ($request->filled('back_image')) {
            $backData = $request->back_image;
            if (preg_match('/^data:image\/(\w+);base64,/', $backData, $type)) {
                $backData = substr($backData, strpos($backData, ',') + 1);
                $backData = base64_decode($backData);
                $backImagePath = 'uploads/customizations/back_' . time() . '.' . $type[1];
                if ($customization && $customization->back_image && file_exists(public_path($customization->back_image))) {
                    @unlink(public_path($customization->back_image));
                }
                file_put_contents(public_path($backImagePath), $backData);
            }
        }

        // --- Price calculation ---
        if ($request->side === 'front') $extraPrice = $request->front_price ?? 0;
        elseif ($request->side === 'back') $extraPrice = $request->back_price ?? 0;
        elseif ($request->side === 'both') $extraPrice = $request->both_price ?? 0;

        // --- Update or create ---
        if ($customization) {
            $oldData = json_decode($customization->custom_data, true) ?? [];
            $mergedData = array_merge($oldData, $customData);

            $customization->update([
                'custom_data' => json_encode($mergedData),
                'price' => $extraPrice ?: $customization->price,
                'front_image' => $frontImagePath ?? $customization->front_image,
                'back_image' => $backImagePath ?? $customization->back_image,
                'session_id' => $userId ? null : $sessionId, // Cart session sync
            ]);
        } else {
            $customization = CustomerCustomization::create([
                'product_id' => $request->product_id,
                'user_id' => $userId,
                'session_id' => $userId ? null : $sessionId, // Cart session sync
                'custom_data' => json_encode($customData),
                'price' => $extraPrice,
                'front_image' => $frontImagePath,
                'back_image' => $backImagePath,
            ]);
        }

        $response = response()->json([
            'success' => true,
            'customization' => $customization,
            'customization_id' => $customization->id,
            'session_id' => $sessionId,
        ]);

        return $cookie ? $response->withCookie($cookie) : $response;
    }
}
