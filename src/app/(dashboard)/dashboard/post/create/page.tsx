import CreateArticleForm from '@/components/admin/CreateArticleForm';

export default function CreateArticlePage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buat Artikel Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Tulis dan publish artikel baru ke referensimuslim.id</p>
      </div>
      <CreateArticleForm />
    </div>
  );
}
