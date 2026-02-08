import { notFound } from 'next/navigation';
import ArticleDetail from '@/components/ArticleDetail';
import VideoDetail from '@/components/VideoDetail';
import PodcastDetail from '@/components/PodcastDetail';
import { ContentData, ContentType } from '@/components/DetailLayout';

// Mock DB
const MOCK_DB: Record<string, ContentData & { type: ContentType }> = {
  'adab-menuntut-ilmu': {
    type: 'artikel',
    title: "Adab Menuntut Ilmu: Klasik dan Kontemporer",
    category: "Pendidikan Islam",
    author: {
      name: "Ahmad Fulan",
      role: "Redaktur Senior",
      image: "/next.svg"
    },
    publishedAt: "17 Januari 2026",
    readTime: "5 menit baca",
    views: "1.2k",
    content: `
      <p class="mb-4">Menuntut ilmu adalah kewajiban bagi setiap muslim. Dalam era digital saat ini, akses terhadap ilmu pengetahuan semakin mudah, namun tantangan dalam menjaga adab menuntut ilmu juga semakin besar.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Pentingnya Niat yang Lurus</h2>
      <p class="mb-4">Segala amal tergantung pada niatnya. Demikian pula dalam menuntut ilmu, niat harus dimurnikan hanya untuk mencari ridha Allah SWT, bukan untuk tujuan duniawi semata seperti kemasyhuran atau debat.</p>
      
      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-gray-700 bg-gray-50 p-4 rounded-r-lg">
        "Barangsiapa yang menuntut ilmu yang seharusnya dicari untuk mengharap wajah Allah, namun ia tidak mempelajarinya kecuali untuk mendapatkan sedikit dari kenikmatan dunia, maka ia tidak akan mencium bau surga pada hari kiamat." (HR. Abu Daud)
      </blockquote>
  
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Adab Terhadap Guru</h2>
      <p class="mb-4">Meskipun belajar bisa melalui media online, penghormatan terhadap guru atau penyampai ilmu tetap harus dijaga. Tidak boleh meremehkan atau mencari-cari kesalahan guru hanya karena perbedaan pendapat yang bersifat furu'iyah.</p>
  
      <p class="mb-4">Imam Asy-Syafi'i rahimahullah pernah berkata tentang bagaimana beliau membalik kertas dengan sangat pelan di hadapan Imam Malik karena segan dan hormat kepadanya.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Menjaga Ilmu dengan Amal</h2>
      <p class="mb-4">Ilmu tanpa amal bagaikan pohon tanpa buah. Tujuan akhir dari menuntut ilmu adalah pengamalan dalam kehidupan sehari-hari, yang tercermin dalam akhlak mulia dan ketaatan kepada Allah.</p>
      
      <p class="mb-4">Di era kontemporer, "amal" juga bisa berarti menyebarkan konten positif, menjaga lisan (ketikan) di media sosial, dan menjadi teladan bagi komunitas online maupun offline.</p>
    `,
    reference: {
      name: "Prof. Dr. Muhammad Quraish Shihab",
      role: "Pakar Tafsir & Pendiri Pusat Studi Al-Qur'an",
      image: "/next.svg",
      verified: true
    }
  },
  'kajian-tafsir-al-fatihah': {
    type: 'video',
    title: "Kajian Rutin: Tafsir Al-Fatihah",
    category: "Video Kajian",
    author: { name: "Ustadz Adi Hidayat", role: "Da'i Nasional", image: "/next.svg" },
    publishedAt: "18 Januari 2026",
    duration: "45:00",
    views: "5.4k",
    content: `
      <p class="mb-4">Dalam video kajian kali ini, Ustadz Adi Hidayat mengupas tuntas tentang kedalaman makna Surah Al-Fatihah, yang dikenal sebagai <em>Ummul Kitab</em> (Induk Al-Qur'an). Surah ini bukan sekadar pembuka, melainkan pondasi bagi seluruh ajaran Islam.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Keutamaan Surah Al-Fatihah</h2>
      <p class="mb-4">Ustadz menjelaskan bahwa Al-Fatihah adalah surah yang paling agung dalam Al-Qur'an. Tidak sah shalat seseorang tanpa membacanya. Setiap ayatnya mengandung dialog langsung antara hamba dengan Sang Pencipta.</p>

      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-gray-700 bg-gray-50 p-4 rounded-r-lg">
        "Apabila seorang hamba berkata 'Alhamdulillahi Rabbil 'Alamin', Allah menjawab: 'Hamba-Ku telah memuji-Ku'." (Hadits Qudsi)
      </blockquote>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Poin-Poin Penting Kajian</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Makna Ar-Rahman & Ar-Rahim:</strong> Perbedaan kasih sayang Allah yang luas di dunia dan kasih sayang khusus di akhirat.</li>
        <li><strong>Iyyaka Na'budu:</strong> Pentingnya tauhid dan hanya menggantungkan segala urusan kepada Allah.</li>
        <li><strong>Ihdinas Shiratal Mustaqim:</strong> Doa meminta petunjuk bukan hanya saat tersesat, tapi agar tetap istiqomah di jalan yang lurus.</li>
      </ul>

      <p class="mb-4">Simak penjelasan lengkapnya dalam video di atas untuk memahami bagaimana mengaplikasikan nilai-nilai Al-Fatihah dalam kehidupan sehari-hari.</p>
    `,
    reference: { name: "Ustadz Adi Hidayat", role: "Da'i", image: "/next.svg", verified: true }
  },
  'menjaga-hati': {
    type: 'podcast',
    title: "Podcast: Menjaga Semangat Hijrah",
    category: "Podcast Inspirasi",
    author: { name: "Hanan Attaki", role: "Founder Shift", image: "/next.svg" },
    publishedAt: "19 Januari 2026",
    duration: "30:00",
    views: "3.2k",
    content: `
      <p class="mb-4">Hijrah itu mudah, yang sulit adalah istiqomah. Dalam episode podcast kali ini, Hanan Attaki berbagi pengalaman dan nasihat bagi para pemuda yang sedang berjuang memperbaiki diri.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Mengapa Iman Naik Turun?</h2>
      <p class="mb-4">Adalah hal yang wajar jika iman mengalami fluktuasi (Yazid wa Yanqus). Namun, kita tidak boleh membiarkannya terus merosot. Hanan Attaki menekankan pentingnya memiliki <em>circle</em> atau lingkungan pertemanan yang saling mengingatkan.</p>

      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-6 text-gray-700 bg-gray-50 p-4 rounded-r-lg">
        "Teman yang baik adalah yang ketika kamu melihatnya, kamu teringat kepada Allah. Dan ketika dia berbicara, bertambah ilmumu."
      </blockquote>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Tips Menjaga Istiqomah</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Perbarui Niat:</strong> Selalu luruskan niat hijrah hanya karena Allah, bukan karena tren atau manusia.</li>
        <li><strong>Mencari Guru:</strong> Jangan belajar sendiri, carilah pembimbing yang sanad keilmuannya jelas.</li>
        <li><strong>Jangan Berhenti Berdoa:</strong> Doa <em>Ya Muqallibal Qulub</em> adalah senjata utama agar hati tetap teguh.</li>
      </ul>

      <p class="mb-4">Dengarkan selengkapnya obrolan inspiratif ini melalui player di atas.</p>
    `,
    reference: { name: "Hanan Attaki", role: "Founder Shift", image: "/next.svg", verified: true }
  }
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Simulate DB fetch. In real app, fetch(slug) -> { data, type }
  const data = MOCK_DB[slug];

  if (!data) {
    notFound();
  }

  // Render based on type
  switch (data.type) {
    case 'artikel':
      return <ArticleDetail data={data} />;
    case 'video':
      return <VideoDetail data={data} />;
    case 'podcast':
      return <PodcastDetail data={data} />;
    default:
      return notFound();
  }
}
