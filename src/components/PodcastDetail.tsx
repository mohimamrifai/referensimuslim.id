'use client';

import DetailLayout, { ContentData } from './DetailLayout';
import { Mic } from 'lucide-react';
import Image from 'next/image';

interface PodcastDetailProps {
  data: ContentData;
}

export default function PodcastDetail({ data }: PodcastDetailProps) {
  return (
    <DetailLayout type="podcast" data={data}>
      <div className="mb-8 bg-gray-900 text-white rounded-md p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          
          {/* Cover Art */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gray-800 rounded-md overflow-hidden shadow-md">
             <Image 
                src={data.author.image} 
                alt={data.title}
                fill
                className="object-cover"
             />
          </div>

          {/* Info & Player */}
          <div className="flex-1 w-full text-center md:text-left space-y-4">
             <div>
                <h2 className="text-xl font-bold mb-1">{data.title}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                   <Mic className="w-4 h-4" />
                   <span>{data.author.name}</span>
                </div>
             </div>

             {/* Native Audio Player / Embed Container */}
             <div className="w-full">
                {/* 
                  NOTE: Since the audio is an embed link, this is where the iframe or audio tag would go.
                  Using a native audio tag with a dummy source for demonstration.
                */}
                <audio controls className="w-full h-10 rounded-md">
                   <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                   Your browser does not support the audio element.
                </audio>
             </div>
          </div>

        </div>
      </div>
    </DetailLayout>
  );
}
