import { notFound } from 'next/navigation';
import ArticleDetail from '@/components/ArticleDetail';
import VideoDetail from '@/components/VideoDetail';
import PodcastDetail from '@/components/PodcastDetail';
import { MOCK_DB } from '@/mockup';

// centralized data from src/mockup.ts

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Simulate DB fetch. In real app, fetch(slug) -> { data, type }
  const data = MOCK_DB[slug];

  if (!data) {
    notFound();
  }

  // Render based on type
  switch (data.type) {
    case 'artikel':
      return <ArticleDetail data={data} />;
    case 'video':
      return <VideoDetail data={data} />;
    case 'podcast':
      return <PodcastDetail data={data} />;
    default:
      return notFound();
  }
}
