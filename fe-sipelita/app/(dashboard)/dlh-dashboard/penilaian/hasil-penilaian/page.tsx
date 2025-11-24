"use client";

import React, { useState, useMemo } from 'react';

// --- INTERFACES ---

interface TableItem {
    no?: number;
    rank?: number;
    komponen?: string;
    kategori?: string;
    kriteria?: string;
    namaDaerah?: string;
    jenisDLH?: string;
    bobot?: number;
    nilai?: number;
    skor?: number;
    nilaiNT?: number;
    kenaikanNT?: string;
    status?: string;
    keterangan?: string;
}

interface RekapTahapanItem {
    name: string;
    nilai?: number;
    status: string;
}

interface PageData {
    title: string;
    subtitle: string;
    status: string | null;
    statusDetail: string | null;
    totalNilai: number | string | null;
    tanggal: string | null;
    statusTabel: string | null;
    table: TableItem[];
    rekapTahapan?: RekapTahapanItem[];
}

// --- KOMPONEN BADGE ---
const StatusBadge = ({ status }: { status?: string }) => {
    let colorClasses = "bg-gray-100 text-gray-700";
    
    if (status === 'Lulus' || status === 'Selesai' || status === 'Valid') {
        colorClasses = "bg-green-100 text-green-700";
    } else if (status && status.includes('Top')) {
        colorClasses = "bg-yellow-100 text-yellow-700 font-bold px-4";
    } else if (status === 'Pending') {
        colorClasses = "bg-yellow-100 text-yellow-700";
    }
    
    return (
        <span className={`px-3 py-1 rounded-full text-xs ${colorClasses}`}>
            {status || '-'}
        </span>
    );
};

// --- DATA DUMMY UMUM ---

const dataSLHD: PageData = {
    title: "Hasil Penilaian SLHD",
    subtitle: "Penentuan Nilai SLHD Tahap 1",
    status: "Lulus",
    statusDetail: "Kabupaten Sleman Dinyatakan Lulus Penilaian SLHD",
    totalNilai: 84.5,
    tanggal: "15 Januari 2025",
    statusTabel: "Selesai",
    table: [
        { no: 1, komponen: 'Buku II', bobot: 20, nilai: 85, skor: 17.0, keterangan: 'Lulus' },
        { no: 2, komponen: 'SLHD Tabel Utama', bobot: 30, nilai: 75, skor: 22.5, keterangan: 'Lulus' },
    ],
};

const dataPenghargaan: PageData = {
    title: "Hasil Penilaian Penghargaan",
    subtitle: "Penentuan Bobot Antar Penghargaan",
    status: "Lulus",
    statusDetail: "Kabupaten Sleman Dinyatakan Lulus Penilaian Penghargaan",
    totalNilai: 82.5,
    tanggal: "20 Februari 2025",
    statusTabel: "Selesai",
    table: [
        { no: 1, kategori: 'Adipura', bobot: 35, nilai: 85, skor: 17.0, keterangan: 'Lulus' },
        { no: 2, kategori: 'Proper', bobot: 21, nilai: 75, skor: 23.0, keterangan: 'Lulus' },
        { no: 3, kategori: 'Proklim', bobot: 19, nilai: 70, skor: 25.0, keterangan: 'Lulus' },
        { no: 4, kategori: 'Adiwiyata', bobot: 15, nilai: 65, skor: 15.0, keterangan: 'Lulus' },
        { no: 5, kategori: 'Kalpataru', bobot: 10, nilai: 80, skor: 10.5, keterangan: 'Lulus' },
    ],
};

const dataValidasi1: PageData = {
    title: "Hasil Validasi 1",
    subtitle: "Validasi 1 - Rerata IKLH & Penghargaan",
    status: "Lulus",
    statusDetail: "Kabupaten Sleman dinyatakan lulus validasi 1",
    totalNilai: 77.5,
    tanggal: "05 Maret 2025",
    statusTabel: "Selesai",
    table: [
        { no: 1, kategori: 'Nilai IKLH', bobot: 50, nilai: 72.5, skor: 72.5, keterangan: 'Lulus' },
        { no: 2, kategori: 'Nilai Rata-Rata Penghargaan', bobot: 50, nilai: 82.5, skor: 82.5, keterangan: 'Lulus' },
    ],
};

