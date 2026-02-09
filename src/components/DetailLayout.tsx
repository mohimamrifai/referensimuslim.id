'use client';

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Quote, 
  Printer, 
  CheckCircle, 
  ChevronRight, 
  BookOpen
} from 'lucide-react';

export type ContentType = 'artikel' | 'video' | 'podcast';

export interface ContentData {
  title: string;
  category: string;
  subcategory?: string;
  image?: string;
  excerpt?: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  publishedAt: string;
  readTime?: string;
  duration?: string;
  views: string;
  videoUrl?: string;
  audioUrl?: string;
  content: string; // HTML string
  reference: {
    name: string;
    role: string;
    image: string;
    institution: string;
    verified: boolean;
  };
}

interface DetailLayoutProps {
  type: ContentType;
  data: ContentData;
  children?: ReactNode; // For additional content like video player
}

export default function DetailLayout({ type, data, children }: DetailLayoutProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [quoteResult, setQuoteResult] = useState<string | null>(null);

  // Handle Reading Progress
  useEffect(() => {
    if (type !== 'artikel') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [type]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        url: window.location.href,
      });
    } else {
      alert('Fitur share tidak didukung di browser ini.');
    }
  };

  const handleQuote = () => {
    const citation = `"${data.title}" oleh ${data.author.name}. Referensimuslim.id. Diakses pada ${new Date().toLocaleDateString('id-ID')}.`;
    navigator.clipboard.writeText(citation).then(() => {
      setQuoteResult(citation);
      setTimeout(() => setQuoteResult(null), 10000); // Hide after 10s
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content Area (Center) */}
        <div id="printable-content" className="flex-1 min-w-0">
          
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <span className="capitalize text-gray-500">{type}</span>
            <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-50 sm:max-w-xs">
              {data.title}
            </span>
          </nav>

          {/* Category Badge */}
          <span className="inline-block bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {data.subcategory ?? data.category}
          </span>

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {data.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              <Image 
                src={data.author.image}
                alt={data.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{data.author.name}</h4>
              <p className="text-xs text-gray-500">{data.author.role}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className='text-[12px]'>{data.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className='text-[12px]'>{type === 'video' || type === 'podcast' ? data.duration : data.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> 
              <span className='text-[12px]'>{data.views} views</span>
            </div>
          </div>

          {/* Custom Content (e.g. Player) */}
          {children}

          {/* Full Content Text */}
          <article 
            className="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed mb-12"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          {/* References / Narasumber Section */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              Referensi / Narasumber
            </h3>
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                <Image 
                  src={data.reference.image}
                  alt={data.reference.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-900 text-lg leading-tight">
                    {data.reference.name}
                  </h4>
                  {data.reference.verified && (
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                      <CheckCircle className="w-3 h-3" /> VERIFIED
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{data.reference.role}</p>
                <p className="text-xs text-gray-500">{data.reference.institution}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sticky Panel */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24 space-y-4">
            
            {/* Reading Progress */}
            {type === 'artikel' && (
              <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Progress Baca</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-bold text-orange-600">{Math.round(readingProgress)}%</span>
                  <span className="text-sm text-gray-500 mb-1">selesai</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-orange-600 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button 
                onClick={handleShare}
                className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group"
              >
                <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
                  <Share2 className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Bagikan Konten</span>
              </button>

              <button 
                onClick={handleQuote}
                className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group"
              >
                <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
                  <Quote className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Kutip Konten</span>
              </button>

              {quoteResult && (
                <div className="p-3 bg-green-50 rounded-md border border-green-100 text-xs animate-in fade-in slide-in-from-top-2">
                  <p className="font-bold text-green-700 mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Disalin!
                  </p>
                  <p className="text-gray-600 italic leading-relaxed">{quoteResult}</p>
                </div>
              )}

              <button 
                onClick={handlePrint}
                className="w-full flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-700 transition-colors border border-gray-100 hover:border-orange-100 group"
              >
                <div className="w-8 h-8 rounded-full group-hover:bg-orange-100 flex items-center justify-center transition-colors border border-gray-200 group-hover:border-transparent">
                  <Printer className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm">Cetak Halaman</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-content, #printable-content * {
            visibility: visible;
          }
          #printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          #printable-content nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
