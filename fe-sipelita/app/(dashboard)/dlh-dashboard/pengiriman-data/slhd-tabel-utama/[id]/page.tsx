"use client";

import React, { use } from 'react'; // <--- TAMBAHKAN IMPORT 'use'
import Link from 'next/link';

// --- Ikon-ikon ---
const ClockIcon = () => <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg className="w-4 h-4 mr-1.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const UploadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const DownloadIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const EyeIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" /></svg>;
const ReplaceIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;

// --- Interfaces ---
interface TableItemProps {
    title: string;
    status: string;
}

// --- DATA SOURCE ---
const DATA_TABLES: Record<string, { title: string; tables: { id: string; title: string }[] }> = {
    '1': {
        title: "Keanekaragaman Hayati",
        tables: [
            { id: '9', title: 'Tabel 9. Data Taman Kehati' },
            { id: '10', title: 'Tabel 10. Keadaan Flora dan Fauna' },
            { id: '11', title: 'Tabel 11. Penangkaran Satwa dan Tumbuhan Liar' },
            { id: '12', title: 'Tabel 12. Perdagangan Satwa dan Tumbuhan' },
        ]
    },
    '2': {
        title: "Kualitas Air",
        tables: [
            { id: '13', title: 'Tabel 13. Indeks Kualitas Air (IKA)' },
            { id: '14', title: 'Tabel 14. Kualitas Air Sumur' },
            { id: '15', title: 'Tabel 15. Curah Hujan Rata-rata Bulanan' },
            { id: '16', title: 'Tabel 16. Jumlah Rumah Tangga dan Sumber Daya Air Minum' },
            { id: '17', title: 'Tabel 17. Kualitas Air Hujan' },
            { id: '18', title: 'Tabel 18. Kondisi Sungai' },
            { id: '19', title: 'Tabel 19. Kondisi Danau/Waduk/Situ/Embung' },
            { id: '20', title: 'Tabel 20. Kualitas Air Sungai' },
            { id: '21', title: 'Tabel 21. Kualitas Air Danau/Waduk/Situ/Embung' },
        ]
    },
    '3': {
        title: "Laut, Pesisir, dan Pantai",
        tables: [
            { id: '22', title: 'Tabel 22. Indeks Kualitas Ekosistem Gambut (IKEG)' },
            { id: '23', title: 'Tabel 23. Luas dan Kerusakan Lahan Gambut' },
            { id: '24', title: 'Tabel 24. Luas dan Kerapatan Tutupan Mangrove' },
            { id: '25', title: 'Tabel 25. Luas dan Kerusakan Padang Lamun' },
            { id: '26', title: 'Tabel 26. Luas Tutupan dan Kondisi Terumbu Karang' },
            { id: '27', title: 'Tabel 27. Indeks Kualitas Air Laut (IKAL)' },
            { id: '28', title: 'Tabel 28. Penanganan Sampah Laut (PSL): Kelimpahan Mikroplastik di Permukaan Air Laut & Sedimen Pantai' },
            { id: '29', title: 'Tabel 29. Penanganan Sampah Laut (PSL): Berat Sampah (g/m²)' },
        ]
    },
    '4': {
        title: "Kualitas Udara",
        tables: [
            { id: '30', title: 'Tabel 30. Indeks Kualitas Udara (IKU)' },
            { id: '31', title: 'Tabel 31. Suhu Udara Rata-rata Bulanan' },
            { id: '32', title: 'Tabel 32. Kualitas Udara Ambien' },
            { id: '33', title: 'Tabel 33. Penggunaan Bahan Bakar Industri dan Rumah Tangga' },
            { id: '34', title: 'Tabel 34. Jumlah Kendaraan Bermotor dan Jenis Bahan Bakar yang digunakan' },
            { id: '35', title: 'Tabel 35. Perubahan Penambahan Ruas Jalan' },
        ]
    },
    '5': {
        title: "Lahan dan Hutan",
        tables: [
            { id: '36', title: 'Tabel 36. Tren IKTL (Indeks Kinerja Tutupan Lahan)' },
            { id: '37', title: 'Tabel 37. Luas Kawasan Lindung Berdasarkan RTRW dan Tutupan Lahannya' },
            { id: '38', title: 'Tabel 38. Luas Wilayah Menurut Penggunaan Lahan Utama' },
            { id: '39', title: 'Tabel 39. Luas Hutan Berdasarkan Fungsi dan Status' },
            { id: '40', title: 'Tabel 40. Luas Lahan Kritis di Dalam dan Luar Kawasan Hutan' },
            { id: '41', title: 'Tabel 41. Evaluasi Kerusakan Tanah di Lahan Kering Akibat Erosi Air' },
            { id: '42', title: 'Tabel 42. Evaluasi Kerusakan Tanah di Lahan Kering' },
            { id: '43', title: 'Tabel 43. Evaluasi Kerusakan Tanah di Lahan Basah' },
            { id: '44', title: 'Tabel 44. Luas Perubahan Penggunaan Lahan Pertanian' },
            { id: '45', title: 'Tabel 45. Jenis Pemanfaatan Lahan' },
            { id: '46', title: 'Tabel 46. Luas Areal dan Produksi Pertambangan Menurut Jenis Bahan Galian' },
            { id: '47', title: 'Tabel 47. Realisasi Kegiatan Penghijauan dan Reboisasi' },
            { id: '48', title: 'Tabel 48. Jumlah dan Produksi Pemanfaatan Hasil Hutan Kayu' },
            { id: '49', title: 'Tabel 49. Tren IKL (Indeks Kualitas Lahan)' },
        ]
    },
    '6': {
        title: "Pengelolaan Sampah dan Limbah",
        tables: [
            { id: '50', title: 'Tabel 50. Indeks Kinerja Pengelolaan Sampah (IKPS)' },
            { id: '51', title: 'Tabel 51. Jumlah Limbah Padat dan Cair berdasarkan Sumber Pencemaran' },
            { id: '52', title: 'Tabel 52. Jumlah Rumah Tangga dan Fasilitas Tempat Buang Air Besar' },
            { id: '53', title: 'Tabel 53. Perusahaan yang Mendapat Izin Mengelola B3' },
            { id: '54', title: 'Tabel 54. Data Capaian Pengurangan dan Daur Ulang Sampah' },
        ]
    },
    '7': {
        title: "Perubahan Iklim",
        tables: [
            { id: '55', title: 'Tabel 55. Jumlah Desa Berdasarkan Kerentanan Perubahan Iklim' },
            { id: '56', title: 'Tabel 56. Jumlah Penduduk Laki-laki dan Perempuan Menurut Tingkatan Pendidikan' },
            { id: '57', title: 'Tabel 57. Status Pengaduan Masyarakat Bidang Lingkungan' },
        ]
    },
    '8': {
        title: "Risiko Bencana",
        tables: [
            { id: '58', title: 'Tabel 58. Indeks Risiko Bencana (IRB)' },
            { id: '59', title: 'Tabel 59. Jenis Penyakit Utama yang Diderita Penduduk' },
            { id: '60', title: 'Tabel 60. Jumlah Rumah Tangga Miskin' },
            { id: '61', title: 'Tabel 61. Kebencanaan' },
            { id: '62', title: 'Tabel 62. Luas Wilayah, Jumlah Penduduk, Pertumbuhan Penduduk' },
        ]
    },
    '9': {
        title: "Dokumen Non Matra",
        tables: [
            { id: '1', title: 'Tabel 1. Jumlah Pemanfaatan Pelayanan Laboratorium (Terakreditasi ISO/IEC 17025:2017)' },
            { id: '2', title: 'Tabel 2. Ambang Batas D3TLH berdasar Sumber Daya Air, Lahan, dan Laut' },
            { id: '3', title: 'Tabel 3. Jumlah Kajian Lingkungan Hidup Strategis (KLHS) yang Tervalidasi' },
            { id: '4', title: 'Tabel 4. Jumlah Kategori Produk Barang dan Jasa Ramah Lingkungan yang Teregistrasi' },
            { id: '5', title: 'Tabel 5. Jumlah Produk Ekolabel Indonesia Tipe I yang Teregistrasi' },
            { id: '6', title: 'Tabel 6. Jumlah Produk Ekolabel Indonesia Tipe II yang Teregistrasi' },
            { id: '7', title: 'Tabel 7. Jumlah dokumen penerapan label ramah lingkungan' },
            { id: '8', title: 'Tabel 8. Jumlah produk ramah lingkungan yang teregister dan masuk dalam pengadaan' },
            { id: '63', title: 'Tabel 63. Peraturan Daerah Rencana Perlindungan dan Pengelolaan Lingkungan Hidup (RPPLH)' },
            { id: '64', title: 'Tabel 64. Jumlah Ijin Usaha Pemanfaatan Jasa Lingkungan dan Wisata Alam' },
            { id: '65', title: 'Tabel 65. Dokumen Izin Lingkungan' },
            { id: '66', title: 'Tabel 66. Pengawasan Izin Lingkungan (AMDAL, UKL/UPL, Surat Pernyataan)' },
            { id: '67', title: 'Tabel 67. Kegiatan Fisik Lainnya oleh Instansi' },
            { id: '68', title: 'Tabel 68. Jumlah Lembaga Swadaya Masyarakat (LSM) Lingkungan Hidup' },
            { id: '69', title: 'Tabel 69. Jumlah Personil Lembaga Pengelola Lingkungan Hidup' },
            { id: '70', title: 'Tabel 70. Jumlah Staf Fungsional Bidang Lingkungan dan Staf yang telah mengikuti Diklat' },
            { id: '71', title: 'Tabel 71. Penerima Penghargaan Lingkungan Hidup' },
            { id: '72', title: 'Tabel 72. Kegiatan/Program yang Diinisiasi Masyarakat' },
            { id: '73', title: 'Tabel 73. Produk Domestik Bruto atas Dasar Harga Berlaku' },
            { id: '74', title: 'Tabel 74. Produk Domestik Bruto atas Dasar Harga Konstan' },
            { id: '75', title: 'Tabel 75. Produk Hukum Bidang Pengelolaan Lingkungan Hidup dan Kehutanan' },
            { id: '76', title: 'Tabel 76. Anggaran Pengelolaan Lingkungan Hidup di Daerah' },
            { id: '77', title: 'Tabel 77. Pendapatan Asli Daerah' },
            { id: '78', title: 'Tabel 78. Inovasi Pengelolaan Lingkungan Hidup Daerah' },
        ]
    }
};

