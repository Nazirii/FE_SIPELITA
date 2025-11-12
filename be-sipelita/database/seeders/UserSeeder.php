<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\JenisDlh;
use App\Models\Province; // <-- Impor Wilayah
use App\Models\Regency;  // <-- Impor Wilayah
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ambil ID Role & Jenis
        $adminRole = Role::where('name', 'Admin')->first();
        $pusdatinRole = Role::where('name', 'Pusdatin')->first();
        $dlhRole = Role::where('name', 'DLH')->first();

        // ✅ Ganti nama variabel agar lebih jelas
        $dlhProvinsi = JenisDlh::where('name', 'DLH Provinsi')->first();
        $dlhKabKota = JenisDlh::where('name', 'DLH Kab-Kota')->first();

        // 2. Ambil ID Wilayah (Contoh: Jawa Barat & Kota Bogor)
        // (Pastikan ID "32" dan "32.71" ada di data CSV Anda)
        $provJabar = Province::where('id', '32')->first(); // Jawa Barat
        $regBogor = Regency::where('id', '32.71')->first(); // Kota Bogor

        // Password default
        $defaultPassword = Hash::make('password');

        // 3. Buat 4 Akun Admin (Hanya perlu No HP)
        User::create([
            'name' => 'Admin Satu',
            'email' => 'admin1@sipelita.com',
            'nomor_telepon' => '081234560001',
            'password' => $defaultPassword,
            'role_id' => $adminRole->id,
        ]);
        User::create([
            'name' => 'Admin Dua',
            'email' => 'admin2@sipelita.com',
            'nomor_telepon' => '081234560002',
            'password' => $defaultPassword,
            'role_id' => $adminRole->id,
        ]);
        User::create([
            'name' => 'Admin Tiga',
            'email' => 'admin3@sipelita.com',
            'nomor_telepon' => '081234560003',
            'password' => $defaultPassword,
            'role_id' => $adminRole->id,
        ]);
        User::create([
            'name' => 'Admin Empat',
            'email' => 'admin4@sipelita.com',
            'nomor_telepon' => '081234560004',
            'password' => $defaultPassword,
            'role_id' => $adminRole->id,
        ]);

        // 4. Buat 1 Akun Pusdatin (Hanya perlu No HP)
        User::create([
            'name' => 'Pusdatin Satu',
            'email' => 'pusdatin1@sipelita.com',
            'nomor_telepon' => '081234560005',
            'password' => $defaultPassword,
            'role_id' => $pusdatinRole->id,
        ]);

        // 5. Buat 1 Akun DLH Provinsi (Data Lengkap)
        User::create([
            'name' => 'DLH Provinsi Jawa Barat', // Sesuai 'Nama DLH'
            'email' => 'dlh.prov.jabar@sipelita.com',
            'nomor_telepon' => '081234560006',
            'password' => $defaultPassword,
            'role_id' => $dlhRole->id,
            'jenis_dlh_id' => $dlhProvinsi->id, // ✅ Sudah benar
            'province_id' => $provJabar->id,
            'regency_id' => null, // Provinsi tidak punya regency
            'pesisir' => 'Ya',
        ]);

        // 6. Buat 1 Akun DLH Kab/Kota (Data Lengkap)
        User::create([
            'name' => 'DLH Kota Bogor', // Sesuai 'Nama DLH'
            'email' => 'dlh.kota.bogor@sipelita.com',
            'nomor_telepon' => '081234560007',
            'password' => $defaultPassword,
            'role_id' => $dlhRole->id,
            'jenis_dlh_id' => $dlhKabKota->id, // ✅ Sudah benar
            'province_id' => $provJabar->id, // Kota Bogor ada di Jabar
            'regency_id' => $regBogor->id,   // ID Kota Bogor
            'pesisir' => 'Tidak',
        ]);
    }
}