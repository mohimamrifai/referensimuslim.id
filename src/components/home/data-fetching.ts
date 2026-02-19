import { prisma } from "@/lib/prisma";
import { ContentType, ContentStatus } from "@prisma/client";
import { HeroSlide } from "@/components/home/HeroCarousel";
import { ContentItem } from "@/components/content/ContentCard";

export async function getHeroArticles(): Promise<HeroSlide[]> {
  try {
    const articles = await prisma.content.findMany({
      where: {
        type: ContentType.ARTIKEL,
        status: ContentStatus.PUBLISHED,
      },
      take: 5,
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

export async function getLatestArticles(): Promise<ContentItem[]> {
  try {
    const articles = await prisma.content.findMany({
      where: {
        type: ContentType.ARTIKEL,
        status: ContentStatus.PUBLISHED,
      },
      take: 6,
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
      duration: article.readTime || "5 menit",
      type: 'artikel',
    }));
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

export async function getFeaturedVideos(): Promise<ContentItem[]> {
  try {
    const videos = await prisma.content.findMany({
      where: {
        type: ContentType.VIDEO,
        status: ContentStatus.PUBLISHED,
      },
      take: 6,
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

export async function getLatestPodcasts(): Promise<ContentItem[]> {
  try {
    const podcasts = await prisma.content.findMany({
      where: {
        type: ContentType.PODCAST,
        status: ContentStatus.PUBLISHED,
      },
      take: 6,
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
