<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class LogoSetting extends Model
{
    protected $fillable = [
        'logo',
        'favicon'
    ];
    protected static function booted()
    {
        $refreshCache = function () {
            Cache::forget('logo_fav');
            Cache::remember('logo_fav', 3600, function () {
                return LogoSetting::first();
            });
        };

        static::created($refreshCache);
        static::updated($refreshCache);
        static::deleted($refreshCache);
    }
}
