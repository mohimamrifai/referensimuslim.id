'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { NAVIGATION_ITEMS } from '@/config/navigation';

function MobileBottomNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');

  // Filter out items that are not meant for mobile bottom nav (e.g. 'Daftar Ngaji' is usually a CTA, but let's check what was there)
  // The original file had: Beranda, Artikel, Video, Podcast, Info (About)
  // Navigation items has: Beranda, Artikel, Video, Podcast, Tentang Kami, Daftar Ngaji
  // We need to map or filter to match the original design intent which had 5 items.
  // Original items: Beranda (Home), Artikel (BookOpen), Video (PlayCircle), Podcast (Headphones), Info (Info)
  
  // Let's filter the NAVIGATION_ITEMS to get the ones we want for mobile bottom nav.
  // We want: Beranda, Artikel, Video, Podcast, Tentang Kami (as Info)
  
  const mobileNavItems = NAVIGATION_ITEMS.filter(item => 
    ['Beranda', 'Artikel', 'Video', 'Podcast', 'Tentang Kami'].includes(item.name)
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
      <nav className="flex items-center justify-around h-16">
        {mobileNavItems.map((item) => {
          let isActive = false;
          // Use mobileIcon if available, otherwise fallback to icon
          const Icon = item.mobileIcon || item.icon;
          
          // Map "Tentang Kami" label to "Info" for mobile display if needed to match original exact design,
          // but keeping consistent name "Tentang Kami" or "Info" is better.
          // Original used label "Info" for /about. 
          const label = item.name === 'Tentang Kami' ? 'Info' : item.name;

          if (item.href === '/') {
            isActive = pathname === '/';
          } else if (item.href === '/about') {
            isActive = pathname === '/about';
          } else if (item.type) {
            isActive = pathname === '/search' && currentType === item.type;
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'fill-orange-600/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function MobileBottomNav() {
  return (
    <Suspense fallback={<div className="fixed bottom-0 left-0 right-0 h-16 bg-white md:hidden" />}>
      <MobileBottomNavContent />
    </Suspense>
  );
}
