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

// class CartControllerTwo extends Controller
// {
//     public function addToCart(Request $request)
//     {
//         $request->validate([
//             'product_id'       => 'required|integer|exists:products,id',
//             'qty'              => 'required|integer|min:1',
//             'size_id'          => 'nullable|integer|exists:sizes,id',
//             'color_id'         => 'nullable|integer|exists:colors,id',
//             'customization_id' => 'nullable|integer|exists:customer_customizations,id',
//         ]);

//         $product = Product::with(['sizes', 'colors'])->findOrFail($request->product_id);

//         if ($product->qty < $request->qty) {
//             return apiResponse('error', 'Requested quantity not available!');
//         }

//         // Variant calculation
//         $sizePrice = $sizeName = $colorPrice = $colorName = 0;

//         if ($request->size_id) {
//             $size = $product->sizes()->where('sizes.id', $request->size_id)->first();
//             if ($size) {
//                 $sizePrice = $size->pivot->size_price ?? 0;
//                 $sizeName  = $size->size_name;
//             }
//         }

//         if ($request->color_id) {
//             $color = $product->colors()->where('colors.id', $request->color_id)->first();
//             if ($color) {
//                 $colorPrice = $color->pivot->color_price ?? 0;
//                 $colorName  = $color->color_name;
//             }
//         }

//         $variantTotal = $sizePrice + $colorPrice;
//         $basePrice    = $product->offer_price ?? $product->price;

//         // === মূল সমাধান: গেস্ট + লগিন মার্জ লজিক ===
//         $user_id    = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');
//         $cookie     = null;

//         // লগিন করলে গেস্ট কার্ট মার্জ করো
//         if ($user_id && $session_id) {
//             Cart::where('session_id', $session_id)
//                 ->whereNull('user_id')
//                 ->update(['user_id' => $user_id, 'session_id' => null]);

//             // কুকি ডিলিট করো
//             $cookie = cookie()->forget('cart_session');
//         }

//         // গেস্ট হলে session_id তৈরি করো
//         if (!$user_id) {
//             if (!$session_id) {
//                 $session_id = 'cart_' . Str::random(32);
//                 $cookie = cookie('cart_session', $session_id, 60 * 24 * 30, '/', null, false, false, false, 'lax');
//             }
//         } else {
//             $session_id = null; // লগিন থাকলে session_id লাগবে না
//         }
//         // === শেষ ===

//         // Customization
//         $extraPrice = 0;
//         $font_image = $back_image = null;
//         if ($request->customization_id) {
//             $cust = CustomerCustomization::find($request->customization_id);
//             if ($cust) {
//                 $extraPrice = $cust->price ?? 0;
//                 $font_image = $cust->front_image;
//                 $back_image = $cust->back_image;
//             }
//         }

//         // Same variant check
//         $existingItem = Cart::where(function ($q) use ($user_id, $session_id) {
//             $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//                 ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id));
//         })
//             ->where('product_id', $product->id)
//             ->whereJsonContains('options->size_id', $request->size_id ?? null)
//             ->whereJsonContains('options->color_id', $request->color_id ?? null)
//             ->first();

//         if ($existingItem) {
//             $existingItem->increment('quantity', $request->qty);
//             $cartItem = $existingItem;
//         } else {
//             $cartItem = Cart::create([
//                 'user_id'    => $user_id,
//                 'session_id' => $session_id,
//                 'product_id' => $product->id,
//                 'quantity'   => $request->qty,
//                 'price'      => $basePrice,
//                 'options'    => json_encode([
//                     'image'          => $product->thumb_image ?? null,
//                     'size_id'        => $request->size_id,
//                     'size_name'      => $sizeName,
//                     'size_price'     => $sizePrice,
//                     'color_id'       => $request->color_id,
//                     'color_name'     => $colorName,
//                     'color_price'    => $colorPrice,
//                     'variant_total'  => $variantTotal,
//                     'extra_price'    => $extraPrice,
//                     'font_image'     => $font_image,
//                     'back_image'     => $back_image,
//                     'is_free_product' => false,
//                 ]),
//             ]);
//         }

