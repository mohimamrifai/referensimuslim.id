import { PrismaClient, UserRole } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
// import { MOCK_DB } from './data';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helper to convert Title Case to slug-case
// function toSlug(str: string): string {
//   return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// }

type CategorySeedNode = {
  name: string;
  slug: string;
  children?: { name: string; slug: string }[];
};

// Explicitly defined Taxonomy for Seeding (Independent of frontend mockup)
const SEED_TAXONOMY: CategorySeedNode[] = [
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
      { name: 'Fiqh Ibadah', slug: 'fiqh-ibadah' }
    ]
  },
  { 
    name: 'Akhlak & Tasawuf', 
    slug: 'akhlak-tasawuf',
    children: [
      { name: 'Akhlak', slug: 'akhlak' },
      { name: 'Tazkiyatun Nafs', slug: 'tazkiyatun-nafs' },
      { name: 'Adab', slug: 'adab' }
    ]
  },
  { 
    name: 'Kehidupan Islami', 
    slug: 'kehidupan-islami',
    children: [
      { name: 'Keluarga', slug: 'keluarga' },
      { name: 'Parenting', slug: 'parenting' },
      { name: 'Pernikahan', slug: 'pernikahan' },
      { name: 'Ekonomi Syariah', slug: 'ekonomi-syariah' },
      { name: 'Kesehatan', slug: 'kesehatan' },
      { name: 'Bisnis Islami', slug: 'bisnis-islami' },
      { name: 'Produktivitas', slug: 'produktivitas' },
      { name: 'Pemuda', slug: 'pemuda' }
    ]
  },
  { 
    name: 'Sumber Belajar', 
    slug: 'sumber-belajar',
    children: [
      { name: 'Buku', slug: 'buku' },
      { name: 'Kitab Kuning', slug: 'kitab-kuning' },
      { name: 'Jurnal', slug: 'jurnal' }
    ]
  },
  { 
    name: 'Sejarah', 
    slug: 'sejarah',
    children: [
      { name: 'Sirah Nabawiyah', slug: 'sirah-nabawiyah' },
      { name: 'Sejarah Peradaban', slug: 'sejarah-peradaban' },
      { name: 'Tokoh Islam', slug: 'tokoh-islam' }
    ]
  }
];

