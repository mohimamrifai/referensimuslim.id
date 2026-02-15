import { notFound } from 'next/navigation';
import ArticleDetail from '@/components/content/ArticleDetail';
import VideoDetail from '@/components/content/VideoDetail';
import PodcastDetail from '@/components/content/PodcastDetail';
import { prisma } from '@/lib/prisma';
import { ContentStatus, ContentType } from '@prisma/client';
import type { ContentData } from '@/components/layout/DetailLayout';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = await prisma.content.findFirst({
    where: {
      slug,
      status: ContentStatus.PUBLISHED,
    },
    include: {
      category: true,
      subcategory: true,
      author: true,
      reference: true,
    },
  });

  if (!content) {
    notFound();
  }

  // Format views
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'k';
    }
    return views.toString();
  };

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const contentData: ContentData = {
    slug: content.slug,
    title: content.title,
    category: content.category.name,
    subcategory: content.subcategory?.name,
    image: content.image || undefined,
    excerpt: content.excerpt || undefined,
    author: {
      name: content.author.name,
      role: content.author.role || '',
      image: content.author.image || '',
    },
    publishedAt: formatDate(content.publishedAt),
    readTime: content.readTime || undefined,
    duration: content.duration || undefined,
    views: formatViews(content.views),
    videoUrl: content.videoUrl || undefined,
    audioUrl: content.audioUrl || undefined,
    content: content.content,
    reference: {
      name: content.reference?.name || '',
      role: content.reference?.role || '',
      image: content.reference?.image || '',
      institution: content.reference?.institution || '',
      verified: content.reference?.verified || false,
    },
  };

  // Add type property to satisfy components that might expect it in data
  // although DetailLayout takes type as a separate prop.
  const dataWithType = {
    ...contentData,
    type: content.type.toLowerCase() as 'artikel' | 'video' | 'podcast',
  };

  switch (content.type) {
    case ContentType.ARTIKEL:
      return <ArticleDetail data={dataWithType} />;
    case ContentType.VIDEO:
      return <VideoDetail data={dataWithType} />;
    case ContentType.PODCAST:
      return <PodcastDetail data={dataWithType} />;
    default:
      return notFound();
  }
}
