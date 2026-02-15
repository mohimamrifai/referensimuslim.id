import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CreateVideoForm from '@/components/admin/videos/CreateVideoForm';

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

export default async function EditVideoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const video = await prisma.content.findUnique({
    where: { id: params.id },
    include: {
      tags: true,
    },
  });

  if (!video) {
    notFound();
  }

  const formattedVideo: VideoData = {
    ...video,
    tags: video.tags.map((t) => t.name),
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Video</h1>
        <p className="text-gray-500 text-sm mt-1">Perbarui konten video.</p>
      </div>
      <CreateVideoForm initialData={formattedVideo} />
    </div>
  );
}
