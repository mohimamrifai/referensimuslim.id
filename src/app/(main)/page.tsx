import HeroCarousel from "@/components/home/HeroCarousel";
import MobileCategoryGrid from "@/components/content/MobileCategoryGrid";
import StatsSection from "@/components/home/StatsSection";
import TrustBadgeSection from "@/components/home/TrustBadgeSection";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@prisma/client";
import { getCategoryTree } from "@/app/actions/category";
import AdSpace from "@/components/content/AdSpace";
import { getHeroArticles, getLatestArticles, getFeaturedVideos, getLatestPodcasts } from "@/components/home/data-fetching";
import ContentSection from "@/components/home/ContentSection";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [heroSlides, latestArticles, featuredVideos, latestPodcasts, categories, stats] = await Promise.all([
    getHeroArticles(),
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
    <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-6 pt-6 pb-0">
      <div className="space-y-6">
        <HeroCarousel slides={heroSlides} />
        <AdSpace position="HOME_TOP" />
        <MobileCategoryGrid categories={categories} />
        
        <div className="space-y-6">
          {/* Artikel Terbaru */}
          <ContentSection 
            title="Artikel Terbaru" 
            type="artikel" 
            items={latestArticles} 
            viewAllLink="/search?q=&type=artikel" 
          />

          <AdSpace position="HOME_MIDDLE" />

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
