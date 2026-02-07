'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, PlayCircle, Headphones, Info } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Beranda',
      href: '/',
      icon: Home,
    },
    {
      label: 'Kategori',
      href: '/kategori',
      icon: Grid,
    },
    {
      label: 'Video',
      href: '/video',
      icon: PlayCircle,
    },
    {
      label: 'Podcast',
      href: '/podcast',
      icon: Headphones,
    },
    {
      label: 'Tentang',
      href: '/tentang',
      icon: Info,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden pb-safe">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
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
