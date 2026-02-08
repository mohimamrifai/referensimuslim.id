import HeroCarousel from "@/components/HeroCarousel";
import MobileCategoryGrid from "@/components/MobileCategoryGrid";
import ContentCard from "@/components/ContentCard";
import ContentCarousel from "@/components/ContentCarousel";
import StatsSection from "@/components/StatsSection";
import TrustBadgeSection from "@/components/TrustBadgeSection";
import { HOME_ARTICLES, HOME_VIDEOS, HOME_PODCASTS } from "@/mockup";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-6 pt-6 pb-0">
      <div className="space-y-6">
            <HeroCarousel />
            <MobileCategoryGrid />
            <div className="space-y-6">
              {/* Artikel Terbaru */}
              <ContentCarousel title="Artikel Terbaru" linkHref="/search?q=&type=artikel">
                {HOME_ARTICLES.map((a) => (
                  <div key={a.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                    <ContentCard item={a} type="artikel" />
                  </div>
                ))}
              </ContentCarousel>

              {/* Video Pilihan */}
              <ContentCarousel title="Video Pilihan" linkHref="/search?q=&type=video">
                {HOME_VIDEOS.map((v) => (
                  <div key={v.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                    <ContentCard item={v} type="video" />
                  </div>
                ))}
              </ContentCarousel>

              {/* Podcast */}
              <ContentCarousel title="Dengarkan Podcast" linkHref="/search?q=&type=podcast">
                {HOME_PODCASTS.map((p) => (
                  <div key={p.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                    <ContentCard item={p} type="podcast" />
                  </div>
                ))}
              </ContentCarousel>

              <StatsSection />
              <TrustBadgeSection />
            </div>
          </div>
        </div>
  );
}
