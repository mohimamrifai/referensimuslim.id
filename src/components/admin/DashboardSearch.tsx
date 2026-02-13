'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface DashboardSearchProps {
  placeholder?: string;
}

export default function DashboardSearch({ placeholder = 'Cari...' }: DashboardSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  // Debounce search update
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentSearchParam = searchParams.get('search') || '';
      if (search === currentSearchParam) return;

      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to page 1
      replace(`${pathname}?${params.toString()}`);
    }, 500);
    return () => clearTimeout(handler);
  }, [search, pathname, replace, searchParams]);

  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
