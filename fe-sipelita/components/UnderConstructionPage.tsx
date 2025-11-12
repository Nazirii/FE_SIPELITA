// src/components/UnderConstructionPage.tsx
"use client"; // <-- 1. WAJIB ditambahkan

import { useRouter } from 'next/navigation'; // <-- 2. Impor useRouter
import SintaFullLogo from '@/components/SintaFullLogo';

// 3. Hapus props tombol
interface Props {
  title: string;
  message: string;
}

// Ini adalah komponen Halaman Penuh (Layout + Card)
export default function UnderConstructionPage({ 
  title, 
  message, 
}: Props) { // <-- 4. Hapus props tombol
  
  const router = useRouter(); // <-- 5. Panggil hook

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-8">
      {/* Logo di luar card */}
      <div className="flex justify-center">
        <SintaFullLogo />
      </div>

      {/* Card */}
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-md text-center border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{title}</h1>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>

        {/* 6. Ganti <Link> menjadi <button> */}
        <button 
          type="button"
          onClick={() => router.back()} // <-- 7. Fungsi untuk kembali
          className="block w-full bg-[#00A86B] text-white font-bold py-3 px-4 rounded-lg hover:brightness-90 transition duration-300 shadow-sm"
        >
          Kembali {/* <-- 8. Teks statis */}
        </button>
      </div>
    </main>
  );
}