<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    // --- TAMBAHKAN 3 BARIS INI ---
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    // --- AKHIR TAMBAHAN ---
}