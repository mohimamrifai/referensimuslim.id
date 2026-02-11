import HeroCarousel, { HeroSlide } from "@/components/HeroCarousel";
import MobileCategoryGrid from "@/components/MobileCategoryGrid";
import ContentCard, { ContentItem } from "@/components/ContentCard";
import ContentCarousel from "@/components/ContentCarousel";
import StatsSection from "@/components/StatsSection";
import TrustBadgeSection from "@/components/TrustBadgeSection";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ContentType, ContentStatus } from "@prisma/client";

export const dynamic = 'force-dynamic';

async function getHeroArticles(): Promise<HeroSlide[]> {
  try {
    const articles = await prisma.content.findMany({
      where: {
        type: ContentType.ARTIKEL,
        status: ContentStatus.PUBLISHED,
      },
      take: 5, // Limit to 5 for Hero
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        subcategory: true,
        author: true,
      },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || "",
      category: article.subcategory?.name || article.category.name,
      author: article.author.name,
      date: new Date(article.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      image: article.image || "/placeholder.jpg",
      href: `/${article.slug}`,
    }));
  } catch (error) {
    console.error("Error fetching hero articles:", error);
    return [];
  }
}

async function getLatestArticles(): Promise<ContentItem[]> {
  try {
    const articles = await prisma.content.findMany({
      where: {
        type: ContentType.ARTIKEL,
        status: ContentStatus.PUBLISHED,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        subcategory: true,
        author: true,
      },
    });

    return articles.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      image: article.image || "/placeholder.jpg",
      category: article.category.name,
      subcategory: article.subcategory?.name,
      date: new Date(article.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      author: article.author.name,
      excerpt: article.excerpt || "",
      duration: article.readTime || "5 menit", // Use readTime if available
      type: 'artikel',
    }));
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

async function getFeaturedVideos(): Promise<ContentItem[]> {
  try {
    const videos = await prisma.content.findMany({
      where: {
        type: ContentType.VIDEO,
        status: ContentStatus.PUBLISHED,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        subcategory: true,
        author: true,
      },
    });

    return videos.map((video) => ({
      id: video.id,
      title: video.title,
      slug: video.slug,
      image: video.image || "/placeholder.jpg",
      category: video.category.name,
      subcategory: video.subcategory?.name,
      date: new Date(video.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      author: video.author.name,
      excerpt: video.excerpt || "",
      duration: video.duration || "00:00",
      type: 'video',
    }));
  } catch (error) {
    console.error("Error fetching featured videos:", error);
    return [];
  }
}

async function getLatestPodcasts(): Promise<ContentItem[]> {
  try {
    const podcasts = await prisma.content.findMany({
      where: {
        type: ContentType.PODCAST,
        status: ContentStatus.PUBLISHED,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        subcategory: true,
        author: true,
      },
    });

    return podcasts.map((podcast) => ({
      id: podcast.id,
      title: podcast.title,
      slug: podcast.slug,
      image: podcast.image || "/placeholder.jpg",
      category: podcast.category.name,
      subcategory: podcast.subcategory?.name,
      date: new Date(podcast.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      author: podcast.author.name,
      excerpt: podcast.excerpt || "",
      duration: podcast.duration || "00:00",
      type: 'podcast',
    }));
  } catch (error) {
    console.error("Error fetching latest podcasts:", error);
    return [];
  }
}

export default async function Home() {
  const [heroSlides, latestArticles, featuredVideos, latestPodcasts] = await Promise.all([
    getHeroArticles(),
    getLatestArticles(),
    getFeaturedVideos(),
    getLatestPodcasts()
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-6 pt-6 pb-0">
      <div className="space-y-6">
            <HeroCarousel slides={heroSlides} />
            <MobileCategoryGrid />
            <div className="space-y-6">
              {/* Artikel Terbaru */}
              <div className="md:hidden">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Artikel Terbaru</h2>
                    <Link href="/search?q=&type=artikel" className="text-orange-600 font-bold text-sm hover:underline">
                        Lihat Semua
                    </Link>
                </div>
                <div className="flex flex-col">
                    {latestArticles.slice(0, 5).map((a) => (
                        <ContentCard key={a.id} item={a} type="artikel" variant="list" />
                    ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ContentCarousel title="Artikel Terbaru" linkHref="/search?q=&type=artikel">
                  {latestArticles.map((a) => (
                    <div key={a.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                      <ContentCard item={a} type="artikel" />
                    </div>
                  ))}
                </ContentCarousel>
              </div>

              {/* Video Pilihan */}
              <div className="md:hidden">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Video Pilihan</h2>
                    <Link href="/search?q=&type=video" className="text-orange-600 font-bold text-sm hover:underline">
                        Lihat Semua
                    </Link>
                </div>
                <div className="flex flex-col">
                    {featuredVideos.slice(0, 5).map((v) => (
                        <ContentCard key={v.id} item={v} type="video" variant="list" />
                    ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ContentCarousel title="Video Pilihan" linkHref="/search?q=&type=video">
                  {featuredVideos.map((v) => (
                    <div key={v.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                      <ContentCard item={v} type="video" />
                    </div>
                  ))}
                </ContentCarousel>
              </div>

              {/* Podcast */}
              <div className="md:hidden">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Dengarkan Podcast</h2>
                    <Link href="/search?q=&type=podcast" className="text-orange-600 font-bold text-sm hover:underline">
                        Lihat Semua
                    </Link>
                </div>
                <div className="flex flex-col">
                    {latestPodcasts.slice(0, 5).map((p) => (
                        <ContentCard key={p.id} item={p} type="podcast" variant="list" />
                    ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ContentCarousel title="Dengarkan Podcast" linkHref="/search?q=&type=podcast">
                  {latestPodcasts.map((p) => (
                    <div key={p.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                      <ContentCard item={p} type="podcast" />
                    </div>
                  ))}
                </ContentCarousel>
              </div>

              <StatsSection />
              <TrustBadgeSection />
            </div>
          </div>
        </div>
  );
}
