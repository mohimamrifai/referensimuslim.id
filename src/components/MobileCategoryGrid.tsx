import Link from "next/link";
import { BookOpen, Scale } from "lucide-react";

export default function MobileCategoryGrid() {
  return (
    <div className="md:hidden space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Kategori Ilmu</h2>
        <Link href="/kategori" className="text-sm font-semibold text-orange-700 hover:text-orange-800">
          Lihat Semua
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/kategori/aqidah" className="rounded-2xl p-5 text-white bg-linear-to-br from-blue-500 to-blue-600 shadow-sm active:scale-[0.99] transition">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-white/20 p-3">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">Aqidah</div>
              <div className="text-xs opacity-90">156 artikel</div>
            </div>
          </div>
        </Link>
        <Link href="/kategori/fiqh" className="rounded-2xl p-5 text-white bg-linear-to-br from-green-500 to-green-600 shadow-sm active:scale-[0.99] transition">
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-white/20 p-3">
              <Scale className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">Fiqh</div>
              <div className="text-xs opacity-90">243 artikel</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