const dataValidasi2: PageData = {
    title: "Hasil Validasi 2",
    subtitle: "Validasi 2 - Administratif & Kepatuhan",
    status: "Lulus",
    statusDetail: "Kabupaten Sleman dinyatakan lulus validasi 2",
    totalNilai: 'Lulus',
    tanggal: "21 Mei 2025",
    statusTabel: "Selesai",
    table: [
        { no: 1, kriteria: 'Opini WTP BPK', status: 'Lulus', keterangan: '"Laporan keuangan WTP tahun berjalan"' },
        { no: 2, kriteria: 'Dokumen Pendukung Lengkap', status: 'Lulus', keterangan: '' },
    ],
};

const dataWawancara: PageData = {
    title: "Hasil Penilaian Wawancara",
    subtitle: "Wawancara & Perhitungan Nilai Tahap Akhir (NT Final)",
    status: null,
    statusDetail: null,
    totalNilai: 78.5,
    tanggal: "16 Juni 2025",
    statusTabel: "Selesai",
    table: [
        { no: 1, komponen: 'Komunikasi', bobot: 20, nilai: 80, skor: 16.0 },
        { no: 2, komponen: 'Pengetahuan', bobot: 30, nilai: 75, skor: 22.5 },
        { no: 3, komponen: 'Pengalaman', bobot: 30, nilai: 80, skor: 40.0 },
    ],
    rekapTahapan: [
        { name: 'Nilai IKLH', nilai: 85, status: 'Lulus' },
        { name: 'Penghargaan (T2)', nilai: 90, status: 'Lulus' },
        { name: 'Validasi 1', status: 'Valid' },
        { name: 'Validasi 2', status: 'Valid' },
        { name: 'Wawancara', nilai: 78.5, status: 'Lulus' },
    ]
};

// --- DATA DUMMY KHUSUS PERINGKAT ---

const peringkatBesar: TableItem[] = [
    { rank: 1, namaDaerah: 'Kabupaten Sleman', jenisDLH: 'Kabupaten Besar', nilaiNT: 95.2, kenaikanNT: '+5.1', status: 'Top 5' },
    { rank: 2, namaDaerah: 'Kota Surabaya', jenisDLH: 'Kota Besar', nilaiNT: 94.8, kenaikanNT: '+4.2', status: 'Top 5' },
    { rank: 3, namaDaerah: 'Kabupaten Bogor', jenisDLH: 'Kabupaten Besar', nilaiNT: 93.5, kenaikanNT: '+3.8', status: 'Top 5' },
    { rank: 4, namaDaerah: 'Kota Bandung', jenisDLH: 'Kota Besar', nilaiNT: 92.1, kenaikanNT: '+2.5', status: 'Top 5' },
    { rank: 5, namaDaerah: 'Kabupaten Banyuwangi', jenisDLH: 'Kabupaten Besar', nilaiNT: 91.7, kenaikanNT: '+1.9', status: 'Top 5' },
    { rank: 6, namaDaerah: 'Kota Tangerang', jenisDLH: 'Kota Besar', nilaiNT: 90.5, kenaikanNT: '+1.2', status: 'Top 10' },
    { rank: 7, namaDaerah: 'Kabupaten Malang', jenisDLH: 'Kabupaten Besar', nilaiNT: 89.9, kenaikanNT: '+1.0', status: 'Top 10' },
    { rank: 8, namaDaerah: 'Kota Semarang', jenisDLH: 'Kota Besar', nilaiNT: 89.4, kenaikanNT: '+0.8', status: 'Top 10' },
    { rank: 9, namaDaerah: 'Kabupaten Bandung', jenisDLH: 'Kabupaten Besar', nilaiNT: 88.8, kenaikanNT: '+0.5', status: 'Top 10' },
    { rank: 10, namaDaerah: 'Kota Makassar', jenisDLH: 'Kota Besar', nilaiNT: 88.2, kenaikanNT: '+0.3', status: 'Top 10' },
];

