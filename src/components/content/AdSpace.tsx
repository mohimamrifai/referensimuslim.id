import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

interface AdSpaceProps {
  position: string;
  className?: string;
}

export default async function AdSpace({ position, className = '' }: AdSpaceProps) {
  const ad = await prisma.advertisement.findFirst({
    where: {
      position,
      isActive: true,
    },
  });

  if (!ad) {
    return null;
  }

  return (
    <div className={`w-full max-w-5xl mx-auto my-8 ${className}`}>
      <div className="text-center text-[10px] text-gray-400 tracking-widest mb-2 uppercase font-medium">
        Advertisement
      </div>
      {ad.targetUrl ? (
        <a 
          href={ad.targetUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-[150px] md:h-[250px] relative rounded-sm overflow-hidden"
        >
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 970px"
          />
        </a>
      ) : (
        <div className="w-full h-[150px] md:h-[250px] relative rounded-sm overflow-hidden">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 970px"
          />
        </div>
      )}
    </div>
  );
}
