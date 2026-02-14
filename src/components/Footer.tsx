import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, Linkedin, Globe, Music } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [popularCategories, socialMedias] = await Promise.all([
    prisma.category.findMany({
      take: 5,
      orderBy: {
        contents: {
          _count: 'desc'
        }
      },
      include: {
        _count: {
          select: { contents: true }
        }
      }
    }),
    prisma.socialMedia.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
  ]);

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('facebook')) return Facebook;
    if (p.includes('twitter') || p.includes('x')) return Twitter;
    if (p.includes('instagram')) return Instagram;
    if (p.includes('youtube')) return Youtube;
    if (p.includes('linkedin')) return Linkedin;
    if (p.includes('tiktok')) return Music;
    return Globe;
  };

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-24 md:pb-12 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Kolom 1: Brand & Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-40 h-12">
                <Image
                  src="/logo.png"
                  alt="Referensimuslim.id Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-gray-600 leading-relaxed text-sm">
              Platform media Islam digital yang menyajikan konten edukatif, inspiratif, dan terpercaya. Dikurasi oleh para ahli untuk menemani perjalanan hijrah dan menuntut ilmu Anda.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              {socialMedias.map((social) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <a 
                    key={social.id}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-all"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6">Jelajahi</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/search?q=&type=artikel" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Artikel
                </Link>
              </li>
              <li>
                <Link href="/search?q=&type=video" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Video Kajian
                </Link>
              </li>
              <li>
                <Link href="/search?q=&type=podcast" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Podcast
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kategori */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6">Topik Populer</h3>
            <ul className="space-y-4">
              {popularCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/kategori/${category.slug}`} className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span> {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} Referensimuslim.id. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
