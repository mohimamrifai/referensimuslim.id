'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface NgajiFormProps {
  initialData?: {
    id?: string;
    fullName: string;
    whatsapp: string;
    address: string;
    age: number;
    gender: string;
    motivation: string;
    birthPlace: string;
    birthDate: string;
    education: string;
    occupation: string;
  };
  isEditing?: boolean;
}

export default function NgajiForm({ initialData, isEditing = false }: NgajiFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    whatsapp: initialData?.whatsapp || '',
    address: initialData?.address || '',
    age: initialData?.age || '',
    gender: initialData?.gender || 'Laki-laki',
    motivation: initialData?.motivation || '',
    birthPlace: initialData?.birthPlace || '',
    birthDate: initialData?.birthDate ? new Date(initialData.birthDate).toISOString().split('T')[0] : '',
    education: initialData?.education || '',
    occupation: initialData?.occupation || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing && initialData?.id 
        ? `/api/admin/ngaji/${initialData.id}` 
        : '/api/admin/ngaji';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          birthDate: new Date(formData.birthDate).toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save data');
      }

      toast.success(isEditing ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
      router.push('/dashboard/ngaji');
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Gagal menyimpan data');
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
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="Contoh: 08123456789"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempat Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.birthPlace}
              onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: Jakarta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usia <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: 25"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pendidikan Terakhir <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: S1 Teknik Informatika"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pekerjaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              placeholder="Contoh: Software Engineer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Domisili <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="Masukkan alamat lengkap domisili saat ini"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivasi Mengaji <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
            placeholder="Jelaskan motivasi Anda untuk mengikuti program mengaji ini"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Simpan Data')}
        </button>
      </div>
    </form>
  );
}