'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tag } from '@prisma/client';
import { deleteTag } from '@/app/actions/tag';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 text-center">
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

          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
