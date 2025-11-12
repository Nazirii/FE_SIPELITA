<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JenisDlh;

class JenisDlhSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        JenisDlh::create(['name' => 'DLH Provinsi']);
        JenisDlh::create(['name' => 'DLH Kab-Kota']);
    }
}