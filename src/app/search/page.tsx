'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ContentCard, { type ContentItem } from '@/components/ContentCard';
import { Search, X } from 'lucide-react';

// Data dummy untuk simulasi pencarian
const dummyData: (ContentItem & { type: 'artikel' | 'video' | 'podcast' })[] = [
  {
    id: "1",
    title: "Adab Menuntut Ilmu: Klasik dan Kontemporer",
    slug: "adab-menuntut-ilmu",
    excerpt: "Ringkasan adab penuntut ilmu menurut para ulama beserta penerapannya di era digital.",
    category: "Sumber Belajar",
    date: "17/01/2026",
    image: "/next.svg",
    type: 'artikel'
  },
  {
    id: "2",
    title: "Tadabbur Ayat: Keteguhan Hati dalam Kesulitan",
    slug: "tadabbur-ayat-keteguhan-hati",
    excerpt: "Pembahasan ayat-ayat yang menguatkan hati, dilengkapi referensi dari kitab tafsir.",
    category: "Studi Al-Quran",
    date: "16/01/2026",
    image: "/globe.svg",
    type: 'artikel'
  },
  {
    id: "v1",
    title: "Kajian Rutin: Tafsir Surat Al-Fatihah",
    slug: "kajian-tafsir-al-fatihah",
    duration: "45:20",
    category: "Kajian Kitab",
    date: "10/01/2026",
    image: "/window.svg",
    excerpt: "Simak kajian mendalam mengenai tafsir Surat Al-Fatihah dan rahasia yang terkandung di dalamnya.",
    type: 'video'
  },
  {
    id: "p1",
    title: "Ep 1: Menjaga Hati di Zaman Fitnah",
    slug: "menjaga-hati",
    duration: "25:00",
    category: "Tazkiyatun Nafs",
    date: "14/01/2026",
    image: "/file.svg",
    excerpt: "Bagaimana cara menjaga hati agar tetap bersih di tengah gempuran fitnah akhir zaman?",
    type: 'podcast'
  },
  // Tambahkan data lain jika perlu
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<'all' | 'artikel' | 'video' | 'podcast'>('all');
  const [results, setResults] = useState(dummyData);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    const filtered = dummyData.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(lowerQuery) || 
                           item.category.toLowerCase().includes(lowerQuery);
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesQuery && matchesType;
    });
    setResults(filtered);
  }, [query, filterType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setQuery('');
    router.push('/search');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 py-8 md:pl-[var(--sidebar-width)]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Hasil Pencarian</h1>
        
        {/* Search Bar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari konten..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            {query && (
              <button 
                type="button" 
                onClick={clearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {(['all', 'artikel', 'video', 'podcast'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {type === 'all' ? 'Semua' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="text-sm text-gray-500 mb-6">
          Menampilkan {results.length} hasil untuk &quot;{query || 'semua'}&quot; {filterType !== 'all' && `di ${filterType}`}
        </div>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((item) => (
            <div key={item.id} className="h-full">
              <ContentCard item={item} type={item.type} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <Search className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada hasil ditemukan</h3>
          <p className="text-gray-500 max-w-md">
            Coba gunakan kata kunci yang berbeda atau periksa ejaan pencarian Anda.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat pencarian...</div>}>
      <SearchContent />
    </Suspense>
  );
}
