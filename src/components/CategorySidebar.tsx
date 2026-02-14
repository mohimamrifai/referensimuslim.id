'use client';

import { useEffect, useState, type ElementType } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ListChecks, Heart, GraduationCap, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { CategoryTreeItem } from '@/app/actions/category';

interface CategorySidebarProps {
  categories: CategoryTreeItem[];
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  const [open, setOpen] = useState<string | null>('Pengetahuan Islam');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('sidebar-collapsed') : null;
    if (saved === 'true') {
      setCollapsed(true);
      document.body.classList.add('sidebar-collapsed');
    }
  }, []);

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', collapsed ? 'true' : 'false');
    }
  }, [collapsed]);

  const toggle = (key: string) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  const iconMap: Record<string, ElementType> = {
    'Pengetahuan Islam': BookOpen,
    'Praktik Ibadah': ListChecks,
    'Kehidupan Islami': Heart,
    'Sumber Belajar': GraduationCap,
  };

  return (
    <aside className="h-full border-r border-gray-100 flex flex-col">
      <div className={`px-3 py-3 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-gray-100`}>
        {!collapsed && (
          <h3 className="text-sm md:text-base font-semibold text-gray-700">Kategori</h3>
        )}
        <button
          aria-label={collapsed ? 'Perbesar sidebar' : 'Perkecil sidebar'}
          className="p-2 cursor-pointer rounded hover:bg-gray-100 text-gray-700"
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className={`px-2 pt-4 ${collapsed ? 'space-y-1' : 'space-y-1'} flex-1 overflow-y-auto`}>
        {categories.map((cat) => {
          const isOpen = open === cat.name;
          const hasChildren = !!cat.children?.length;
          const IconComp = iconMap[cat.name] ?? BookOpen;
          return (
            <div key={cat.name}>
              <div
                className={`flex w-full items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-50`}
              >
                <Link
                  href={`/kategori/${encodeURIComponent(cat.slug)}`}
                  className="flex items-center gap-2 flex-1"
                >
                  <span className="text-gray-600"><IconComp className={collapsed ? "h-5 w-5" : "h-5 w-5"} /></span>
                  {!collapsed && <span className="text-sm">{cat.name}</span>}
                </Link>
                {!collapsed && hasChildren ? (
                  <button
                    aria-label={isOpen ? `Tutup ${cat.name}` : `Buka ${cat.name}`}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    onClick={() => toggle(cat.name)}
                  >
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : null}
              </div>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  hasChildren && isOpen && !collapsed ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className={`overflow-hidden pl-4 ${collapsed ? 'hidden' : ''}`}>
                  <div className="py-1">
                    {cat.children.map((child) => {
                      return (
                      <Link
                        key={child.name}
                        href={`/kategori/${encodeURIComponent(cat.slug)}/${encodeURIComponent(child.slug)}`}
                        className="flex items-center justify-between rounded px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-gray-50 transition-colors"
                      >
                        <span>{child.name}</span>
                        {child.count > 0 && (
                          <span className="text-xs text-gray-400">{child.count}</span>
                        )}
                      </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </nav>
      <div className="mt-auto p-4 border-t border-gray-100 bg-white sticky bottom-0">
        {!collapsed && (
          <Link
            href="/about#contact"
            className="inline-flex w-full justify-center bg-orange-600 px-4 py-2 rounded text-white font-semibold hover:bg-orange-700 transition-shadow shadow-sm"
          >
            Kontak
          </Link>
        )}
      </div>
    </aside>
  );
}
