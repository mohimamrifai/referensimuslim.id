// src/components/home/HeroGrid.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  href: string;
}

interface HeroGridProps {
  articles: HeroArticle[];
}

export default function HeroGrid({ articles }: HeroGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="px-2 md:px-4 lg:px-8 pt-4">
      <div className="flex flex-col md:flex-row w-full h-[120vh] md:h-[75vh] min-h-[800px] md:min-h-[450px] overflow-hidden rounded-xl">
        {articles.slice(0, 4).map((article, index) => (
          <Link
            key={article.id}
            href={article.href}
            className={`relative block overflow-hidden group transition-all duration-700 ease-out
              ${hoveredIndex === index ? 'md:flex-[3] flex-1' : 'flex-1'}
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
              <div className="mb-2">
                <span className="inline-flex items-center bg-orange-500 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider rounded-sm">
                  {article.category}
                </span>
              </div>
              <h2 className="text-white text-lg font-bold leading-tight line-clamp-2 mb-2 drop-shadow-md">
                {article.title}
              </h2>
              <div className="flex items-center gap-2 text-gray-300 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                  {article.author}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  {article.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
