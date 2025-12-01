<?php

use App\Http\Controllers\Backend\AdminController;
use App\Http\Controllers\Backend\BrandController;
use App\Http\Controllers\Backend\CategoryController;
use App\Http\Controllers\Backend\ChildCategoryController;
use App\Http\Controllers\Backend\ColorController;
use App\Http\Controllers\Backend\CouponController;
use App\Http\Controllers\Backend\ProductController;
use App\Http\Controllers\Backend\ProductImageGalleryController;
use App\Http\Controllers\Backend\ProductVariantController;
use App\Http\Controllers\Backend\ProductVariantItemController;
use App\Http\Controllers\Backend\ProfileController;
use App\Http\Controllers\Backend\SettingController;
use App\Http\Controllers\Backend\ShippingRuleController;
use App\Http\Controllers\Backend\SizeController;
use App\Http\Controllers\Backend\SliderController;
use App\Http\Controllers\Backend\SubCategoryController;
use App\Models\ProductImageGallery;
use Illuminate\Support\Facades\Route;


/** admin routes */
// Route::middleware(['web', 'auth', 'verified', 'role:SuperAdmin|'])->group(function () {
//     Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
// });
// Route::middleware(['web', 'auth', 'verified', 'role:SuperAdmin'])->group(function () {
//     /** profile routes */
//     Route::controller(ProfileController::class)->group(function () {
//         Route::get('/profile', 'index')->name('profile');
//         Route::post('/profile/update', 'updateProfile')->name('profile.update');
//         Route::post('/profile/update/password', 'updatePassword')->name('password.update');
//     });
//     /** slider route */
//     Route::resource('slider', SliderController::class);
//     /** category routes */
//     Route::put('category/change-status', [CategoryController::class, 'changeStatus'])->name('category.change-status');
//     Route::resource('category', CategoryController::class);

//     /** subcategory routes */
//     Route::put('subcategory/change-status', [SubCategoryController::class, 'changeStatus'])->name('subcategory.change-status');
//     Route::resource('sub-category', SubCategoryController::class);

//     /** child category routes */
//     Route::controller(ChildCategoryController::class)->group(function () {
//         Route::put('child-category/change-status', 'changeStatus')->name('child-category.change-status');
//         Route::get('get-subcategories', 'getSubCategories')->name('get-subCategories');
//     });
//     Route::resource('child-category', ChildCategoryController::class);

//     /** brand routes */
//     Route::put('brand/change-status', [BrandController::class, 'changeStatus'])->name('brand.change-status');
//     Route::resource('brand', BrandController::class);

//     /** product routes */
//     Route::put('products/change-status', [ProductController::class, 'changeStatus'])->name('products.change-status');
//     Route::get('products/get-sub-categories', [ProductController::class, 'getSubCategories'])->name('product.get-sub-categories');
//     Route::get('products/get-child-categories', [ProductController::class, 'getChildCategories'])->name('product.get-child-categories');
//     Route::resource('products', ProductController::class);

//     /** product image gallery routes */
//     Route::controller(ProductImageGalleryController::class)->group(function () {
//         Route::get('products-image-gallery', 'index')->name('products-image-gallery.index');
//         Route::post('products-image-gallery', 'store')->name('products-image-gallery.store');
//         Route::delete('products-image-gallery/{id}', 'destroy')->name('products-image-gallery.destroy');
//     });
//     // /* Product Variant routes */
//     // Route::put('product-variant/change-status', [ProductVariantController::class, 'changeStatus'])->name('product-variant.change-status');
//     // Route::resource('product-variant', ProductVariantController::class);
//     // /* Product Variant Item routes */
//     // Route::controller(ProductVariantItemController::class)->group(function () {
//     //     Route::get('products-variant-item/{productId}/{variantId}', 'index')->name('products-variant-item.index');
//     //     Route::get('products-variant-item/create/{productId}/{variantId}', 'create')->name('products-variant-item.create');
//     //     Route::post('products-variant-item', 'store')->name('products-variant-item.store');
//     //     Route::get('products-variant-item-edit/{variantItemId}', 'edit')->name('products-variant-item.edit');
//     //     Route::put('products-variant-item-update/{variantItemId}', 'update')->name('products-variant-item.update');
//     //     Route::delete('products-variant-item/{variantItemId}', 'destroy')->name('products-variant-item.destroy');
//     //     Route::put('products-variant-item-status', 'changeStatus')->name('products-variant-item.change-status');
//     // });
//     /** size routes */
//     Route::put('size/change-status', [SizeController::class, 'changeStatus'])->name('size.change-status');
//     Route::resource('size', SizeController::class);

//     /** color routes */
//     Route::put('color/change-status', [ColorController::class, 'changeStatus'])->name('color.change-status');
//     Route::resource('color', ColorController::class);

//     /** setting routes */
//     Route::controller(SettingController::class)->group(function () {
//         Route::get('settings', 'index')->name('setting.index');
//         Route::put('general-setting', 'generalSettingUpdate')->name('general-setting.update');
//         Route::put('email-configuration-setting', 'emailConfigurationUpdate')->name('email-configuration-setting.update');
//         Route::put('log-setting', 'logSettingUpdate')->name('log-setting.update');
//     });

//     /** coupon routes */
//     Route::put('coupons/change-status', [CouponController::class, 'changeStatus'])->name('coupon.change-status');
//     Route::resource('coupons', CouponController::class);

//     /** shipping roule route */
//     Route::put('shipping-rule/change-status', [ShippingRuleController::class, 'changeStatus'])->name('shipping-rule.change-status');
//     Route::resource('shipping-rule', ShippingRuleController::class);
// });