//         // Refresh cart
//         $cartItems = $this->getCurrentUserCart($user_id, $session_id);
//         $cartTotal = $this->calculateCartTotal($cartItems);
//         $promotions = $this->applyPromotions($cartItems);

//         $response = apiResponse('success', 'Product added to cart successfully!', [
//             'cart_count' => $cartItems->count(),
//             'cart_total' => number_format($cartTotal, 2),
//             'cart_item'  => $cartItem,
//             'promotions' => $promotions,
//         ]);

//         return $cookie ? $response->withCookie($cookie) : $response;
//     }

//     public function getCart(Request $request)
//     {
//         $user_id    = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         // লগিন করলে গেস্ট কার্ট মার্জ করো (মূল ফিক্স)
//         if ($user_id && $session_id) {
//             Cart::where('session_id', $session_id)
//                 ->whereNull('user_id')
//                 ->update(['user_id' => $user_id, 'session_id' => null]);

//             // কুকি ডিলিট করো (যাতে আর গেস্ট মোডে না যায়)
//             cookie()->queue(cookie()->forget('cart_session'));
//         }

//         $cartItems = $this->getCurrentUserCart($user_id, $session_id)->map(function ($item) {
//             $opt = json_decode($item->options, true);

//             $item->variant_total = $opt['variant_total'] ?? 0;
//             $item->extra_price   = $opt['extra_price'] ?? 0;
//             $item->total         = ($item->price + $item->variant_total + $item->extra_price) * $item->quantity;

//             $item->size  = [
//                 'id'    => $opt['size_id'] ?? null,
//                 'name'  => $opt['size_name'] ?? null,
//                 'price' => $opt['size_price'] ?? 0
//             ];

//             $item->color = [
//                 'id'    => $opt['color_id'] ?? null,
//                 'name'  => $opt['color_name'] ?? null,
//                 'price' => $opt['color_price'] ?? 0
//             ];

//             $item->customization = (!empty($opt['font_image']) || !empty($opt['back_image']))
//                 ? ['front_image' => $opt['font_image'] ?? null, 'back_image' => $opt['back_image'] ?? null]
//                 : null;

//             $item->image = $opt['image'] ?? ($item->product->thumb_image ?? null);

//             return $item;
//         });

//         $cartTotal  = $cartItems->sum('total');
//         $promotions = $this->getPromotions($cartItems);

//         return apiResponse('success', 'Cart fetched successfully!', [
//             'cart_items'    => $cartItems->values(),
//             'cart_count'    => $cartItems->count(),
//             'cart_total'    => number_format($cartTotal, 2),
//             'promotions'    => $promotions,
//             'currency_icon' => getCurrencyIcon(),
//         ]);
//     }

//     public function cartSummary(Request $request)
//     {
//         $request->validate(['coupon_code' => 'nullable|string']);

//         $user_id    = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         // লগিন করলে গেস্ট কার্ট মার্জ করো (মূল ফিক্স)
//         if ($user_id && $session_id) {
//             Cart::where('session_id', $session_id)
//                 ->whereNull('user_id')
//                 ->update(['user_id' => $user_id, 'session_id' => null]);

//             // কুকি ডিলিট করো
//             cookie()->queue(cookie()->forget('cart_session'));
//         }

//         $cartItems = $this->getCurrentUserCart($user_id, $session_id)->map(function ($item) {
//             $opt = json_decode($item->options, true);

//             $item->variant_total = $opt['variant_total'] ?? 0;
//             $item->extra_price   = $opt['extra_price'] ?? 0;
//             $item->total         = ($item->price + $item->variant_total + $item->extra_price) * $item->quantity;

//             $item->size  = [
//                 'id'    => $opt['size_id'] ?? null,
//                 'name'  => $opt['size_name'] ?? null,
//                 'price' => $opt['size_price'] ?? 0
//             ];

//             $item->color = [
//                 'id'    => $opt['color_id'] ?? null,
//                 'name'  => $opt['color_name'] ?? null,
//                 'price' => $opt['color_price'] ?? 0
//             ];

//             $item->customization = (!empty($opt['font_image']) || !empty($opt['back_image']))
//                 ? [
//                     'front_image' => $opt['font_image'] ?? null,
//                     'back_image'  => $opt['back_image'] ?? null,
//                     'extra_price' => $opt['extra_price'] ?? 0
//                 ]
//                 : null;

