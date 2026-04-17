'use client';

import { Fragment, useState, useMemo, useEffect } from 'react';
import { FolderTree, Pencil, Trash2, ChevronRight, ChevronDown, Search, GripVertical } from 'lucide-react';
import { Category } from '@prisma/client';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { updateCategoryOrder } from '@/app/actions/category';
import toast from 'react-hot-toast';

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
  
  // Hydration fix for dnd
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Maintain local state for dragging
  const [localCategories, setLocalCategories] = useState(categories);
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    if (type === 'category') {
      const newCategories = Array.from(localCategories);
      const [movedItem] = newCategories.splice(source.index, 1);
      newCategories.splice(destination.index, 0, movedItem);

      setLocalCategories(newCategories);

      const updates = newCategories.map((cat, index) => ({
        id: cat.id,
        order: index,
      }));

      try {
        const res = await updateCategoryOrder(updates);
        if (!res.success) throw new Error(res.error);
        toast.success('Urutan kategori berhasil disimpan');
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Gagal menyimpan urutan';
        toast.error(message);
        setLocalCategories(categories);
      }
      return;
    }

    if (!type.startsWith('subcategory-')) return;
    if (source.droppableId !== destination.droppableId) return;

    const parentId = source.droppableId.replace('subcategory-', '');
    const parentIndex = localCategories.findIndex((cat) => cat.id === parentId);
    if (parentIndex === -1) return;

    const parentCategory = localCategories[parentIndex];
    const reorderedChildren = Array.from(parentCategory.children);
    const [movedChild] = reorderedChildren.splice(source.index, 1);
    reorderedChildren.splice(destination.index, 0, movedChild);

    const newCategories = Array.from(localCategories);
    newCategories[parentIndex] = {
      ...parentCategory,
      children: reorderedChildren,
    };
    setLocalCategories(newCategories);

    const updates = reorderedChildren.map((child, index) => ({
      id: child.id,
      order: index,
    }));

    try {
      const res = await updateCategoryOrder(updates);
      if (!res.success) throw new Error(res.error);
      toast.success('Urutan subkategori berhasil disimpan');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Gagal menyimpan urutan';
      toast.error(message);
      setLocalCategories(categories);
    }
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return localCategories;

    const lowerQuery = searchQuery.toLowerCase();
    
    return localCategories.map(category => {
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
  }, [localCategories, searchQuery]);

  // Auto-expand categories with matching children when searching
  useEffect(() => {
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

  if (!isMounted) return null;

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
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories-list" type="category" isDropDisabled={!!searchQuery}>
            {(provided) => (
              <table {...provided.droppableProps} ref={provided.innerRef} className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 w-10"></th>
                    <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 w-12"></th>
                    <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700">Nama Kategori</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 hidden sm:table-cell">Slug</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 text-center">Konten</th>
                    <th className="px-3 py-3 md:px-6 md:py-4 font-semibold text-gray-700 text-right sticky right-0 bg-gray-50 z-10 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] md:shadow-none md:static">Aksi</th>
                  </tr>
                </thead>
                
                {filteredCategories.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        Tidak ada kategori yang cocok dengan pencarian &quot;{searchQuery}&quot;
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  filteredCategories.map((category, index) => (
                    <Fragment key={category.id}>
                      <Draggable draggableId={category.id} index={index} isDragDisabled={!!searchQuery}>
                        {(provided, snapshot) => (
                          <tbody
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            className={`divide-y divide-gray-100 bg-white ${snapshot.isDragging ? 'shadow-xl relative z-50 ring-1 ring-emerald-500/50' : ''}`}
                          >
                            <tr className="group hover:bg-gray-50 transition-colors">
                              <td className="px-3 py-3 md:px-4 md:py-4">
                                <div {...provided.dragHandleProps} className={`text-gray-400 hover:text-gray-600 transition-colors ${!!searchQuery ? 'hidden' : 'cursor-grab active:cursor-grabbing'}`}>
                                  <GripVertical className="w-5 h-5" />
                                </div>
                              </td>
                              <td className="px-3 py-3 md:px-4 md:py-4">
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
                          </tbody>
                        )}
                      </Draggable>

                      {expandedCategories[category.id] && (
                        <Droppable
                          key={`subcategory-${category.id}`}
                          droppableId={`subcategory-${category.id}`}
                          type={`subcategory-${category.id}`}
                          isDropDisabled={!!searchQuery}
                        >
                          {(subProvided) => (
                            <tbody
                              ref={subProvided.innerRef}
                              {...subProvided.droppableProps}
                              className="divide-y divide-gray-100 bg-gray-50"
                            >
                              {category.children.map((child, childIndex) => (
                                <Draggable
                                  key={child.id}
                                  draggableId={child.id}
                                  index={childIndex}
                                  isDragDisabled={!!searchQuery}
                                >
                                  {(childProvided, childSnapshot) => (
                                    <tr
                                      ref={childProvided.innerRef}
                                      {...childProvided.draggableProps}
                                      className={`hover:bg-gray-100 transition-colors ${childSnapshot.isDragging ? 'bg-white shadow-lg ring-1 ring-emerald-500/40' : ''}`}
                                    >
                                      <td className="px-3 py-2 md:px-4 md:py-2">
                                        <div
                                          {...childProvided.dragHandleProps}
                                          className={`text-gray-400 hover:text-gray-600 transition-colors ${!!searchQuery ? 'hidden' : 'cursor-grab active:cursor-grabbing'}`}
                                        >
                                          <GripVertical className="w-4 h-4" />
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 md:px-4 md:py-2"></td>
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
                                      <td className={`px-3 py-2 md:px-6 md:py-2 text-right sticky right-0 z-10 shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.1)] md:shadow-none md:static ${childSnapshot.isDragging ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}>
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
                                  )}
                                </Draggable>
                              ))}
                              {subProvided.placeholder}
                            </tbody>
                          )}
                        </Droppable>
                      )}
                    </Fragment>
                  ))
                )}
                {provided.placeholder}
              </table>
            )}
          </Droppable>
        </DragDropContext>
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
