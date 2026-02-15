import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CreatePodcastForm from '@/components/admin/podcasts/CreatePodcastForm';

interface PodcastData {
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

export default async function EditPodcastPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const podcast = await prisma.content.findUnique({
    where: { id: params.id },
    include: {
      tags: true,
    },
  });

  if (!podcast) {
    notFound();
  }

  const formattedPodcast: PodcastData = {
    ...podcast,
    tags: podcast.tags.map((t) => t.name),
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Podcast</h1>
        <p className="text-gray-500 text-sm mt-1">Perbarui konten podcast.</p>
      </div>
      <CreatePodcastForm initialData={formattedPodcast} />
    </div>
  );
}
