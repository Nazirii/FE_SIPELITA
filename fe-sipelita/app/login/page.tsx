// src/app/login/page.tsx
"use client";

import { useState } from 'react'; // <-- Hapus useEffect
import Link from 'next/link';
import SintaFullLogo from '@/components/SintaFullLogo';
import { useAuth } from '@/context/AuthContext';
import { isAxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

// --- (PERBAIKAN #2) ---
// Tambahkan komponen ikon mata di sini
const EyeIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.625-5.06A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.268 5.768M4 12s2.943-7 8-7 8 7 8 7-2.943 7-8 7-8-7-8-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
// --- (AKHIR PERBAIKAN #2) ---


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const searchParams = useSearchParams();

  // --- (PERBAIKAN #1) ---
  // Hapus useEffect dan useState. Baca langsung dari URL.
  const roleId = searchParams.get('role');
  const jenisId = searchParams.get('jenis');
  // --- (AKHIR PERBAIKAN #1) ---


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ 
        email, 
        password,
        role_id: roleId,
        jenis_dlh_id: jenisId
      });
      // Redirect akan di-handle oleh AuthContext
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        
        // --- PERBAIKAN ERROR HANDLING DI SINI ---
        let message = 'Login gagal. Silakan coba lagi.'; // Pesan default

        // Cek apakah ada 'errors' object dari validasi Laravel
        // Ini akan menangkap "Anda mencoba login di peran yang salah."
        if (err.response?.data?.errors?.email) {
          message = err.response.data.errors.email[0];
        } 
        // Fallback jika errornya ada di 'message' (bukan validasi)
        else if (err.response?.data?.message) {
          message = err.response.data.message;
        }
        
        setError(message);
        // --- AKHIR PERBAIKAN ---

      } else {
        setError('Terjadi kesalahan yang tidak terduga.');
      }
    }
  };

// Fungsi untuk render bagian "Daftar" secara dinamis
  const renderRegisterSection = () => {
    // Jika roleId=2 (Pusdatin)
    if (roleId === '2') {
      return (
        <div className="mt-8 text-sm text-center">
          <p className="text-gray-600 mb-4">Belum memiliki akun?</p>
          {/* UBAH INI MENJADI LINK KE HALAMAN BARU */}
          <Link
            href="/hubungi-admin" 
            className="inline-block bg-[#00A86B] text-white font-bold py-3 px-6 rounded-lg shadow-sm hover:brightness-90 transition duration-300"
          >
            Hubungi Admin
          </Link>
        </div>
      );
    }
    
    // Jika roleId=3 (DLH)
    if (roleId === '3') {
      const registerHref = `/register?jenis=${jenisId || '1'}`; // Default ke jenis 1

      return (
        <div className="mt-8 text-sm text-center">
          <p className="text-gray-600 mb-4">Belum memiliki akun?</p>
          <Link
            href={registerHref}
            // Gunakan warna hijau baru agar konsisten
            className="inline-block bg-[#00A86B] text-white font-bold py-3 px-6 rounded-lg hover:brightness-90 transition duration-300 shadow-sm"
          >
            Daftar Sekarang
          </Link>
        </div>
      );
    }
    
    // Fallback jika roleId tidak ada
    return (
        <div className="mt-8 text-sm text-center">
          <p className="text-gray-600 mb-4">
            Silakan pilih peran Anda di <Link href="/" className="text-[#00A86B] hover:underline">halaman utama</Link>.
          </p>
        </div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-8">
      
      <div className="flex justify-center">
        <SintaFullLogo />
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-md text-center border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {!roleId && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">Pilih peran Anda di <Link href="/" className="font-bold hover:underline">halaman utama</Link> terlebih dahulu.</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Field Email */}
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan Email" required disabled={!roleId}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm disabled:bg-gray-50"
            />
          </div>

          {/* Field Password */}
          <div>
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required disabled={!roleId}
                className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm disabled:bg-gray-50"
              />
              
              {/* --- (PERBAIKAN #2) --- */}
              {/* Tambahkan div onClick untuk ikon mata */}
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // <-- Ini menggunakan setShowPassword
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </div>
              {/* --- (AKHIR PERBAIKAN #2) --- */}

            </div>
            <div className="text-right mt-2 text-sm">
              <Link href="/lupa-password" className="font-semibold text-[#00A86B] hover:underline">
                Lupa password?
              </Link>
            </div>
          </div>

          {/* Tombol Login */}
          <div>
            <button
              type="submit"
              disabled={!roleId}
              className="w-full bg-[#00A86B] text-white font-bold py-3 px-4 rounded-lg hover:brightness-90 transition duration-300 shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>
        </form>

        {/* Bagian Daftar Dinamis */}
        {renderRegisterSection()}

      </div>
    </main>
  );
}