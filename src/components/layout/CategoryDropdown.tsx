// src/components/layout/CategoryDropdown.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getCategoryTree } from '@/app/actions/category';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

  if (!hasChildren) {
    return (
      <Link
        href={`/search?category=${category.id}`}
        className="font-semibold text-sm text-gray-600 hover:text-orange-600 transition-colors"
      >
        {category.name}
      </Link>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 font-semibold text-sm text-gray-600 hover:text-orange-600 transition-colors"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {category.name}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="z-[120] w-56 p-0"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
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
      </PopoverContent>
    </Popover>
  );
}
