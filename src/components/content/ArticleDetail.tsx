'use client';

import Image from 'next/image';
import DetailLayout, { ContentData } from '../layout/DetailLayout';

interface ArticleDetailProps {
  data: ContentData;
}

export default function ArticleDetail({ data }: ArticleDetailProps) {
  return (
    <DetailLayout type="artikel" data={data}>
      {data.image && (
        <div className="mb-8 relative w-full aspect-video rounded-md overflow-hidden shadow-sm">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </DetailLayout>
  );
}
