'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../ui/RichTextEditor';
import ImageUploader from '../ui/ImageUploader';
import SearchableSelect from '../ui/SearchableSelect';
import { Loader2, Save, Wand2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  children: Category[];
}

interface Author {
  id: string;
  name: string;
}

interface Reference {
  id: string;
  name: string;
}

interface VideoData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  image?: string | null;
  categoryId?: string;
  subcategoryId?: string | null;
  authorId?: string;
  referenceId?: string | null;
  status?: string;
  videoUrl?: string | null;
  duration?: string | null;
  tags?: string[];
}

export default function CreateVideoForm({ initialData }: { initialData?: VideoData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    categoryId: '',
    subcategoryId: '',
    authorId: '',
    referenceId: '',
    status: 'DRAFT',
    videoUrl: '',
    duration: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        image: initialData.image || '',
        categoryId: initialData.categoryId || '',
        subcategoryId: initialData.subcategoryId || '',
        authorId: initialData.authorId || '',
        referenceId: initialData.referenceId || '',
        status: initialData.status || 'DRAFT',
        videoUrl: initialData.videoUrl || '',
        duration: initialData.duration || '',
        tags: initialData.tags || [],
      });
    }
  }, [initialData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/data');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories);
          setAuthors(data.authors);
          setReferences(data.references);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData ? `/api/admin/videos/${initialData.id}` : '/api/admin/videos';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(initialData ? 'Failed to update video' : 'Failed to create video');

      router.push('/dashboard/videos');
      router.refresh();
    } catch {
      alert(initialData ? 'Error updating video' : 'Error creating video');
    } finally {
      setLoading(false);
    }
  };

  const fillDummyData = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 10000);
    const randomCat = categories.length > 0 ? categories[Math.floor(Math.random() * categories.length)] : null;
    const randomSub = randomCat && randomCat.children.length > 0 
      ? randomCat.children[Math.floor(Math.random() * randomCat.children.length)] 
      : null;
    const randomAuthor = authors.length > 0 ? authors[Math.floor(Math.random() * authors.length)] : null;
    const randomRef = references.length > 0 ? references[Math.floor(Math.random() * references.length)] : null;

    setFormData(prev => ({
      ...prev,
      title: `Video Kajian [ ${randomNum} ]`,
      slug: `video-kajian-${randomNum}`,
      excerpt: `Ringkasan video kajian nomor ${randomNum}. Video ini membahas topik penting dalam Islam.`,
      content: `
        <p>Ini adalah deskripsi lengkap untuk video <strong>Video Kajian [ ${randomNum} ]</strong>.</p>
        <p>Dalam video ini, pemateri menjelaskan tentang konsep dasar dan implementasi dalam kehidupan sehari-hari.</p>
        <h2>Poin Penting</h2>
        <ul>
          <li>Pembahasan utama</li>
          <li>Sesi tanya jawab</li>
          <li>Kesimpulan</li>
        </ul>
      `,
      categoryId: randomCat ? randomCat.id : '',
      subcategoryId: randomSub ? randomSub.id : '',
      authorId: randomAuthor ? randomAuthor.id : '',
      referenceId: randomRef ? randomRef.id : '',
      status: 'PUBLISHED',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Dummy YouTube URL
      duration: `${Math.floor(Math.random() * 60) + 10}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      tags: ['Kajian', 'Video', `Auto-${randomNum}`]
    }));
  }, [categories, authors, references]);

  if (initialLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  const selectedCategory = categories.find(c => c.id === formData.categoryId);
  const subcategories = selectedCategory?.children || [];

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData({ ...formData, tags: [...formData.tags, newTag] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Header with Fill Dummy Button */}
      <div className="lg:col-span-3 flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
        <div className="text-sm text-blue-800">
          <span className="font-semibold">Mode Testing:</span> Gunakan tombol di kanan untuk mengisi data dummy otomatis.
        </div>
        <button
          type="button"
          onClick={fillDummyData}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Isi Data Dummy
        </button>
      </div>

      {/* Left Column - Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Video</label>
              <input
                type="text"
                required
                placeholder="Masukkan judul video..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Video (YouTube)</label>
              <input
                type="url"
                required
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                value={formData.videoUrl}
                onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (Ringkasan)</label>
              <textarea
                rows={3}
                placeholder="Ringkasan singkat video..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400 resize-none"
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Video</label>
              <div className="min-h-100">
                <RichTextEditor 
                  content={formData.content} 
                  onChange={(content) => setFormData({ ...formData, content })} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Sidebar */}
      <div className="space-y-6">
        {/* Publishing Status */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 border-b pb-2">Publishing</h3>
          
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
            {initialData ? 'Simpan Perubahan' : 'Simpan Video'}
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail Video</label>
            <ImageUploader
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
