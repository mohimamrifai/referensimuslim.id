import type { ContentData, ContentType } from '@/components/DetailLayout';
import type { ContentItem } from '@/components/ContentCard';

export const MOCK_DB: Record<string, ContentData & { type: ContentType }> = {
  'memahami-makna-ikhlas': {
    type: 'artikel',
    title: 'Memahami Makna Ikhlas dalam Beribadah',
    category: 'Akhlak & Tasawuf',
    author: { name: 'Ustadz Dr. Ahmad Zainuddin', role: 'Pembina Pesantren', image: '/window.svg' },
    publishedAt: '18 Januari 2026',
    readTime: '7 menit baca',
    views: '2.1k',
    content:
      `<p>Ikhlas adalah inti dari setiap amal. Ketika hati lurus dan niat murni, ibadah menjadi ringan dan bermakna.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Definisi dan Batasan</h2>
       <p>Para ulama menjelaskan bahwa ikhlas adalah memurnikan amal untuk Allah semata, tanpa mengharapkan pujian manusia.</p>
       <blockquote class="border-l-4 border-orange-500 pl-4 italic my-4 text-gray-700 bg-gray-50 p-3 rounded-r-md">Amal kecil yang ikhlas lebih bernilai daripada amal besar yang tercampur riya.</blockquote>
       <ul class="list-disc ml-6 space-y-2"><li>Jaga niat di awal</li><li>Periksa kembali ketika amal berlangsung</li><li>Berdoa agar ditetapkan di atas keikhlasan</li></ul>`,
    reference: { name: 'Imam Al-Ghazali', role: 'Ulama Tasawuf', image: '/globe.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'menata-kehidupan-islami': {
    type: 'artikel',
    title: 'Menata Kehidupan Islami di Era Digital',
    category: 'Kehidupan Islami',
    author: { name: 'Ustadzah Fulanah', role: 'Pembina Majelis Taklim', image: '/globe.svg' },
    publishedAt: '12 Januari 2026',
    readTime: '6 menit baca',
    views: '1.4k',
    content:
      `<p>Era digital menghadirkan kemudahan sekaligus tantangan. Seorang muslim harus selektif dalam konsumsi informasi.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Prinsip Dasar</h2>
       <p>Gunakan teknologi untuk memperkuat ibadah dan ilmu, bukan melalaikan kewajiban.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Atur waktu menggunakan perangkat</li><li>Pilih konten bermanfaat</li><li>Jaga adab dalam interaksi online</li></ul>`,
    reference: { name: 'Dr. Yusuf Qaradhawi', role: 'Cendekiawan Islam', image: '/file.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'fiqh-ibadah-harian': {
    type: 'artikel',
    title: 'Fiqh Ibadah Harian: Ringkas dan Praktis',
    category: 'Fiqh & Yurisprudensi',
    author: { name: 'Ustadz Abu Salim', role: 'Pengajar Fiqh', image: '/file.svg' },
    publishedAt: '05 Januari 2026',
    readTime: '8 menit baca',
    views: '980',
    content:
      `<p>Fiqh ibadah harian memandu seorang muslim dalam menjalankan amal dengan benar dan sesuai tuntunan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pokok-Pokok Ibadah</h2>
       <p>Pahami syarat dan rukun ibadah agar amalan sah dan diterima.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Thaharah sebagai kunci ibadah</li><li>Shalat tepat waktu</li><li>Zikir dan doa harian</li></ul>`,
    reference: { name: 'Imam Nawawi', role: 'Ulama Fiqh', image: '/next.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'adab-menuntut-ilmu': {
    type: 'artikel',
    title: 'Adab Menuntut Ilmu: Klasik dan Kontemporer',
    category: 'Sumber Belajar',
    author: { name: 'Ahmad Fulan', role: 'Redaktur Senior', image: '/next.svg' },
    publishedAt: '17 Januari 2026',
    readTime: '5 menit baca',
    views: '1.2k',
    content:
      `<p>Menuntut ilmu adalah kewajiban bagi setiap muslim. Tantangan era digital menuntut keteguhan adab.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Niat yang Lurus</h2>
       <p>Niat harus dimurnikan untuk mencari ridha Allah, bukan kebanggaan.</p>
       <blockquote class="border-l-4 border-orange-500 pl-4 italic my-4 text-gray-700 bg-gray-50 p-3 rounded-r-md">Ilmu tanpa adab bagaikan api tanpa cahaya.</blockquote>`,
    reference: { name: 'Syaikh Bakr Abu Zaid', role: 'Ulama Adab Ilmu', image: '/window.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'tadabbur-ayat-keteguhan-hati': {
    type: 'artikel',
    title: 'Tadabbur Ayat: Keteguhan Hati dalam Kesulitan',
    category: 'Studi Al-Quran',
    author: { name: 'Tim Redaksi', role: 'Tim Penulis', image: '/globe.svg' },
    publishedAt: '16 Januari 2026',
    readTime: '6 menit baca',
    views: '1.8k',
    content:
      `<p>Ayat-ayat tentang keteguhan hati menguatkan jiwa untuk menghadapi ujian kehidupan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Menguatkan Keyakinan</h2>
       <p>Tadabbur membuka pintu hikmah dan ketenangan.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Merenung makna ayat</li><li>Menerapkan dalam amalan</li><li>Menyampaikan dengan adab</li></ul>`,
    reference: { name: 'Ibnu Katsir', role: 'Mufassir', image: '/file.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'panduan-shalat-khusyuk': {
    type: 'artikel',
    title: 'Panduan Shalat Khusyuk: Langkah Praktis',
    category: 'Praktik Ibadah',
    author: { name: 'Tim Redaksi', role: 'Tim Penulis', image: '/file.svg' },
    publishedAt: '15 Januari 2026',
    readTime: '7 menit baca',
    views: '1.5k',
    content:
      `<p>Khusyuk dalam shalat adalah tujuan utama ibadah harian.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Langkah-Langkah</h2>
       <p>Persiapkan hati, fokus gerakan, dan pahami bacaan.</p>
       <ul class="list-disc ml-6 space-y-2"><li>Hindari gangguan</li><li>Perbanyak zikir</li><li>Pelajari makna doa</li></ul>`,
    reference: { name: 'Syaikh Shalih Al-Munajjid', role: 'Pembina Dakwah', image: '/window.svg', institution: 'Institut Studi Islam', verified: true }
  },

  'kajian-tafsir-al-fatihah': {
    type: 'video',
    title: 'Kajian Rutin: Tafsir Surat Al-Fatihah',
    category: 'Kajian Kitab',
    author: { name: 'Ustadz Dr. Abdullah', role: 'Dosen Tafsir', image: '/window.svg' },
    publishedAt: '10 Januari 2026',
    duration: '45:20',
    views: '3.2k',
    content:
      `<p>Pembahasan mendalam tentang makna Al-Fatihah.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pokok Tafsir</h2>
       <p>Menjelaskan tujuh ayat utama sebagai ummul kitab.</p>`,
    reference: { name: 'Imam Asy-Syafi’i', role: 'Ulama Fiqh', image: '/globe.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'hukum-jual-beli-online': {
    type: 'video',
    title: 'Tanya Jawab: Hukum Jual Beli Online',
    category: 'Muamalah',
    author: { name: 'Ustadz Muhammad', role: 'Praktisi Fiqh Muamalah', image: '/globe.svg' },
    publishedAt: '12 Januari 2026',
    duration: '15:30',
    views: '2.0k',
    content:
      `<p>Penjelasan hukum transaksi digital dalam perspektif syariah.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Kaidah Umum</h2>
       <p>Transparansi, kejujuran, dan akad yang jelas.</p>`,
    reference: { name: 'Dr. Wahbah Az-Zuhaili', role: 'Ulama Fiqh', image: '/file.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'sejarah-peradaban-islam': {
    type: 'video',
    title: 'Sejarah Peradaban Islam: Masa Keemasan',
    category: 'Sejarah',
    author: { name: 'Ustadz Salim A. Fillah', role: 'Sejarawan Islam', image: '/file.svg' },
    publishedAt: '08 Januari 2026',
    duration: '58:10',
    views: '4.1k',
    content:
      `<p>Menelusuri kejayaan peradaban Islam dan kontribusinya.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Kontribusi Ilmiah</h2>
       <p>Sains, kedokteran, matematika, dan filsafat berkembang pesat.</p>`,
    reference: { name: 'Ibnu Sina', role: 'Cendekiawan', image: '/next.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'fikih-zakat': {
    type: 'video',
    title: 'Fikih Zakat: Prinsip dan Praktik',
    category: 'Fiqh & Yurisprudensi',
    author: { name: 'Ustadz Abu Anas', role: 'Pengajar Fiqh', image: '/next.svg' },
    publishedAt: '06 Januari 2026',
    duration: '33:45',
    views: '1.1k',
    content:
      `<p>Zakat sebagai pilar sosial dalam Islam.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Objek Zakat</h2>
       <p>Emas, perniagaan, pertanian, dan pendapatan.</p>`,
    reference: { name: 'Imam Al-Mawardi', role: 'Ulama Fiqh', image: '/window.svg', institution: 'Institut Studi Islam', verified: false }
  },
  'akhlak-rasul': {
    type: 'video',
    title: 'Akhlak Rasulullah: Teladan Sehari-hari',
    category: 'Akhlak',
    author: { name: 'Ustadz Fulan', role: 'Pembina Akhlak', image: '/globe.svg' },
    publishedAt: '04 Januari 2026',
    duration: '40:12',
    views: '1.9k',
    content:
      `<p>Meneladani akhlak Rasulullah dalam setiap aspek kehidupan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Praktik Nyata</h2>
       <p>Kejujuran, amanah, kasih sayang, dan kesabaran.</p>`,
    reference: { name: 'Imam Tirmidzi', role: 'Ulama Hadits', image: '/file.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'manajemen-waktu': {
    type: 'video',
    title: 'Manajemen Waktu bagi Muslim Produktif',
    category: 'Kehidupan Islami',
    author: { name: 'Coach Fulan', role: 'Pelatih Produktivitas', image: '/window.svg' },
    publishedAt: '03 Januari 2026',
    duration: '27:18',
    views: '860',
    content:
      `<p>Pengaturan waktu yang efektif menambah keberkahan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Metode Praktis</h2>
       <p>Prioritaskan kewajiban, batasi distraksi, dan evaluasi harian.</p>`,
    reference: { name: 'Al-Hasan Al-Bashri', role: 'Ulama', image: '/globe.svg', institution: 'Institut Studi Islam', verified: false }
  },

  'menjaga-hati': {
    type: 'podcast',
    title: 'Ep 1: Menjaga Hati di Zaman Fitnah',
    category: 'Tazkiyatun Nafs',
    author: { name: 'Podcast Muslim', role: 'Host', image: '/file.svg' },
    publishedAt: '14 Januari 2026',
    duration: '25:00',
    views: '1.6k',
    content:
      `<p>Menjaga kebersihan hati adalah kunci keselamatan.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Langkah Menjaga Hati</h2>
       <p>Banyak istighfar, jauhi fitnah, dan perkuat iman.</p>`,
    reference: { name: 'Imam Ibnul Qayyim', role: 'Ulama', image: '/next.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'kiat-sukses-pengusaha': {
    type: 'podcast',
    title: 'Ep 2: Kiat Sukses Pengusaha Muslim',
    category: 'Bisnis Islami',
    author: { name: 'Podcast Muslim', role: 'Host', image: '/window.svg' },
    publishedAt: '11 Januari 2026',
    duration: '32:15',
    views: '1.2k',
    content:
      `<p>Pengusaha muslim sukses menyeimbangkan dunia dan akhirat.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Prinsip Utama</h2>
       <p>Kejujuran, adil, dan berkah dalam transaksi.</p>`,
    reference: { name: 'Syaikh Abdurrahman As-Sa’di', role: 'Ulama', image: '/globe.svg', institution: 'Institut Studi Islam', verified: false }
  },
  'mendidik-anak': {
    type: 'podcast',
    title: 'Ep 3: Mendidik Anak Cinta Al-Quran',
    category: 'Parenting',
    author: { name: 'Podcast Muslim', role: 'Host', image: '/globe.svg' },
    publishedAt: '09 Januari 2026',
    duration: '28:45',
    views: '1.3k',
    content:
      `<p>Menanamkan cinta Al-Quran sejak dini.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Metode Efektif</h2>
       <p>Teladan orang tua, rutinitas, dan suasana kondusif.</p>`,
    reference: { name: 'Syaikh Shalih Al-Fauzan', role: 'Ulama', image: '/file.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'tafsir-ayat-kursi-podcast': {
    type: 'podcast',
    title: 'Ep 4: Tafsir Ayat Kursi',
    category: 'Studi Al-Quran',
    author: { name: 'Podcast Muslim', role: 'Host', image: '/window.svg' },
    publishedAt: '07 Januari 2026',
    duration: '22:11',
    views: '740',
    content:
      `<p>Ayat Kursi sebagai perlindungan dan penguat iman.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Intisari</h2>
       <p>Mengenal sifat-sifat Allah dan kekuasaan-Nya.</p>`,
    reference: { name: 'Syaikh Asy-Syinqithi', role: 'Mufassir', image: '/next.svg', institution: 'Institut Studi Islam', verified: false }
  },
  'keluarga-sakinah-podcast': {
    type: 'podcast',
    title: 'Ep 5: Membangun Keluarga Sakinah',
    category: 'Keluarga',
    author: { name: 'Podcast Muslim', role: 'Host', image: '/file.svg' },
    publishedAt: '06 Januari 2026',
    duration: '26:40',
    views: '820',
    content:
      `<p>Keluarga sakinah dibangun di atas takwa dan komunikasi.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Pilar Keluarga</h2>
       <p>Peran suami-istri dan pendidikan anak yang seimbang.</p>`,
    reference: { name: 'Syaikh Shalih Al-Utsaimin', role: 'Ulama', image: '/globe.svg', institution: 'Institut Studi Islam', verified: true }
  },
  'pemuda-muslim-podcast': {
    type: 'podcast',
    title: 'Ep 6: Pemuda Muslim dan Tantangan Zaman',
    category: 'Pemuda',
    author: { name: 'Podcast Muslim', role: 'Host', image: '/globe.svg' },
    publishedAt: '04 Januari 2026',
    duration: '24:05',
    views: '690',
    content:
      `<p>Pemuda muslim harus kuat iman dan beradab.</p>
       <h2 class="text-xl font-bold mt-6 mb-3">Strategi</h2>
       <p>Lingkungan baik, mentor, dan ilmu yang benar.</p>`,
    reference: { name: 'Imam Syafi’i', role: 'Ulama', image: '/next.svg', institution: 'Institut Studi Islam', verified: false }
  }
};

export const HOME_ARTICLES: ContentItem[] = [
  { id: 'a1', title: 'Memahami Makna Ikhlas dalam Beribadah', slug: 'memahami-makna-ikhlas', excerpt: 'Hakikat ikhlas dan aplikasinya dalam keseharian.', category: 'Akhlak & Tasawuf', author: 'Ustadz Dr. Ahmad Zainuddin', date: '18/01/2026', image: '/window.svg' },
  { id: 'a2', title: 'Menata Kehidupan Islami di Era Digital', slug: 'menata-kehidupan-islami', excerpt: 'Strategi menjaga komitmen keislaman di era digital.', category: 'Kehidupan Islami', author: 'Ustadzah Fulanah', date: '12/01/2026', image: '/globe.svg' },
  { id: 'a3', title: 'Fiqh Ibadah Harian: Ringkas dan Praktis', slug: 'fiqh-ibadah-harian', excerpt: 'Rangkuman fiqh ibadah harian yang praktis.', category: 'Fiqh & Yurisprudensi', author: 'Ustadz Abu Salim', date: '05/01/2026', image: '/file.svg' },
  { id: 'a4', title: 'Adab Menuntut Ilmu: Klasik dan Kontemporer', slug: 'adab-menuntut-ilmu', excerpt: 'Adab penuntut ilmu di era digital.', category: 'Sumber Belajar', author: 'Ahmad Fulan', date: '17/01/2026', image: '/next.svg' }
];

export const HOME_VIDEOS: ContentItem[] = [
  { id: 'v1', title: 'Kajian Rutin: Tafsir Surat Al-Fatihah', slug: 'kajian-tafsir-al-fatihah', duration: '45:20', category: 'Kajian Kitab', author: 'Ustadz Dr. Abdullah', date: '10/01/2026', image: '/window.svg', excerpt: 'Kajian mendalam mengenai tafsir Al-Fatihah.' },
  { id: 'v2', title: 'Tanya Jawab: Hukum Jual Beli Online', slug: 'hukum-jual-beli-online', duration: '15:30', category: 'Muamalah', author: 'Ustadz Muhammad', date: '12/01/2026', image: '/globe.svg', excerpt: 'Hukum jual beli online menurut syariat.' },
  { id: 'v3', title: 'Sejarah Peradaban Islam: Masa Keemasan', slug: 'sejarah-peradaban-islam', duration: '58:10', category: 'Sejarah', author: 'Ustadz Salim A. Fillah', date: '08/01/2026', image: '/file.svg', excerpt: 'Jejak kejayaan peradaban Islam.' }
];

export const HOME_PODCASTS: ContentItem[] = [
  { id: 'p1', title: 'Ep 1: Menjaga Hati di Zaman Fitnah', slug: 'menjaga-hati', duration: '25:00', category: 'Tazkiyatun Nafs', author: 'Podcast Muslim', date: '14/01/2026', image: '/file.svg', excerpt: 'Cara menjaga hati tetap bersih.' },
  { id: 'p2', title: 'Ep 2: Kiat Sukses Pengusaha Muslim', slug: 'kiat-sukses-pengusaha', duration: '32:15', category: 'Bisnis Islami', author: 'Podcast Muslim', date: '11/01/2026', image: '/window.svg', excerpt: 'Tips menjadi pengusaha muslim sukses.' },
  { id: 'p3', title: 'Ep 3: Mendidik Anak Cinta Al-Quran', slug: 'mendidik-anak', duration: '28:45', category: 'Parenting', author: 'Podcast Muslim', date: '09/01/2026', image: '/globe.svg', excerpt: 'Metode menanamkan cinta Al-Quran.' }
];

export const SEARCH_DATA: (ContentItem & { type: ContentType })[] = [
  { id: 's1', title: 'Memahami Makna Ikhlas dalam Beribadah', slug: 'memahami-makna-ikhlas', excerpt: 'Hakikat ikhlas menurut ulama.', category: 'Akhlak & Tasawuf', date: '18/01/2026', image: '/window.svg', type: 'artikel' },
  { id: 's2', title: 'Menata Kehidupan Islami di Era Digital', slug: 'menata-kehidupan-islami', excerpt: 'Strategi komitmen keislaman di era digital.', category: 'Kehidupan Islami', date: '12/01/2026', image: '/globe.svg', type: 'artikel' },
  { id: 's3', title: 'Fiqh Ibadah Harian: Ringkas dan Praktis', slug: 'fiqh-ibadah-harian', excerpt: 'Rangkuman fiqh ibadah harian.', category: 'Fiqh & Yurisprudensi', date: '05/01/2026', image: '/file.svg', type: 'artikel' },
  { id: 's4', title: 'Adab Menuntut Ilmu: Klasik dan Kontemporer', slug: 'adab-menuntut-ilmu', excerpt: 'Adab penuntut ilmu.', category: 'Sumber Belajar', date: '17/01/2026', image: '/next.svg', type: 'artikel' },
  { id: 's5', title: 'Kajian Rutin: Tafsir Surat Al-Fatihah', slug: 'kajian-tafsir-al-fatihah', duration: '45:20', category: 'Kajian Kitab', date: '10/01/2026', image: '/window.svg', excerpt: 'Tafsir Al-Fatihah.', type: 'video' },
  { id: 's6', title: 'Tanya Jawab: Hukum Jual Beli Online', slug: 'hukum-jual-beli-online', duration: '15:30', category: 'Muamalah', date: '12/01/2026', image: '/globe.svg', excerpt: 'Hukum jual beli online.', type: 'video' },
  { id: 's7', title: 'Sejarah Peradaban Islam: Masa Keemasan', slug: 'sejarah-peradaban-islam', duration: '58:10', category: 'Sejarah', date: '08/01/2026', image: '/file.svg', excerpt: 'Masa keemasan peradaban Islam.', type: 'video' },
  { id: 's8', title: 'Ep 1: Menjaga Hati di Zaman Fitnah', slug: 'menjaga-hati', duration: '25:00', category: 'Tazkiyatun Nafs', date: '14/01/2026', image: '/file.svg', excerpt: 'Menjaga hati.', type: 'podcast' },
  { id: 's9', title: 'Ep 2: Kiat Sukses Pengusaha Muslim', slug: 'kiat-sukses-pengusaha', duration: '32:15', category: 'Bisnis Islami', date: '11/01/2026', image: '/window.svg', excerpt: 'Kiat pengusaha muslim.', type: 'podcast' },
  { id: 's10', title: 'Ep 3: Mendidik Anak Cinta Al-Quran', slug: 'mendidik-anak', duration: '28:45', category: 'Parenting', date: '09/01/2026', image: '/globe.svg', excerpt: 'Mendidik anak cinta Al-Quran.', type: 'podcast' }
];

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
  { name: 'Praktik Ibadah', slug: 'praktik-ibadah' },
  { name: 'Kehidupan Islami', slug: 'kehidupan-islami' },
  { name: 'Sumber Belajar', slug: 'sumber-belajar' }
];

const slugifyCategory = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const CATEGORY_CHILD_TO_PARENT: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  CATEGORY_TAXONOMY.forEach((parent) => {
    parent.children?.forEach((child) => {
      map[child.slug] = parent.slug;
    });
  });
  return map;
})();

export function getCategoryDisplayNameBySlug(slug: string): string {
  const lower = slug.toLowerCase();
  for (const parent of CATEGORY_TAXONOMY) {
    if (parent.slug === lower) return parent.name;
    const child = parent.children?.find((c) => c.slug === lower);
    if (child) return child.name;
  }
  return slug.replace(/-/g, ' ');
}

export function listItemsByCategorySlug(slug: string) {
  const lower = slug.toLowerCase();
  const parent = CATEGORY_TAXONOMY.find((p) => p.slug === lower);
  if (parent?.children?.length) {
    const childSlugs = new Set(parent.children.map((c) => c.slug));
    return SEARCH_DATA.filter((item) => childSlugs.has(slugifyCategory(item.subcategory ?? item.category)));
  }
  return SEARCH_DATA.filter((item) => slugifyCategory(item.subcategory ?? item.category) === lower);
}

export function getCategorySlugByName(name: string): string {
  const lower = name.toLowerCase();
  for (const parent of CATEGORY_TAXONOMY) {
    if (parent.name.toLowerCase() === lower) return parent.slug;
    const child = parent.children?.find((c) => c.name.toLowerCase() === lower);
    if (child) return child.slug;
  }
  return slugifyCategory(name);
}
