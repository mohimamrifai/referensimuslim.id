'use client';

import { useState } from 'react';
import { SocialMedia } from '@prisma/client';
import { createSocialMedia, updateSocialMedia, deleteSocialMedia } from '@/app/actions/settings';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Trash2, Edit2, Save } from 'lucide-react';

interface SocialMediaSettingsProps {
  initialData: SocialMedia[];
}

export default function SocialMediaSettings({ initialData }: SocialMediaSettingsProps) {
  const [socialMedias, setSocialMedias] = useState<SocialMedia[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus media sosial ini?')) return;
    
    setLoading(true);
    const result = await deleteSocialMedia(id);
    setLoading(false);

    if (result.success) {
      setSocialMedias(prev => prev.filter(item => item.id !== id));
      toast.success('Media sosial berhasil dihapus');
    } else {
      toast.error(result.error || 'Gagal menghapus media sosial');
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Media Sosial</h2>
          <p className="text-sm text-gray-500">Kelola tautan media sosial yang ditampilkan di footer.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah
        </button>
      </div>

      <div className="space-y-4">
        {isAdding && (
          <SocialMediaForm
            onCancel={() => setIsAdding(false)}
          />
        )}

        {socialMedias.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            Belum ada media sosial yang ditambahkan.
          </div>
        )}

        {socialMedias.map((item) => (
          editingId === item.id ? (
            <SocialMediaForm
              key={item.id}
              initialData={item}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="p-2 bg-white rounded-full border border-gray-200 shrink-0">
                  {/* Icon placeholder or dynamic icon based on platform */}
                  <span className="text-xs font-bold text-gray-600 w-6 h-6 flex items-center justify-center">
                    {item.platform.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900">{item.platform}</h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-emerald-600 hover:underline truncate block">
                    {item.url}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                 <div className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    {item.isActive ? 'Aktif' : 'Nonaktif'}
                 </div>
                <button
                  onClick={() => setEditingId(item.id)}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={loading}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

function SocialMediaForm({ initialData, onCancel }: { 
  initialData?: SocialMedia, 
  onCancel: () => void
}) {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    if (initialData) {
        formData.append('id', initialData.id);
    }
    
    const action = initialData ? updateSocialMedia : createSocialMedia;
    const result = await action(null, formData);
    
    setLoading(false);
    
    if (result.success) {
      toast.success(initialData ? 'Berhasil diperbarui' : 'Berhasil ditambahkan');
      // We need to fetch the updated item or construct it. 
      // Ideally server action returns the item, but current implementation returns message.
      // For now, let's refresh the page to get latest data or we can assume success and update local state if we had the data.
      // Since server action revalidates path, a router.refresh() in parent or here would be good.
      // But to update local state immediately without refresh, we need the returned object.
      // Let's rely on page refresh for simplicity in this turn or modify action to return data.
      // I'll modify the action in a bit, but for now I'll trigger a reload or passed onSuccess.
      // Wait, I can't pass the new object if I don't have it.
      // Let's modify the server action to return the created/updated object.
      window.location.reload(); // Simple fallback for now
    } else {
      toast.error(result.error || 'Terjadi kesalahan');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg border border-emerald-200 shadow-sm space-y-4 animate-in fade-in slide-in-from-top-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
          <select 
            name="platform" 
            defaultValue={initialData?.platform || 'Facebook'}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
          >
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="Youtube">Youtube</option>
            <option value="TikTok">TikTok</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Website">Website</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input 
            type="url" 
            name="url" 
            defaultValue={initialData?.url || ''}
            placeholder="https://..."
            required
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Urutan</label>
           <input 
            type="number" 
            name="order" 
            defaultValue={initialData?.order || 0}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
          />
        </div>
         <div className="flex items-center gap-2 h-full pt-0 md:pt-6">
            <input 
                type="checkbox" 
                name="isActive" 
                id="isActive"
                defaultChecked={initialData?.isActive ?? true}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Aktif</label>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan
        </button>
      </div>
    </form>
  );
}
