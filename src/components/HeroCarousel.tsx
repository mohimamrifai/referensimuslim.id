 'use client';
 
 import Image from 'next/image';
 import Link from 'next/link';
 import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EmblaCarouselType } from 'embla-carousel';
import { HOME_ARTICLES } from '@/mockup';

type Slide = {
   title: string;
   excerpt: string;
   category: string;
   author: string;
   date: string;
   image: string;
   href: string;
 };
 
 const slides: Slide[] = HOME_ARTICLES.map((item) => ({
   title: item.title,
   excerpt: item.excerpt ?? '',
   category: item.category,
   author: item.author ?? 'Tim Redaksi',
   date: item.date,
   image: item.image,
   href: `/${item.slug}`,
 }));
 
 export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);
 
  return (
    <div className="relative w-full md:max-w-6xl md:ml-auto">
       <div className="overflow-hidden rounded-2xl border border-gray-200" ref={emblaRef}>
         <div className="flex">
           {slides.map((item, idx) => (
             <div className="min-w-0 flex-[0_0_100%] relative" key={idx}>
               <div className="relative aspect-video sm:aspect-auto sm:h-120 md:h-136">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 flex flex-col justify-end h-full">
                  <div className="mb-2">
                    <span className="inline-flex items-center rounded-full bg-orange-600/90 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-bold leading-tight line-clamp-2 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 mb-3 hidden sm:block">
                    {item.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-300 text-[10px] sm:text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                      {item.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                      {item.date}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 rounded-md bg-white text-gray-900 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Baca Artikel
                    </Link>
                  </div>
                </div>
              </div>
             </div>
           ))}
         </div>
       </div>
 
       <button
        onClick={scrollPrev}
        aria-label="Sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'w-6 bg-orange-600' : 'w-2 bg-white/50'
            }`}
            aria-label={`Lihat slide ${index + 1}`}
          />
        ))}
      </div>
     </div>
   );
 }
