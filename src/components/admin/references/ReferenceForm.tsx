'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '../ui/ImageUploader';
import { createReference, updateReference } from '@/app/actions/references';
import toast from 'react-hot-toast';

interface ReferenceFormProps {
  initialData?: {
    id: string;
    name: string;
    role: string | null;
    image: string | null;
    institution: string | null;
    verified: boolean;
  };
}

export default function ReferenceForm({ initialData }: ReferenceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    image: initialData?.image || '',
    institution: initialData?.institution || '',
    verified: initialData?.verified || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (initialData) {
        result = await updateReference(initialData.id, formData);
      } else {
        result = await createReference(formData);
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success(initialData ? 'Referensi berhasil diperbarui' : 'Referensi berhasil ditambahkan');
      router.push('/dashboard/references');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan yang tidak diketahui');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Referensi
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            placeholder="Contoh: Dr. Musthafa Al-Bugha"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role / Gelar
          </label>
          <input
            type="text"
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            placeholder="Contoh: Ulama Fiqh, Mufassir"
          />
        </div>

        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
            Institusi / Afiliasi
          </label>
          <input
            type="text"
            id="institution"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
            placeholder="Contoh: Institut Studi Islam, Universitas Al-Azhar"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="verified"
            checked={formData.verified}
            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-600"
          />
          <label htmlFor="verified" className="text-sm font-medium text-gray-700">
            Terverifikasi (Verified)
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto Profil
          </label>
          <ImageUploader
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            aspectRatio="square"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Tambah Referensi')}
        </button>
      </div>
    </form>
  );
}
