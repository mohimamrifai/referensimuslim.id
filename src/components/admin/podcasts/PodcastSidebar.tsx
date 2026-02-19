import { Loader2, Save } from 'lucide-react';
import SearchableSelect from '@/components/ui/SearchableSelect';
import ImageUploader from '../ui/ImageUploader';
import { PodcastFormData, Category, Author, Reference, PodcastData } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

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
      <Card>
        <CardHeader className="pb-4 border-b">
          <CardTitle>Status Publikasi</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <Select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Durasi</label>
            <Input
              type="text"
              placeholder="Contoh: 15:30"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {initialData ? 'Simpan Perubahan' : 'Simpan Podcast'}
          </Button>
        </CardContent>
      </Card>

      {/* Categories & Tags */}
      <Card>
        <CardHeader className="pb-4 border-b">
          <CardTitle>Kategori & Tags</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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
            <Input
              type="text"
              placeholder="Ketik tag lalu tekan Enter..."
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="mb-2"
            />
            <div className="flex flex-wrap gap-2 mt-2">
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
        </CardContent>
      </Card>

      {/* Atribut (Metadata) */}
      <Card>
        <CardHeader className="pb-4 border-b">
          <CardTitle>Atribut</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
