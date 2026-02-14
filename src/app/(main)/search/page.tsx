import { prisma } from "@/lib/prisma";
import { ContentStatus, ContentType, Prisma } from "@prisma/client";
import ContentCard from "@/components/ContentCard";
import SearchFilters from "@/components/SearchFilters";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q, type } = await searchParams;
  const query = q || '';
  const filterType = type || 'all';

  const where: Prisma.ContentWhereInput = {
    status: ContentStatus.PUBLISHED,
  };

  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { category: { name: { contains: query, mode: 'insensitive' } } },
      { subcategory: { name: { contains: query, mode: 'insensitive' } } },
    ];
  }

  if (filterType !== 'all') {
    const typeMap: Record<string, ContentType> = {
      'artikel': ContentType.ARTIKEL,
      'video': ContentType.VIDEO,
      'podcast': ContentType.PODCAST,
    };
    if (typeMap[filterType]) {
      where.type = typeMap[filterType];
    }
  }

  const results = await prisma.content.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { author: true, category: true, subcategory: true },
  });

  const items = results.map(item => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    image: item.image || item.author.image || '/placeholder.jpg',
    category: item.category.name,
    subcategory: item.subcategory?.name,
    date: item.createdAt.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    author: item.author.name,
    excerpt: item.excerpt || '',
    type: item.type.toLowerCase() as 'artikel' | 'video' | 'podcast',
    duration: item.duration || item.readTime || undefined,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8 md:pl-(--sidebar-width)">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Hasil Pencarian</h1>
        
        <SearchFilters />

        <div className="text-sm text-gray-500 mb-6">
          Menampilkan {items.length} hasil untuk &quot;{query || 'semua'}&quot; {filterType !== 'all' && `di ${filterType}`}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="h-full">
              <ContentCard item={item} type={item.type} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <span className="text-gray-300 font-bold text-2xl">∅</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada konten ditemukan
          </h3>
          <p className="text-gray-500 max-w-md">
            Coba gunakan kata kunci lain atau ubah filter pencarian.
          </p>
        </div>
      )}
    </div>
  );
}
