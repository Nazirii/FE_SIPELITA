// src/app/(dashboard)/admin-dashboard/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const userName = user?.name || 'Admin';

  return (
    <div className="space-y-8">
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-red-700">
          Dashboard Kontrol Utama, {userName}
        </h1>
        <p className="text-gray-600">
          Fokus: Pengelolaan User dan Pengawasan Sistem.
        </p>
      </header>

      {/* --- Bagian Utama Konten Admin --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total User Aktif */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-medium text-gray-500">Total User Aktif</h2>
          <p className="text-4xl font-bold text-red-700 mt-1">45 / 514</p>
        </div>

        {/* Card 2: Perlu Persetujuan (Register Baru) */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-medium text-gray-500">Akun Baru Menunggu</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-1">3</p>
        </div>
        
        {/* Card 3: Log Aktivitas Terakhir */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-red-700">Aktivitas Terakhir</h2>
          <ul className="text-sm space-y-2">
            <li>[09:00] DLH Bogor Logout.</li>
            <li>[08:55] User A mendaftar.</li>
            <li>[08:50] Pusdatin B login.</li>
          </ul>
        </div>
      </section>
      
      {/* Bagian Manajemen User */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-red-700">Manajemen Pengguna</h2>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          [ Placeholder: Tabel List User dengan Tombol Approve/Blokir ]
        </div>
      </section>

    </div>
  );
}