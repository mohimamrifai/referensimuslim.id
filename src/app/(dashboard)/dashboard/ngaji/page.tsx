import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import DashboardPagination from '@/components/admin/dashboard/DashboardPagination';
import DashboardSearch from '@/components/admin/dashboard/DashboardSearch';
import { Plus, Download } from 'lucide-react';
import NgajiActionMenu from '@/components/admin/ngaji/NgajiActionMenu';

export const dynamic = 'force-dynamic';

export default async function NgajiPage(props: {
  searchParams?: Promise<{
    page?: string;
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';
  const limit = 10;
  const skip = (page - 1) * limit;

  const where: Prisma.NgajiRegistrationWhereInput = search ? {
    OR: [
      { fullName: { contains: search, mode: 'insensitive' } },
      { whatsapp: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ]
  } : {};

  const [registrations, totalRegistrations] = await Promise.all([
    prisma.ngajiRegistration.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.ngajiRegistration.count({ where })
  ]);

  const totalPages = Math.ceil(totalRegistrations / limit);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pendaftaran Ngaji</h1>
          <p className="text-gray-500">Kelola data pendaftar ngaji</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/api/admin/ngaji/export"
            target="_blank"
            className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors w-max"
          >
            <Download className="w-4 h-4" />
            Download Excel
          </Link>
          <Link
            href="/dashboard/ngaji/create"
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors w-max"
          >
            <Plus className="w-4 h-4" />
            Tambah Pendaftar
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <DashboardSearch placeholder="Cari nama, WA, atau alamat..." />
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-12 text-center whitespace-nowrap">No</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Tanggal</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Nama Lengkap</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Jenis Kelamin</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">No. WA</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Domisili</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Usia</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 text-right sticky right-0 bg-gray-50 z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data pendaftar
                  </td>
                </tr>
              ) : (
                registrations.map((reg, index) => (
                  <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 md:px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                      {skip + index + 1}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(reg.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {reg.fullName}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-gray-600">
                      {reg.gender}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-gray-600">
                      {reg.whatsapp}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-gray-600">
                      {reg.address}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-gray-600">
                      {reg.age} Thn
                    </td>
                    <td className="px-3 md:px-6 py-4 text-right whitespace-nowrap sticky right-0 bg-white z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">
                      <div className="flex justify-end">
                        <NgajiActionMenu id={reg.id} name={reg.fullName} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <DashboardPagination totalPages={totalPages} />
      </div>
    </div>
  );
}