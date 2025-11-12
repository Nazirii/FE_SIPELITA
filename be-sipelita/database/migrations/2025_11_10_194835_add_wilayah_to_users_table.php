<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Tambahkan setelah 'nomor_telepon'
            $table->string('province_id')->nullable()->after('nomor_telepon');
            $table->string('regency_id')->nullable()->after('province_id');

            // Kita set foreign key (opsional tapi bagus)
            // $table->foreign('province_id')->references('id')->on('provinces');
            // $table->foreign('regency_id')->references('id')->on('regencies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
