"use client";

import React from 'react';
// import Link from 'next/link'; // Tidak digunakan di file ini, tapi dibiarkan jika perlu

// --- Ikon-ikon ---
const DocumentIcon = () => (
    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    </div>
);
const ClockIcon = () => <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const UploadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const DownloadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const EyeIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" /></svg>;
const ReplaceIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
const InfoIcon = () => <svg className="w-5 h-5 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;

// --- Interfaces ---
interface SlhdUploadCardProps {
    title: string;
    status: string;
}

const SlhdUploadCard = ({ title, status }: SlhdUploadCardProps) => {
    const isUploaded = status === 'File diunggah';

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <DocumentIcon />
                    <div>
                        <h3 className="font-semibold text-gray-800">{title}</h3>
                        <div className="flex items-center text-sm mt-1">
                            {isUploaded ? <CheckCircleIcon /> : <ClockIcon />}
                            <span className={isUploaded ? "text-green-600" : "text-gray-600"}>{status}</span>
                        </div>
                        <button className="flex items-center text-sm text-green-600 hover:underline mt-2">
                            <DownloadIcon /> Unduh Template
                        </button>
                    </div>
                </div>
            </div>
            {/* Tombol Aksi */}
            <div className="flex space-x-3 mt-4">
                {isUploaded ? (
                    <>
                        <button className="flex-1 flex items-center justify-center bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-300">
                            <ReplaceIcon /> Ganti File
                        </button>
                        <button className="flex-1 flex items-center justify-center bg-green-100 text-green-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-200">
                            <EyeIcon /> Lihat File
                        </button>
                    </>
                ) : (
                    <button className="flex-1 flex items-center justify-center bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                        <UploadIcon /> Unggah File
                    </button>
                )}
            </div>
        </div>
    );
};

export default function SLHDPage() {
    const cards = [
        { title: 'Buku I (Ringkasan Eksekutif/RE)', status: 'Menunggu Unggahan' },
        { title: 'Buku II (Utama)', status: 'File diunggah' },
        { title: 'Tabel Utama (Excel/SILHD)', status: 'Menunggu Unggahan' },
        { title: 'Tabel Pelengkap', status: 'Menunggu Unggahan' },
    ];
    
    const hasError = cards.some(card => card.status === 'Menunggu Unggahan');

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800">Panel Penerimaan Data</h1>
            <p className="text-lg text-gray-500 mt-1 mb-8">Unggah Dokumen SLHD</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card, index) => (
                    <SlhdUploadCard 
                        key={index}
                        title={card.title}
                        status={card.status}
                    />
                ))}
            </div>

            {hasError && (
                <div className="mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg flex items-center">
                    <InfoIcon />
                    <span>Dokumen Buku I, Tabel Utama, dan Tabel Pelengkap belum diunggah</span>
                </div>
            )}
        </div>
    );
}