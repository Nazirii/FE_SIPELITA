<?php
// app/Models/JenisDlh.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisDlh extends Model
{
    use HasFactory;

    // --- TAMBAHKAN INI ---
    protected $fillable = ['name'];
    public $timestamps = false; // Asumsi tabel ini tidak punya created_at/updated_at
    // --- AKHIR TAMBAHAN ---
}