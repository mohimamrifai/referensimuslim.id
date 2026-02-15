'use client';

import { useState, Fragment, useMemo } from 'react';
import { FolderTree, Pencil, Trash2, ChevronRight, ChevronDown, Search } from 'lucide-react';
import { Category } from '@prisma/client';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';

type CategoryWithChildren = Category & {
  children: (Category & {
    _count: { contents: number; subContents: number };
  })[];
  _count: { contents: number; subContents: number };
};

interface CategoryListProps {
  categories: CategoryWithChildren[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    const lowerQuery = searchQuery.toLowerCase();
    
    return categories.map(category => {
      // Check if parent matches
      const parentMatches = 
        category.name.toLowerCase().includes(lowerQuery) || 
        category.slug.toLowerCase().includes(lowerQuery);

      // Filter children
      const matchingChildren = category.children.filter(child => 
        child.name.toLowerCase().includes(lowerQuery) || 
        child.slug.toLowerCase().includes(lowerQuery)
      );

      if (parentMatches) {
        // If parent matches, return parent with ALL children (or filtering children? usually all is better context, but let's just return all for now or maybe keep it simple)
        // Let's return all children if parent matches to see full context
        return category;
      } else if (matchingChildren.length > 0) {
        // If parent doesn't match but children do, return parent with ONLY matching children
        // And we should probably auto-expand this parent
        return {
          ...category,
          children: matchingChildren
        };
      }
      
      return null;
    }).filter(Boolean) as CategoryWithChildren[];
  }, [categories, searchQuery]);

  // Auto-expand categories with matching children when searching
  useMemo(() => {
    if (searchQuery) {
      const newExpanded: Record<string, boolean> = {};
      filteredCategories.forEach(cat => {
        if (cat.children.length > 0) {
          newExpanded[cat.id] = true;
        }
      });
      setExpandedCategories(prev => ({ ...prev, ...newExpanded }));
    }
  }, [filteredCategories, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (categories.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        Belum ada kategori. Silakan buat kategori baru.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari kategori atau subkategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
          />
        </div>
        {/* Placeholder for future advanced filters if needed */}
        {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button> */}
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 w-12"></th>
              <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700">Nama Kategori</th>
              <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 hidden sm:table-cell">Slug</th>
              <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 text-center">Konten</th>
              <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 text-right sticky right-0 bg-gray-50 z-10 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] md:shadow-none md:static">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Tidak ada kategori yang cocok dengan pencarian &quot;{searchQuery}&quot;
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <Fragment key={category.id}>
                  <tr className="group hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 md:px-6 md:py-4">
                      {category.children.length > 0 && (
                        <button
                          onClick={() => toggleExpand(category.id)}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500"
                        >
                          {expandedCategories[category.id] ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-2">
                        <FolderTree className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span className="truncate max-w-[150px] sm:max-w-none">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-gray-600 font-mono text-xs hidden sm:table-cell">
                      {category.slug}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-center text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs whitespace-nowrap">
                        {category._count.contents + category._count.subContents} Item
                      </span>
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-right sticky right-0 bg-white group-hover:bg-gray-50 z-10 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] md:shadow-none md:static">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit Kategori"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingCategory(category)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Kategori"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Subcategories */}
                  {expandedCategories[category.id] && category.children.map((child) => (
                    <tr key={child.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <td className="px-3 py-2 md:px-6 md:py-2"></td>
                      <td className="px-3 py-2 md:px-6 md:py-2 font-medium text-gray-900 pl-8 md:pl-12 border-l-2 border-emerald-100">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-200 flex-shrink-0"></div>
                          <span className="truncate max-w-[140px] sm:max-w-none">{child.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-2 text-gray-600 font-mono text-xs hidden sm:table-cell">
                        {child.slug}
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-2 text-center text-gray-600">
                        <span className="bg-white border border-gray-200 px-2 py-1 rounded text-xs whitespace-nowrap">
                          {child._count.contents + child._count.subContents} Item
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-2 text-right sticky right-0 bg-gray-50 group-hover:bg-gray-100 z-10 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] md:shadow-none md:static">
                        <div className="flex items-center justify-end gap-1 md:gap-2">
                          <button
                            onClick={() => setEditingCategory(child)}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Edit Subkategori"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingCategory(child)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Subkategori"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
        />
      )}
      
      {deletingCategory && (
        <DeleteCategoryModal
          category={deletingCategory}
          isOpen={!!deletingCategory}
          onClose={() => setDeletingCategory(null)}
        />
      )}
    </div>
  );
}
