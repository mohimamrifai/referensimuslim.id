export type ContentType = 'artikel' | 'video' | 'podcast';

export type ContentItem = {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  subcategory?: string;
  date: string;
  author?: string;
  excerpt?: string;
  duration?: string;
  type: ContentType;
};