async function main() {
  console.log('Start seeding...');
  console.log('Taxonomy Length:', SEED_TAXONOMY.length);
  SEED_TAXONOMY.forEach(cat => console.log(`- ${cat.name} has ${cat.children?.length} children`));

  // 1. Create Default Admin
  const adminEmail = 'admin@referensimuslim.id';
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin Referensi Muslim',
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });
  console.log('Created admin user');

  // 2. Create Categories from Local Taxonomy
  // const categoryMap = new Map<string, string>(); // slug -> id

  // for (const cat of SEED_TAXONOMY) {
  //   // Create Parent Category
  //   const parent = await prisma.category.upsert({
  //     where: { slug: cat.slug },
  //     update: {},
  //     create: {
  //       name: cat.name,
  //       slug: cat.slug,
  //       description: `Kategori utama: ${cat.name}`,
  //     },
  //   });
  //   categoryMap.set(cat.slug, parent.id);
  //   console.log(`Created category: ${cat.name}`);

  //   // Create Children Categories
  //   if (cat.children) {
  //     for (const child of cat.children) {
  //       const childCat = await prisma.category.upsert({
  //         where: { slug: child.slug },
  //         update: { parentId: parent.id },
  //         create: {
  //           name: child.name,
  //           slug: child.slug,
  //           description: `Sub-kategori dari ${cat.name}`,
  //           parentId: parent.id,
  //         },
  //       });
  //       categoryMap.set(child.slug, childCat.id);
  //       console.log(`  Created subcategory: ${child.name}`);
  //     }
  //   }
  // }

  // 3. Create Tags (Extract from dummy data or create defaults)
  // const defaultTags = ['Islam', 'Muslim', 'Dakwah', 'Kajian'];
  // for (const tagName of defaultTags) {
  //   await prisma.tag.upsert({
  //     where: { slug: toSlug(tagName) },
  //     update: {},
  //     create: {
  //       name: tagName,
  //       slug: toSlug(tagName),
  //     },
  //   });
  // }
  // console.log('Created default tags');

  // 4. Migrate MOCK_DB Content
  // for (const [slug, data] of Object.entries(MOCK_DB)) {
  //   // a. Create/Get Author
  //   const authorName = data.author.name;
  //   let author = await prisma.author.findFirst({ where: { name: authorName } });
  //   if (!author) {
  //     author = await prisma.author.create({
  //       data: {
  //         name: authorName,
  //         role: data.author.role,
  //         image: data.author.image,
  //       },
  //     });
  //   }

  //   // b. Create/Get Reference (if exists)
  //   let referenceId: string | null = null;
  //   if (data.reference) {
  //     const refName = data.reference.name;
  //     let reference = await prisma.reference.findFirst({ where: { name: refName } });
  //     if (!reference) {
  //       reference = await prisma.reference.create({
  //         data: {
  //           name: refName,
  //           role: data.reference.role,
  //           institution: data.reference.institution,
  //           image: data.reference.image,
  //           verified: data.reference.verified,
  //         },
  //       });
  //     }
  //     referenceId = reference.id;
  //   }

  //   // c. Find Category & Subcategory IDs
  //   // Helper to find slug by name from Taxonomy
  //   const findSlugByName = (name: string): string | undefined => {
  //     for (const cat of SEED_TAXONOMY) {
  //       if (cat.name === name) return cat.slug;
  //       if (cat.children) {
  //         for (const child of cat.children) {
  //           if (child.name === name) return child.slug;
  //         }
  //       }
  //     }
  //     return undefined;
  //   };

  //   const catSlug = findSlugByName(data.category);
  //   const subCatSlug = data.subcategory ? findSlugByName(data.subcategory) : undefined;

  //   const categoryId = catSlug ? categoryMap.get(catSlug) : undefined;
  //   const subcategoryId = subCatSlug ? categoryMap.get(subCatSlug) : undefined;

  //   if (!categoryId) {
  //     console.warn(`Category not found for content: ${data.title} (${data.category}) - Skipping`);
  //     continue;
  //   }

  //   // d. Determine ContentType enum
  //   let contentType: ContentType = ContentType.ARTIKEL;
  //   if (data.type === 'video') contentType = ContentType.VIDEO;
  //   if (data.type === 'podcast') contentType = ContentType.PODCAST;

  //   // e. Create Content
  //   // Parse views string '2.1k' to number
  //   let viewsCount = 0;
  //   if (typeof data.views === 'string') {
  //       const v = data.views as string;
  //       if (v.includes('k')) viewsCount = parseFloat(v) * 1000;
  //       else viewsCount = parseInt(v) || 0;
  //   }

  //   // Parse published date
  //   // Mock format: '18 Januari 2026' -> Date object
  //   // Simple parser for Indonesian date
  //   const monthMap: Record<string, number> = {
  //       'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3, 'Mei': 4, 'Juni': 5,
  //       'Juli': 6, 'Agustus': 7, 'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
  //   };
  //   const dateParts = data.publishedAt.split(' ');
  //   let publishedDate = new Date();
  //   if (dateParts.length === 3) {
  //       const day = parseInt(dateParts[0]);
  //       const month = monthMap[dateParts[1]];
  //       const year = parseInt(dateParts[2]);
  //       if (!isNaN(day) && month !== undefined && !isNaN(year)) {
  //           publishedDate = new Date(year, month, day);
  //       }
  //   }

  //   await prisma.content.upsert({
  //     where: { slug: slug },
  //     update: {},
  //     create: {
  //       slug: slug,
  //       title: data.title,
  //       excerpt: data.excerpt,
  //       content: data.content,
  //       image: data.image,
  //       type: contentType,
  //       status: ContentStatus.PUBLISHED,
  //       views: viewsCount,
  //       publishedAt: publishedDate,
        
  //       // Specific fields
  //       videoUrl: data.videoUrl,
  //       audioUrl: data.audioUrl,
  //       duration: data.duration,
  //       readTime: data.readTime,

  //       // Relations
  //       authorId: author.id,
  //       referenceId: referenceId,
  //       categoryId: categoryId,
  //       subcategoryId: subcategoryId,
  //     },
  //   });
  //   console.log(`Migrated content: ${data.title}`);
  // }

  // 5. Create Default Social Media
  // const socialMedias = [
  //   { platform: 'Facebook', url: 'https://facebook.com', order: 1 },
  //   { platform: 'Twitter', url: 'https://twitter.com', order: 2 },
  //   { platform: 'Instagram', url: 'https://instagram.com', order: 3 },
  //   { platform: 'Youtube', url: 'https://youtube.com', order: 4 },
  // ];

  // for (const sm of socialMedias) {
  //   const existing = await prisma.socialMedia.findFirst({ where: { platform: sm.platform } });
  //   if (!existing) {
  //     await prisma.socialMedia.create({
  //       data: sm
  //     });
  //     console.log(`Created social media: ${sm.platform}`);
  //   }
  // }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });