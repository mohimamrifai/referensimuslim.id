'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUploader from './ImageUploader';

interface AuthorFormProps {
  initialData?: {
    id?: string;
    name: string;
    role: string | null;
    image: string | null;
    bio: string | null;
  };
  isEditing?: boolean;
}

export default function AuthorForm({ initialData, isEditing = false }: AuthorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    image: initialData?.image || '',
    bio: initialData?.bio || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing && initialData?.id 
        ? `/api/admin/authors/${initialData.id}` 
        : '/api/admin/authors';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save author');

      toast.success(isEditing ? 'Penulis berhasil diperbarui' : 'Penulis berhasil ditambahkan');
      router.push('/dashboard/authors');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan penulis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="Contoh: Dr. Adi Hidayat, Lc., MA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role / Jabatan
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="Contoh: Pembina Pesantren"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto Profil
          </label>
          <ImageUploader
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            label="Upload Foto"
            aspectRatio="square"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Biografi Singkat
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Tuliskan biografi singkat..."
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isEditing ? 'Simpan Perubahan' : 'Simpan Penulis'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
