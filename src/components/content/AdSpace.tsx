// src/components/content/AdSpace.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Advertisement } from '@prisma/client';

interface AdSpaceProps {
  ad: Advertisement | null;
}

export default function AdSpace({ ad }: AdSpaceProps) {
  if (!ad || !ad.imageUrl) {
    return (
      <div className="w-full flex justify-center py-2">
        <div className="w-full max-w-[728px] h-[90px] bg-gray-100 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Ruang Iklan</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-2">
      <Link href={ad.targetUrl || '#'} target="_blank" rel="noopener noreferrer" className="block max-w-full">
        <div className="relative w-[728px] h-[90px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={ad.imageUrl}
            alt={ad.title}
            fill
            sizes="728px"
            className="object-contain"
            unoptimized={ad.imageUrl.startsWith('/uploads') || ad.imageUrl.startsWith('/api/view-image')}
          />
        </div>
      </Link>
    </div>
  );
}
