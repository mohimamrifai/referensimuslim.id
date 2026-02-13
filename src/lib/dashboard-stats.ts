import { prisma } from '@/lib/prisma';
import { ContentType } from '@prisma/client';

export type DashboardStats = {
  totalViews: number;
  totalContent: number;
  totalArticles: number;
  totalVideos: number;
  totalPodcasts: number;
  topContent: Array<{
    title: string;
    views: number;
    viewsDisplay: string;
    type: string;
    category: string;
    slug: string;
  }>;
  categoryDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  popularCategories: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  typeDistribution: Array<{
    name: string;
    views: number;
    count: number;
  }>;
};

// Warna untuk kategori
const CATEGORY_COLORS = [
  '#EA580C', // orange-600
  '#2563EB', // blue-600
  '#16A34A', // green-600
  '#9333EA', // purple-600
  '#DB2777', // pink-600
  '#CA8A04', // yellow-600
  '#0891B2', // cyan-600
];

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalContent,
    totalArticles,
    totalVideos,
    totalPodcasts,
    contentStats,
    topContents,
    categoryStats
  ] = await Promise.all([
    prisma.content.count(),
    prisma.content.count({ where: { type: ContentType.ARTIKEL } }),
    prisma.content.count({ where: { type: ContentType.VIDEO } }),
    prisma.content.count({ where: { type: ContentType.PODCAST } }),
    prisma.content.aggregate({
      _sum: { views: true }
    }),
    // Top Content (Top 5)
    prisma.content.findMany({
      take: 5,
      orderBy: { views: 'desc' },
      include: {
        category: {
          select: { name: true }
        }
      }
    }),
    // Category Distribution
    prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: { contents: true }
        }
      }
    })
  ]);

  const totalViews = contentStats._sum.views || 0;

  // Process Category Distribution
  const categoryDistribution = categoryStats
    .map((cat, index) => ({
      name: cat.name,
      value: cat._count.contents,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    .filter(cat => cat.value > 0)
    .sort((a, b) => b.value - a.value);

  // Process Type Distribution
  // Note: Prisma doesn't support easy group by with sum in one query for this structure perfectly without raw query or multiple queries
  // So we'll run 3 quick aggregations for views by type
  const [articleViews, videoViews, podcastViews] = await Promise.all([
    prisma.content.aggregate({ where: { type: ContentType.ARTIKEL }, _sum: { views: true } }),
    prisma.content.aggregate({ where: { type: ContentType.VIDEO }, _sum: { views: true } }),
    prisma.content.aggregate({ where: { type: ContentType.PODCAST }, _sum: { views: true } }),
  ]);

  const typeDistribution = [
    { name: 'Artikel', views: articleViews._sum.views || 0, count: totalArticles },
    { name: 'Video', views: videoViews._sum.views || 0, count: totalVideos },
    { name: 'Podcast', views: podcastViews._sum.views || 0, count: totalPodcasts },
  ];

  // Process Top Content
  const topContentProcessed = topContents.map(item => ({
    title: item.title,
    views: item.views,
    viewsDisplay: formatViews(item.views),
    type: item.type.toLowerCase(),
    category: item.category.name,
    slug: item.slug,
  }));

  // Popular Categories (Top 5 by Views) - This requires a more complex query or aggregation
  // For simplicity and performance, we'll approximate popularity by content count for now, 
  // or we could fetch all contents and aggregate in memory (bad for large data), 
  // or use raw query. Let's use raw query for accuracy if needed, but for now let's reuse categoryDistribution
  // which is based on content count. If we want views, we need:
  // SELECT c.name, SUM(cnt.views) FROM Category c JOIN Content cnt ON ... GROUP BY c.id
  
  // Let's stick to content count for "Popular Categories" chart for now as it's already fetched
  const popularCategories = [...categoryDistribution].slice(0, 5);

  return {
    totalViews,
    totalContent,
    totalArticles,
    totalVideos,
    totalPodcasts,
    topContent: topContentProcessed,
    categoryDistribution,
    popularCategories,
    typeDistribution,
  };
}
