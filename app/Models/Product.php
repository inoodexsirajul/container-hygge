<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    // public function vendor()
    // {
    //     return $this->belongsTo(vendor::class);
    // }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class, 'sub_category_id');
    }

    public function childcategory()
    {
        return $this->belongsTo(ChildCategory::class, 'child_category_id');
    }

    public function productImageGalleries()
    {
        return $this->hasMany(ProductImageGallery::class);
    }
    // public function variants()
    // {
    //     return $this->hasMany(ProductVariant::class);
    // }
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    // public function reviews()
    // {
    //     return $this->hasMany(ProductReview::class);
    // }
    // Product has many ProductColors
    // Many-to-Many relationship with Size
    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_sizes')->withPivot('size_price');
    }

    // Many-to-Many relationship with Color
    public function colors()
    {
        return $this->belongsToMany(Color::class, 'product_colors')->withPivot('color_price');
    }


    /** review relationship */
    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }

    /** 
     * who is create the product
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    /** scope  */

    public function scopeActive($query)
    {
        return $query->where(['status' => 1, 'is_approved' => 1]);
    }
    public function scopeWithReview($query)
    {
        return $query
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->with([
                'category',
                'colors:id,color_name,color_code,price,is_default',
                'sizes:id,size_name,price,is_default',
            ]);
    }
    /** customization relationship */
    public function customization()
    {
        return $this->hasOne(productCustomization::class);
    }
    /** Shipping Method  relationship */
    public function shippingMethods()
    {
        return $this->belongsToMany(ShippingMethod::class, 'product_shipping')->withPivot('charge');
    }
}