//             $item->image = $opt['image'] ?? ($item->product->thumb_image ?? null);

//             return $item;
//         });

//         if ($cartItems->isEmpty()) {
//             return apiResponse('error', 'Your cart is empty!');
//         }

//         $subTotal = $cartItems->sum('total');

//         $discount = 0;
//         $couponData = null;

//         if ($request->coupon_code) {
//             $coupon = Coupon::active()->where('code', $request->coupon_code)->first();
//             if ($coupon) {
//                 $discount = $coupon->discount_type === 'amount'
//                     ? $coupon->discount
//                     : ($subTotal * $coupon->discount / 100);

//                 $couponData = [
//                     'code'          => $coupon->code,
//                     'discount_type' => $coupon->discount_type,
//                     'discount'      => $coupon->discount,
//                 ];
//             }
//         }

//         $finalTotal = max(0, $subTotal - $discount);
//         $promotions = $this->applyPromotions($cartItems);

//         return apiResponse('success', 'Cart summary fetched!', [
//             'cart_items'    => $cartItems->values(),
//             'cart_count'    => $cartItems->count(),
//             'sub_total'     => number_format($subTotal, 2),
//             'discount'      => number_format($discount, 2),
//             'final_total'   => number_format($finalTotal, 2),
//             'coupon'        => $couponData,
//             'promotions'    => $promotions,
//             'currency_icon' => getCurrencyIcon(),
//         ]);
//     }

//     public function updateCart(Request $request)
//     {
//         $request->validate(['cart_id' => 'required|integer', 'quantity' => 'required|integer|min:1']);
//         $cartItem = Cart::findOrFail($request->cart_id);
//         $product  = Product::findOrFail($cartItem->product_id);

//         if ($product->qty < $request->quantity) {
//             return apiResponse('error', 'Not enough stock!');
//         }

//         $cartItem->update(['quantity' => $request->quantity]);
//         $opt = json_decode($cartItem->options, true);
//         $total = ($cartItem->price + ($opt['variant_total'] ?? 0) + ($opt['extra_price'] ?? 0)) * $cartItem->quantity;

//         return apiResponse('success', 'Updated!', ['product_total' => number_format($total, 2)]);
//     }

//     public function removeCart($id)
//     {
//         $user_id    = auth('sanctum')->id();
//         $session_id = request()->cookie('cart_session');


//         $cart = Cart::where('id', $id)
//             ->where(function ($q) use ($user_id, $session_id) {
//                 $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//                     ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id));
//             })
//             ->firstOrFail();

//         // কাস্টমাইজেশন থাকলে ডিলিট করো
//         if ($cart->user_id) {
//             CustomerCustomization::where('user_id', $cart->user_id)
//                 ->where('product_id', $cart->product_id)
//                 ->delete();
//         } else {
//             CustomerCustomization::where('session_id', $cart->session_id)
//                 ->where('product_id', $cart->product_id)
//                 ->delete();
//         }

//         $cart->delete();

//         return apiResponse('success', 'Product removed from cart!');
//     }

//     public function clearCart(Request $request)
//     {
//         $user_id    = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         Cart::where(fn($q) => $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//             ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id)))
//             ->delete();

//         return apiResponse('success', 'Cart cleared!');
//     }

//     // Helper: current user er cart
//     private function getCurrentUserCart($user_id, $session_id)
//     {
//         return Cart::with('product:id,name,thumb_image,price,offer_price,qty,slug')
//             ->where(fn($q) => $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//                 ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id)))
//             ->get();
//     }

//     private function calculateCartTotal($cartItems)
//     {
//         return $cartItems->sum(
//             fn($i) => ($i->price + (json_decode($i->options, true)['variant_total'] ?? 0) + (json_decode($i->options, true)['extra_price'] ?? 0)) * $i->quantity
//         );
//     }

//     private function applyPromotions($cartItems, $appliedCoupon = null)
//     {
//         $user_id    = auth('sanctum')->id();
//         $session_id = request()->cookie('cart_session');
//         $promotions = Promotion::where('status', 1)->get();
//         $applied = [];

