'use client';

import DetailLayout, { ContentData } from './DetailLayout';
import { Play } from 'lucide-react';

interface VideoDetailProps {
  data: ContentData;
}

export default function VideoDetail({ data }: VideoDetailProps) {
  return (
    <DetailLayout type="video" data={data}>
      {data.videoUrl ? (
        <div className="mb-8 aspect-video bg-gray-900 rounded-md overflow-hidden shadow-lg">
          <iframe 
            src={data.videoUrl} 
            title={data.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      ) : (
        <div className="mb-8 aspect-video bg-gray-900 rounded-md flex items-center justify-center text-white relative overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <button className="relative w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 fill-white ml-1" />
          </button>
        </div>
      )}
    </DetailLayout>
  );
}