const peringkatSedang: TableItem[] = [
    { rank: 1, namaDaerah: 'Kota Yogyakarta', jenisDLH: 'Kota Sedang', nilaiNT: 93.2, kenaikanNT: '+4.5', status: 'Top 5' },
    { rank: 2, namaDaerah: 'Kabupaten Kulon Progo', jenisDLH: 'Kabupaten Sedang', nilaiNT: 92.1, kenaikanNT: '+3.9', status: 'Top 5' },
    { rank: 3, namaDaerah: 'Kota Balikpapan', jenisDLH: 'Kota Sedang', nilaiNT: 91.5, kenaikanNT: '+3.2', status: 'Top 5' },
    { rank: 4, namaDaerah: 'Kabupaten Badung', jenisDLH: 'Kabupaten Sedang', nilaiNT: 90.8, kenaikanNT: '+2.8', status: 'Top 5' },
    { rank: 5, namaDaerah: 'Kota Surakarta', jenisDLH: 'Kota Sedang', nilaiNT: 90.1, kenaikanNT: '+2.1', status: 'Top 5' },
    { rank: 6, namaDaerah: 'Kabupaten Gianyar', jenisDLH: 'Kabupaten Sedang', nilaiNT: 89.5, kenaikanNT: '+1.8', status: 'Top 10' },
    { rank: 7, namaDaerah: 'Kota Denpasar', jenisDLH: 'Kota Sedang', nilaiNT: 89.0, kenaikanNT: '+1.5', status: 'Top 10' },
    { rank: 8, namaDaerah: 'Kabupaten Lumajang', jenisDLH: 'Kabupaten Sedang', nilaiNT: 88.6, kenaikanNT: '+1.2', status: 'Top 10' },
    { rank: 9, namaDaerah: 'Kota Bontang', jenisDLH: 'Kota Sedang', nilaiNT: 88.2, kenaikanNT: '+0.9', status: 'Top 10' },
    { rank: 10, namaDaerah: 'Kabupaten Kudus', jenisDLH: 'Kabupaten Sedang', nilaiNT: 87.9, kenaikanNT: '+0.7', status: 'Top 10' },
];

const peringkatKecil: TableItem[] = [
    { rank: 1, namaDaerah: 'Kota Magelang', jenisDLH: 'Kota Kecil', nilaiNT: 92.5, kenaikanNT: '+4.1', status: 'Top 5' },
    { rank: 2, namaDaerah: 'Kabupaten Bangli', jenisDLH: 'Kabupaten Kecil', nilaiNT: 91.8, kenaikanNT: '+3.5', status: 'Top 5' },
    { rank: 3, namaDaerah: 'Kota Sawahlunto', jenisDLH: 'Kota Kecil', nilaiNT: 90.9, kenaikanNT: '+3.0', status: 'Top 5' },
    { rank: 4, namaDaerah: 'Kabupaten Belitung Timur', jenisDLH: 'Kabupaten Kecil', nilaiNT: 90.2, kenaikanNT: '+2.6', status: 'Top 5' },
    { rank: 5, namaDaerah: 'Kota Payakumbuh', jenisDLH: 'Kota Kecil', nilaiNT: 89.7, kenaikanNT: '+2.0', status: 'Top 5' },
    { rank: 6, namaDaerah: 'Kabupaten Solok', jenisDLH: 'Kabupaten Kecil', nilaiNT: 89.1, kenaikanNT: '+1.5', status: 'Top 10' },
    { rank: 7, namaDaerah: 'Kota Salatiga', jenisDLH: 'Kota Kecil', nilaiNT: 88.8, kenaikanNT: '+1.2', status: 'Top 10' },
    { rank: 8, namaDaerah: 'Kabupaten Pacitan', jenisDLH: 'Kabupaten Kecil', nilaiNT: 88.4, kenaikanNT: '+1.0', status: 'Top 10' },
    { rank: 9, namaDaerah: 'Kota Madiun', jenisDLH: 'Kota Kecil', nilaiNT: 88.0, kenaikanNT: '+0.8', status: 'Top 10' },
    { rank: 10, namaDaerah: 'Kabupaten Dharmasraya', jenisDLH: 'Kabupaten Kecil', nilaiNT: 87.5, kenaikanNT: '+0.5', status: 'Top 10' },
];

// --- MAIN COMPONENT ---