//         foreach ($promotions as $promo) {
//             if ($appliedCoupon && !$promo->allow_coupon_stack) continue;

//             $qty = $promo->product_id
//                 ? $cartItems->where('product_id', $promo->product_id)->sum('quantity')
//                 : ($promo->category_id
//                     ? $cartItems->filter(fn($i) => $i->product->category_id == $promo->category_id)->sum('quantity')
//                     : $cartItems->sum('quantity'));

//             if ($qty >= $promo->buy_quantity) {
//                 if ($promo->type === 'free_product' && $promo->product_id) {
//                     $existing = $cartItems->where('product_id', $promo->product_id)
//                         ->where(fn($i) => (json_decode($i->options, true)['is_free_product'] ?? false))
//                         ->first();

//                     if (!$existing) {
//                         $freeProduct = Product::find($promo->product_id);
//                         if ($freeProduct) {
//                             Cart::create([
//                                 'user_id'     => $user_id,
//                                 'session_id'  => $user_id ? null : $session_id,
//                                 'product_id'  => $freeProduct->id,
//                                 'quantity'    => $promo->get_quantity ?? 1,
//                                 'price'       => 0,
//                                 'options'     => json_encode([
//                                     'image'           => $freeProduct->thumb_image,
//                                     'variant_total'   => 0,
//                                     'extra_price'     => 0,
//                                     'is_free_product' => true,
//                                 ]),
//                             ]);
//                         }
//                     }
//                 }

//                 $applied[] = [
//                     'promotion_id'    => $promo->id,
//                     'type'            => $promo->type,
//                     'message'         => $promo->type == 'free_shipping' ? 'Free Shipping!' : 'Free Product Unlocked!',
//                     'free_product_id' => $promo->type == 'free_product' ? $promo->product_id : null,
//                     'free_quantity'   => $promo->get_quantity ?? 1,
//                 ];
//             }
//         }

//         return $applied;
//     }

//     private function getPromotions($cartItems, $appliedCoupon = null)
//     {
//         $promotions = Promotion::where('status', 1)->get();
//         $applied = [];

//         foreach ($promotions as $promo) {
//             if ($appliedCoupon && !$promo->allow_coupon_stack) continue;

//             $qty = $promo->product_id
//                 ? $cartItems->where('product_id', $promo->product_id)->sum('quantity')
//                 : ($promo->category_id
//                     ? $cartItems->filter(fn($i) => $i->product->category_id == $promo->category_id)->sum('quantity')
//                     : $cartItems->sum('quantity'));

//             if ($qty >= $promo->buy_quantity) {
//                 $applied[] = [
//                     'promotion_id'    => $promo->id,
//                     'type'            => $promo->type,
//                     'message'         => $promo->type == 'free_shipping' ? 'Free Shipping!' : 'Free Product Unlocked!',
//                     'free_product_id' => $promo->type == 'free_product' ? $promo->product_id : null,
//                     'free_quantity'   => $promo->get_quantity ?? 1,
//                 ];
//             }
//         }

//         return $applied;
//     }
// }
// class CartController extends Controller
// {
//     /**
//      * Add Product to Cart
//      */
//     public function addToCart(Request $request)
//     {
//         $request->validate([
//             'product_id' => 'required|integer|exists:products,id',
//             'qty' => 'required|integer|min:1',
//             'size_id' => 'nullable|integer|exists:sizes,id',
//             'color_id' => 'nullable|integer|exists:colors,id',
//             'customization_id' => 'nullable|integer|exists:customer_customizations,id',
//         ]);

//         $product = Product::with(['sizes', 'colors'])->findOrFail($request->product_id);

//         if ($product->qty < $request->qty) {
//             return apiResponse('error', 'Requested quantity not available!');
//         }

//         // Variant calculation
//         [$sizePrice, $sizeName] = [0, null];
//         [$colorPrice, $colorName] = [0, null];

//         if ($request->size_id) {
//             $size = $product->sizes()->where('sizes.id', $request->size_id)->first();
//             if ($size) {
//                 $sizePrice = $size->pivot->size_price ?? 0;
//                 $sizeName = $size->size_name;
//             }
//         }

