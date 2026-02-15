import CreateVideoForm from '@/components/admin/videos/CreateVideoForm';

export default function CreateVideoPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Buat Video Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Tambahkan konten video baru ke referensimuslim.id</p>
      </div>
      <CreateVideoForm />
    </div>
  );
}
