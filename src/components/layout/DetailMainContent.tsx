'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Eye, 
  ChevronRight, 
  BookOpen,
  CheckCircle 
} from 'lucide-react';
import { ContentType, ContentData } from './detail-types';

interface DetailMainContentProps {
  type: ContentType;
  data: ContentData;
  children?: React.ReactNode;
}

export default function DetailMainContent({ type, data, children }: DetailMainContentProps) {
  return (
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
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 no-print">
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
        <div className="flex items-center gap-1 no-print">
          <Clock className="w-4 h-4" />
          <span className='text-[12px]'>{type === 'video' || type === 'podcast' ? data.duration : data.readTime}</span>
        </div>
        <div className="flex items-center gap-1 no-print">
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
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200 no-print">
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
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 no-print">
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
  );
}
