<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'icon',
        'name',
        'slug',
        'status',
        'front_show',
        'image',
        'meta_title',
        'meta_description',
    ];
    /** Elequent relationships */
    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }

    /** scope */
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
    public function scopeFrontShow($query)
    {
        return $query->where('front_show', 1);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
