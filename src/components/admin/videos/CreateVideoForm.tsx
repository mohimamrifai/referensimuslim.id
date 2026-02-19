'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Wand2 } from 'lucide-react';
import VideoMainContent from './VideoMainContent';
import VideoSidebar from './VideoSidebar';
import { VideoData, VideoFormData, Category, Author, Reference } from './types';

export default function CreateVideoForm({ initialData }: { initialData?: VideoData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState<VideoFormData>({
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
    tags: [],
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
      <VideoMainContent formData={formData} setFormData={setFormData} />

      {/* Right Column - Sidebar */}
      <VideoSidebar
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        categories={categories}
        authors={authors}
        references={references}
        initialData={initialData}
        tagInput={tagInput}
        setTagInput={setTagInput}
        handleTagKeyDown={handleTagKeyDown}
        removeTag={removeTag}
      />
    </form>
  );
}
