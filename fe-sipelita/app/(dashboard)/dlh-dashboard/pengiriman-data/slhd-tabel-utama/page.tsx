"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';

// --- Kumpulan Ikon ---
const IconKajian = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconHayati = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343m11.314 11.314a8 8 0 00-11.314-11.314m11.314 11.314L6.343 7.343" /></svg>;
const IconKualitasAir = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V6m0 0L3 10m4-4l4 4m-4-4L3 10m4-4l4 4m0 0L7 6m4 4v10m0 0L7 16m4 4l4-4m-4 4v-4m0 0l4-4m-4 4l-4-4" /></svg>;
const IconLaut = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8l4 4 4-4 4 4 4-4" /></svg>;
const IconKualitasUdara = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h18M3 18h18" /></svg>;
const IconLahan = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 18h18" /></svg>;
const IconSampah = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconIklim = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3M9 9l4 4m0 0l4-4m-4 4V3" /></svg>;
const IconBencana = () => <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const UploadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;

// --- Interfaces ---
interface CategoryCardProps {
    icon: ReactNode;
    title: string;
    status: string;
    docs: string;
    number: number;
    href: string;
}

const CategoryCard = ({ icon, title, status, docs, href }: CategoryCardProps) => {
    // Tentukan warna teks berdasarkan status
    const isPending = status === 'Pending';
    const statusColor = isPending ? 'text-yellow-600' : 'text-green-600';
    
    // Logika persentase progress bar
    const parts = docs.split('/'); 
    const current = parseInt(parts[0], 10);
    const total = parseInt(parts[1], 10); 
    let percentage = 0;
    if (!isNaN(current) && !isNaN(total) && total > 0) {
        percentage = (current / total) * 100;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    {/* Ikon dengan background hijau muda */}
                    <span className="bg-green-100 p-2 rounded-lg">{icon}</span>
                    <div className="text-right">
                        <span className={`text-xs font-semibold ${statusColor}`}>{status}</span>
                        <p className={`text-xs ${statusColor}`}>{docs}</p>
                    </div>
                </div>
                {/* Judul Kategori */}
                <h3 className="font-semibold text-gray-800 mt-4 h-12 flex items-center">{title}</h3>
                <p className="text-xs text-gray-400 mt-2">Silahkan upload dokumen untuk kategori ini</p>
            </div>
            
            <div className="p-4 pt-0">
                 <Link 
                    href={href} 
                    className="w-full flex items-center justify-center bg-green-500 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-green-600 transition-colors"
                 >
                    <UploadIcon />
                    Unggah Data
                </Link>
            </div>

            {/* Progress Bar di bagian paling bawah */}
            <div className="w-full bg-gray-200 h-1.5">
                <div 
                    className="bg-green-500 h-1.5 transition-all duration-500 ease-out" 
                    style={{ width: `${percentage}%` }} 
                ></div>
            </div>
        </div>
    );
};

export default function SLHDTabelUtamaPage() {
    
    const categories: CategoryCardProps[] = [
        { number: 1, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/1", icon: <IconHayati />, title: "Keanekaragaman Hayati", status: "Pending", docs: "2/4 Dokumen" },
        { number: 2, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/2", icon: <IconKualitasAir />, title: "Kualitas Air", status: "Pending", docs: "3/9 Dokumen" },
        { number: 3, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/3", icon: <IconLaut />, title: "Laut, Pesisir, dan Pantai", status: "Pending", docs: "4/8 Dokumen" },
        { number: 4, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/4", icon: <IconKualitasUdara />, title: "Kualitas Udara", status: "Pending", docs: "4/6 Dokumen" },
        { number: 5, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/5", icon: <IconLahan />, title: "Lahan dan Hutan", status: "Pending", docs: "7/14 Dokumen" },
        { number: 6, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/6", icon: <IconSampah />, title: "Pengelolaan Sampah dan Limbah", status: "Pending", docs: "2/5 Dokumen" },
        { number: 7, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/7", icon: <IconIklim />, title: "Perubahan Iklim", status: "Pending", docs: "3/3 Dokumen" },
        { number: 8, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/8", icon: <IconBencana />, title: "Risiko Bencana", status: "Selesai", docs: "5/5 Dokumen" },
        { number: 9, href: "/dlh-dashboard/pengiriman-data/slhd-tabel-utama/9", icon: <IconKajian />, title: "Dokumen Non Matra", status: "Lengkap", docs: "24/24 Dokumen" },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Panel Penerimaan Data</h1>
            <p className="text-gray-500 mb-8">Unggah Dokumen SLHD Tabel Utama</p>

            {/* Layout 3x3 menggunakan lg:grid-cols-3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <CategoryCard 
                        key={cat.number} 
                        icon={cat.icon}
                        title={cat.title}
                        status={cat.status}
                        docs={cat.docs}
                        number={cat.number} 
                        href={cat.href}
                    />
                ))}
            </div>
        </div>
    );
}