//         if ($request->color_id) {
//             $color = $product->colors()->where('colors.id', $request->color_id)->first();
//             if ($color) {
//                 $colorPrice = $color->pivot->color_price ?? 0;
//                 $colorName = $color->color_name;
//             }
//         }

//         $variantTotal = $sizePrice + $colorPrice;
//         $basePrice = $product->offer_price ?? $product->price;

//         // User or session
//         $user_id = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         // Merge guest cart if login
//         $cookie = null;
//         if ($user_id && $session_id) {
//             Cart::where('session_id', $session_id)
//                 ->whereNull('user_id')
//                 ->update(['user_id' => $user_id, 'session_id' => null]);

//             $cookie = cookie()->forget('cart_session');
//             $session_id = null;
//         }

//         if (!$user_id && !$session_id) {
//             $session_id = 'cart_' . Str::random(32);
//             $cookie = cookie('cart_session', $session_id, 60 * 24 * 30, '/', null, false, false, false, 'lax');
//         }

//         // Customization
//         $extraPrice = 0;
//         $font_image = $back_image = null;
//         if ($request->customization_id) {
//             $cust = CustomerCustomization::find($request->customization_id);
//             if ($cust) {
//                 $extraPrice = $cust->price ?? 0;
//                 $font_image = $cust->front_image;
//                 $back_image = $cust->back_image;
//             }
//         }

//         // Same variant check
//         $existingItem = Cart::where(function ($q) use ($user_id, $session_id) {
//             $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//                 ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id));
//         })
//             ->where('product_id', $product->id)
//             ->whereJsonContains('options->size_id', $request->size_id ?? null)
//             ->whereJsonContains('options->color_id', $request->color_id ?? null)
//             ->first();

//         if ($existingItem) {
//             $existingItem->increment('quantity', $request->qty);
//             $cartItem = $existingItem;
//         } else {
//             $cartItem = Cart::create([
//                 'user_id' => $user_id,
//                 'session_id' => $session_id,
//                 'product_id' => $product->id,
//                 'quantity' => $request->qty,
//                 'price' => $basePrice,
//                 'options' => json_encode([
//                     'image' => $product->thumb_image ?? null,
//                     'size_id' => $request->size_id,
//                     'size_name' => $sizeName,
//                     'size_price' => $sizePrice,
//                     'color_id' => $request->color_id,
//                     'color_name' => $colorName,
//                     'color_price' => $colorPrice,
//                     'variant_total' => $variantTotal,
//                     'extra_price' => $extraPrice,
//                     'font_image' => $font_image,
//                     'back_image' => $back_image,
//                     'is_free_product' => false
//                 ]),
//             ]);
//         }

//         $cartItems = $this->getCurrentUserCart($user_id, $session_id);
//         $cartTotal = $this->calculateCartTotal($cartItems);
//         $promotions = $this->applyPromotions($cartItems);

//         $response = apiResponse('success', 'Product added to cart successfully!', [
//             'cart_count' => $cartItems->count(),
//             'cart_total' => number_format($cartTotal, 2),
//             'cart_item' => $cartItem,
//             'promotions' => $promotions,
//         ]);

//         return $cookie ? $response->withCookie($cookie) : $response;
//     }

//     /**
//      * Get Cart items
//      */
//     public function getCart(Request $request)
//     {
//         $user_id = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         $cartItems = $this->getCurrentUserCart($user_id, $session_id)->map(function ($item) {
//             $opt = json_decode($item->options, true);

//             $item->variant_total = $opt['variant_total'] ?? 0;
//             $item->extra_price = $opt['extra_price'] ?? 0;
//             $item->size = [
//                 'id' => $opt['size_id'] ?? null,
//                 'name' => $opt['size_name'] ?? null,
//                 'price' => $opt['size_price'] ?? 0
//             ];
//             $item->color = [
//                 'id' => $opt['color_id'] ?? null,
//                 'name' => $opt['color_name'] ?? null,
//                 'price' => $opt['color_price'] ?? 0
//             ];
//             $item->customization = (!empty($opt['font_image']) || !empty($opt['back_image']))
//                 ? ['front_image' => $opt['font_image'] ?? null, 'back_image' => $opt['back_image'] ?? null]
//                 : null;
//             $item->image = $opt['image'] ?? ($item->product->thumb_image ?? null);
//             $item->total = ($item->price + $item->variant_total + $item->extra_price) * $item->quantity;

