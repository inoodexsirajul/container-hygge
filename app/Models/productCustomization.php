<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class productCustomization extends Model
{
    protected $fillable = [
        'product_id',
        'is_customizable',
        'front_image',
        'back_image',
        'front_price',
        'back_price',
        'both_price',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
