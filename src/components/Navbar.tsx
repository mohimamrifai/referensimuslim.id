'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Home, Video, Mic, Info, Search, SearchIcon, BookOpen } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  const menuItems = [
    { name: 'Beranda', icon: Home, href: '/' },
    { name: 'Artikel', icon: BookOpen, href: '/artikel' },
    { name: 'Video', icon: Video, href: '/video' },
    { name: 'Podcast', icon: Mic, href: '/podcast' },
    { name: 'Tentang Kami', icon: Info, href: '/about' },
  ];

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
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
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
          <div className="flex items-center md:hidden gap-4">
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-gray-600 hover:text-orange-600 focus:outline-none"
            >
              {isMobileSearchOpen ? <SearchIcon className="w-6 h-6 text-orange-600" /> : <SearchIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-gray-100 bg-gray-50 px-4 py-3 animate-in slide-in-from-top-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari artikel, video atau podcast.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
