import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ContentType, ContentStatus, Prisma } from '@prisma/client';
import { Plus } from 'lucide-react';
import ArticleActionMenu from '@/components/admin/ArticleActionMenu';
import DashboardSearchFilter from '@/components/admin/DashboardSearchFilter';
import DashboardPagination from '@/components/admin/DashboardPagination';

export const dynamic = 'force-dynamic';

export default async function ArticlesPage(props: {
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
    type: ContentType.ARTIKEL,
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

  const [articles, totalArticles, categories] = await Promise.all([
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

  const totalPages = Math.ceil(totalArticles / limit);

  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Artikel</h1>
          <p className="text-gray-500">Kelola semua artikel yang ada di referensimuslim.id</p>
        </div>
        <Link
          href="/dashboard/post/create"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Buat Artikel Baru
        </Link>
      </div>

      <DashboardSearchFilter categories={categories} />

      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700 w-12 text-center">No</th>
                <th className="px-6 py-4 font-semibold text-gray-700 w-20">Gambar</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Judul</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Penulis</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-700">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Belum ada artikel. Silakan buat artikel baru.
                  </td>
                </tr>
              ) : (
                articles.map((article, index) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 text-center">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200 aspect-square">
                        {article.image ? (
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            unoptimized={article.image.startsWith('/uploads') || article.image.startsWith('/api/view-image')}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">No Img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate" title={article.title}>
                      {article.title}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {article.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{article.author.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                          article.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700'
                            : article.status === 'DRAFT'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ArticleActionMenu 
                        articleId={article.id}
                        slug={article.slug}
                        categorySlug={article.category.slug}
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
