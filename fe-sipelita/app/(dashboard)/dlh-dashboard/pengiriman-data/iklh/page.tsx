"use client";

import React, { useState } from 'react';

// --- KOMPONEN INPUT SKOR ---
interface ScoreInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

const ScoreInput = ({ label, value, onChange }: ScoreInputProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">{label}</label>
      <div className="relative">
        <input
          type="number"
          min="0"
          max="100"
          className="w-full bg-gray-100 border-none rounded-lg py-3 px-4 pr-16 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          placeholder="0-100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
          skor
        </span>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ---
export default function UnggahNilaiIKLHPage() {
  const [tahun, setTahun] = useState('2025');
  
  // State untuk nilai input
  const [scores, setScores] = useState({
    air: '',
    udara: '',
    lahan: '',
    laut: '',
    kehati: '',
  });

  const handleInputChange = (field: keyof typeof scores, value: string) => {
    setScores((prev) => ({ ...prev, [field]: value }));
  };

  // Hitung rata-rata simulasi (opsional)
  const uploadedScore = 80; 

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      
      {/* Breadcrumb */}
      <div className="text-sm text-green-600 mb-2 font-medium">
        Panel Pengiriman Data <span className="text-gray-400 mx-2">&gt;</span> <span className="text-gray-800">Unggah Nilai IKLH</span>
      </div>

      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel Penerimaan Data</h1>
          <p className="text-lg text-gray-600 mt-1">Unggah Nilai IKLH</p>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-700 mb-1">Tahun</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border border-green-500 text-gray-700 rounded-md py-2 px-4 w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="flex flex-col justify-end h-full">
             {/* Spacer label agar sejajar tombol */}
             <div className="h-5"></div>
             <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                Filter
             </button>
          </div>
        </div>
      </div>

      {/* Kartu Form Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <ScoreInput 
              label="Indeks Kualitas Air" 
              value={scores.air} 
              onChange={(val) => handleInputChange('air', val)} 
            />
            <ScoreInput 
              label="Indeks Kualitas Udara" 
              value={scores.udara} 
              onChange={(val) => handleInputChange('udara', val)} 
            />
            <ScoreInput 
              label="Indeks Kualitas Lahan" 
              value={scores.lahan} 
              onChange={(val) => handleInputChange('lahan', val)} 
            />
            <ScoreInput 
              label="Indeks Kualitas Pesisir Laut" 
              value={scores.laut} 
              onChange={(val) => handleInputChange('laut', val)} 
            />
            <div className="md:col-span-1">
                <ScoreInput 
                label="Indeks Kehati (Data tahun 2026)" 
                value={scores.kehati} 
                onChange={(val) => handleInputChange('kehati', val)} 
                />
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div className="bg-white px-8 py-6 border-t border-gray-100 flex justify-end">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm">
            Simpan Perubahan
          </button>
        </div>
      </div>

      {/* Kartu Summary / Finalisasi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-lg text-gray-800 font-medium mb-6">
          Nilai IKLH yang Diunggah: <span className="text-green-600 font-bold text-2xl ml-1">{uploadedScore}</span>
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-8 rounded-lg transition-colors shadow-sm">
          Finalisasi Nilai
        </button>
      </div>

    </div>
  );
}