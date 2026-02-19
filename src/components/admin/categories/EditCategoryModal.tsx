'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Category } from '@prisma/client';
import { updateCategory, getCategories } from '@/app/actions/category';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

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

  const footer = (
    <>
      <Button
        variant="outline"
        onClick={onClose}
        disabled={isLoading}
      >
        Batal
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        Simpan Perubahan
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Kategori"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Nama Kategori</label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={handleNameChange}
            className="focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <Input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="bg-gray-50 font-mono text-sm focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="resize-none h-20 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Parent Kategori</label>
          <SearchableSelect
            value={formData.parentId}
            onChange={(val) => setFormData({ ...formData, parentId: val })}
            options={parents}
            placeholder="-- Tidak ada (Root Category) --"
          />
        </div>
      </form>
    </Modal>
  );
}
