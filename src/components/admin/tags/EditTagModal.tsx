'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tag } from '@prisma/client';
import { updateTag } from '@/app/actions/tag';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface EditTagModalProps {
  tag: Tag;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTagModal({ tag, isOpen, onClose }: EditTagModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: tag.name,
    slug: tag.slug,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: tag.name,
        slug: tag.slug,
      });
    }
  }, [isOpen, tag]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await updateTag(tag.id, formData);
      if (result.success) {
        toast.success('Tag berhasil diperbarui');
        router.refresh();
        onClose();
      } else {
        setError(result.error || 'Gagal mengupdate tag');
        toast.error(result.error || 'Gagal mengupdate tag');
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
      title="Edit Tag"
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
