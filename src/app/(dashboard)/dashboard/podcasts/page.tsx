import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ContentType, ContentStatus, Prisma } from '@prisma/client';
import { Plus, Mic } from 'lucide-react';
import ArticleActionMenu from '@/components/admin/ArticleActionMenu';
import DashboardSearchFilter from '@/components/admin/DashboardSearchFilter';
import DashboardPagination from '@/components/admin/DashboardPagination';

export const dynamic = 'force-dynamic';

export default async function PodcastsPage(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    status?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';
  const status = searchParams?.status || '';
  const categoryId = searchParams?.category || '';
  const limit = 10;
  const skip = (page - 1) * limit;

  // Build where clause
  const where: Prisma.ContentWhereInput = {
    type: ContentType.PODCAST,
    ...(search && {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    }),
    ...(status && status !== 'all' && {
        status: status as ContentStatus
    }),
    ...(categoryId && categoryId !== 'all' && {
        categoryId: categoryId
    })
  };

  const [podcasts, totalPodcasts, categories] = await Promise.all([
    prisma.content.findMany({
      where,
      include: {
        category: true,
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.content.count({ where }),
    prisma.category.findMany({
        orderBy: { name: 'asc' }
    })
  ]);

  const totalPages = Math.ceil(totalPodcasts / limit);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Podcast</h1>
          <p className="text-gray-500">Kelola konten podcast yang ada di referensimuslim.id</p>
        </div>
        <Link
          href="/dashboard/podcasts/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors w-max"
        >
          <Plus className="w-4 h-4" />
          Buat Podcast Baru
        </Link>
      </div>

      <DashboardSearchFilter categories={categories} />

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-12 text-center whitespace-nowrap">No</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 w-20 whitespace-nowrap">Thumbnail</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Judul</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Kategori</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Penulis</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 whitespace-nowrap">Tanggal</th>
                <th className="px-3 md:px-6 py-4 font-semibold text-gray-700 text-right sticky right-0 bg-gray-50 z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {podcasts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 md:px-6 py-8 text-center text-gray-500">
                    Belum ada podcast. Silakan buat podcast baru.
                  </td>
                </tr>
              ) : (
                podcasts.map((podcast, index) => (
                  <tr key={podcast.id} className="group hover:bg-gray-50 transition-colors">
                    <td className="px-3 md:px-6 py-4 text-gray-500 text-center whitespace-nowrap">{index + 1}</td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200 aspect-square">
                        {podcast.image ? (
                          <Image
                            src={podcast.image}
                            alt={podcast.title}
                            fill
                            className="object-cover"
                            unoptimized={podcast.image.startsWith('/uploads') || podcast.image.startsWith('/api/view-image')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Mic className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 font-medium text-gray-900 max-w-xs truncate whitespace-nowrap" title={podcast.title}>
                      {podcast.title}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-gray-600 whitespace-nowrap">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {podcast.category.name}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-gray-600 whitespace-nowrap">{podcast.author.name}</td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                          podcast.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700'
                            : podcast.status === 'DRAFT'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {podcast.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(podcast.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-right sticky right-0 bg-white group-hover:bg-gray-50 transition-colors z-10 border-l border-gray-100 shadow-[rgba(0,0,0,0.05)_-4px_0_12px_-4px]">
                      <ArticleActionMenu 
                        articleId={podcast.id}
                        slug={podcast.slug}
                        baseUrl="/dashboard/podcasts"
                      />
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
