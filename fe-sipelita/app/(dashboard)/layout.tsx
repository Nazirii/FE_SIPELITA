// src/app/(dashboard)/layout.tsx
"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
// TIDAK PERLU IMPORT Sidebar di sini

// Ini adalah layout "Penjaga Gerbang" dan struktur utama Dashboard (Fullscreen Content)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect ke halaman utama jika belum login
    if (!loading && !user) {
      router.push('/'); 
    }
  }, [user, loading, router]);

  // Tampilkan layar loading saat AuthContext masih mengecek
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Memverifikasi sesi Anda...
      </div>
    );
  }

  // Jika user ADA, tampilkan konten Dashboard
  if (user) {
    return (
      // Konten utama akan mengisi ruang di bawah Header yang sudah ada di Root Layout
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow p-8">
          {children} {/* Halaman spesifik (Admin, Pusdatin, DLH) */}
        </main>
        
      </div>
    );
  }

  // Jika user tidak ada (dan sedang proses redirect), tampilkan null
  return null;
}