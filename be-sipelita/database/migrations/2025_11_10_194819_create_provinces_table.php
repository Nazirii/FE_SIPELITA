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
    Schema::create('provinces', function (Blueprint $table) {
        $table->string('id')->primary(); // ID "11", "12", "13"
        $table->string('name');
        // Kita tidak butuh timestamps (created_at/updated_at)
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provinces');
    }
};
