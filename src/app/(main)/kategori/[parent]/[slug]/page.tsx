import ContentCard from "@/components/ContentCard";
import Link from "next/link";
import { getCategoryDisplayNameBySlug, listItemsByCategorySlug } from "@/mockup";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ parent: string; slug: string }>;
}) {
  const { parent, slug } = await params;
  console.log('SubCategoryPage params:', { parent, slug });
  
  const parentDecoded = decodeURIComponent(parent).toLowerCase();
  const slugDecoded = decodeURIComponent(slug).toLowerCase();

  const items = listItemsByCategorySlug(slugDecoded);
  const displayName = getCategoryDisplayNameBySlug(slugDecoded);
  const parentDisplay = getCategoryDisplayNameBySlug(parentDecoded);

  console.log(`SubCategoryPage: searching for '${slugDecoded}' (raw: ${slug}), found ${items.length} items.`);

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
