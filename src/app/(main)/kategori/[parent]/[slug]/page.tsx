import ContentCard from "@/components/ContentCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ parent: string; slug: string }>;
}) {
  const { parent, slug } = await params;
  
  const parentDecoded = decodeURIComponent(parent).toLowerCase();
  const slugDecoded = decodeURIComponent(slug).toLowerCase();

  const category = await prisma.category.findUnique({
    where: { slug: slugDecoded },
    include: {
      parent: true,
      subContents: {
        where: { status: ContentStatus.PUBLISHED },
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
          category: true,
          subcategory: true,
        }
      }
    }
  });

  if (!category) {
    notFound();
  }

  const items = category.subContents.map(item => ({
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

  const displayName = category.name;
  const parentDisplay = category.parent?.name || parentDecoded;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8">
      <nav className="flex flex-wrap items-center text-sm text-gray-500 mb-6 whitespace-normal pb-2">
        <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href="/kategori" className="hover:text-orange-600 transition-colors">Kategori</Link>
        <span className="mx-2">/</span>
        <Link href={`/kategori/${parent}`} className="hover:text-orange-600 transition-colors capitalize">{parentDisplay}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{displayName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {parentDisplay} · {displayName}
        </h1>
        <p className="text-gray-600 text-sm">
          Menampilkan {items.length} konten.
        </p>
      </div>

      {items.length > 0 ? (
        <>
          {/* Mobile View */}
          <div className="md:hidden flex flex-col">
            {items.map((item) => (
              <ContentCard key={item.id} item={item} type={item.type} variant="list" />
            ))}
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="h-full">
                <ContentCard item={item} type={item.type} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <span className="text-gray-300 font-bold text-2xl">∅</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada konten ditemukan untuk &quot;{displayName}&quot;
          </h3>
          <p className="text-gray-500 max-w-md">
            Kami tidak menemukan konten dengan kategori &quot;{slugDecoded}&quot;. Coba pilih subkategori lain atau gunakan fitur pencarian.
          </p>
        </div>
      )}
    </div>
  );
}
