<?php

// use App\Http\Controllers\Api\FrontendProductController;
// use App\Http\Controllers\Api\HomeController;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

/** home page route */
// Route::get('/home', [HomeController::class, 'index'] );


/** Product Detail */
// Route::get('product-detail/{slug}', [FrontendProductController::class, 'productDetails'])->name('product-detail');
/** Product Route */
// Route::get('products', [FrontendProductController::class, 'productsIndex'])->name('products.inex');

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckOutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FrontendProductController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;

/*
|--------------------------------------------------------------------------
| API Versioning: v1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->name('api.v1.')->group(function () {

    // Authenticated user route
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    })->name('user');


    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);

        // ===== Review routes ==== 
        Route::post('review', [ReviewController::class, 'create'])->name('review.create');
    });

    // ===== Home Page =====
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    // ===== Products =====

    // ===== Product Detail =====
    //product details:
    Route::get('product-detail/{slug}', [FrontendProductController::class, 'productDetails'])
        ->name('product-detail');
    //product category 
    Route::get('category/{slug}', [FrontendProductController::class, 'categoryProducts'])->name('categoryProducts');
    //product subcategory
    Route::get('subcategory/{slug}', [FrontendProductController::class, 'subcategoryProducts'])->name('subcategory.products');
    //product childcategory
    Route::get('childcategory/{slug}', [FrontendProductController::class, 'childcategoryProducts'])->name('childcategory.products');
    //all products
    Route::get('all-products', [FrontendProductController::class, 'allProducts'])->name('all.products');

    // =====  Cart Controller  =====
    // Route::controller(CartController::class)->group(function () {
    //     //add product to cart 
    //     Route::post('add-to-cart', 'addToCart')->name('cart.add');
    //     //product cart details 
    //     Route::get('cart/details', 'getCart')->name('cart.details');
    //     // Route::get('details', 'cartDetails')->name('api.cart.details');

    //     //cart product update quantity
    //     Route::post('update-quantity', 'updateCart')->name('cart.update-quantity');

    //     //clear cart
    //     Route::get('cart/clear', 'clearCart')->name('cart.clear');

    //     //remove product from cart
    //     Route::delete('cart/remove/{id}', 'removeCart')->name('cart.remove-product');

    //      // Cart total (subtotal)
    //     Route::get('cart/total', 'cartTotal')->name('cart.total');

    //     // Cart count optional if need : 
    //     Route::get('cart/count', 'cartCount')->name('cart.count');

    //     // Route::get('count', 'getCartCount')->name('api.cart.count');
    //     // Route::get('products', 'getCartProduct')->name('api.cart.products');
    //     // Route::delete('remove-sidebar', 'removeSidebarProduct')->name('api.cart.remove-sidebar-product');
    //     // Route::get('sidebar-total', 'cartTotal')->name('api.cart.sidebar-total');
    //     Route::post('apply-coupon', 'applyCoupon')->name('cart.apply-coupon');
    //     Route::get('coupon-calculation', 'couponCalculation')->name('cart.coupon-calculation');
    // });
    // Route::controller(CartController::class)->group(function () {
    //     // Add product to cart
    //     Route::post('add-to-cart', 'addToCart')->name('cart.add');

    //     // Get cart details
    //     Route::get('cart/details', 'getCart')->name('cart.details');

    //     // Update cart quantity
    //     Route::post('cart/update-quantity', 'updateCart')->name('cart.update-quantity');

    //     // Clear cart
    //     Route::get('cart/clear', 'clearCart')->name('cart.clear');

    //     // Remove product from cart
    //     Route::delete('cart/remove/{id}', 'removeCart')->name('cart.remove-product');

    //     // Cart total (subtotal)
    //     Route::get('cart/total', 'cartTotal')->name('cart.total');

    //     // Cart count
    //     Route::get('cart/count', 'cartCount')->name('cart.count');

    //     // Stateless coupon calculation
    //     Route::post('cart/calculate-coupon', 'calculateCoupon')->name('cart.calculate-coupon');
    // });
    //new version of cart controller
    Route::controller(CartController::class)->prefix('cart')->group(function () {

        // Add product to cart
        Route::post('/add', 'addToCart')->name('cart.add');

        // Get all cart items
        Route::get('/details', 'getCart')->name('cart.get.details');

        // Update cart item quantity
        Route::post('/update', 'updateCart')->name('cart.update');

        // Remove single item
        Route::delete('/remove/{id}', 'removeCart')->name('cart.remove');

        // Clear entire cart
        Route::delete('/clear', 'clearCart')->name('cart.clear');

        // Cart subtotal (only total)
        Route::get('/total', 'cartTotal')->name('cart.total');

        // Cart count
        Route::get('/count', 'cartCount')->name('cart.count');

        // Apply coupon and calculate totals
        Route::post('/apply-coupon', 'calculateCoupon')->name('cart.coupon');

        // Full summary for checkout (optional but very useful)
        Route::get('/summary', 'cartSummary')->name('cart.summary');
    });

    Route::get('checkout', [CheckOutController::class, 'index'])->name('checkout');
    
    Route::middleware('auth:sanctum')->group(function () {
        /** payment routes */
        Route::controller(PaymentController::class)->group(function () {

            // Route::get('payment', 'index')->name('payment');
            Route::get('payment/success', 'paymentSuccess')->name('payment.success');

            /** Paypal Payment routes */
            Route::get('paypal/payment', 'payWithPaypal')->name('paypal-payment');
            Route::get('paypal/success', 'paypalSuccess')->name('paypal-success');
            Route::get('paypal/cancel', 'paypalCancel')->name('paypal-cancel');

            /** Stripe Payment routes */
            // Route::post('stripe/payment', 'payWithStripe')->name('stripe-payment');

            /** cod payment route */
            Route::get('cod-payment', 'payWithCod')->name('cod-payment');
        });
    });

    // Route::post('store-review', [ReviewController::class, 'storeApi'])->name('review.create');
    //  Route::get('review', [ReviewController::class, 'index'])->name('review.index');

    // Product for later working page : 
    // Route::prefix('products')->name('products.')->group(function () {
    //     Route::get('/', [FrontendProductController::class, 'productsIndex'])->name('index');
    //     Route::get('{slug}', [FrontendProductController::class, 'productDetails'])->name('detail');
    // });
});
