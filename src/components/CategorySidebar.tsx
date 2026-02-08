'use client';

import { useEffect, useState, type ElementType } from 'react';
import { ChevronDown, ChevronRight, BookOpen, ListChecks, Heart, GraduationCap, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getCategorySlugByName } from '@/mockup';

type Category = {
  name: string;
  count?: number;
  children?: Category[];
};

const categories: Category[] = [
  {
    name: 'Pengetahuan Islam',
    children: [
      { name: 'Studi Al-Quran', count: 156 },
      { name: 'Ilmu Hadits', count: 243 },
      { name: 'Fiqh & Yurisprudensi', count: 198 },
      { name: 'Aqidah & Teologi', count: 134 },
    ],
  },
  { name: 'Praktik Ibadah' },
  { name: 'Kehidupan Islami' },
  { name: 'Sumber Belajar' },
];

export default function CategorySidebar() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    'Pengetahuan Islam': true,
  });
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
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
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
          const isOpen = !!open[cat.name];
          const hasChildren = !!cat.children?.length;
          const IconComp = iconMap[cat.name] ?? BookOpen;
          return (
            <div key={cat.name}>
              <div
                className={`flex w-full items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-50`}
              >
                <Link
                  href={`/kategori/${encodeURIComponent(getCategorySlugByName(cat.name))}`}
                  className="flex items-center gap-2 flex-1"
                >
                  <span className="text-gray-600"><IconComp className={collapsed ? "h-5 w-5" : "h-5 w-5"} /></span>
                  {!collapsed && <span className="text-sm">{cat.name}</span>}
                </Link>
                {!collapsed && hasChildren ? (
                  <button
                    aria-label={isOpen ? `Tutup ${cat.name}` : `Buka ${cat.name}`}
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={() => toggle(cat.name)}
                  >
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                ) : null}
              </div>
              {hasChildren && isOpen && (
                <div className={`pl-4 ${collapsed ? 'hidden' : ''}`}>
                  {cat.children!.map((child) => (
                    <Link
                      key={child.name}
                      href={`/kategori/${encodeURIComponent(getCategorySlugByName(cat.name))}/${encodeURIComponent(getCategorySlugByName(child.name))}`}
                      className="flex items-center justify-between rounded px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                    >
                      <span>{child.name}</span>
                      {typeof child.count === 'number' && (
                        <span className="text-xs text-gray-400">{child.count}</span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
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
