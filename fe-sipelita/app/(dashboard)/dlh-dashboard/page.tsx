"use client";

import { useAuth } from '@/context/AuthContext';

// --- KOMPONEN STATCARD ---
interface StatCardProps {
  title: string;
  value: string | number;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
  valueColor?: string;
  className?: string; 
}

function StatCard({
  title,
  value,
  bgColor = 'bg-gray-50',
  borderColor = 'border-transparent',
  titleColor = 'text-gray-500',
  valueColor = 'text-gray-800',
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`
        ${bgColor} ${borderColor} ${className}
        border rounded-lg p-4 text-center 
        h-full flex flex-col justify-center items-center
        transition-transform hover:scale-105 duration-200 shadow-sm
      `}
    >
      <div className={`text-xs mb-1 ${titleColor}`}>{title}</div>
      <div className={`text-lg font-bold ${valueColor}`}>{value}</div>
    </div>
  );
}

// --- TIPE DATA ---
interface TimelineItem {
    title: string;
    subtitle: string;
    status: 'selesai' | 'berlangsung' | 'menunggu';
}

interface ScheduleItem {
    tahap: string;
    keterangan: string;
    mulai: string;
    deadline: string;
    status: 'Selesai' | 'Sedang Berlangsung' | 'Belum Dimulai';
}

interface NotificationItem {
    type: 'pengumuman' | 'notifikasi';
    title: string;
    subtitle: string;
}

// --- KOMPONEN UI ---

