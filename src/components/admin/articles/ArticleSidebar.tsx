import { Loader2, Save } from 'lucide-react';
import SearchableSelect from '@/components/ui/SearchableSelect';
import ImageUploader from '../ui/ImageUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ArticleFormData, Category, Author, Reference, ArticleData } from './types';

interface ArticleSidebarProps {
  formData: ArticleFormData;
  setFormData: (data: ArticleFormData) => void;
  loading: boolean;
  categories: Category[];
  authors: Author[];
  references: Reference[];
  initialData?: ArticleData;
  tagInput: string;
  setTagInput: (val: string) => void;
  handleTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeTag: (tag: string) => void;
}

export default function ArticleSidebar({
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
}: ArticleSidebarProps) {
  // Filter subcategories based on selected category
  const selectedCategory = categories.find(c => c.id === formData.categoryId);
  const subcategories = selectedCategory?.children || [];

  return (
    <div className="space-y-6">
      {/* Publishing Status */}
      <Card>
        <CardHeader className="pb-4 border-b">
          <CardTitle>Publishing</CardTitle>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Waktu Baca</label>
            <Input
              placeholder="Contoh: 5 menit"
              value={formData.readTime}
              onChange={e => setFormData({ ...formData, readTime: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {initialData ? 'Simpan Perubahan' : 'Simpan Artikel'}
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
              placeholder="Ketik & Enter..."
              className="mb-2"
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
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader className="pb-4 border-b">
          <CardTitle>Atribut</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Penulis</label>
            <SearchableSelect
              required
              value={formData.authorId}
              onChange={(val) => setFormData({ ...formData, authorId: val })}
              options={authors}
              placeholder="Pilih Penulis"
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gambar Unggulan</label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => {
                const oldImage = formData.image;
                if (oldImage && oldImage !== url && !oldImage.startsWith('/')) { 
                   fetch('/api/upload', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ url: oldImage }),
                   }).catch(err => console.error("Failed to delete old image", err));
                }
                setFormData({ ...formData, image: url });
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