//             return $item;
//         });

//         $cartTotal = $cartItems->sum('total');
//         $promotions = $this->getPromotions($cartItems);

//         return apiResponse('success', 'Cart fetched successfully!', [
//             'cart_items' => $cartItems->values(),
//             'cart_count' => $cartItems->count(),
//             'cart_total' => number_format($cartTotal, 2),
//             'promotions' => $promotions,
//             'currency_icon' => getCurrencyIcon(),
//         ]);
//     }

//     /**
//      * Cart summary with coupon
//      */
//     public function cartSummary(Request $request)
//     {
//         $request->validate(['coupon_code' => 'nullable|string']);
//         $user_id = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         $cartItems = $this->getCurrentUserCart($user_id, $session_id);

//         if ($cartItems->isEmpty()) return apiResponse('error', 'Your cart is empty!');

//         $subTotal = $this->calculateCartTotal($cartItems);

//         $discount = 0;
//         $couponData = null;

//         if ($request->coupon_code) {
//             $coupon = Coupon::active()->where('code', $request->coupon_code)->first();
//             if ($coupon) {
//                 $discount = $coupon->discount_type === 'amount'
//                     ? $coupon->discount
//                     : $subTotal * $coupon->discount / 100;

//                 $couponData = [
//                     'code' => $coupon->code,
//                     'discount_type' => $coupon->discount_type,
//                     'discount' => $coupon->discount,
//                 ];
//             }
//         }

//         $finalTotal = max(0, $subTotal - $discount);
//         $promotions = $this->applyPromotions($cartItems, $coupon ?? null);

//         return apiResponse('success', 'Cart summary fetched!', [
//             'cart_items' => $cartItems->values(),
//             'cart_count' => $cartItems->count(),
//             'sub_total' => number_format($subTotal, 2),
//             'discount' => number_format($discount, 2),
//             'final_total' => number_format($finalTotal, 2),
//             'coupon' => $couponData,
//             'promotions' => $promotions,
//             'currency_icon' => getCurrencyIcon(),
//         ]);
//     }

//     /**
//      * Update cart quantity
//      */
//     public function updateCart(Request $request)
//     {
//         $request->validate(['cart_id' => 'required|integer', 'quantity' => 'required|integer|min:1']);

//         $cartItem = Cart::findOrFail($request->cart_id);
//         $product = Product::findOrFail($cartItem->product_id);

//         if ($product->qty < $request->quantity) {
//             return apiResponse('error', 'Not enough stock!');
//         }

//         $cartItem->update(['quantity' => $request->quantity]);

//         $opt = json_decode($cartItem->options, true);
//         $total = ($cartItem->price + ($opt['variant_total'] ?? 0) + ($opt['extra_price'] ?? 0)) * $cartItem->quantity;

//         return apiResponse('success', 'Cart updated successfully!', [
//             'product_total' => number_format($total, 2),
//             'cart_item' => $cartItem,
//         ]);
//     }

//     /**
//      * Remove cart item
//      */
//     public function removeCart($id)
//     {
//         $user_id = auth('sanctum')->id();
//         $session_id = request()->cookie('cart_session');

//         $cart = Cart::where('id', $id)
//             ->where(function ($q) use ($user_id, $session_id) {
//                 $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//                     ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id));
//             })
//             ->firstOrFail();

//         if ($cart->user_id) {
//             customerCustomization::where('user_id', $cart->user_id)
//                 ->where('product_id', $cart->product_id)
//                 ->delete();
//         } else {
//             customerCustomization::where('session_id', $cart->session_id)
//                 ->where('product_id', $cart->product_id)
//                 ->delete();
//         }

//         $cart->delete();

//         return apiResponse('success', 'Cart item removed successfully!');
//     }

//     /**
//      * Clear cart
//      */
//     public function clearCart(Request $request)
//     {
//         $user_id = auth('sanctum')->id();
//         $session_id = $request->cookie('cart_session');

//         Cart::where(fn($q) => $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//             ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id)))
//             ->delete();

