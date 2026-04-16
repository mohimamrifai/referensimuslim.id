import MobileCategoryGrid from "@/components/content/MobileCategoryGrid";
import StatsSection from "@/components/home/StatsSection";
import TrustBadgeSection from "@/components/home/TrustBadgeSection";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@prisma/client";
import { getCategoryTree } from "@/app/actions/category";
import { getHeroArticles, getLatestArticles, getFeaturedVideos, getLatestPodcasts } from "@/components/home/data-fetching";
import ContentSection from "@/components/home/ContentSection";
import HeroGrid from "@/components/home/HeroGrid"; // Import the new HeroGrid component

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [heroArticles, latestArticles, featuredVideos, latestPodcasts, categories, stats] = await Promise.all([
    getHeroArticles(4), // Fetch 4 articles for the new hero section
    getLatestArticles(),
    getFeaturedVideos(),
    getLatestPodcasts(),
    getCategoryTree(),
    Promise.all([
      prisma.content.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.author.count(),
    ]).then(([articleCount, authorCount]) => ({ articleCount, authorCount })),
  ]);

  return (
    <div className="pb-0">
      <HeroGrid articles={heroArticles} />
      <div className="px-4 pt-6 space-y-6 max-w-8xl mx-auto">
        <MobileCategoryGrid categories={categories} />
        
        <div className="space-y-6 md:px-4">
          {/* Artikel Terbaru */}
          <ContentSection 
            title="Artikel Terbaru" 
            type="artikel" 
            items={latestArticles} 
            viewAllLink="/search?q=&type=artikel" 
          />

          {/* Video Pilihan */}
          <ContentSection 
            title="Video Pilihan" 
            type="video" 
            items={featuredVideos} 
            viewAllLink="/search?q=&type=video" 
          />

          {/* Podcast Terbaru */}
          <ContentSection 
            title="Podcast Terbaru" 
            type="podcast" 
            items={latestPodcasts} 
            viewAllLink="/search?q=&type=podcast" 
          />

          <StatsSection articleCount={stats.articleCount} authorCount={stats.authorCount} />
          <TrustBadgeSection />
        </div>
      </div>
    </div>
  );
}
