"use client";

import React from 'react';
// import Link from 'next/link'; // Tidak digunakan jika hanya tombol download

// --- Ikon-ikon ---
const IconFolder = () => (
    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    </div>
);

const IconFile = () => (
    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    </div>
);

const DownloadIcon = () => (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

// --- Interface ---
interface TemplateItemProps {
    title: string;
    description: string;
    isFolder?: boolean; // Untuk membedakan icon Folder vs File
    isZip?: boolean;    // Untuk tombol "Unduh ZIP"
}

// --- Komponen Item Template ---
const TemplateItem = ({ title, description, isFolder = false, isZip = false }: TemplateItemProps) => {
    return (
        <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-4">
                {isFolder ? <IconFolder /> : <IconFile />}
                <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{description}</p>
                </div>
            </div>
            
            <button 
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-colors
                    ${isZip 
                        ? 'bg-green-600 text-white hover:bg-green-700' // Tombol Hijau Gelap (ZIP)
                        : 'bg-green-500 text-white hover:bg-green-600' // Tombol Hijau Standar
                    }`}
            >
                <DownloadIcon />
                {isZip ? 'Unduh ZIP' : 'Unduh'}
            </button>
        </div>
    );
};

export default function UnduhTemplatePage() {
    
    // Data Dummy sesuai gambar
    const templates = [
        { title: "Unduh Semua Template", description: "Satu folder ZIP berisi semua template dokumen SLHD Tabel Utama.", isFolder: true, isZip: true },
        { title: "Keanekaragaman Hayati", description: ".zip (excel)", isFolder: false },
        { title: "Kualitas Air", description: ".zip (excel)", isFolder: false },
        { title: "Laut, Pesisir, dan Pantai", description: ".zip (excel)", isFolder: false },
        { title: "Kualitas Udara", description: ".zip (excel)", isFolder: false },
        { title: "Lahan dan Hutan", description: ".zip (excel)", isFolder: false },
        { title: "Pengelolaan Sampah dan Limbah", description: ".zip (excel)", isFolder: false },
        { title: "Perubahan Iklim", description: ".zip (excel)", isFolder: false },
        { title: "Risiko Bencana", description: ".zip (excel)", isFolder: false },
        { title: "Dokumen Non Matra", description: ".zip (excel)", isFolder: false },
    ];

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            {/* Breadcrumb (Opsional, disesuaikan dengan layout Anda) */}
            <div className="text-sm text-green-600 mb-2 font-medium">
                Panel Pengiriman Data <span className="text-gray-400 mx-2">&gt;</span> <span className="text-gray-600">Unduh Template Dokumen</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Unduh Template Dokumen</h1>
            <p className="text-gray-500 mb-8 text-sm">
                Silahkan unduh format template dokumen penilaian yang sesuai dengan tahapan Nirwasita Tantra
            </p>

            {/* Card Utama */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header Card */}
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                    <h2 className="text-sm font-bold text-green-600 flex items-center gap-2">
                        <span className="w-1 h-4 bg-green-600 rounded-full inline-block"></span>
                        SLHD Tabel Utama
                    </h2>
                </div>

                {/* List Template */}
                <div className="px-6">
                    {templates.map((item, index) => (
                        <TemplateItem 
                            key={index}
                            title={item.title}
                            description={item.description}
                            isFolder={item.isFolder}
                            isZip={item.isZip}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}