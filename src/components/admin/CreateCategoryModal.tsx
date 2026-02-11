'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createCategory } from '@/app/actions/category';
import { getCategories } from '@/app/actions/category'; // Helper to fetch parents
import SearchableSelect from './SearchableSelect';

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCategoryModal({ isOpen, onClose }: CreateCategoryModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [parents, setParents] = useState<{ id: string; name: string }[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
  });

  useEffect(() => {
    if (isOpen) {
      // Load potential parents (root categories only usually)
      const loadParents = async () => {
        try {
          const data = await getCategories();
          setParents(data.filter(c => !c.parentId)); // Only allow root categories as parents for now
        } catch (e) {
          console.error('Failed to load parent categories', e);
        }
      };
      loadParents();
    }
  }, [isOpen]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await createCategory(formData);
      if (result.success) {
        toast.success('Kategori berhasil dibuat');
        router.refresh();
        onClose();
        setFormData({ name: '', slug: '', description: '', parentId: '' });
      } else {
        setError(result.error || 'Gagal membuat kategori');
        toast.error(result.error || 'Gagal membuat kategori');
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
          <h2 className="text-lg font-semibold text-gray-900">Buat Kategori Baru</h2>
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
              placeholder="Contoh: Fiqih Ibadah"
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
              placeholder="Deskripsi singkat kategori..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Parent Kategori (Opsional)</label>
            <SearchableSelect
              value={formData.parentId}
              onChange={(val) => setFormData({ ...formData, parentId: val })}
              options={parents}
              placeholder="-- Tidak ada (Root Category) --"
            />
            <p className="text-xs text-gray-500">Pilih jika ini adalah subkategori.</p>
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