// 2. Timeline Horizontal
const TimelineHorizontal = ({ items }: { items: TimelineItem[] }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-800 mb-8">Timeline Proses</h3>
            <div className="relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-0" />
                <div className="flex justify-between items-start w-full">
                    {items.map((item, index) => {
                        let iconBg = "bg-white border-2 border-gray-300 text-gray-400";
                        let iconContent = <ClockIcon />;

                        if (item.status === 'selesai') {
                            iconBg = "bg-green-100 border-2 border-green-500 text-green-600";
                            iconContent = <CheckIcon />;
                        } else if (item.status === 'berlangsung') {
                            iconBg = "bg-yellow-100 border-2 border-yellow-500 text-yellow-600";
                            iconContent = <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />;
                        } else {
                            iconBg = "bg-red-50 border-2 border-red-300 text-red-400";
                        }

                        return (
                            <div key={index} className="flex flex-col items-center relative z-10 w-1/5">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
                                    {iconContent}
                                </div>
                                <div className="mt-4 text-center">
                                    <p className={`text-sm font-bold ${item.status === 'berlangsung' ? 'text-green-600' : 'text-gray-800'}`}>
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// 3. Tabel Jadwal
const JadwalTable = ({ data }: { data: ScheduleItem[] }) => (
    <div className="flex flex-col h-full">
        <h3 className="font-bold text-lg text-gray-800 mb-4 px-1">
            Jadwal & Deadline Penilaian Nirwasita Tantra
        </h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex-1">
            <div className="w-full">
                <table className="w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-green-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[18%]">Tahap</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[27%]">Keterangan</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[15%]">Mulai</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[15%]">Deadline</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-[25%]">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 text-sm font-medium text-gray-900 align-top">{item.tahap}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 align-top whitespace-normal break-words">
                                    {item.keterangan}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-600 align-top">{item.mulai}</td>
                                <td className="px-4 py-4 text-sm text-gray-600 align-top">{item.deadline}</td>
                                <td className="px-4 py-4 align-top whitespace-nowrap">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                                        ${item.status === 'Selesai' ? 'bg-green-100 text-green-700' : 
                                          item.status === 'Sedang Berlangsung' ? 'bg-yellow-100 text-yellow-700' : 
                                          'bg-red-100 text-red-700'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// 4. Notifikasi Panel (MODIFIKASI BACKGROUND WARNA)
const NotifikasiPanel = ({ items }: { items: NotificationItem[] }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
        <h3 className="font-bold text-gray-800 mb-6">Notifikasi & Pengumuman</h3>
        <div className="space-y-4">
            {items.map((item, index) => {
                // Tentukan Style berdasarkan Tipe
                const isPengumuman = item.type === 'pengumuman';
                const containerStyle = isPengumuman 
                    ? 'bg-green-100 border-green-200'  // Hijau untuk Pengumuman
                    : 'bg-yellow-100 border-yellow-200'; // Kuning untuk Notifikasi

                return (
                    <div key={index} className={`flex items-start p-4 rounded-lg border ${containerStyle}`}>
                        <div className={`flex-shrink-0 mt-0.5 ${isPengumuman ? 'text-green-600' : 'text-yellow-600'}`}>
                            {isPengumuman ? <MegaphoneIcon /> : <BellIcon />}
                        </div>
                        <div className="ml-3 w-full">
                            <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                            <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.subtitle}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

// --- ICONS ---
const CheckIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>;
const ClockIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const MegaphoneIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>;
const BellIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>;

// --- HALAMAN UTAMA ---
export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();

    const statsData = [
        { label: 'Jumlah Dokumen Terunggah', value: '12 (20%)' },
        { label: 'Nilai Nirwasita Sleman', value: '-' },
        { label: 'Jenis DLH', value: 'Daratan' },
        { label: 'Tenggat Penerimaan Dokumen', value: '20 Desember 2025' },
    ];

    const timelineData: TimelineItem[] = [
        { title: 'Upload Dokumen', subtitle: 'Selesai', status: 'selesai' },
        { title: 'Penilaian SLHD', subtitle: 'Sedang Berlangsung', status: 'berlangsung' },
        { title: 'Penentuan Bobot', subtitle: 'Menunggu', status: 'menunggu' },
        { title: 'Validasi 1', subtitle: 'Menunggu', status: 'menunggu' },
        { title: 'Wawancara & Final', subtitle: 'Menunggu', status: 'menunggu' },
    ];

    const jadwalData: ScheduleItem[] = [
        { tahap: 'Upload Dokumen SLHD', keterangan: 'Unggah Buku I, II, dan Tabel Utama', mulai: '15 Okt 2025', deadline: '15 Nov 2025', status: 'Selesai' },
        { tahap: 'Upload Nilai IKLH', keterangan: 'Input Nilai IKLH', mulai: '15 Okt 2025', deadline: '15 Nov 2025', status: 'Selesai' },
        { tahap: 'Penilaian SLHD', keterangan: 'Proses penilaian dokumen SLHD', mulai: '21 Des 2025', deadline: '10 Jan 2026', status: 'Sedang Berlangsung' },
        { tahap: 'Penilaian Penghargaan', keterangan: 'Upload & verifikasi PUSDATIN', mulai: '11 Jan 2026', deadline: '25 Jan 2026', status: 'Belum Dimulai' },
        { tahap: 'Validasi 1', keterangan: 'Pemeriksaan kelengkapan nilai', mulai: '26 Jan 2026', deadline: '5 Feb 2026', status: 'Belum Dimulai' },
        { tahap: 'Validasi 2', keterangan: 'Cek WTP & status hukum', mulai: '6 Feb 2026', deadline: '15 Feb 2026', status: 'Belum Dimulai' },
        { tahap: 'Wawancara Final', keterangan: 'Tahap akhir verifikasi lapangan', mulai: '20 Feb 2026', deadline: '5 Mar 2026', status: 'Belum Dimulai' },
    ];

    const notifData: NotificationItem[] = [
        { type: 'pengumuman', title: 'Pengumuman', subtitle: 'Jadwal penilaian SLHD telah rilis.' },
        { type: 'notifikasi', title: 'Notifikasi', subtitle: 'Tim penilai sedang mereview dokumen Anda.' },
    ];

    if (authLoading) {
        return <div className="flex items-center justify-center min-h-[500px]">Memuat data...</div>;
    }

    return (
        <div className="space-y-8 p-2">
            <h1 className="text-3xl font-bold text-gray-900">
                Selamat Datang, {user?.name || 'DLH Sleman'}
            </h1>

            {/* Stat Cards dengan Style Biru */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard 
                        key={index} 
                        title={stat.label}
                        value={stat.value}
                        bgColor="bg-gray-50" 
                        borderColor="border-blue-300"
                        titleColor="text-blue-600"
                        valueColor="text-blue-800"
                    />
                ))}
            </div>

            {/* Timeline */}
            <div className="w-full">
                <TimelineHorizontal items={timelineData} />
            </div>

            {/* Grid Bawah: 4 Kolom (Tabel 75%, Notif 25%) */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                    <JadwalTable data={jadwalData} />
                </div>
                
                <div className="xl:col-span-1">
                    <NotifikasiPanel items={notifData} />
                </div>
            </div>
        </div>
    );
}