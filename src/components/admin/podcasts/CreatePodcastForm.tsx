'use client';

import { useCallback } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import PodcastMainContent from './PodcastMainContent';
import PodcastSidebar from './PodcastSidebar';
import { PodcastData, PodcastFormData } from './types';
import { useContentForm } from '@/hooks/useContentForm';
import { Button } from '@/components/ui/Button';
import { createPodcast, updatePodcast } from '@/app/actions/podcasts';

const initialFormData: PodcastFormData = {
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
};

export default function CreatePodcastForm({ initialData }: { initialData?: PodcastData }) {
  const {
    formData,
    setFormData,
    categories,
    authors,
    references,
    loading,
    initialLoading,
    tagInput,
    setTagInput,
    handleTagKeyDown,
    removeTag,
    handleSubmit
  } = useContentForm<PodcastFormData>({
    initialData,
    initialFormData,
    apiEndpoint: '/api/admin/podcasts',
    redirectPath: '/dashboard/podcasts',
    resourceName: 'podcast',
    createAction: createPodcast,
    updateAction: updatePodcast,
  });

  const fillDummyData = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 10000);
    const randomCat = categories.length > 0 ? categories[Math.floor(Math.random() * categories.length)] : null;
    const randomSub = randomCat && randomCat.children && randomCat.children.length > 0 
      ? randomCat.children[Math.floor(Math.random() * randomCat.children.length)] 
      : null;
    const randomAuthor = authors.length > 0 ? authors[Math.floor(Math.random() * authors.length)] : null;
    const randomRef = references.length > 0 ? references[Math.floor(Math.random() * references.length)] : null;

    setFormData(prev => ({
      ...prev,
      title: `Podcast Kajian [ ${randomNum} ]`,
      slug: `podcast-kajian-${randomNum}`,
      excerpt: `Ringkasan podcast kajian nomor ${randomNum}. Podcast ini membahas topik penting dalam Islam.`,
      content: `
        <p>Ini adalah deskripsi lengkap untuk podcast <strong>Podcast Kajian [ ${randomNum} ]</strong>.</p>
        <p>Dalam podcast ini, pemateri menjelaskan tentang konsep dasar dan implementasi dalam kehidupan sehari-hari.</p>
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
      tags: ['Kajian', 'Podcast', `Auto-${randomNum}`]
    }));
  }, [categories, authors, references, setFormData]);

  if (initialLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
      {/* Header with Fill Dummy Button */}
      <div className="lg:col-span-3 flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
        <div className="text-sm text-blue-800">
          <span className="font-semibold">Mode Testing:</span> Gunakan tombol di kanan untuk mengisi data dummy otomatis.
        </div>
        <Button
          type="button"
          onClick={fillDummyData}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Isi Data Dummy
        </Button>
      </div>

      {/* Left Column - Main Content */}
      <PodcastMainContent formData={formData} setFormData={setFormData} />

      {/* Right Column - Sidebar */}
      <PodcastSidebar
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
