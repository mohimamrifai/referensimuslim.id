import { Loader2, Save } from 'lucide-react';
import SearchableSelect from '../ui/SearchableSelect';
import ImageUploader from '../ui/ImageUploader';
import { PodcastFormData, Category, Author, Reference, PodcastData } from './types';

interface PodcastSidebarProps {
  formData: PodcastFormData;
  setFormData: (data: PodcastFormData) => void;
  loading: boolean;
  categories: Category[];
  authors: Author[];
  references: Reference[];
  initialData?: PodcastData;
  tagInput: string;
  setTagInput: (val: string) => void;
  handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
}

export default function PodcastSidebar({
  formData,
  setFormData,
  loading,
  categories,
  authors,
  references,
  initialData,
  tagInput,
  setTagInput,
  handleTagKeyDown,
  removeTag
}: PodcastSidebarProps) {
  // Filter subcategories based on selected category
  const selectedCategory = categories.find(c => c.id === formData.categoryId);
  const subcategories = selectedCategory?.children || [];

  return (
    <div className="space-y-6">
      {/* Publishing Status */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Status Publikasi</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Durasi</label>
          <input
            type="text"
            placeholder="Contoh: 15:30"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
            value={formData.duration}
            onChange={e => setFormData({ ...formData, duration: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
          {initialData ? 'Simpan Perubahan' : 'Simpan Podcast'}
        </button>
      </div>

      {/* Categories & Tags */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Kategori & Tags</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori Utama</label>
          <SearchableSelect
            required
            value={formData.categoryId}
            onChange={(val) => setFormData({ ...formData, categoryId: val, subcategoryId: '' })}
            options={categories}
            placeholder="Pilih Kategori"
          />
        </div>

        {subcategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Sub Kategori</label>
            <SearchableSelect
              value={formData.subcategoryId}
              onChange={(val) => setFormData({ ...formData, subcategoryId: val })}
              options={subcategories}
              placeholder="Pilih Sub Kategori"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
          <input
            type="text"
            placeholder="Ketik tag lalu tekan Enter..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none mb-2"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1.5 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Atribut (Metadata) */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-900 border-b pb-2">Atribut</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Pemateri / Penulis</label>
          <SearchableSelect
            required
            value={formData.authorId}
            onChange={(val) => setFormData({ ...formData, authorId: val })}
            options={authors}
            placeholder="Pilih Pemateri"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Referensi (Opsional)</label>
          <SearchableSelect
            value={formData.referenceId}
            onChange={(val) => setFormData({ ...formData, referenceId: val })}
            options={references}
            placeholder="Pilih Referensi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail Podcast</label>
          <ImageUploader
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
          />
        </div>
      </div>
    </div>
  );
}
