// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import { NAVIGATION_ITEMS } from '@/config/navigation';
import CategoryDropdown from './CategoryDropdown';
import CategoriesMegaMenu from './CategoriesMegaMenu';
import { getCategoryTree } from '@/app/actions/category';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type Category = Awaited<ReturnType<typeof getCategoryTree>>[0];

function NavbarContent({ adSlot }: { adSlot?: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openMobileCategories, setOpenMobileCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategoryTree();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  const toggleMobileCategory = (categoryId: string) => {
    setOpenMobileCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 md:px-10">
        {/* Top Row: Logo | Navigation | Ad Slot */}
        <div className="flex justify-between items-center h-16 md:h-28 border-b border-gray-50 py-3">
          <div className="shrink-0 flex items-center gap-6 lg:gap-10">
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

            {/* Standard Nav Items (Moved to Top Row) */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-wrap">
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
                    className={`flex items-center gap-1.5 lg:gap-2 font-semibold text-sm lg:text-base transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-orange-700' : 'text-gray-600 hover:text-orange-600'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Ad Space with reduced max-width */}
          <div className="hidden md:flex flex-1 max-w-[468px] ml-4 justify-end">
            {adSlot}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        {/* Bottom Row: Categories | Search */}
        <div className="flex justify-between items-center min-h-[3.5rem] py-2 gap-y-2 w-full">
          <div className="flex items-center gap-3 lg:gap-6 w-full md:w-auto min-w-0">
            {/* Individual Category Dropdowns for large screens */}
            <div className="hidden lg:block flex-1 min-w-0">
              <ScrollArea className="w-full whitespace-nowrap" type="always">
                <div className="flex w-max space-x-4 lg:space-x-6 pb-3 pt-1">
                  {categories.map((category) => (
                    <div key={category.id} className="flex-shrink-0 group relative z-10">
                      <CategoryDropdown category={category} />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-3" />
              </ScrollArea>
            </div>

            {/* Mega Menu for medium screens */}
            <div className="hidden md:block lg:hidden flex-shrink-0">
              <CategoriesMegaMenu categories={categories} />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto relative flex-shrink-0 pl-4 z-20">
            <Link
              href="/daftar-ngaji"
              className="md:hidden px-3 py-1.5 bg-orange-600 text-white text-xs font-semibold rounded-full shadow-sm hover:bg-orange-700 transition-colors"
            >
              Daftar Ngaji
            </Link>
            
            {/* Search Icon Button (Always visible) */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Search Popover */}
            {isMobileSearchOpen && (
              <div className="hidden md:block absolute right-0 top-full mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-xl z-50 p-3 animate-in fade-in slide-in-from-top-2">
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
        </div>

        {/* Mobile Search Panel */}
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

      {/* Mobile Fullscreen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col md:hidden animate-in slide-in-from-right-full duration-300">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="font-bold text-lg text-gray-800">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-600 hover:text-orange-600 bg-gray-50 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto flex-1 p-4">
            <div className="space-y-6">
              {/* Categories Only */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Kategori</h3>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const hasChildren = category.children && category.children.length > 0;
                    const isOpen = openMobileCategories[category.id];

                    return (
                      <div key={category.id} className="border-b border-gray-50 pb-2 last:border-0">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/search?category=${category.id}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-bold text-gray-800 hover:text-orange-600 block py-2 flex-1"
                          >
                            {category.name}
                          </Link>
                          {hasChildren && (
                            <button
                              onClick={() => toggleMobileCategory(category.id)}
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                              aria-label="Toggle sub-kategori"
                            >
                              {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </button>
                          )}
                        </div>
                        
                        {/* Sub-categories Dropdown */}
                        {hasChildren && (
                          <div
                            className={`ml-4 space-y-1 border-l-2 border-orange-100 pl-4 overflow-hidden transition-all duration-300 ease-in-out ${
                              isOpen ? 'max-h-[500px] opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'
                            }`}
                          >
                            {category.children.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/search?category=${sub.id}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-sm font-medium text-gray-600 hover:text-orange-600 py-1.5"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar({ adSlot }: { adSlot?: React.ReactNode }) {
  return (
    <Suspense fallback={<nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm h-28" />}>
      <NavbarContent adSlot={adSlot} />
    </Suspense>
  );
}
