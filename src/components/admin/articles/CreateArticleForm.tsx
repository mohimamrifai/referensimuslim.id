'use client';

import { useCallback, useEffect } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import ArticleMainContent from './ArticleMainContent';
import ArticleSidebar from './ArticleSidebar';
import { ArticleData, ArticleFormData } from './types';
import { useContentForm } from '@/hooks/useContentForm';
import { Button } from '@/components/ui/Button';
import { createArticle, updateArticle } from '@/app/actions/articles';

const initialFormData: ArticleFormData = {
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
  readTime: '',
  tags: [],
};

export default function CreateArticleForm({ initialData }: { initialData?: ArticleData }) {
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
  } = useContentForm<ArticleFormData>({
    initialData,
    initialFormData,
    apiEndpoint: '/api/admin/articles',
    redirectPath: '/dashboard/post',
    resourceName: 'article',
    createAction: createArticle,
    updateAction: updateArticle,
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
      title: `Test judul [ ${randomNum} ]`,
      slug: `test-judul-${randomNum}`,
      excerpt: `Ini adalah excerpt dummy untuk testing artikel nomor ${randomNum}. Berisi ringkasan singkat yang digenerate secara otomatis.`,
      content: `
        <p>Ini adalah konten dummy untuk artikel <strong>Test judul [ ${randomNum} ]</strong>.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <h2>Subjudul Dummy</h2>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <ul>
          <li>Poin dummy satu</li>
          <li>Poin dummy dua</li>
          <li>Poin dummy tiga</li>
        </ul>
      `,
      categoryId: randomCat ? randomCat.id : '',
      subcategoryId: randomSub ? randomSub.id : '',
      authorId: randomAuthor ? randomAuthor.id : '',
      referenceId: randomRef ? randomRef.id : '',
      status: 'PUBLISHED',
      readTime: `${Math.floor(Math.random() * 15) + 3} menit`,
      tags: ['Testing', 'Dummy Data', `Auto-${randomNum}`]
    }));
  }, [categories, authors, references, setFormData]);

  // Auto-fill dummy data on load if requested via URL param or default for dev
  useEffect(() => {
    if (!initialLoading && categories.length > 0) {
      // Check if fields are empty to avoid overwriting user input
      if (!formData.title && !formData.categoryId) {
         // Optional: Auto-fill for dev convenience, or just rely on button.
         // Given user request "tolong isikan semua field", let's call it once data is ready.
         // BUT only if we are sure this is what they want.
         // To be safe, I'll add a prominent button at the top instead of auto-filling 
         // which might be annoying if they want to type.
         // HOWEVER, the user specifically complained "masih kosong", implying they expected it to be filled.
         // So I will call it once.
         fillDummyData();
      }
    }
  }, [initialLoading, categories, fillDummyData, formData.title, formData.categoryId]); // Run when data is loaded

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
      <ArticleMainContent formData={formData} setFormData={setFormData} />

      {/* Right Column - Sidebar */}
      <ArticleSidebar
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
