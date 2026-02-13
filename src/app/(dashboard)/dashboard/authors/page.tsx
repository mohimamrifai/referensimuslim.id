import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { Plus, User } from 'lucide-react';
import AuthorActionMenu from '@/components/admin/AuthorActionMenu';
import DashboardPagination from '@/components/admin/DashboardPagination';
import DashboardSearch from '@/components/admin/DashboardSearch';

export const dynamic = 'force-dynamic';

export default async function AuthorsPage(props: {
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

  const where = search ? {
    name: { contains: search, mode: 'insensitive' as const }
  } : {};

  const [authors, totalAuthors] = await Promise.all([
    prisma.author.findMany({
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
    prisma.author.count({ where })
  ]);

  const totalPages = Math.ceil(totalAuthors / limit);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Penulis</h1>
          <p className="text-gray-500">Kelola data penulis dan pemateri</p>
        </div>
        <Link
          href="/dashboard/authors/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors w-max"
        >
          <Plus className="w-4 h-4" />
          Tambah Penulis
        </Link>
      </div>

      <div className="mb-6">
        <DashboardSearch placeholder="Cari penulis..." />
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-12 text-center whitespace-nowrap">No</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-20 whitespace-nowrap">Foto</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Nama</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Role</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 text-center whitespace-nowrap">Jumlah Konten</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 text-right sticky right-0 bg-gray-50 z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {authors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data penulis
                  </td>
                </tr>
              ) : (
                authors.map((author, index) => (
                  <tr key={author.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 md:px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                      {skip + index + 1}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                        {author.image ? (
                          <Image
                            src={author.image}
                            alt={author.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{author.name}</td>
                    <td className="px-3 md:px-6 py-4 text-gray-500 whitespace-nowrap">{author.role || '-'}</td>
                    <td className="px-3 md:px-6 py-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {author._count.contents} Konten
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-right sticky right-0 bg-white z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">
                      <AuthorActionMenu 
                        authorId={author.id} 
                        name={author.name}
                        hasContents={author._count.contents > 0} 
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
