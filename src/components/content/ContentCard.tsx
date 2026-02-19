'use client';

import ContentCardList from './ContentCardList';
import ContentCardGrid from './ContentCardGrid';
import { ContentItem, ContentType } from './types';

// Re-export types to avoid breaking changes
export type { ContentItem, ContentType };

export default function ContentCard({ item, type, variant = 'default' }: { item: ContentItem; type?: ContentType; variant?: 'default' | 'list' }) {
  if (variant === 'list') {
    return <ContentCardList item={item} type={type} />;
  }

  return <ContentCardGrid item={item} type={type} />;
}
