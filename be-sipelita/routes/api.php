<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\WilayahController;

// --- BUKA PEMBUNGKUS (YANG KITA BUAT SEBELUMNYA) ---
Route::middleware([
    \Illuminate\Session\Middleware\StartSession::class,
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
])->group(function () {
// --- BATAS PEMBUKA ---

    // Endpoint publik (Tidak perlu login)
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/jenis-dlh', [AuthController::class, 'getJenisDlh']);
    
    // Rute Wilayah Baru
    Route::get('/provinces', [WilayahController::class, 'getProvinces']);
    Route::get('/regencies/all', [WilayahController::class, 'getAllRegencies']);
    Route::get('/regencies/{province_id}', [WilayahController::class, 'getRegencies']);

    
    // --- PINDAHKAN LOGOUT KE SINI (PUBLIK) ---
    Route::post('/logout', [AuthController::class, 'logout']); 
    // --- AKHIR PEMINDAHAN ---

    // Endpoint yang dilindungi (Harus sudah login)
    Route::middleware('auth:sanctum')->group(function () {
        // Hapus Route::post('/logout', ...) dari sini
        Route::get('/user', [AuthController::class, 'user']);
    });

// --- PENUTUP PEMBUNGKUS ---
});