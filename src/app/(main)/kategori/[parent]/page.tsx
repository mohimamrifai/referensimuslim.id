import ContentCard from "@/components/ContentCard";
import { getCategoryDisplayNameBySlug, listItemsByCategorySlug } from "@/mockup";

export default async function CategoryParentPage({
  params,
}: {
  params: Promise<{ parent: string }>;
}) {
  const { parent } = await params;
  const raw = parent.toLowerCase();
  const decoded = decodeURIComponent(raw);

  const items = listItemsByCategorySlug(decoded);
  const displayName = getCategoryDisplayNameBySlug(decoded);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Kategori: {displayName}
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
            Tidak ada konten ditemukan
          </h3>
          <p className="text-gray-500 max-w-md">
            Coba pilih kategori lain atau gunakan fitur pencarian.
          </p>
        </div>
      )}
    </div>
  );
}
