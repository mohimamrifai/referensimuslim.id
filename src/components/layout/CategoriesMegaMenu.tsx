// src/components/layout/CategoriesMegaMenu.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getCategoryTree } from '@/app/actions/category';

type Category = Awaited<ReturnType<typeof getCategoryTree>>[0];

interface CategoriesMegaMenuProps {
  categories: Category[];
}

export default function CategoriesMegaMenu({ categories }: CategoriesMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 font-semibold text-sm md:text-base text-gray-600 hover:text-orange-600 transition-colors">
        Kategori
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
          <div className="grid grid-cols-1 gap-2 p-4">
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  href={`/search?category=${category.id}`}
                  className="block px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-orange-600 transition-colors rounded-md"
                >
                  {category.name}
                </Link>
                {category.children && category.children.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {category.children.map((subCategory) => (
                      <li key={subCategory.id}>
                        <Link
                          href={`/search?category=${subCategory.id}`}
                          className="block px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition-colors rounded-md"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