export default function HasilPenilaianPage() {
    const [activeTab, setActiveTab] = useState('peringkat'); 

    const [filterDLH, setFilterDLH] = useState('Besar'); 
    const [filterPeringkat, setFilterPeringkat] = useState('5');

    const tabs = [
        { id: 'slhd', name: 'Penilaian SLHD' },
        { id: 'penghargaan', name: 'Penilaian Penghargaan' },
        { id: 'validasi1', name: 'Validasi 1' },
        { id: 'validasi2', name: 'Validasi 2' },
        { id: 'peringkat', name: 'Penetapan Peringkat' },
        { id: 'wawancara', name: 'Wawancara & Nilai Akhir' },
    ];

    const currentData: PageData = useMemo(() => {
        if (activeTab === 'peringkat') {
            let data: TableItem[] = [];
            
            if (filterDLH === 'Besar') data = peringkatBesar;
            else if (filterDLH === 'Sedang') data = peringkatSedang;
            else if (filterDLH === 'Kecil') data = peringkatKecil;

            if (filterPeringkat === '5') {
                data = data.slice(0, 5);
            }

            return {
                title: "Peringkat Nilai Nirwasita Tantra",
                subtitle: "Penetapan Peringkat untuk Wawancara",
                status: "Lulus",
                statusDetail: "Kabupaten Sleman dinyatakan lulus dan lanjut ke tahap Wawancara",
                totalNilai: 'Lulus',
                tanggal: null,
                statusTabel: null,
                table: data,
            };
        }

        switch (activeTab) {
            case 'slhd': return dataSLHD;
            case 'penghargaan': return dataPenghargaan;
            case 'validasi1': return dataValidasi1;
            case 'validasi2': return dataValidasi2;
            case 'wawancara': return dataWawancara;
            default: return dataSLHD;
        }
    }, [activeTab, filterDLH, filterPeringkat]);

    const getTableHeadings = () => {
        switch (activeTab) {
            case 'slhd':
            case 'wawancara':
                return { header: ['NO', 'KOMPONEN', 'BOBOT (%)', 'NILAI (0-100)', 'SKOR AKHIR', activeTab === 'slhd' ? 'KETERANGAN' : null].filter(Boolean) as string[], totalLabel: 'Total Nilai Akhir:', colSpan: 4 };
            case 'penghargaan':
            case 'validasi1':
                return { header: ['NO', 'KATEGORI PENGHARGAAN', 'BOBOT (%)', 'NILAI (0-100)', 'SKOR AKHIR', 'KETERANGAN'], totalLabel: 'Total Nilai Akhir:', colSpan: 4 };
            case 'validasi2':
                return { header: ['NO', 'KRITERIA VALIDASI', 'STATUS', 'KETERANGAN'], totalLabel: null, colSpan: 0 };
            case 'peringkat':
                return { header: ['Rank', 'Nama Daerah', 'Jenis DLH', 'Nilai NT', 'Kenaikan NT', 'Status'], totalLabel: null, colSpan: 0 };
            default:
                return { header: ['NO', 'KOMPONEN', 'BOBOT (%)', 'NILAI (0-100)', 'SKOR AKHIR', 'KETERANGAN'], totalLabel: 'Total Nilai Akhir:', colSpan: 4 };
        }
    };

    const { header: tableHeadings, totalLabel, colSpan } = getTableHeadings();
    
    const totalNilaiDisplay = typeof currentData.totalNilai === 'number' 
        ? currentData.totalNilai.toFixed(1) 
        : currentData.totalNilai;

    return (
        <div className="max-w-7xl mx-auto p-2">
            
            <div className="text-sm text-green-600 mb-2 font-medium">
                Penilaian <span className="text-gray-400 mx-2">&gt;</span> <span className="text-gray-600">{currentData.title.replace('Hasil ','').replace('Nilai ','')}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">{currentData.title}</h1>
                    <p className="text-lg text-gray-500 mt-1">{currentData.subtitle}</p>
                </div>
                
                {activeTab !== 'peringkat' && currentData.status && (
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4 md:mt-0 text-right">
                        <p className="text-sm font-medium text-gray-500">Status {currentData.title.replace('Hasil Penilaian ', '').replace('Peringkat Nilai ', '')}:</p>
                        <p className="text-2xl font-bold text-green-600">{currentData.status}</p>
                        <p className="text-xs text-gray-400 mt-1">{currentData.statusDetail}</p>
                    </div>
                )}
            </div>

            <div className="mb-8">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-base ${
                                    activeTab === tab.id
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-black hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* FILTER SECTION */}
            {activeTab === 'peringkat' && (
                <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
                    <div className="w-full md:w-auto">
                        <label className="block text-xs font-bold text-gray-700 mb-1">Jenis DLH Kabupaten/Kota</label>
                        <select 
                            value={filterDLH}
                            onChange={(e) => setFilterDLH(e.target.value)}
                            className="block w-full md:w-64 p-2.5 bg-white border border-green-500 text-gray-600 text-sm rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="Besar">Kabupaten/Kota Besar</option>
                            <option value="Sedang">Kabupaten/Kota Sedang</option>
                            <option value="Kecil">Kabupaten/Kota Kecil</option>
                        </select>
                    </div>
                    <div className="w-full md:w-auto">
                        <label className="block text-xs font-bold text-gray-700 mb-1">Jenis Peringkat</label>
                        <select 
                            value={filterPeringkat}
                            onChange={(e) => setFilterPeringkat(e.target.value)}
                            className="block w-full md:w-64 p-2.5 bg-white border border-green-500 text-gray-600 text-sm rounded-md focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="5">5 Besar</option>
                            <option value="10">10 Besar</option>
                        </select>
                    </div>
                    <button className="w-full md:w-auto px-8 py-2.5 bg-green-600 text-white font-medium text-sm rounded-md hover:bg-green-700 transition-colors">
                        Filter
                    </button>
                </div>
            )}

            {/* KARTU UTAMA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {activeTab === 'peringkat' ? (
                    <div className="p-6 pb-0">
                        <h2 className="text-xl font-bold text-gray-900">Tabel Peringkat</h2>
                    </div>
                ) : (
                    <div className="p-6 pb-0 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {activeTab === 'wawancara' ? 'Penilaian Wawancara' : currentData.title.replace('Hasil Penilaian ', '').replace('Hasil ', '')}
                            </h2>
                            {currentData.tanggal && <p className="text-sm text-gray-500 mt-1">Tanggal penilaian: {currentData.tanggal}</p>}
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto p-6">
                    {/* TABEL DENGAN HEADER HIJAU DAN ROUNDED CORNERS */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-100 border-b border-green-200">
                                <tr>
                                    {tableHeadings.map((head, index) => (
                                        <th key={index} className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentData.table.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        {activeTab === 'peringkat' ? (
                                            <React.Fragment>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-900 font-bold flex items-center">
                                                    <div className="w-8 flex justify-center">
                                                        {item.rank === 1 && <span className="text-xl text-yellow-500">🏆</span>}
                                                        {item.rank === 2 && <span className="text-xl text-gray-400">🏆</span>}
                                                        {item.rank === 3 && <span className="text-xl text-amber-700">🏆</span>}
                                                    </div>
                                                    <span className="ml-2">{item.rank}</span>
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                                                    {item.namaDaerah}
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                                    {item.jenisDLH}
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                                                    {item.nilaiNT}
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-600">
                                                    {item.kenaikanNT}
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap">
                                                    <StatusBadge status={item.status} />
                                                </td>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.no}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.komponen || item.kategori || item.kriteria}
                                                </td>
                                                {activeTab !== 'validasi2' && (
                                                    <>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bobot}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nilai}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.skor}</td>
                                                    </>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={item.status || item.keterangan} />
                                                </td>
                                                {activeTab === 'validasi2' && (
                                                    <td className="px-6 py-4 text-sm text-gray-500 italic">{item.keterangan}</td>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                            
                            {totalLabel && (
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td colSpan={colSpan} className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase">
                                            {totalLabel}
                                        </td>
                                        <td className="px-6 py-4 text-left text-lg font-bold text-gray-900" colSpan={2}>
                                            {totalNilaiDisplay}
                                        </td>
                                    </tr>
                                </tfoot>
                            )}
                        </table>
                    </div>
                </div>
                
                {activeTab === 'wawancara' && dataWawancara.rekapTahapan && (
                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rekap Nilai Tahapan Sebelumnya</h2>
                        <div className="flex flex-wrap gap-4">
                            {dataWawancara.rekapTahapan.map((rekap, index) => (
                                <div key={index} className="bg-white border border-green-100 p-4 rounded-lg text-center shadow-sm flex-1 min-w-[120px]">
                                    <p className="text-xs font-bold text-green-600 uppercase mb-1">{rekap.name}</p>
                                    <p className="text-xl font-bold text-gray-800">
                                        {rekap.nilai || rekap.status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {activeTab === 'peringkat' && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Status Akhir Penetapan Peringkat: <span className="text-green-600">Lulus</span>
                    </h3>
                    <p className="text-gray-500 mt-1">
                        {currentData.statusDetail}
                    </p>
                </div>
            )}
        </div>
    );
}