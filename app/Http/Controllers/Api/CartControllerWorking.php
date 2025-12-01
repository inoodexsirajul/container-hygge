<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Coupon;
use App\Models\CustomerCustomization;
use App\Models\Product;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CartControllerWorking extends Controller
{
    /**
     * Add Product to Cart
     */
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'qty' => 'required|integer|min:1',
            'size_id' => 'nullable|integer|exists:sizes,id',
            'color_id' => 'nullable|integer|exists:colors,id',
            'customization_id' => 'nullable|integer|exists:customer_customizations,id',
        ]);

        $product = Product::with(['sizes', 'colors'])->findOrFail($request->product_id);

        if ($product->qty < $request->qty) {
            return apiResponse('error', 'Requested quantity not available!');
        }

        // Variant calculation
        [$sizePrice, $sizeName] = [0, null];
        [$colorPrice, $colorName] = [0, null];

        if ($request->size_id) {
            $size = $product->sizes()->where('sizes.id', $request->size_id)->first();
            if ($size) {
                $sizePrice = $size->pivot->size_price ?? 0;
                $sizeName = $size->size_name;
            }
        }

        if ($request->color_id) {
            $color = $product->colors()->where('colors.id', $request->color_id)->first();
            if ($color) {
                $colorPrice = $color->pivot->color_price ?? 0;
                $colorName = $color->color_name;
            }
        }

        $variantTotal = $sizePrice + $colorPrice;
        $basePrice = $product->offer_price ?? $product->price;

        // User or session
        $user_id = auth('sanctum')->id();
        $session_id = $user_id ? null : ($request->header('X-Session-Id') ?? (string) Str::uuid());

        $cartQuery = Cart::query()
            ->when($user_id, fn($q) => $q->where('user_id', $user_id))
            ->when(!$user_id && $session_id, fn($q) => $q->where('session_id', $session_id));

        $cartItem = (clone $cartQuery)
            ->where('product_id', $product->id)
            ->where('options->size_id', $request->size_id)
            ->where('options->color_id', $request->color_id)
            ->first();

        // Customization
        $extraPrice = 0;
        [$font_image, $back_image] = [null, null];

        if ($request->customization_id) {
            $customization = CustomerCustomization::find($request->customization_id);
            if ($customization) {
                $extraPrice = $customization->price;
                $font_image = $customization->front_image;
                $back_image = $customization->back_image;
            }
        }

        if ($cartItem) {
            $cartItem->increment('quantity', $request->qty);
        } else {
            $cartItem = Cart::create([
                'user_id' => $user_id,
                'session_id' => $session_id,
                'product_id' => $product->id,
                'quantity' => $request->qty,
                'price' => $basePrice,
                'options' => json_encode([
                    'image' => $product->thumb_image ?? null,
                    'size_id' => $request->size_id,
                    'size_name' => $sizeName,
                    'size_price' => $sizePrice,
                    'color_id' => $request->color_id,
                    'color_name' => $colorName,
                    'color_price' => $colorPrice,
                    'variant_total' => $variantTotal,
                    'extra_price' => $extraPrice,
                    'font_image' => $font_image,
                    'back_image' => $back_image,
                    'is_free_product' => false // default
                ]),
            ]);
        }

        // Apply promotions (free product / free shipping)
        $cartItems = (clone $cartQuery)->get();
        $promotions = $this->applyPromotions($cartItems);

        $cartTotal = $cartItems->sum(function ($item) {
            $options = json_decode($item->options, true);
            return ($item->price + ($options['variant_total'] ?? 0) + ($options['extra_price'] ?? 0)) * $item->quantity;
        });

        return apiResponse('success', 'Product added to cart successfully!', [
            'cart_count' => $cartItems->count(),
            'cart_total' => number_format($cartTotal, 2),
            'cart_item' => $cartItem,
            'promotions' => $promotions,
            'session_id' => $session_id,
        ]);
    }

    /**
     * Get Cart items
     */
    // public function getCart(Request $request)
    // {
    //     [$user_id, $session_id] = [auth('sanctum')->id(), $request->header('X-Session-Id')];

    //     $cartItems = Cart::with('product:id,name,thumb_image,price,offer_price,qty,slug')
    //         ->when($user_id, fn($q) => $q->where('user_id', $user_id))
    //         ->when(!$user_id && $session_id, fn($q) => $q->where('session_id', $session_id))
    //         ->get();

    //     $cartTotal = $cartItems->sum(
    //         fn($item) => ($item->price + (json_decode($item->options, true)['variant_total'] ?? 0) + (json_decode($item->options, true)['extra_price'] ?? 0)) * $item->quantity
    //     );

    //     $promotions = $this->getPromotions($cartItems);

    //     return apiResponse('success', 'Cart fetched successfully!', [
    //         'cart_items' => $cartItems,
    //         'cart_count' => $cartItems->count(),
    //         'cart_total' => number_format($cartTotal, 2),
    //         'promotions' => $promotions,
    //         'currency_icon' => getCurrencyIcon(),
    //     ]);
    // }
    public function getCart(Request $request)
    {
        [$user_id, $session_id] = [auth('sanctum')->id(), $request->header('X-Session-Id')];

        $cartItems = Cart::with('product:id,name,thumb_image,price,offer_price,qty,slug')
            ->when($user_id, fn($q) => $q->where('user_id', $user_id))
            ->when(!$user_id && $session_id, fn($q) => $q->where('session_id', $session_id))
            ->get()
            ->map(function ($item) {
                $options = json_decode($item->options, true);

                // Include customization details
                if (!empty($options['font_image']) || !empty($options['back_image'])) {
                    $customizationData = [
                        'front_image' => $options['font_image'] ?? null,
                        'back_image' => $options['back_image'] ?? null,
                        'extra_price' => $options['extra_price'] ?? 0,
                    ];
                } else {
                    $customizationData = null;
                }

                $item->variant_total = $options['variant_total'] ?? 0;
                $item->extra_price = $options['extra_price'] ?? 0;
                $item->customization = $customizationData;
                $item->size = [
                    'id' => $options['size_id'] ?? null,
                    'name' => $options['size_name'] ?? null,
                    'price' => $options['size_price'] ?? 0,
                ];
                $item->color = [
                    'id' => $options['color_id'] ?? null,
                    'name' => $options['color_name'] ?? null,
                    'price' => $options['color_price'] ?? 0,
                ];

                $item->total = ($item->price + $item->variant_total + $item->extra_price) * $item->quantity;
                return $item;
            });

        $cartTotal = $cartItems->sum(fn($item) => $item->total);
        $promotions = $this->getPromotions($cartItems);

        return apiResponse('success', 'Cart fetched successfully!', [
            'cart_items' => $cartItems,
            'cart_count' => $cartItems->count(),
            'cart_total' => number_format($cartTotal, 2),
            'promotions' => $promotions,
            'currency_icon' => getCurrencyIcon(),
        ]);
    }

    /**
     * Cart summary with coupon
     */
    public function cartSummary(Request $request)
    {
        $request->validate(['coupon_code' => 'nullable|string']);
        [$user_id, $session_id] = [auth('sanctum')->id(), $request->header('X-Session-Id')];

        $cartItems = Cart::with('product:id,name,thumb_image,price,offer_price,qty,slug')
            ->when($user_id, fn($q) => $q->where('user_id', $user_id))
            ->when(!$user_id && $session_id, fn($q) => $q->where('session_id', $session_id))
            ->get();

        if ($cartItems->isEmpty()) return apiResponse('error', 'Your cart is empty!');

        $subTotal = $cartItems->sum(
            fn($item) => ($item->price + (json_decode($item->options, true)['variant_total'] ?? 0) + (json_decode($item->options, true)['extra_price'] ?? 0)) * $item->quantity
        );

        $discount = 0;
        $couponData = null;

        if ($request->coupon_code) {
            $coupon = Coupon::active()->where('code', $request->coupon_code)->first();
            if ($coupon) {
                $discount = $coupon->discount_type === 'amount'
                    ? $coupon->discount
                    : $subTotal * $coupon->discount / 100;

                $couponData = [
                    'code' => $coupon->code,
                    'discount_type' => $coupon->discount_type,
                    'discount' => $coupon->discount,
                ];
            }
        }

        $finalTotal = max(0, $subTotal - $discount);

        $promotions = $this->applyPromotions($cartItems, $coupon ?? null);
        dd($cartItems);
        $cartItems = $cartItems->map(function ($item) {
            $options = json_decode($item->options, true) ?? [];

            $item->front_image = $options['font_image'] ?? null;
            $item->back_image = $options['back_image'] ?? null;
            $item->extra_price = $options['extra_price'] ?? 0;

            // Optional: remove raw options if you don't need them in API
            unset($item->options);


            return $item;
        });

        return apiResponse('success', 'Cart summary fetched!', [
            'cart_items' => $cartItems,
            'cart_count' => $cartItems->count(),
            'sub_total' => number_format($subTotal, 2),
            'discount' => number_format($discount, 2),
            'final_total' => number_format($finalTotal, 2),
            'coupon' => $couponData,
            'promotions' => $promotions,
            'currency_icon' => getCurrencyIcon(),
        ]);
    }

    /**
     * Update cart quantity
     */
    public function updateCart(Request $request)
    {
        $request->validate(['cart_id' => 'required|integer', 'quantity' => 'required|integer|min:1']);

        $cartItem = Cart::findOrFail($request->cart_id);
        $product = Product::findOrFail($cartItem->product_id);

        if ($product->qty < $request->quantity) {
            return apiResponse('error', 'Not enough product quantity!');
        }

        $cartItem->update(['quantity' => $request->quantity]);

        $options = json_decode($cartItem->options, true);
        $total = ($cartItem->price + ($options['variant_total'] ?? 0) + ($options['extra_price'] ?? 0)) * $cartItem->quantity;

        return apiResponse('success', 'Cart updated successfully!', [
            'product_total' => number_format($total, 2),
            'cart_item' => $cartItem,
        ]);
    }

    /**
     * Remove cart item
     */
    public function removeCart(Request $request, $id)
    {
        // dd($request->all(), $id);
        $cart = Cart::findOrFail($id);

        // if user login (user_id)
        if ($cart->user_id) {
            customerCustomization::where('user_id', $cart->user_id)
                ->where('product_id', $cart->product_id)
                ->delete();
        }
        // if guest (session_id)
        else {
            CustomerCustomization::where('session_id', $cart->session_id)
                ->where('product_id', $cart->product_id)
                ->delete();
            // guest user (if not set session id then use this one)
            // customerCustomization::whereNull('user_id')
            //     ->where('product_id', $cart->product_id)
            //     ->delete();
        }
        $cart->delete();
        return apiResponse('success', 'Cart item removed successfully!');
    }

    /**
     * Clear cart
     */
    public function clearCart(Request $request)
    {
        $user_id = auth('sanctum')->id();
        $session_id = $request->header('X-Session-Id');

        $query = Cart::query()
            ->when($user_id, fn($q) => $q->where('user_id', $user_id))
            ->when(!$user_id && $session_id, fn($q) => $q->where('session_id', $session_id));

        $deleted = $query->delete();
        return apiResponse('success', 'Cart cleared successfully!', ['deleted' => $deleted]);
    }

    // /**
    //  * Apply Promotions (Free product / Free shipping)
    //  */
    private function applyPromotions($cartItems, $appliedCoupon = null)
    {
        $promotions = Promotion::where('status', 1)->get();
        $applied = [];

        foreach ($promotions as $promo) {
            // Coupon applied হলে যদি promo coupon stack allow না করে skip
            if ($appliedCoupon && !$promo->allow_coupon_stack) continue;

            // Eligible quantity নির্ণয়
            $qty = $promo->product_id
                ? $cartItems->where('product_id', $promo->product_id)->sum('quantity')
                : ($promo->category_id
                    ? $cartItems->filter(fn($i) => $i->product->category_id == $promo->category_id)->sum('quantity')
                    : $cartItems->sum('quantity'));

            if ($qty >= $promo->buy_quantity) {
                if ($promo->type === 'free_product' && $promo->product_id) {
                    // Prevent duplicate free product
                    $existing = $cartItems->where('product_id', $promo->product_id)
                        ->where(fn($i) => json_decode($i->options, true)['is_free_product'] ?? false)
                        ->first();

                    if (!$existing) {
                        $freeProduct = Product::find($promo->product_id);
                        if ($freeProduct) {
                            Cart::create([
                                'user_id' => auth('sanctum')->id(),
                                'session_id' => auth('sanctum')->id() ? null : (string) Str::uuid(),
                                'product_id' => $freeProduct->id,
                                'quantity' => $promo->get_quantity ?? 1,
                                'price' => 0,
                                'options' => json_encode([
                                    'image' => $freeProduct->thumb_image,
                                    'variant_total' => 0,
                                    'extra_price' => 0,
                                    'is_free_product' => true,
                                ]),
                            ]);
                        }
                    }
                }

                // Promotions metadata return
                $applied[] = [
                    'promotion_id' => $promo->id,
                    'type' => $promo->type,
                    'message' => $promo->type == 'free_shipping' ? 'Free Shipping!' : 'Free Product Unlocked!',
                    'free_product_id' => $promo->type == 'free_product' ? $promo->product_id : null,
                    'free_quantity' => $promo->get_quantity ?? 1,
                ];
            }
        }

        return $applied;
    }

    /**
     * Get Promotions metadata without adding free product
     */
    private function getPromotions($cartItems, $appliedCoupon = null)
    {
        $promotions = Promotion::where('status', 1)->get();
        $applied = [];

        foreach ($promotions as $promo) {
            if ($appliedCoupon && !$promo->allow_coupon_stack) continue;

            $qty = $promo->product_id
                ? $cartItems->where('product_id', $promo->product_id)->sum('quantity')
                : ($promo->category_id
                    ? $cartItems->filter(fn($i) => $i->product->category_id == $promo->category_id)->sum('quantity')
                    : $cartItems->sum('quantity'));

            if ($qty >= $promo->buy_quantity) {
                $applied[] = [
                    'promotion_id' => $promo->id,
                    'type' => $promo->type,
                    'message' => $promo->type == 'free_shipping' ? 'Free Shipping!' : 'Free Product Unlocked!',
                    'free_product_id' => $promo->type == 'free_product' ? $promo->product_id : null,
                    'free_quantity' => $promo->get_quantity ?? 1,
                ];
            }
        }

        return $applied;
    }
}
