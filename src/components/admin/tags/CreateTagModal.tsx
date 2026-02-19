'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { createTag } from '@/app/actions/tag';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface CreateTagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTagModal({ isOpen, onClose }: CreateTagModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });

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
      const result = await createTag(formData);
      if (result.success) {
        toast.success('Tag berhasil dibuat');
        router.refresh();
        onClose();
        setFormData({ name: '', slug: '' });
      } else {
        setError(result.error || 'Gagal membuat tag');
        toast.error(result.error || 'Gagal membuat tag');
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
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Plus className="w-4 h-4 mr-2" />
        )}
        Buat Tag
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Tag Baru"
      footer={footer}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Nama Tag</label>
          <Input
            type="text"
            required
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Contoh: Fiqih, Sejarah, Tafsir"
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
      </form>
    </Modal>
  );
}
