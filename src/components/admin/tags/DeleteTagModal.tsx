'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tag } from '@prisma/client';
import { deleteTag } from '@/app/actions/tag';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface DeleteTagModalProps {
  tag: Tag;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteTagModal({ tag, isOpen, onClose }: DeleteTagModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await deleteTag(tag.id);
      if (result.success) {
        toast.success('Tag berhasil dihapus');
        router.refresh();
        onClose();
      } else {
        setError(result.error || 'Gagal menghapus tag');
        toast.error(result.error || 'Gagal menghapus tag');
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
        onClick={handleDelete}
        disabled={isLoading}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
        Ya, Hapus
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      footer={footer}
    >
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Hapus Tag?</h3>
        <p className="text-gray-500 text-sm mb-6">
          Apakah Anda yakin ingin menghapus tag <span className="font-bold text-gray-900">&quot;{tag.name}&quot;</span>? 
          Tindakan ini tidak dapat dibatalkan.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-4 text-left">
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
}
