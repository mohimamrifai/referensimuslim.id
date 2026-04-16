// src/components/layout/CategoryDropdown.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getCategoryTree } from '@/app/actions/category';

type Category = Awaited<ReturnType<typeof getCategoryTree>>[0];

interface CategoryDropdownProps {
  category: Category;
}

export default function CategoryDropdown({ category }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!category) {
    return null;
  }

  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      {hasChildren ? (
        <button className="flex items-center gap-1 font-semibold text-sm text-gray-600 hover:text-orange-600 transition-colors">
          {category.name}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link
          href={`/search?category=${category.id}`}
          className="font-semibold text-sm text-gray-600 hover:text-orange-600 transition-colors"
        >
          {category.name}
        </Link>
      )}
      
      {isOpen && hasChildren && (
        <div className="absolute top-full left-0 mt-0 pt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-lg z-50">
          <ul className="py-2">
            {category.children!.map((subCategory) => (
              <li key={subCategory.id}>
                <Link
                  href={`/search?category=${subCategory.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors"
                >
                  {subCategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
