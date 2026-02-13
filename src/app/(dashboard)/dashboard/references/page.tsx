import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import ReferenceActionMenu from '@/components/admin/ReferenceActionMenu';
import DashboardSearch from '@/components/admin/DashboardSearch';
import DashboardPagination from '@/components/admin/DashboardPagination';

export const dynamic = 'force-dynamic';

export default async function ReferencesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search?.toString() || '';
  const limit = 10;
  const skip = (page - 1) * limit;

  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' as const } },
      { role: { contains: search, mode: 'insensitive' as const } },
      { institution: { contains: search, mode: 'insensitive' as const } },
    ]
  } : {};

  const [references, total] = await Promise.all([
    prisma.reference.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        _count: {
          select: { contents: true }
        }
      }
    }),
    prisma.reference.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Referensi</h1>
          <p className="text-gray-500">Kelola referensi yang ada di referensimuslim.id</p>
        </div>
        <Link
          href="/dashboard/references/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors w-max"
        >
          <Plus className="w-4 h-4" />
          Buat Referensi Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <DashboardSearch placeholder="Cari referensi, role, atau institusi..." />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-12 text-center whitespace-nowrap">No</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-20 whitespace-nowrap">Foto</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Nama</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Role</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Institusi</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 text-center whitespace-nowrap w-24">Konten</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 text-right sticky right-0 bg-gray-50 z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {references.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    Belum ada data referensi
                  </td>
                </tr>
              ) : (
                references.map((reference, index) => (
                  <tr key={reference.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 md:px-6 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                      {skip + index + 1}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                        {reference.image ? (
                          <Image
                            src={reference.image}
                            alt={reference.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">
                            {reference.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reference.name}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{reference.role || '-'}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{reference.institution || '-'}</div>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {reference._count.contents}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-right sticky right-0 bg-white z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">
                      <ReferenceActionMenu 
                        referenceId={reference.id} 
                        name={reference.name}
                        hasContents={reference._count.contents > 0} 
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100">
            <DashboardPagination totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
