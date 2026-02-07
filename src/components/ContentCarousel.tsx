'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ContentCarouselProps = {
  children: React.ReactNode;
  title: string;
  linkHref?: string;
  linkText?: string;
};

export default function ContentCarousel({ children, title, linkHref, linkText = 'Lihat Semua' }: ContentCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-1 sm:w-1.5 h-5 sm:h-6 bg-orange-600 rounded-full"></span>
            {title}
        </h2>
        {linkHref && (
             <a href={linkHref} className="text-orange-600 font-medium hover:underline text-sm">{linkText}</a>
        )}
       </div>

      <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
        <div className="flex gap-4 sm:gap-6 touch-pan-y">
          {children}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        aria-label="Sebelumnya"
        className="absolute -left-4 top-1/2 translate-y-4 hidden lg:group-hover:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 z-10 transition-opacity"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Berikutnya"
        className="absolute -right-4 top-1/2 translate-y-4 hidden lg:group-hover:flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 z-10 transition-opacity"
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}
