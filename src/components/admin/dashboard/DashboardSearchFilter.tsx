'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Category } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function DashboardSearchFilter({ categories }: { categories: Category[] }) {
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

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
        <Input
          type="text"
          placeholder="Cari judul artikel..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="w-full sm:w-48">
          <Select
            onChange={(e) => handleFilterChange('category', e.target.value)}
            defaultValue={searchParams.get('category') || 'all'}
          >
            <option value="all">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full sm:w-40">
          <Select
            onChange={(e) => handleFilterChange('status', e.target.value)}
            defaultValue={searchParams.get('status') || 'all'}
          >
            <option value="all">Semua Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
