<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class customerCustomization extends Model
{
    protected $fillable = ['product_id', 'user_id','session_id', 'custom_data', 'price' ,'front_image', 'back_image'];

    protected $casts = [
        'custom_data' => 'array', // JSON column automatically cast to array
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function customer()
    {
        return $this->belongsTo(customer::class);
    }

    // public function getExtraPriceAttribute()
    // {
    //     return $this->custom_data['extra_price'] ?? 0;
    // }
}
