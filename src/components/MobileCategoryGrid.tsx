'use client';

import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react';
import { CATEGORY_TAXONOMY, listItemsByCategorySlug } from "@/mockup";

export default function MobileCategoryGrid() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const uniformColor = 'from-orange-500 to-orange-600';
  const categories = CATEGORY_TAXONOMY.map((parent) => {
    const subCount = parent.children?.length ?? 0;
    const contentCount = listItemsByCategorySlug(parent.slug).length;
    return {
      name: parent.name,
      subCount,
      contentCount,
      href: `/kategori/${parent.slug}`,
      color: uniformColor,
    };
  });

  return (
    <div className="md:hidden space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-semibold text-gray-800">Kategori</h2>
        <Link href="/kategori" className="text-sm font-semibold text-orange-700 hover:text-orange-800">
          Lihat Semua
        </Link>
      </div>
      
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-3">
          {categories.map((cat, index) => {
            return (
              <div key={index} className="flex-[0_0_40%] min-w-0">
                <Link href={cat.href} className={`block rounded-xl p-3 text-white bg-linear-to-br ${cat.color} shadow-sm active:scale-[0.98] transition-transform h-full`}>
                  <div className="flex flex-col items-center gap-2 py-1">
                    <div className="text-center">
                      <div className="font-semibold leading-tight text-xs mb-0.5">{cat.name}</div>
                      <div className="text-[10px] opacity-90 font-medium">{cat.subCount} sub kategori</div>
                      <div className="text-[10px] opacity-90 font-medium">{cat.contentCount} konten</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
