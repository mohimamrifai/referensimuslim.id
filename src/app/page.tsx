import CategorySidebar from "@/components/CategorySidebar";
import HeroCarousel from "@/components/HeroCarousel";
import MobileCategoryGrid from "@/components/MobileCategoryGrid";
import ContentCard, { type ContentItem } from "@/components/ContentCard";
import ContentCarousel from "@/components/ContentCarousel";
import StatsSection from "@/components/StatsSection";
import TrustBadgeSection from "@/components/TrustBadgeSection";

export default function Home() {
  const articles: ContentItem[] = [
    {
      id: "1",
      title: "Adab Menuntut Ilmu: Klasik dan Kontemporer",
      slug: "adab-menuntut-ilmu",
      excerpt:
        "Ringkasan adab penuntut ilmu menurut para ulama beserta penerapannya di era digital.",
      category: "Sumber Belajar",
      author: "Tim Redaksi",
      date: "17/01/2026",
      image: "/next.svg",
    },
    {
      id: "2",
      title: "Tadabbur Ayat: Keteguhan Hati dalam Kesulitan",
      slug: "tadabbur-ayat-keteguhan-hati",
      excerpt:
        "Pembahasan ayat-ayat yang menguatkan hati, dilengkapi referensi dari kitab tafsir.",
      category: "Studi Al-Quran",
      author: "Tim Redaksi",
      date: "16/01/2026",
      image: "/globe.svg",
    },
    {
      id: "3",
      title: "Panduan Shalat Khusyuk: Langkah Praktis",
      slug: "panduan-shalat-khusyuk",
      excerpt:
        "Tips menjaga kekhusyukan dalam shalat berdasarkan tuntunan Sunnah dan nasihat ulama.",
      category: "Praktik Ibadah",
      author: "Tim Redaksi",
      date: "15/01/2026",
      image: "/file.svg",
    },
    {
      id: "4",
      title: "Hadits Pilihan: Menjaga Lisan",
      slug: "hadits-pilihan-menjaga-lisan",
      excerpt:
        "Kumpulan hadits tentang menjaga lisan dan dampaknya dalam kehidupan sehari-hari.",
      category: "Ilmu Hadits",
      author: "Tim Redaksi",
      date: "14/01/2026",
      image: "/window.svg",
    },
  ];

  const videos: ContentItem[] = [
    {
      id: "v1",
      title: "Kajian Rutin: Tafsir Surat Al-Fatihah",
      slug: "kajian-tafsir-al-fatihah",
      duration: "45:20",
      category: "Kajian Kitab",
      author: "Ustadz Dr. Abdullah",
      date: "10/01/2026",
      image: "/window.svg",
      excerpt: "Simak kajian mendalam mengenai tafsir Surat Al-Fatihah dan rahasia yang terkandung di dalamnya.",
    },
    {
      id: "v2",
      title: "Tanya Jawab: Hukum Jual Beli Online",
      slug: "hukum-jual-beli-online",
      duration: "15:30",
      category: "Muamalah",
      author: "Ustadz Muhammad",
      date: "12/01/2026",
      image: "/globe.svg",
      excerpt: "Penjelasan lengkap mengenai hukum jual beli online menurut syariat Islam dan praktiknya.",
    },
    {
      id: "v3",
      title: "Sejarah Peradaban Islam: Masa Keemasan",
      slug: "sejarah-peradaban-islam",
      duration: "58:10",
      category: "Sejarah",
      author: "Ustadz Salim A. Fillah",
      date: "08/01/2026",
      image: "/file.svg",
      excerpt: "Menelusuri jejak kejayaan peradaban Islam dan kontribusinya bagi dunia modern.",
    },
  ];

  const podcasts: ContentItem[] = [
    {
      id: "p1",
      title: "Ep 1: Menjaga Hati di Zaman Fitnah",
      slug: "menjaga-hati",
      duration: "25:00",
      category: "Tazkiyatun Nafs",
      author: "Podcast Muslim",
      date: "14/01/2026",
      image: "/file.svg",
      excerpt: "Bagaimana cara menjaga hati agar tetap bersih di tengah gempuran fitnah akhir zaman?",
    },
    {
      id: "p2",
      title: "Ep 2: Kiat Sukses Pengusaha Muslim",
      slug: "kiat-sukses-pengusaha",
      duration: "32:15",
      category: "Bisnis Islami",
      author: "Podcast Muslim",
      date: "11/01/2026",
      image: "/window.svg",
      excerpt: "Tips dan trik menjadi pengusaha muslim yang sukses dunia dan akhirat.",
    },
    {
      id: "p3",
      title: "Ep 3: Mendidik Anak Cinta Al-Quran",
      slug: "mendidik-anak",
      duration: "28:45",
      category: "Parenting",
      author: "Podcast Muslim",
      date: "09/01/2026",
      image: "/globe.svg",
      excerpt: "Metode efektif menanamkan kecintaan pada Al-Quran sejak dini kepada anak-anak.",
    },
  ];
  return (
    <>
      <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-(--sidebar-width) bg-white overflow-hidden border-r border-gray-200 z-40">
        <CategorySidebar />
      </div>

      <div className="md:pl-(--sidebar-width) transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-6 pt-6 pb-0">
          <div className="space-y-6">
            <HeroCarousel />
            <MobileCategoryGrid />
            <div className="space-y-6">
              {/* Artikel Terbaru */}
              <ContentCarousel title="Artikel Terbaru" linkHref="/artikel">
                {articles.map((a) => (
                  <div key={a.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                    <ContentCard item={a} type="artikel" />
                  </div>
                ))}
              </ContentCarousel>

              {/* Video Pilihan */}
              <ContentCarousel title="Video Pilihan" linkHref="/video">
                {videos.map((v) => (
                  <div key={v.id} className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]">
                    <ContentCard item={v} type="video" />
                  </div>
                ))}
              </ContentCarousel>

              {/* Podcast */}
              <ContentCarousel title="Dengarkan Podcast" linkHref="/podcast">
                {podcasts.map((p) => (
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
      </div>
    </>
  );
}
