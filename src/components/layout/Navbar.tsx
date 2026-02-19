'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { NAVIGATION_ITEMS } from '@/config/navigation';

function NavbarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 md:px-10">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="shrink-0 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden">
                 <Image
                  src="/logo.png"
                  alt="Referensimuslim.id Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              let isActive = false;

              if (item.href === '/') {
                isActive = pathname === '/';
              } else if (item.href === '/about') {
                isActive = pathname === '/about';
              } else if (item.href === '/daftar-ngaji') {
                isActive = pathname === '/daftar-ngaji';
              } else if (item.type) {
                isActive = pathname === '/search' && currentType === item.type;
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 font-semibold text-sm md:text-base transition-colors duration-200 ${isActive ? 'text-orange-700' : 'text-gray-600 hover:text-orange-600'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: Search & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Cari artikel, video atau podcast.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2 group-focus-within:text-orange-500 transition-colors" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <Link
              href="/daftar-ngaji"
              className="px-3 py-1.5 bg-orange-600 text-white text-xs font-semibold rounded-full shadow-sm hover:bg-orange-700 transition-colors"
            >
              Daftar Ngaji
            </Link>
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Toggled) */}
        {isMobileSearchOpen && (
           <div className="md:hidden pb-4 px-1 animate-in slide-in-from-top-2 duration-200">
             <div className="relative">
                <input
                  type="text"
                  placeholder="Cari artikel, video atau podcast.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400 shadow-sm"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
             </div>
           </div>
        )}
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm h-16" />}>
      <NavbarContent />
    </Suspense>
  );
}
