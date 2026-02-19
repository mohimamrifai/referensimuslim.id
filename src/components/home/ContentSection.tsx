import Link from "next/link";
import ContentCard, { ContentItem } from "@/components/content/ContentCard";
import ContentCarousel from "@/components/content/ContentCarousel";

interface ContentSectionProps {
  title: string;
  type: 'artikel' | 'video' | 'podcast';
  items: ContentItem[];
  viewAllLink: string;
}

export default function ContentSection({ title, type, items, viewAllLink }: ContentSectionProps) {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <Link href={viewAllLink} className="text-orange-600 font-bold text-sm hover:underline">
            Lihat Semua
          </Link>
        </div>
        <div className="flex flex-col">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type={type} variant="list" />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <ContentCarousel title={title} linkHref={viewAllLink}>
          {items.map((item) => (
            <div key={item.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
              <ContentCard item={item} type={type} />
            </div>
          ))}
        </ContentCarousel>
      </div>
    </>
  );
}
