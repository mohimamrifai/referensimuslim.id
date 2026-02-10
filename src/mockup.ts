import type { ContentData, ContentType } from '@/components/DetailLayout';
import type { ContentItem } from '@/components/ContentCard';

const MOCK_IMAGE = 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=1000';
const MOCK_VIDEO_URL = 'https://www.youtube.com/embed/0HR7XHF7rWI';
const MOCK_AUDIO_URL = 'https://www.youtube.com/embed/IbNclpsajNM';

export const MOCK_DB: Record<string, ContentData & { type: ContentType }> = {
  'memahami-makna-ikhlas': {
    slug: 'memahami-makna-ikhlas',
    type: 'artikel',
    title: 'Memahami Makna Ikhlas dalam Beribadah',
    category: 'Akhlak & Tasawuf',
    subcategory: 'Tazkiyatun Nafs',
    image: MOCK_IMAGE,
    excerpt: 'Hakikat ikhlas dan aplikasinya dalam keseharian.',
    author: { name: 'Ustadz Dr. Ahmad Zainuddin', role: 'Pembina Pesantren', image: MOCK_IMAGE },
    publishedAt: '18 Januari 2026',
    readTime: '7 menit baca',
    views: '2.1k',
    content:
      `<p>Ikhlas adalah inti dari setiap amal. Ketika hati lurus dan niat murni, ibadah menjadi ringan dan bermakna.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Definisi dan Batasan</h2>
       <p>Para ulama menjelaskan bahwa ikhlas adalah memurnikan amal untuk Allah semata, tanpa mengharapkan pujian manusia.</p>
       <blockquote class="border-l-4 border-orange-500 pl-4 italic my-4 text-gray-700 bg-gray-50 p-3 rounded-r-md">Amal kecil yang ikhlas lebih bernilai daripada amal besar yang tercampur riya.</blockquote>
       <ul class="list-disc ml-6 space-y-2"><li>Jaga niat di awal</li><li>Periksa kembali ketika amal berlangsung</li><li>Berdoa agar ditetapkan di atas keikhlasan</li></ul>`,
    reference: { name: 'Imam Al-Ghazali', role: 'Ulama Tasawuf', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'menata-kehidupan-islami': {
    slug: 'menata-kehidupan-islami',
    type: 'artikel',
    title: 'Menata Kehidupan Islami di Era Digital',
    category: 'Kehidupan Islami',
    subcategory: 'Akhlak',
    image: MOCK_IMAGE,
    excerpt: 'Strategi menjaga komitmen keislaman di era digital.',
    author: { name: 'Ustadzah Fulanah', role: 'Pembina Majelis Taklim', image: MOCK_IMAGE },
    publishedAt: '12 Januari 2026',
    readTime: '6 menit baca',
    views: '1.4k',
    content:
      `<p>Era digital menghadirkan kemudahan sekaligus tantangan. Seorang muslim harus selektif dalam konsumsi informasi.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Prinsip Dasar</h2>
       <p>Gunakan teknologi untuk memperkuat ibadah dan ilmu, bukan melalaikan kewajiban.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Atur waktu menggunakan perangkat</li><li>Pilih konten bermanfaat</li><li>Jaga adab dalam interaksi online</li></ul>`,
    reference: { name: 'Dr. Yusuf Qaradhawi', role: 'Cendekiawan Islam', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'fiqh-ibadah-harian': {
    slug: 'fiqh-ibadah-harian',
    type: 'artikel',
    title: 'Fiqh Ibadah Harian: Ringkas dan Praktis',
    category: 'Fiqh & Yurisprudensi',
    subcategory: 'Fiqh Ibadah',
    image: MOCK_IMAGE,
    excerpt: 'Rangkuman fiqh ibadah harian yang praktis.',
    author: { name: 'Ustadz Abu Salim', role: 'Pengajar Fiqh', image: MOCK_IMAGE },
    publishedAt: '05 Januari 2026',
    readTime: '8 menit baca',
    views: '980',
    content:
      `<p>Fiqh ibadah harian memandu seorang muslim dalam menjalankan amal dengan benar dan sesuai tuntunan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pokok-Pokok Ibadah</h2>
       <p>Pahami syarat dan rukun ibadah agar amalan sah dan diterima.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Thaharah sebagai kunci ibadah</li><li>Shalat tepat waktu</li><li>Zikir dan doa harian</li></ul>`,
    reference: { name: 'Imam Nawawi', role: 'Ulama Fiqh', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'adab-menuntut-ilmu': {
    slug: 'adab-menuntut-ilmu',
    type: 'artikel',
    title: 'Adab Menuntut Ilmu: Klasik dan Kontemporer',
    category: 'Sumber Belajar',
    subcategory: 'Adab',
    image: MOCK_IMAGE,
    excerpt: 'Adab penuntut ilmu di era digital.',
    author: { name: 'Ahmad Fulan', role: 'Redaktur Senior', image: MOCK_IMAGE },
    publishedAt: '17 Januari 2026',
    readTime: '5 menit baca',
    views: '1.2k',
    content:
      `<p>Menuntut ilmu adalah kewajiban bagi setiap muslim. Tantangan era digital menuntut keteguhan adab.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Niat yang Lurus</h2>
       <p>Niat harus dimurnikan untuk mencari ridha Allah, bukan kebanggaan.</p>
       <blockquote class="border-l-4 border-orange-500 pl-4 italic my-4 text-gray-700 bg-gray-50 p-3 rounded-r-md">Ilmu tanpa adab bagaikan api tanpa cahaya.</blockquote>`,
    reference: { name: 'Syaikh Bakr Abu Zaid', role: 'Ulama Adab Ilmu', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'tadabbur-ayat-keteguhan-hati': {
    slug: 'tadabbur-ayat-keteguhan-hati',
    type: 'artikel',
    title: 'Tadabbur Ayat: Keteguhan Hati dalam Kesulitan',
    category: 'Pengetahuan Islam',
    subcategory: 'Studi Al-Quran',
    image: MOCK_IMAGE,
    excerpt: 'Ayat-ayat tentang keteguhan hati menguatkan jiwa untuk menghadapi ujian kehidupan.',
    author: { name: 'Tim Redaksi', role: 'Tim Penulis', image: MOCK_IMAGE },
    publishedAt: '16 Januari 2026',
    readTime: '6 menit baca',
    views: '1.8k',
    content:
      `<p>Ayat-ayat tentang keteguhan hati menguatkan jiwa untuk menghadapi ujian kehidupan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Menguatkan Keyakinan</h2>
       <p>Tadabbur membuka pintu hikmah dan ketenangan.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Merenung makna ayat</li><li>Menerapkan dalam amalan</li><li>Menyampaikan dengan adab</li></ul>`,
    reference: { name: 'Ibnu Katsir', role: 'Mufassir', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'panduan-shalat-khusyuk': {
    slug: 'panduan-shalat-khusyuk',
    type: 'artikel',
    title: 'Panduan Shalat Khusyuk: Langkah Praktis',
    category: 'Praktik Ibadah',
    subcategory: 'Shalat',
    image: MOCK_IMAGE,
    excerpt: 'Khusyuk dalam shalat adalah tujuan utama ibadah harian.',
    author: { name: 'Tim Redaksi', role: 'Tim Penulis', image: MOCK_IMAGE },
    publishedAt: '15 Januari 2026',
    readTime: '7 menit baca',
    views: '1.5k',
    content:
      `<p>Khusyuk dalam shalat adalah tujuan utama ibadah harian.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Langkah-Langkah</h2>
       <p>Persiapkan hati, fokus gerakan, dan pahami bacaan.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Hindari gangguan</li><li>Perbanyak zikir</li><li>Pelajari makna doa</li></ul>`,
    reference: { name: 'Syaikh Shalih Al-Munajjid', role: 'Pembina Dakwah', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },

  'kajian-tafsir-al-fatihah': {
    slug: 'kajian-tafsir-al-fatihah',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Kajian Rutin: Tafsir Surat Al-Fatihah',
    category: 'Pengetahuan Islam',
    subcategory: 'Studi Al-Quran',
    image: MOCK_IMAGE,
    excerpt: 'Kajian mendalam mengenai tafsir Al-Fatihah.',
    author: { name: 'Ustadz Dr. Abdullah', role: 'Dosen Tafsir', image: MOCK_IMAGE },
    publishedAt: '10 Januari 2026',
    duration: '45:20',
    views: '3.2k',
    content:
      `<p>Pembahasan mendalam tentang makna Al-Fatihah.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pokok Tafsir</h2>
       <p>Menjelaskan tujuh ayat utama sebagai ummul kitab.</p>`,
    reference: { name: 'Imam Asy-Syafi’i', role: 'Ulama Fiqh', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'hukum-jual-beli-online': {
    slug: 'hukum-jual-beli-online',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Tanya Jawab: Hukum Jual Beli Online',
    category: 'Fiqh & Yurisprudensi',
    subcategory: 'Muamalah',
    image: MOCK_IMAGE,
    excerpt: 'Hukum jual beli online menurut syariat.',
    author: { name: 'Ustadz Muhammad', role: 'Praktisi Fiqh Muamalah', image: MOCK_IMAGE },
    publishedAt: '12 Januari 2026',
    duration: '15:30',
    views: '2.0k',
    content:
      `<p>Penjelasan hukum transaksi digital dalam perspektif syariah.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Kaidah Umum</h2>
       <p>Transparansi, kejujuran, dan akad yang jelas.</p>`,
    reference: { name: 'Dr. Wahbah Az-Zuhaili', role: 'Ulama Fiqh', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'sejarah-peradaban-islam': {
    slug: 'sejarah-peradaban-islam',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Sejarah Peradaban Islam: Masa Keemasan',
    category: 'Sejarah',
    image: MOCK_IMAGE,
    excerpt: 'Jejak kejayaan peradaban Islam.',
    author: { name: 'Ustadz Salim A. Fillah', role: 'Sejarawan Islam', image: MOCK_IMAGE },
    publishedAt: '08 Januari 2026',
    duration: '58:10',
    views: '4.1k',
    content:
      `<p>Menelusuri kejayaan peradaban Islam dan kontribusinya.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Kontribusi Ilmiah</h2>
       <p>Sains, kedokteran, matematika, dan filsafat berkembang pesat.</p>`,
    reference: { name: 'Ibnu Sina', role: 'Cendekiawan', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'fikih-zakat': {
    slug: 'fikih-zakat',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Fikih Zakat: Prinsip dan Praktik',
    category: 'Fiqh & Yurisprudensi',
    subcategory: 'Fiqh Ibadah',
    image: MOCK_IMAGE,
    excerpt: 'Zakat sebagai pilar sosial dalam Islam.',
    author: { name: 'Ustadz Abu Anas', role: 'Pengajar Fiqh', image: MOCK_IMAGE },
    publishedAt: '06 Januari 2026',
    duration: '33:45',
    views: '1.1k',
    content:
      `<p>Zakat sebagai pilar sosial dalam Islam.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Objek Zakat</h2>
       <p>Emas, perniagaan, pertanian, dan pendapatan.</p>`,
    reference: { name: 'Imam Al-Mawardi', role: 'Ulama Fiqh', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: false }
  },
  'akhlak-rasul': {
    slug: 'akhlak-rasul',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Akhlak Rasulullah: Teladan Sehari-hari',
    category: 'Akhlak & Tasawuf',
    subcategory: 'Akhlak',
    image: MOCK_IMAGE,
    excerpt: 'Meneladani akhlak Rasulullah dalam setiap aspek kehidupan.',
    author: { name: 'Ustadz Fulan', role: 'Pembina Akhlak', image: MOCK_IMAGE },
    publishedAt: '04 Januari 2026',
    duration: '40:12',
    views: '1.9k',
    content:
      `<p>Meneladani akhlak Rasulullah dalam setiap aspek kehidupan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Praktik Nyata</h2>
       <p>Kejujuran, amanah, kasih sayang, dan kesabaran.</p>`,
    reference: { name: 'Imam Tirmidzi', role: 'Ulama Hadits', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'manajemen-waktu': {
    slug: 'manajemen-waktu',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Manajemen Waktu bagi Muslim Produktif',
    category: 'Kehidupan Islami',
    subcategory: 'Produktivitas',
    image: MOCK_IMAGE,
    excerpt: 'Pengaturan waktu yang efektif menambah keberkahan.',
    author: { name: 'Coach Fulan', role: 'Pelatih Produktivitas', image: MOCK_IMAGE },
    publishedAt: '03 Januari 2026',
    duration: '27:18',
    views: '860',
    content:
      `<p>Pengaturan waktu yang efektif menambah keberkahan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Metode Praktis</h2>
       <p>Prioritaskan kewajiban, batasi distraksi, dan evaluasi harian.</p>`,
    reference: { name: 'Al-Hasan Al-Bashri', role: 'Ulama', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: false }
  },

  'jiwa-jiwa-yang-rapuh': {
    slug: 'jiwa-jiwa-yang-rapuh',
    type: 'podcast',
    title: 'Jiwa Jiwa yang Rapuh - [Bincang Isu 30]',
    category: 'Akhlak & Tasawuf',
    subcategory: 'Tazkiyatun Nafs',
    image: MOCK_IMAGE,
    excerpt: 'Pembahasan mendalam mengenai fenomena jiwa yang rapuh di masa kini.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '25 Januari 2026',
    duration: '1:15:20',
    views: '2.5k',
    audioUrl: MOCK_AUDIO_URL,
    content:
      `<p>Simak pembahasan menarik mengenai bagaimana memperkuat jiwa yang rapuh menghadapi ujian zaman.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Poin Penting</h2>
       <p>Memahami akar masalah kerapuhan jiwa dan solusinya dalam Islam.</p>`,
    reference: { name: 'Ustadz Fulan', role: 'Narasumber', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },

  'menjaga-hati': {
    slug: 'menjaga-hati',
    type: 'podcast',
    title: 'Ep 1: Menjaga Hati di Zaman Fitnah',
    category: 'Akhlak & Tasawuf',
    subcategory: 'Tazkiyatun Nafs',
    image: MOCK_IMAGE,
    excerpt: 'Cara menjaga hati tetap bersih.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '14 Januari 2026',
    duration: '25:00',
    views: '1.6k',
    content:
      `<p>Menjaga kebersihan hati adalah kunci keselamatan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Langkah Menjaga Hati</h2>
       <p>Banyak istighfar, jauhi fitnah, dan perkuat iman.</p>`,
    reference: { name: 'Imam Ibnul Qayyim', role: 'Ulama', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'kiat-sukses-pengusaha': {
    slug: 'kiat-sukses-pengusaha',
    type: 'podcast',
    title: 'Ep 2: Kiat Sukses Pengusaha Muslim',
    category: 'Kehidupan Islami',
    subcategory: 'Bisnis Islami',
    image: MOCK_IMAGE,
    excerpt: 'Tips menjadi pengusaha muslim sukses.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '11 Januari 2026',
    duration: '32:15',
    views: '1.2k',
    content:
      `<p>Pengusaha muslim sukses menyeimbangkan dunia dan akhirat.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Prinsip Utama</h2>
       <p>Kejujuran, adil, dan berkah dalam transaksi.</p>`,
    reference: { name: 'Syaikh Abdurrahman As-Sa’di', role: 'Ulama', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: false }
  },
  'mendidik-anak': {
    slug: 'mendidik-anak',
    type: 'podcast',
    title: 'Ep 3: Mendidik Anak Cinta Al-Quran',
    category: 'Kehidupan Islami',
    subcategory: 'Parenting',
    image: MOCK_IMAGE,
    excerpt: 'Metode menanamkan cinta Al-Quran.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '09 Januari 2026',
    duration: '28:45',
    views: '1.3k',
    content:
      `<p>Menanamkan cinta Al-Quran sejak dini.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Metode Efektif</h2>
       <p>Teladan orang tua, rutinitas, dan suasana kondusif.</p>`,
    reference: { name: 'Syaikh Shalih Al-Fauzan', role: 'Ulama', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'tafsir-ayat-kursi-podcast': {
    slug: 'tafsir-ayat-kursi-podcast',
    type: 'podcast',
    title: 'Ep 4: Tafsir Ayat Kursi',
    category: 'Pengetahuan Islam',
    subcategory: 'Studi Al-Quran',
    image: MOCK_IMAGE,
    excerpt: 'Ayat Kursi sebagai perlindungan dan penguat iman.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '07 Januari 2026',
    duration: '22:11',
    views: '740',
    content:
      `<p>Ayat Kursi sebagai perlindungan dan penguat iman.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Intisari</h2>
       <p>Mengenal sifat-sifat Allah dan kekuasaan-Nya.</p>`,
    reference: { name: 'Syaikh Asy-Syinqithi', role: 'Mufassir', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: false }
  },
  'keluarga-sakinah-podcast': {
    slug: 'keluarga-sakinah-podcast',
    type: 'podcast',
    title: 'Ep 5: Membangun Keluarga Sakinah',
    category: 'Kehidupan Islami',
    subcategory: 'Keluarga',
    image: MOCK_IMAGE,
    excerpt: 'Keluarga sakinah dibangun di atas takwa dan komunikasi.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '06 Januari 2026',
    duration: '26:40',
    views: '820',
    content:
      `<p>Keluarga sakinah dibangun di atas takwa dan komunikasi.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pilar Keluarga</h2>
       <p>Peran suami-istri dan pendidikan anak yang seimbang.</p>`,
    reference: { name: 'Syaikh Shalih Al-Utsaimin', role: 'Ulama', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: true }
  },
  'pemuda-muslim-podcast': {
    slug: 'pemuda-muslim-podcast',
    type: 'podcast',
    title: 'Ep 6: Pemuda Muslim dan Tantangan Zaman',
    category: 'Kehidupan Islami',
    subcategory: 'Pemuda',
    image: MOCK_IMAGE,
    excerpt: 'Pemuda muslim harus kuat iman dan beradab.',
    author: { name: 'Podcast Muslim', role: 'Host', image: MOCK_IMAGE },
    publishedAt: '04 Januari 2026',
    duration: '24:05',
    views: '690',
    content:
      `<p>Pemuda muslim harus kuat iman dan beradab.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Strategi</h2>
       <p>Lingkungan baik, mentor, dan ilmu yang benar.</p>`,
    reference: { name: 'Imam Syafi’i', role: 'Ulama', image: MOCK_IMAGE, institution: 'Institut Studi Islam', verified: false }
  },
  // NEW CONTENT FOR ILMU HADITS
  'pengantar-ilmu-hadits': {
    slug: 'pengantar-ilmu-hadits',
    type: 'artikel',
    title: 'Pengantar Ilmu Mustalahul Hadits',
    category: 'Pengetahuan Islam',
    subcategory: 'Ilmu Hadits',
    image: MOCK_IMAGE,
    excerpt: 'Memahami dasar-dasar ilmu hadits untuk menjaga kemurnian sunnah.',
    author: { name: 'Ustadz Ahmad', role: 'Peneliti Hadits', image: MOCK_IMAGE },
    publishedAt: '20 Januari 2026',
    readTime: '10 menit baca',
    views: '540',
    content:
      `<p>Ilmu Mustalahul Hadits adalah kunci untuk membedakan hadits shahih dan dhaif.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pentingnya Sanad dan Matan</h2>
       <p>Sanad adalah rantai perawi, sedangkan matan adalah isi hadits. Keduanya harus valid.</p>`,
    reference: { name: 'Imam Al-Bukhari', role: 'Amirul Mukminin fil Hadits', image: MOCK_IMAGE, institution: 'Kutubus Sittah', verified: true }
  },
  // NEW CONTENT FOR AQIDAH & TEOLOGI
  'memahami-rukun-iman': {
    slug: 'memahami-rukun-iman',
    type: 'video',
    videoUrl: MOCK_VIDEO_URL,
    title: 'Memahami Rukun Iman: Pondasi Keyakinan',
    category: 'Pengetahuan Islam',
    subcategory: 'Aqidah & Teologi',
    image: MOCK_IMAGE,
    excerpt: 'Penjelasan mendalam tentang enam rukun iman.',
    author: { name: 'Ustadz Dr. Khalid', role: 'Dosen Aqidah', image: MOCK_IMAGE },
    publishedAt: '22 Januari 2026',
    duration: '1:15:00',
    views: '3.5k',
    content:
      `<p>Iman bukan sekadar ucapan, tapi keyakinan hati dan pengamalan anggota badan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Enam Pilar Iman</h2>
       <p>Iman kepada Allah, Malaikat, Kitab, Rasul, Hari Akhir, dan Takdir.</p>`,
    reference: { name: 'Imam Ath-Thahawi', role: 'Ulama Aqidah', image: MOCK_IMAGE, institution: 'Salaf', verified: true }
  }
};

const generateContentItems = (filterFn?: (item: ContentData & { type: ContentType }) => boolean): ContentItem[] => {
  return Object.entries(MOCK_DB)
    .filter(([, data]) => filterFn ? filterFn(data) : true)
    .map(([slug, data]) => ({
      id: slug,
      slug: slug,
      title: data.title,
      excerpt: data.excerpt || data.content.substring(0, 100).replace(/<[^>]*>/g, '') + '...',
      category: data.category,
      subcategory: data.subcategory?.trim(),
      author: data.author.name,
      date: data.publishedAt,
      image: data.image || data.author.image,
      type: data.type,
      duration: data.duration || data.readTime?.replace(' baca', ''),
    }));
};

export const HOME_ARTICLES: ContentItem[] = generateContentItems(item => item.type === 'artikel').slice(0, 4);
export const HOME_VIDEOS: ContentItem[] = generateContentItems(item => item.type === 'video').slice(0, 3);
export const HOME_PODCASTS: ContentItem[] = generateContentItems(item => item.type === 'podcast').slice(0, 3);

export const SEARCH_DATA: (ContentItem & { type: ContentType })[] = generateContentItems() as (ContentItem & { type: ContentType })[];

export type CategoryNode = {
  name: string;
  slug: string;
  children?: { name: string; slug: string }[];
};

export const CATEGORY_TAXONOMY: CategoryNode[] = [
  {
    name: 'Pengetahuan Islam',
    slug: 'pengetahuan-islam',
    children: [
      { name: 'Studi Al-Quran', slug: 'studi-al-quran' },
      { name: 'Ilmu Hadits', slug: 'ilmu-hadits' },
      { name: 'Fiqh & Yurisprudensi', slug: 'fiqh-yurisprudensi' },
      { name: 'Aqidah & Teologi', slug: 'aqidah-teologi' }
    ]
  },
  { 
    name: 'Praktik Ibadah', 
    slug: 'praktik-ibadah',
    children: [
      { name: 'Shalat', slug: 'shalat' },
      { name: 'Puasa', slug: 'puasa' },
      { name: 'Zakat', slug: 'zakat' },
      { name: 'Haji & Umrah', slug: 'haji-umrah' },
      { name: 'Doa & Dzikir', slug: 'doa-dzikir' }
    ]
  },
  {
    name: 'Akhlak & Tasawuf',
    slug: 'akhlak-tasawuf',
    children: [
      { name: 'Tazkiyatun Nafs', slug: 'tazkiyatun-nafs' },
      { name: 'Akhlak', slug: 'akhlak' },
      { name: 'Adab', slug: 'adab' },
      { name: 'Kisah Teladan', slug: 'kisah-teladan' }
    ]
  },
  {
    name: 'Sejarah',
    slug: 'sejarah',
    children: [
      { name: 'Sejarah Nabi', slug: 'sejarah-nabi' },
      { name: 'Sejarah Sahabat', slug: 'sejarah-sahabat' },
      { name: 'Peradaban Islam', slug: 'peradaban-islam' },
      { name: 'Tokoh Islam', slug: 'tokoh-islam' }
    ]
  },
  {
    name: 'Kehidupan Islami',
    slug: 'kehidupan-islami',
    children: [
      { name: 'Keluarga', slug: 'keluarga' },
      { name: 'Parenting', slug: 'parenting' },
      { name: 'Pernikahan', slug: 'pernikahan' },
      { name: 'Pemuda', slug: 'pemuda' },
      { name: 'Wanita Muslimah', slug: 'wanita-muslimah' },
      { name: 'Bisnis Islami', slug: 'bisnis-islami' },
      { name: 'Kesehatan', slug: 'kesehatan' },
      { name: 'Produktivitas', slug: 'produktivitas' }
    ]
  },
  {
    name: 'Sumber Belajar',
    slug: 'sumber-belajar',
    children: [
      { name: 'Buku & Kitab', slug: 'buku-kitab' },
      { name: 'Jurnal Ilmiah', slug: 'jurnal-ilmiah' },
      { name: 'Fatwa', slug: 'fatwa' },
      { name: 'Kamus Istilah', slug: 'kamus-istilah' }
    ]
  }
];

export const getCategorySlugByName = (name: string): string | undefined => {
  for (const cat of CATEGORY_TAXONOMY) {
    if (cat.name === name) return cat.slug;
    if (cat.children) {
      const child = cat.children.find(c => c.name === name);
      if (child) return child.slug;
    }
  }
  return undefined;
};

export const getCategoryDisplayNameBySlug = (slug: string): string | undefined => {
  for (const cat of CATEGORY_TAXONOMY) {
    if (cat.slug === slug) return cat.name;
    if (cat.children) {
      const child = cat.children.find(c => c.slug === slug);
      if (child) return child.name;
    }
  }
  return undefined;
};

export const listItemsByCategorySlug = (categorySlug: string, subCategorySlug?: string): ContentItem[] => {
  const categoryName = getCategoryDisplayNameBySlug(categorySlug);
  if (!categoryName) return [];

  let items = generateContentItems(item => item.category === categoryName);

  if (subCategorySlug) {
    const subCategoryName = getCategoryDisplayNameBySlug(subCategorySlug);
    if (subCategoryName) {
      items = items.filter(item => item.subcategory === subCategoryName);
    }
  }

  return items;
};