//         return apiResponse('success', 'Cart cleared successfully!');
//     }

//     /** Helper: current user cart */
//     private function getCurrentUserCart($user_id, $session_id)
//     {
//         return Cart::with('product:id,name,thumb_image,price,offer_price,qty,slug')
//             ->where(fn($q) => $q->when($user_id, fn($qq) => $qq->where('user_id', $user_id))
//                 ->when(!$user_id && $session_id, fn($qq) => $qq->where('session_id', $session_id)))
//             ->get();
//     }

//     /** Helper: calculate cart total */
//     private function calculateCartTotal($cartItems)
//     {
//         return $cartItems->sum(
//             fn($i) => ($i->price + (json_decode($i->options, true)['variant_total'] ?? 0) + (json_decode($i->options, true)['extra_price'] ?? 0)) * $i->quantity
//         );
//     }

//     /** Apply promotions & free products */
//     private function applyPromotions($cartItems, $appliedCoupon = null)
//     {
//         $user_id = auth('sanctum')->id();
//         $session_id = request()->cookie('cart_session');
//         $promotions = Promotion::where('status', 1)->get();
//         $applied = [];

//         foreach ($promotions as $promo) {
//             if ($appliedCoupon && !$promo->allow_coupon_stack) continue;

//             $qty = $promo->product_id
//                 ? $cartItems->where('product_id', $promo->product_id)->sum('quantity')
//                 : ($promo->category_id
//                     ? $cartItems->filter(fn($i) => $i->product->category_id == $promo->category_id)->sum('quantity')
//                     : $cartItems->sum('quantity'));

//             if ($qty >= $promo->buy_quantity) {
//                 if ($promo->type === 'free_product' && $promo->product_id) {
//                     $existing = $cartItems->where('product_id', $promo->product_id)
//                         ->where(fn($i) => (json_decode($i->options, true)['is_free_product'] ?? false))
//                         ->first();

//                     if (!$existing) {
//                         $freeProduct = Product::find($promo->product_id);
//                         if ($freeProduct) {
//                             Cart::create([
//                                 'user_id' => $user_id,
//                                 'session_id' => $user_id ? null : $session_id,
//                                 'product_id' => $freeProduct->id,
//                                 'quantity' => $promo->get_quantity ?? 1,
//                                 'price' => 0,
//                                 'options' => json_encode([
//                                     'image' => $freeProduct->thumb_image,
//                                     'variant_total' => 0,
//                                     'extra_price' => 0,
//                                     'is_free_product' => true,
//                                 ]),
//                             ]);
//                         }
//                     }
//                 }

//                 $applied[] = [
//                     'promotion_id' => $promo->id,
//                     'type' => $promo->type,
//                     'message' => $promo->type === 'free_shipping' ? 'Free Shipping!' : 'Free Product Unlocked!',
//                     'free_product_id' => $promo->type === 'free_product' ? $promo->product_id : null,
//                     'free_quantity' => $promo->get_quantity ?? 1,
//                 ];
//             }
//         }

//         return $applied;
//     }

//     /** Get promotions metadata only */
//     private function getPromotions($cartItems, $appliedCoupon = null)
//     {
//         $promotions = Promotion::where('status', 1)->get();
//         $applied = [];

//         foreach ($promotions as $promo) {
//             if ($appliedCoupon && !$promo->allow_coupon_stack) continue;

//             $qty = $promo->product_id
//                 ? $cartItems->where('product_id', $promo->product_id)->sum('quantity')
//                 : ($promo->category_id
//                     ? $cartItems->filter(fn($i) => $i->product->category_id == $promo->category_id)->sum('quantity')
//                     : $cartItems->sum('quantity'));

//             if ($qty >= $promo->buy_quantity) {
//                 $applied[] = [
//                     'promotion_id' => $promo->id,
//                     'type' => $promo->type,
//                     'message' => $promo->type === 'free_shipping' ? 'Free Shipping!' : 'Free Product Unlocked!',
//                     'free_product_id' => $promo->type === 'free_product' ? $promo->product_id : null,
//                     'free_quantity' => $promo->get_quantity ?? 1,
//                 ];
//             }
//         }

//         return $applied;
//     }
// }
