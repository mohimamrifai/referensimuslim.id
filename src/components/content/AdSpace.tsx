// src/components/content/AdSpace.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Advertisement } from '@prisma/client';

interface AdSpaceProps {
  ad: Advertisement | null;
  position?: string;
}

export default function AdSpace({ ad, position }: AdSpaceProps) {
  const isSidebar = position === 'SIDEBAR_BOTTOM';
  
  if (!ad || !ad.imageUrl) {
    return (
      <div className="w-full flex justify-center py-2">
        <div className={`w-full bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-200 ${isSidebar ? 'aspect-square' : 'max-w-[728px] h-[90px]'}`}>
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Ruang Iklan</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-2">
      <Link href={ad.targetUrl || '#'} target="_blank" rel="noopener noreferrer" className={`block w-full ${isSidebar ? '' : 'max-w-[728px]'}`}>
        <div className={`relative w-full bg-gray-100 rounded-lg overflow-hidden ${isSidebar ? 'aspect-square' : 'h-[90px]'}`}>
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            sizes={isSidebar ? "400px" : "728px"}
            className={isSidebar ? "object-cover" : "object-contain"}
            unoptimized={ad.imageUrl.startsWith('/uploads') || ad.imageUrl.startsWith('/api/view-image')}
          />
        </div>
      </Link>
    </div>
  );
}
