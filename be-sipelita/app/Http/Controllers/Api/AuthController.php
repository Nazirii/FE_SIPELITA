<?php
// app/Http/Controllers/Api/AuthController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Role;
use App\Models\JenisDlh;

class AuthController extends Controller
{
    /**
     * Registrasi Pengguna (HANYA UNTUK DLH).
     */
    public function register(Request $request)
    {
        // ... (Fungsi register Anda sudah benar)
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'nomor_telepon' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'jenis_dlh_id' => 'required|exists:jenis_dlhs,id',
            'province_id' => 'required|string|exists:provinces,id',
            'regency_id' => 'nullable|string|exists:regencies,id',
            'pesisir' => 'required|string',
        ]);

        $dlhRole = Role::where('name', 'DLH')->first();
        if (!$dlhRole) {
            return response()->json(['message' => 'Role DLH tidak ditemukan'], 500);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'nomor_telepon' => $request->nomor_telepon,
            'password' => Hash::make($request->password),
            'role_id' => $dlhRole->id,
            'jenis_dlh_id' => $request->jenis_dlh_id,
            'province_id' => $request->province_id,
            'regency_id' => $request->regency_id,
            'pesisir' => $request->pesisir,
        ]);

        return response()->json($user, 201);
    }

    /**
     * Login Pengguna (Versi 3.0 - Role-Aware & Robust)
     */
    public function login(Request $request)
    {
        // ... (Validasi dan logika Auth::attempt() Anda sudah benar) ...
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'role_id' => 'required|numeric|exists:roles,id',
            'jenis_dlh_id' => 'nullable|numeric|exists:jenis_dlhs,id',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }
        
        $user = $request->user();

        if ($user->role_id != $request->role_id) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            throw ValidationException::withMessages([
                'email' => ['Anda mencoba login di peran yang salah.'],
            ]);
        }

        if ($user->role_id == 3 && $request->jenis_dlh_id && $user->jenis_dlh_id != $request->jenis_dlh_id) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

             throw ValidationException::withMessages([
                'email' => ['Anda mencoba login di jenis DLH yang salah.'],
            ]);
        }

        $request->session()->regenerate();

        // 7. Kirim data user (tanpa dibungkus)
        // (Kita tidak perlu User::with() karena Model User sudah punya properti $with)
        
        // --- PERBAIKAN DI SINI ---
        return response()->json($user);
        // --- BUKAN: return response()->json(['user' => $user]); ---
    }

    /**
     * Logout Pengguna.
     */
    public function logout(Request $request)
    {
        // ... (Fungsi logout Anda sudah benar)
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully']);
    }

    /**
     * Ambil data user yang sedang login.
     */
    public function user(Request $request)
    {
        // (Kita tidak perlu User::with() karena Model User sudah punya properti $with)

        // --- PERBAIKAN DI SINI ---
        return response()->json($request->user());
        // --- BUKAN: return response()->json(['user' => $request->user()]); ---
    }

    /**
     * Ambil semua Jenis DLH.
     */
    public function getJenisDlh()
    {
        // ... (Fungsi ini sudah benar)
        $jenis = JenisDlh::all();
        return response()->json($jenis);
    }
}