import StatsSection from "@/components/home/StatsSection";
import TrustBadgeSection from "@/components/home/TrustBadgeSection";
import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@prisma/client";
import { getCategoryTree } from "@/app/actions/category";
import { getHeroArticles, getLatestArticles, getFeaturedVideos, getLatestPodcasts } from "@/components/home/data-fetching";
import HeroGrid from "@/components/home/HeroGrid"; // Import the new HeroGrid component
import ContentCard from "@/components/content/ContentCard";
import AdSpaceServer from "@/components/content/AdSpaceServer";
import Link from "next/link";
import Image from "next/image";

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
      <div className="px-4 md:px-8 pt-8 pb-12 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column - 9/12 */}
          <div className="w-full lg:w-9/12 space-y-6">
            {/* Artikel Terbaru */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Artikel Terbaru</h2>
                <Link href="/search?q=&type=artikel" className="text-orange-600 font-bold text-sm hover:underline">
                  Lihat Semua
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                {latestArticles.map((article, index) => (
                  <div key={article.id} className={index > 0 ? "sm:block" : ""}>
                    {/* Default card (always shown on desktop, only for 1st item on mobile) */}
                    <div className={index > 0 ? "hidden sm:block" : "block"}>
                      <ContentCard item={article} type="artikel" />
                    </div>
                    {/* List card (only shown on mobile for 2nd item onwards) */}
                    {index > 0 && (
                      <div className="block sm:hidden border-b border-gray-100 pb-4 bg-white p-2 rounded-md shadow-sm last:border-0 last:pb-0">
                        <Link href={`/artikel/${article.slug}`} className="flex gap-4 items-start group p-2">
                          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={article.image || '/placeholder.jpg'}
                              alt={article.title}
                              fill
                              sizes="96px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 transition-colors leading-snug mb-1">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                              {article.excerpt}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">
                              {article.date}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <AdSpaceServer position="HOME_MIDDLE" />

            {/* Video Pilihan */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Video Pilihan</h2>
                <Link href="/search?q=&type=video" className="text-orange-600 font-bold text-sm hover:underline">
                  Lihat Semua
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                {featuredVideos.map((video, index) => (
                  <div key={video.id} className={index > 0 ? "sm:block" : ""}>
                    {/* Default card (always shown on desktop, only for 1st item on mobile) */}
                    <div className={index > 0 ? "hidden sm:block" : "block"}>
                      <ContentCard item={video} type="video" />
                    </div>
                    {/* List card (only shown on mobile for 2nd item onwards) */}
                    {index > 0 && (
                      <div className="block sm:hidden border-b border-gray-100 pb-4 bg-white p-2 rounded-md shadow-sm last:border-0 last:pb-0">
                        <Link href={`/video/${video.slug}`} className="flex gap-4 items-start group p-2">
                          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={video.image || '/placeholder.jpg'}
                              alt={video.title}
                              fill
                              sizes="96px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Tambahan icon Play untuk video */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 transition-colors leading-snug mb-1">
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                              {video.excerpt}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">
                              {video.date}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Podcast Terbaru */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">Podcast Terbaru</h2>
                <Link href="/search?q=&type=podcast" className="text-orange-600 font-bold text-sm hover:underline">
                  Lihat Semua
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
                {latestPodcasts.map((podcast, index) => (
                  <div key={podcast.id} className={index > 0 ? "sm:block" : ""}>
                    {/* Default card (always shown on desktop, only for 1st item on mobile) */}
                    <div className={index > 0 ? "hidden sm:block" : "block"}>
                      <ContentCard item={podcast} type="podcast" />
                    </div>
                    {/* List card (only shown on mobile for 2nd item onwards) */}
                    {index > 0 && (
                      <div className="block sm:hidden border-b border-gray-100 pb-4 bg-white p-2 rounded-md shadow-sm last:border-0 last:pb-0">
                        <Link href={`/podcast/${podcast.slug}`} className="flex gap-4 items-start group p-2">
                          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={podcast.image || '/placeholder.jpg'}
                              alt={podcast.title}
                              fill
                              sizes="96px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {/* Tambahan icon Headphone/Audio untuk podcast */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headphones"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 transition-colors leading-snug mb-1">
                              {podcast.title}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                              {podcast.excerpt}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">
                              {podcast.date}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - 3/12 */}
          <div className="w-full lg:w-3/12 space-y-8">
            {/* Categories */}
            <div className="">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 p-4 bg-orange-600 text-white">Kategori</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/search?category=${category.id}`}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 text-sm font-medium rounded-md transition-colors border border-orange-200"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Rekomendasi / Artikel Terkait */}
            <div className="">
              <h3 className="bg-orange-600 text-white text-lg font-bold p-4 border-b border-orange-500 mb-4">Rekomendasi</h3>
              <div className="space-y-5">
                {latestArticles.slice(0, 5).map((article) => (
                  <Link key={article.id} href={`/artikel/${article.slug}`} className="flex gap-4 items-start group border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={article.image || '/placeholder.jpg'}
                        alt={article.title}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 group-hover:text-orange-600 line-clamp-2 transition-colors leading-snug mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {article.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sticky Ad Space 1:1 */}
            <div className="sticky top-28 pt-4 w-full aspect-square">
              <AdSpaceServer position="SIDEBAR_BOTTOM" />
            </div>
          </div>

        </div>
        <StatsSection articleCount={stats.articleCount} authorCount={stats.authorCount} />
        <TrustBadgeSection />
      </div>
    </div>
  );
}
