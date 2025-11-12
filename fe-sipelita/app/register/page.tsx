// src/app/register/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SintaFullLogo from '@/components/SintaFullLogo';
import { useAuth } from '@/context/AuthContext';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';

// --- TAMBAHKAN KOMPONEN IKON MATA ---
const EyeIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.625-5.06A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.268 5.768M4 12s2.943-7 8-7 8 7 8 7-2.943 7-8 7-8-7-8-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
// --- AKHIR TAMBAHAN IKON ---

// Tipe Data
interface JenisDlh { id: number; name: string; }
interface Province { id: string; name: string; }
interface Regency { id: string; name: string; }

export default function RegisterPage() {
  const { register } = useAuth();
  const searchParams = useSearchParams();

  const jenisFromUrl = searchParams.get('jenis');
  const jenisId = jenisFromUrl ? Number(jenisFromUrl) : null;

  // State Form
  const [namaDlh, setNamaDlh] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabKota, setKabKota] = useState('');
  const [pesisir, setPesisir] = useState('');
  const [email, setEmail] = useState('');
  const [nomorTelepon, setNomorTelepon] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  // State UI
  const [pageTitle, setPageTitle] = useState('Registrasi DLH');
  const [formError, setFormError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingRegencies, setIsFetchingRegencies] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State mata sandi 1
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State mata sandi 2
  
  // State Data Dropdown
  const [provincesList, setProvincesList] = useState<Province[]>([]);
  const [regenciesList, setRegenciesList] = useState<Regency[]>([]);

  // EFEK 1: Ambil Judul Halaman
  useEffect(() => {
    if (jenisId) {
      setTimeout(() => {
        setIsLoading(true);
        setApiError(null);
      }, 0);

      axios.get('/api/jenis-dlh')
        .then(res => {
          const allJenis: JenisDlh[] = res.data;
          const foundJenis = allJenis.find(j => j.id === jenisId);
          if (foundJenis) {
            setPageTitle(`Registrasi ${foundJenis.name}`);
          } else {
            setApiError("Jenis DLH tidak dikenali.");
          }
        })
        .catch(err => {
          console.error("Gagal mengambil jenis DLH:", err);
          setApiError("Gagal memuat data halaman.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setTimeout(() => {
        setApiError("Jenis DLH tidak spesifik. Silakan kembali.");
        setIsLoading(false);
      }, 0);
    }
  }, [jenisId]);

  // EFEK 2: Ambil Provinsi (Hanya sekali)
  useEffect(() => {
    axios.get('/api/provinces')
      .then(res => setProvincesList(res.data))
      .catch(err => {
        console.error("Gagal mengambil provinsi:", err);
        setApiError("Gagal memuat daftar provinsi.");
      });
  }, []);

  // EFEK 3: Ambil Kab/Kota (saat 'provinsi' berubah)
  useEffect(() => {
    if (provinsi) {
      setTimeout(() => {
        setIsFetchingRegencies(true);
        setKabKota('');
        setRegenciesList([]);
      }, 0);

      axios.get(`/api/regencies/${provinsi}`)
        .then(res => {
          setRegenciesList(res.data);
        })
        .catch(err => {
          console.error("Gagal mengambil kab/kota:", err);
          setApiError("Gagal memuat daftar kab/kota.");
        })
        .finally(() => {
          setIsFetchingRegencies(false);
        });
    } else {
      setTimeout(() => {
        setKabKota('');
        setRegenciesList([]);
      }, 0);
    }
  }, [provinsi]);

  // Handler untuk input nomor telepon (hanya angka)
  const handleNomorTeleponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setNomorTelepon(numericValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (password !== passwordConfirmation) {
      setFormError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }
    if (!jenisId) {
      setFormError("Jenis DLH tidak valid.");
      return;
    }
    if (jenisId === 2 && !kabKota) {
      setFormError("Silakan pilih Kab/Kota Anda.");
      return;
    }

    try {
      await register({
        name: namaDlh,
        email,
        nomor_telepon: nomorTelepon,
        password,
        password_confirmation: passwordConfirmation,
        role_id: 3,
        jenis_dlh_id: jenisId,
        province_id: provinsi,
        regency_id: kabKota || undefined,
        pesisir: pesisir,
      });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.data?.errors) {
          const errors = err.response.data.errors;
          const firstError = Object.values(errors)[0] as string[];
          setFormError(firstError[0] || "Data yang Anda masukkan tidak valid.");
        } else {
          setFormError(err.response?.data?.message || 'Registrasi gagal.');
        }
      } else {
        setFormError('Terjadi kesalahan yang tidak terduga.');
      }
    }
  };

  const pageError = apiError;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 px-4 space-y-8">
      
      <div className="flex justify-center">
        <SintaFullLogo />
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-xl w-full max-w-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{pageTitle}</h1>

        {pageError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{pageError}</span>
          </div>
        )}
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{formError}</span>
          </div>
        )}

        {!jenisId && !isLoading && (
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
             <span className="block sm:inline">Jenis DLH tidak spesifik. Silakan kembali ke <Link href="/" className="font-bold hover:underline">halaman utama</Link>.</span>
           </div>
        )}

        {isLoading ? (
          <div className="text-center text-gray-500">Memuat form...</div>
        ) : (
          jenisId && !apiError && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Nama DLH */}
              <div>
                <label htmlFor="namaDlh" className="block text-left text-sm font-medium text-gray-700">Nama DLH</label>
                <input type="text" id="namaDlh" value={namaDlh} onChange={(e) => setNamaDlh(e.target.value)}
                  placeholder="Masukkan Nama DLH" required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                />
              </div>

              {/* Grid 2 Kolom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Provinsi */}
                <div>
                  <label htmlFor="provinsi" className="block text-left text-sm font-medium text-gray-700">Provinsi</label>
                  <select
                    id="provinsi" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                  >
                    <option value="" disabled>-- Pilih Provinsi --</option>
                    {provincesList.map(prov => (
                      <option key={`prov-${prov.id}`} value={prov.id}>{prov.name}</option>
                    ))}
                  </select>
                </div>

                {/* Kab/Kota (Hanya tampil jika jenisId=2) */}
                {jenisId === 2 && (
                  <div>
                    <label htmlFor="kabKota" className="block text-left text-sm font-medium text-gray-700">Kab/Kota</label>
                    <select
                      id="kabKota" value={kabKota} onChange={(e) => setKabKota(e.target.value)} required
                      disabled={!provinsi || isFetchingRegencies}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm disabled:bg-gray-50"
                    >
                      <option value="" disabled>
                        {isFetchingRegencies ? "Memuat..." : (provinsi ? "-- Pilih Kab/Kota --" : "-- Pilih Provinsi Dulu --")}
                      </option>
                      {regenciesList.map(reg => (
                        <option key={`reg-${reg.id}`} value={reg.id}>{reg.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                {/* Memiliki Pesisir? */}
                <div className={jenisId === 2 ? 'md:col-span-2' : ''}>
                  <label htmlFor="pesisir" className="block text-left text-sm font-medium text-gray-700">Memiliki Pesisir?</label>
                  <select
                    id="pesisir" value={pesisir} onChange={(e) => setPesisir(e.target.value)} required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                  >
                    <option value="" disabled>-- Pilih --</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan Email" required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                />
              </div>
              
              {/* Nomor Telepon */}
              <div>
                <label htmlFor="nomorTelepon" className="block text-left text-sm font-medium text-gray-700">Nomor Telepon</label>
                <input
                  type="tel"
                  id="nomorTelepon"
                  value={nomorTelepon}
                  onChange={handleNomorTeleponChange} // Handler khusus
                  placeholder="Masukkan Nomor Telepon (hanya angka)"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    required
                    className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </div>
                </div>
              </div>

              {/* Konfirmasi Password */}
              <div>
                <label htmlFor="password_confirmation" className="block text-left text-sm font-medium text-gray-700">Konfirmasi Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Ulangi password"
                    required
                    className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#00A86B] focus:border-[#00A86B] sm:text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </div>
                </div>
              </div>

              {/* Tombol Register */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!jenisId || isLoading || isFetchingRegencies}
                  className="w-full bg-[#00A86B] text-white font-bold py-3 px-4 rounded-lg hover:brightness-90 transition duration-300 shadow-sm disabled:bg-gray-400"
                >
                  Daftar
                </button>
              </div>

              {/* Link kembali ke Login */}
              <div className="mt-6 text-sm text-center">
                <p className="text-gray-600">
                  Sudah memiliki akun?{' '}
                  <Link href={jenisId ? `/login?role=3&jenis=${jenisId}` : '/login'} className="font-semibold text-[#00A86B] hover:underline">
                    Login di sini
                  </Link>
                </p>
              </div>
            </form>
          )
        )}
      </div>
    </main>
  );
}