'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { createCategory } from '@/app/actions/category';
import { getCategories } from '@/app/actions/category'; // Helper to fetch parents
import SearchableSelect from '@/components/ui/SearchableSelect';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

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
        Simpan
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Kategori Baru"
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
            placeholder="Contoh: Fiqih Ibadah"
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
      </form>
    </Modal>
  );
}
