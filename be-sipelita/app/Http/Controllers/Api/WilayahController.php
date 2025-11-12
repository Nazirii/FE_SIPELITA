<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\Regency;

class WilayahController extends Controller
{
    /**
     * Ambil semua data provinsi.
     */
    public function getProvinces()
    {
        // Ambil semua provinsi, urutkan berdasarkan nama
        $provinces = Province::orderBy('name', 'asc')->get();
        return response()->json($provinces);
    }

    /**
     * Ambil kab/kota berdasarkan ID Provinsi.
     */
    public function getRegencies($province_id)
    {
        // Cari kab/kota yang ID-nya DIAWALI dengan ID provinsi
        // (Contoh: ID Provinsi "11", ID Kab/Kota "11.01", "11.02")
        $regencies = Regency::where('id', 'like', $province_id . '.%')
                            ->orderBy('name', 'asc')
                            ->get();
        
        return response()->json($regencies);
    }

    /**
     * Ambil semua kab/kota.
     */
    public function getAllRegencies()
    {
        // Ambil semua data regency
        $regencies = Regency::orderBy('id', 'asc')->get();
        return response()->json($regencies);
    }
}