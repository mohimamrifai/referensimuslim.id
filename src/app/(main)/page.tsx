import HeroCarousel from "@/components/HeroCarousel";
import MobileCategoryGrid from "@/components/MobileCategoryGrid";
import ContentCard from "@/components/ContentCard";
import ContentCarousel from "@/components/ContentCarousel";
import StatsSection from "@/components/StatsSection";
import TrustBadgeSection from "@/components/TrustBadgeSection";
import { HOME_ARTICLES, HOME_VIDEOS, HOME_PODCASTS } from "@/mockup";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-6 pt-6 pb-0">
      <div className="space-y-6">
            <HeroCarousel />
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
                    {HOME_ARTICLES.slice(0, 5).map((a) => (
                        <ContentCard key={a.id} item={a} type="artikel" variant="list" />
                    ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ContentCarousel title="Artikel Terbaru" linkHref="/search?q=&type=artikel">
                  {HOME_ARTICLES.map((a) => (
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
                    {HOME_VIDEOS.slice(0, 5).map((v) => (
                        <ContentCard key={v.id} item={v} type="video" variant="list" />
                    ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ContentCarousel title="Video Pilihan" linkHref="/search?q=&type=video">
                  {HOME_VIDEOS.map((v) => (
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
                    {HOME_PODCASTS.slice(0, 5).map((p) => (
                        <ContentCard key={p.id} item={p} type="podcast" variant="list" />
                    ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ContentCarousel title="Dengarkan Podcast" linkHref="/search?q=&type=podcast">
                  {HOME_PODCASTS.map((p) => (
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
