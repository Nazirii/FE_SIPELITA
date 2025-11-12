// src/app/(dashboard)/dlh-dashboard/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";

export default function DlhDashboardPage() {
  const { user } = useAuth();
  const userName = user?.name || 'Pengguna DLH';
  const jenisDlh = user?.jenisDlh?.name || 'Tipe Umum';

  return (
    <div className="space-y-8">
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-[#005952]">
          Selamat Datang, {userName}!
        </h1>
        <p className="text-gray-600">
          Anda login sebagai **{jenisDlh}** ({user?.role.name}).
        </p>
      </header>

      {/* --- Bagian Utama Konten DLH --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Status Dokumen Terakhir */}
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-[#005952]">Status Dokumen</h2>
          <p className="text-gray-500">Periode 2025: Belum Diunggah</p>
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            Deadline Penilaian: 15 Okt 2025
          </div>
        </div>

        {/* Card 2: Grafik Sisa Waktu */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-[#005952]">Timeline Proyek</h2>
          <div className="h-40 flex items-center justify-center bg-gray-50 rounded-lg">
            [ Placeholder: Grafik Timeline/Sisa Waktu ]
          </div>
        </div>

      </section>

      {/* Bagian Peta/Analisis */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#005952]">Tabel Rekap Penilaian</h2>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          [ Placeholder: Tabel Hasil Penilaian dan Rekap Kab/Kota ]
        </div>
      </section>

    </div>
  );
}