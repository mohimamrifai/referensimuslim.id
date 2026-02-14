import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getCategoryTree } from "@/app/actions/category";

export default async function CategoryIndexPage() {
  const categories = await getCategoryTree();

  // Sort by count descending
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kategori</h1>
        <p className="text-gray-600 text-sm">
          Telusuri konten berdasarkan kategori pilihan.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {sortedCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/kategori/${encodeURIComponent(cat.slug)}`}
            className="group w-full flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-gray-200 bg-white p-2 md:p-4 hover:border-orange-300 hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-full bg-orange-50 group-hover:bg-orange-100">
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-xs md:text-sm wrap-break-words">
                  {cat.name}
                </div>
                <div className="text-xs text-gray-500">{cat.count} konten</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
