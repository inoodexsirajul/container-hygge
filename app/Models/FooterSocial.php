<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class FooterSocial extends Model
{
    protected $guarded = [];

    protected static function booted()
    {
        $refreshCache = function () {
            Cache::forget('footer_social');
            Cache::remember('footer_social', 3600, function () {
                return FooterSocial::select('icon', 'icon_extra', 'name', 'url', 'serial_no')
                    ->get()
                    ->map(function ($item) {
                        return $item->only(['icon', 'icon_extra', 'name', 'url', 'serial_no']);
                    });
            });
        };

        static::created($refreshCache);
        static::updated($refreshCache);
        static::deleted($refreshCache);
    }
}
