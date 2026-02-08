import { MOCK_DB } from '@/mockup';
import type { ContentType } from '@/components/ContentCard';

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
    type: ContentType;
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

const parseViews = (viewsStr: string): number => {
  if (!viewsStr) return 0;
  const lower = viewsStr.toLowerCase();
  if (lower.endsWith('k')) {
    return parseFloat(lower.replace('k', '')) * 1000;
  }
  if (lower.endsWith('m')) {
    return parseFloat(lower.replace('m', '')) * 1000000;
  }
  return parseInt(lower.replace(/[^0-9]/g, ''), 10);
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

export const getDashboardStats = (): DashboardStats => {
  const items = Object.entries(MOCK_DB).map(([slug, data]) => ({
    ...data,
    slug,
    viewsCount: parseViews(data.views),
  }));

  const totalContent = items.length;
  const totalViews = items.reduce((acc, item) => acc + item.viewsCount, 0);

  const articles = items.filter(item => item.type === 'artikel');
  const videos = items.filter(item => item.type === 'video');
  const podcasts = items.filter(item => item.type === 'podcast');

  // Top Content (Top 5)
  const topContent = [...items]
    .sort((a, b) => b.viewsCount - a.viewsCount)
    .slice(0, 5)
    .map(item => ({
      title: item.title,
      views: item.viewsCount,
      viewsDisplay: item.views,
      type: item.type as ContentType,
      category: item.category,
      slug: item.slug,
    }));

  // Category Distribution (All Categories)
  const categoryMap = new Map<string, number>();
  items.forEach(item => {
    const count = categoryMap.get(item.category) || 0;
    categoryMap.set(item.category, count + 1);
  });

  const categoryDistribution = Array.from(categoryMap.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);

  // Popular Categories (Top 5 by Views)
  const categoryViewsMap = new Map<string, number>();
  items.forEach(item => {
    const views = categoryViewsMap.get(item.category) || 0;
    categoryViewsMap.set(item.category, views + item.viewsCount);
  });

  const popularCategories = Array.from(categoryViewsMap.entries())
    .map(([name, value], index) => ({
      name,
      value,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Type Distribution (Average Views)
  const getTypeStats = (items: typeof articles, name: string) => {
    const totalViews = items.reduce((acc, item) => acc + item.viewsCount, 0);
    return {
      name,
      views: items.length ? Math.round(totalViews / items.length) : 0,
      count: items.length,
    };
  };

  const typeDistribution = [
    getTypeStats(articles, 'Artikel'),
    getTypeStats(videos, 'Video'),
    getTypeStats(podcasts, 'Podcast'),
  ];

  return {
    totalViews,
    totalContent,
    totalArticles: articles.length,
    totalVideos: videos.length,
    totalPodcasts: podcasts.length,
    topContent,
    categoryDistribution,
    popularCategories,
    typeDistribution,
  };
};
