'use client';

import Link from "next/link";
import { BookOpen, Scale, Heart, GraduationCap, History, Users } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

export default function MobileCategoryGrid() {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const categories = [
    {
      name: 'Aqidah',
      count: '156 artikel',
      icon: BookOpen,
      href: '/kategori/aqidah',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Fiqh',
      count: '243 artikel',
      icon: Scale,
      href: '/kategori/fiqh',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Akhlak',
      count: '198 artikel',
      icon: Heart,
      href: '/kategori/akhlak',
      color: 'from-rose-500 to-rose-600',
    },
    {
      name: 'Al-Quran',
      count: '312 artikel',
      icon: GraduationCap,
      href: '/kategori/al-quran',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Sejarah',
      count: '89 artikel',
      icon: History,
      href: '/kategori/sejarah',
      color: 'from-amber-500 to-amber-600',
    },
    {
      name: 'Keluarga',
      count: '145 artikel',
      icon: Users,
      href: '/kategori/keluarga',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <div className="md:hidden space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-semibold text-gray-800">Kategori Ilmu</h2>
        <Link href="/kategori" className="text-sm font-semibold text-orange-700 hover:text-orange-800">
          Lihat Semua
        </Link>
      </div>
      
      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div key={index} className="flex-[0_0_40%] min-w-0">
                <Link href={cat.href} className={`block rounded-2xl p-4 text-white bg-linear-to-br ${cat.color} shadow-sm active:scale-[0.98] transition-transform h-full`}>
                  <div className="flex flex-col items-center gap-3 py-1">
                    <div className="rounded-full bg-white/20 p-2.5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <div className="text-base font-semibold leading-tight mb-0.5">{cat.name}</div>
                      <div className="text-[10px] opacity-90 font-medium">{cat.count}</div>
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