// Komponen untuk satu baris tabel data
const TableItem = ({ title, status }: TableItemProps) => {
    const isUploaded = status === 'Berhasil di-upload';

    return (
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between border border-gray-200">
            {/* Kiri: Judul dan Status */}
            <div className="mb-4 md:mb-0">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <div className="flex items-center text-sm mt-1">
                    {isUploaded ? <CheckCircleIcon /> : <ClockIcon />}
                    <span className={isUploaded ? "text-green-600" : "text-gray-600"}>{status}</span>
                </div>
                <button className="flex items-center text-sm text-green-600 hover:underline mt-2">
                    <DownloadIcon /> Unduh Template
                </button>
            </div>
            {/* Kanan: Tombol Aksi */}
            <div className="flex space-x-3">
                {isUploaded ? (
                    <>
                        <button className="flex items-center bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200 border border-gray-300">
                            <ReplaceIcon /> Ganti
                        </button>
                        <button className="flex items-center bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-200 border border-gray-300">
                            <EyeIcon /> Lihat
                        </button>
                    </>
                ) : (
                    <button className="flex items-center bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                        <UploadIcon /> Unggah
                    </button>
                )}
            </div>
        </div>
    );
};

// --- PERBAIKAN DI SINI ---
// params sekarang Promise, jadi harus di-unwrap menggunakan hook 'use'
export default function DetailKategoriPage({ params }: { params: Promise<{ id: string }> }) {
    
    // Unwrap params dengan React.use()
    const { id } = use(params);

    // Ambil data berdasarkan ID yang sudah di-unwrap
    const categoryData = DATA_TABLES[id];

    // Jika ID tidak ditemukan, tampilkan state kosong atau default
    if (!categoryData) {
        return <div className="p-8 text-center text-gray-500">Kategori tidak ditemukan.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800">Panel Penerimaan Data</h1>
            <p className="text-lg text-gray-500 mt-1 mb-8">Unggah Dokumen - {categoryData.title}</p>

            {/* Kotak luar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">{categoryData.title}</h2>

                <div className="space-y-4">
                    {categoryData.tables.map((table) => (
                        <TableItem 
                            key={table.id} 
                            title={table.title} 
                            // Simulasi status random untuk demo, atau set default 'Menunggu Upload'
                            status={'Menunggu Upload'} 
                        />
                    ))}
                </div>

                {/* Navigasi Paginasi (dummy) */}
                <nav className="flex items-center justify-center mt-8">
                    <span className="relative z-10 inline-flex items-center bg-green-500 text-white text-sm font-medium px-4 py-2">
                        1
                    </span>
                </nav>
            </div>
            
            <div className="flex justify-end mt-8">
                <Link href="/dashboard/penerimaan-data/slhd-tabel-utama">
                    <button className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600">
                        Kembali ke Menu
                    </button>
                </Link>
            </div>
        </div>
    );
}