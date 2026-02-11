'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Tag } from '@prisma/client';
import EditTagModal from './EditTagModal';
import DeleteTagModal from './DeleteTagModal';

type TagWithCount = Tag & {
  _count: { contents: number };
};

interface TagListProps {
  tags: TagWithCount[];
}

export default function TagList({ tags }: TagListProps) {
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTags = useMemo(() => {
    if (!searchQuery) return tags;

    const lowerQuery = searchQuery.toLowerCase();
    
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(lowerQuery) || 
      tag.slug.toLowerCase().includes(lowerQuery)
    );
  }, [tags, searchQuery]);

  if (tags.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        Belum ada tag. Silakan buat tag baru.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {filteredTags.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Tidak ada tag yang cocok dengan pencarian &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredTags.map((tag) => (
              <div
                key={tag.id}
                onClick={() => setEditingTag(tag)}
                className="group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm hover:border-emerald-200 transition-all duration-200 cursor-pointer"
                title="Klik untuk mengedit"
              >
                <span className="text-xs font-medium text-gray-700 group-hover:text-emerald-700">
                  {tag.name}
                </span>
                <span className="flex items-center justify-center h-4 min-w-4 px-1 text-[9px] font-bold text-gray-500 bg-gray-200 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                  {tag._count.contents}
                </span>
                
                {/* Delete Button - Floating top-right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingTag(tag);
                  }}
                  className="absolute -top-1.5 -right-1.5 p-0.5 bg-white border border-gray-200 text-gray-400 rounded-full hover:text-red-500 hover:bg-red-50 hover:border-red-200 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm z-10"
                  title="Hapus Tag"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                   </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingTag && (
        <EditTagModal
          tag={editingTag}
          isOpen={!!editingTag}
          onClose={() => setEditingTag(null)}
        />
      )}

      {deletingTag && (
        <DeleteTagModal
          tag={deletingTag}
          isOpen={!!deletingTag}
          onClose={() => setDeletingTag(null)}
        />
      )}
    </div>
  );
}
