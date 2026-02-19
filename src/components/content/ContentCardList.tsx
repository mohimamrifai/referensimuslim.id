'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { ContentItem, ContentType } from './types';

interface ContentCardListProps {
  item: ContentItem;
  type?: ContentType;
}

export default function ContentCardList({ item, type }: ContentCardListProps) {
  const finalType = type || item.type;
  const linkHref = `/${item.slug}`;

  return (
    <article className="group/card flex gap-4 p-4 border-b border-gray-100 bg-white last:border-0 hover:bg-gray-50 transition-colors">
      {/* Image - Square */}
      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
         <Image
          src={item.image || '/window.svg'}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col grow justify-between py-0.5">
          <div>
              {/* Category Badge */}
               <div className="mb-1.5">
                  <span className="font-medium text-orange-600 bg-orange-50 px-2 text-[10px] py-0.5 rounded-full inline-block">
                      {item.subcategory ?? item.category}
                  </span>
               </div>
               
               {/* Title */}
               <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover/card:text-orange-600 transition-colors">
                  <Link href={linkHref}>
                      {item.title}
                  </Link>
               </h3>
          </div>
          
          {/* Meta: Author & Duration */}
          <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-3 gap-y-1">
              <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="truncate max-w-[100px] sm:max-w-[150px]">{item.author || 'Redaksi'}</span>
              </div>
              {(item.duration || finalType === 'artikel') && (
                   <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.duration || '5 menit'}</span>
                   </div>
              )}
          </div>
      </div>
    </article>
  );
}
