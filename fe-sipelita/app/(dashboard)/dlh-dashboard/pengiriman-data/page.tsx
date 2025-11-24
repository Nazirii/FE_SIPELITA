"use client";

import React from 'react';
import Link from 'next/link';

// --- Ikon-ikon (Sama seperti sebelumnya) ---
const DocumentIcon = () => ( <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0"> <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> </div> );
const UploadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const DownloadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const CheckCircleIcon = () => <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const XCircleIcon = () => <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;

interface UploadItemProps {
    title: string;
    description: string;
    hideDownload?: boolean;
    href?: string | null;
}

interface StatusBadgeProps {
    status: string;
}

interface StatusItemProps {
    jenis: string;
    statusUpload: string;
    tanggal: string;
    status: string;
    aksi: string;
    href: string;
}

const UploadItem = ({ title, description, hideDownload = false, href = null }: UploadItemProps) => {
    const isLink = !!href;
    const buttonClasses = "flex items-center bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-green-600";

    return (
        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between border border-gray-200">
            <div className="flex items-center">
                <DocumentIcon />
                <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
            </div>
            <div className="flex space-x-3">
                {!hideDownload && (
                    <button className="flex items-center bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200 border border-gray-300">
                        <DownloadIcon />
                        Unduh Template
                    </button>
                )}
                {isLink ? (
                    <Link href={href} className={buttonClasses}>
                        <UploadIcon />
                        Unggah
                    </Link>
                ) : (
                    <button onClick={() => alert('Fungsi unggah belum dibuat')} className={buttonClasses}>
                        <UploadIcon />
                        Unggah
                    </button>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
    if (status === 'Diterima') {
        return ( <span className="flex items-center text-sm font-medium text-green-600"> <CheckCircleIcon /> Dokumen Diunggah </span> );
    }
    if (status === 'Belum Diunggah') {
        return ( <span className="flex items-center text-sm font-medium text-red-600"> <XCircleIcon /> Belum Diunggah </span> );
    }
    return <span className="text-sm text-gray-500">-</span>;
};

export default function PenerimaanDataPage() {
    
    // --- PERBAIKAN DI SINI: Hapus /dashboard jika folder 'dashboard' hanya (group) ---
    const basePath = "/dlh-dashboard/pengiriman-data"; 
    const detailPath = `${basePath}/detail`;

    const uploadItems: UploadItemProps[] = [
        { title: 'IKLH', description: 'Unggah dokumen IKLH', hideDownload: true, href: `${basePath}/iklh` },
        { title: 'SLHD', description: 'Unggah dokumen SLHD', hideDownload: true, href: `${basePath}/slhd` },
        { title: 'SLHD Tabel Utama', description: 'Unggah SLHD Tabel Utama', hideDownload: true, href: `${basePath}/slhd-tabel-utama` },
    ];

    const statusItems: StatusItemProps[] = [
        { 
            jenis: 'IKLH', 
            statusUpload: 'Diterima', 
            tanggal: '20-07-2025', 
            status: 'Diterima', 
            aksi: 'Lihat',
            href: detailPath 
        },
        { 
            jenis: 'SLHD', 
            statusUpload: 'Belum Diunggah', 
            tanggal: '22-09-2025', 
            status: '-', 
            aksi: 'Lihat',
            href: detailPath 
        },
        { 
            jenis: 'SLHD Tabel Utama', 
            statusUpload: 'Diterima', 
            tanggal: '17-12-2025', 
            status: 'Diterima', 
            aksi: 'Lihat',
            href: detailPath 
        },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Panel Pengiriman Data</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Unggah Dokumen</h2>
                <div className="space-y-4">
                    {uploadItems.map((item) => (
                        <UploadItem 
                            key={item.title} 
                            title={item.title} 
                            description={item.description} 
                            hideDownload={item.hideDownload}
                            href={item.href}
                        />
                    ))}
                </div>
                <div className="flex justify-end mt-8">
                    <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600">
                        Finalisasi
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Status Dokumen</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Dokumen</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Upload</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Upload</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {statusItems.map((item) => (
                                <tr key={item.jenis}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div className="flex items-center">
                                            <DocumentIcon />
                                            <span className="ml-3">{item.jenis}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={item.statusUpload} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <Link href={item.href} className="text-green-600 hover:text-green-800 font-medium">
                                            {item.aksi}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}