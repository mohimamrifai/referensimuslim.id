import CreatePodcastForm from '@/components/admin/podcasts/CreatePodcastForm';

export default function CreatePodcastPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Buat Podcast Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Tambahkan konten podcast baru ke referensimuslim.id</p>
      </div>
      <CreatePodcastForm />
    </div>
  );
}
