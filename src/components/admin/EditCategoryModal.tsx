'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Category } from '@prisma/client';
import { updateCategory, getCategories } from '@/app/actions/category';

interface EditCategoryModalProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditCategoryModal({ category, isOpen, onClose }: EditCategoryModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [parents, setParents] = useState<{ id: string; name: string }[]>([]);
  
  const [formData, setFormData] = useState({
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    parentId: category.parentId || '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        parentId: category.parentId || '',
      });

      const loadParents = async () => {
        try {
          const data = await getCategories();
          // Exclude itself and its children (to prevent circular dependency) - simplified here just excluding itself
          setParents(data.filter(c => c.id !== category.id && !c.parentId)); 
        } catch (e) {
          console.error('Failed to load parent categories', e);
        }
      };
      loadParents();
    }
  }, [isOpen, category]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Only auto-update slug if it hasn't been manually edited heavily (simple heuristic)
    // Or just always auto-update for simplicity unless user manually edits slug field
    setFormData(prev => ({
      ...prev,
      name,
      // Optional: don't auto-update slug on edit to preserve SEO URLs
      // slug: generateSlug(name) 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await updateCategory(category.id, formData);
      if (result.success) {
        toast.success('Kategori berhasil diperbarui');
        router.refresh();
        onClose();
      } else {
        setError(result.error || 'Gagal mengupdate kategori');
        toast.error(result.error || 'Gagal mengupdate kategori');
      }
    } catch {
      setError('Terjadi kesalahan sistem');
      toast.error('Terjadi kesalahan sistem');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Edit Kategori</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nama Kategori</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-mono text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none h-20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Parent Kategori</label>
            <select
              value={formData.parentId}
              onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">-- Tidak ada (Root Category) --</option>
              {parents.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
