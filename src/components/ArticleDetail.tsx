'use client';

import DetailLayout, { ContentData } from './DetailLayout';

interface ArticleDetailProps {
  data: ContentData;
}

export default function ArticleDetail({ data }: ArticleDetailProps) {
  return <DetailLayout type="artikel" data={data} />;
}
