// src/app/(dashboard)/pusdatin-dashboard/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
// import dynamic from 'next/dynamic'; // Hapus dynamic import untuk sementara

export default function PusdatinDashboardPage() {
  const { user } = useAuth();
  const userName = user?.name || 'Pusdatin';

  return (
    <div className="space-y-8">
      <header className="pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-blue-700">
          Dashboard Operasional, {userName}
        </h1>
        <p className="text-gray-600">
          Fokus: Pengelolaan Deadline dan Monitoring Data.
        </p>
      </header>

      {/* --- Bagian Utama Konten Pusdatin --- */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Card 1: Total Dokumen Masuk */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-medium text-gray-500">Dokumen Masuk (Total)</h2>
          <p className="text-4xl font-bold text-blue-700 mt-1">12 / 38</p>
        </div>

        {/* Card 2: Perlu Penilaian */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg font-medium text-gray-500">Perlu Penilaian</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-1">8</p>
        </div>
        
        {/* Card 3: Deadline Terdekat */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-3 text-blue-700">Deadline Aktif</h2>
          <div className="flex justify-between items-center p-3 bg-red-50 text-red-700 rounded-lg">
            <span>Penilaian Dokumen Tipe A</span>
            <span className="font-bold">2 Hari Lagi</span>
          </div>
        </div>

      </section>

      {/* Bagian Peta/Analisis */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Peta Sebaran Status Data</h2>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          [ Placeholder: Peta Interaktif Sebaran Status Penilaian ]
        </div>
      </section>
      
    </div>
  );
}