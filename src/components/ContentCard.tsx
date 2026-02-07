'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Headphones } from 'lucide-react';

export type ContentType = 'artikel' | 'video' | 'podcast';

export type ContentItem = {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  author?: string;
  excerpt?: string;
  duration?: string;
};

export default function ContentCard({ item, type }: { item: ContentItem; type: ContentType }) {
  const shareUrl = `/${type}/${item.slug}`;
  const wa = `https://wa.me/?text=${encodeURIComponent(`${item.title} ${shareUrl}`)}`;
  const tg = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item.title)}`;

  const getIcon = () => {
    if (type === 'video') return <Play className="h-6 w-6 text-white fill-white ml-0.5" />;
    if (type === 'podcast') return <Headphones className="h-6 w-6 text-white" />;
    return null;
  };

  const getCtaText = () => {
    if (type === 'video') return 'Tonton Video';
    if (type === 'podcast') return 'Dengarkan';
    return 'Baca Selengkapnya';
  };

  const linkHref = `/${type}/${item.slug}`;

  return (
    <article className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={item.image || '/window.svg'}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay Icon for Media */}
        {(type === 'video' || type === 'podcast') && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 shadow-lg transform transition-transform group-hover:scale-110">
                    {getIcon()}
                </div>
            </div>
        )}
        {/* Duration Badge */}
        {item.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-1.5 py-0.5 rounded border border-white/10">
                {item.duration}
            </div>
        )}
      </div>
      <div className="p-4 flex flex-col grow">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{item.category}</span>
          <span>{item.date}</span>
        </div>
        <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
            <Link href={linkHref}>
                {item.title}
            </Link>
        </h3>
        
        {item.excerpt ? (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4 grow">{item.excerpt}</p>
        ) : (
            // Spacer to maintain height consistency if no excerpt
             <div className="grow min-h-12"></div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={linkHref}
            className="text-orange-600 font-semibold text-xs sm:text-sm hover:underline flex items-center gap-1"
          >
            {getCtaText()}
          </Link>
          <div className="flex items-center gap-2">
            <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Share WhatsApp" className="text-gray-400 hover:text-green-600 transition-colors p-1 hover:bg-gray-50 rounded">
                <span className="sr-only">WA</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href={tg} target="_blank" rel="noopener noreferrer" aria-label="Share Telegram" className="text-gray-400 hover:text-blue-600 transition-colors p-1 hover:bg-gray-50 rounded">
                <span className="sr-only">TG</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
