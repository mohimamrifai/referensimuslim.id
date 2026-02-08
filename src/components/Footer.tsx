'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-orange-600 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6">Jelajahi</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/artikel" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Artikel
                </Link>
              </li>
              <li>
                <Link href="/video" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-gray-300" /> Video Kajian
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
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
              <li>
                <Link href="/kategori/aqidah" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span> Aqidah & Tauhid
                </Link>
              </li>
              <li>
                <Link href="/kategori/fiqih" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span> Fiqih Ibadah
                </Link>
              </li>
              <li>
                <Link href="/kategori/muamalah" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span> Muamalah Kontemporer
                </Link>
              </li>
              <li>
                <Link href="/kategori/sejarah" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span> Sejarah Islam
                </Link>
              </li>
              <li>
                <Link href="/kategori/tazkiyatun-nafs" className="text-gray-600 hover:text-orange-600 transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span> Tazkiyatun Nafs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} Referensimuslim.id. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
