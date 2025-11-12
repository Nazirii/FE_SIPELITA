<?php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The relationships that should always be loaded.
     * (Ini sudah benar)
     * @var array
     */
    protected $with = ['role', 'jenisDlh', 'province', 'regency'];

    /**
     * The attributes that are mass assignable.
     * (Ini sudah benar)
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'nomor_telepon',
        'password',
        'role_id',
        'jenis_dlh_id',
        'province_id',
        'regency_id',
        'pesisir',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * (Ini sudah benar)
     */
    protected $hidden = [ 'password', 'remember_token' ];

    /**
     * Get the attributes that should be cast.
     * (Ini sudah benar)
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RELASI (PERBAIKAN KRUSIAL DI SINI)
    |--------------------------------------------------------------------------
    */

    /**
     * Get the role that owns the user.
     * (Relasi ini sudah benar, tapi kita buat eksplisit)
     */
    public function role(): BelongsTo
    {
        // Foreign Key di tabel 'users' -> Owner Key (Primary Key) di tabel 'roles'
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }

    /**
     * Get the jenis_dlh that owns the user.
     * (Relasi ini sudah benar, tapi kita buat eksplisit)
     */
    public function jenisDlh(): BelongsTo
    {
        return $this->belongsTo(JenisDlh::class, 'jenis_dlh_id', 'id');
    }

    /**
     * Get the province that owns the user.
     * (INI ADALAH PERBAIKAN UTAMA)
     */
    public function province(): BelongsTo
    {
        // Kita harus memberitahu Eloquent bahwa 'id' di tabel 'provinces'
        // adalah 'string', bukan 'int'.
        return $this->belongsTo(Province::class, 'province_id', 'id');
    }

    /**
     * Get the regency that owns the user.
     * (INI ADALAH PERBAIKAN UTAMA)
     */
    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class, 'regency_id', 'id');
    }
}