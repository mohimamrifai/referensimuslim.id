'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, PlayCircle, Headphones, Info, BookOpen } from 'lucide-react';
import { Suspense } from 'react';

function MobileBottomNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');

  const navItems = [
    {
      label: 'Beranda',
      href: '/',
      type: null,
      icon: Home,
    },
    {
      label: 'Artikel',
      href: '/search?q=&type=artikel',
      type: 'artikel',
      icon: BookOpen,
    },
    {
      label: 'Video',
      href: '/search?q=&type=video',
      type: 'video',
      icon: PlayCircle,
    },
    {
      label: 'Podcast',
      href: '/search?q=&type=podcast',
      type: 'podcast',
      icon: Headphones,
    },
    {
      label: 'Info',
      href: '/about',
      type: null,
      icon: Info,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          let isActive = false;

          if (item.href === '/') {
            isActive = pathname === '/';
          } else if (item.href === '/about') {
            isActive = pathname === '/about';
          } else if (item.type) {
            isActive = pathname === '/search' && currentType === item.type;
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-6 w-6 ${isActive ? 'fill-orange-600/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
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
