<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImageGallery extends Model
{
    protected $fillable = [
        'product_id',
        'color_id',
        'image',
    ];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function color()
    {
        return $this->belongsTo(Color::class, 'color_id');
    }
}
