export type ContentType = 'artikel' | 'video' | 'podcast';

export interface ContentData {
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  image?: string;
  excerpt?: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  publishedAt: string;
  readTime?: string;
  duration?: string;
  views: string;
  videoUrl?: string;
  audioUrl?: string;
  content: string; // HTML string
  reference: {
    name: string;
    role: string;
    image: string;
    institution: string;
    verified: boolean;
  };
}

export interface DetailLayoutProps {
  type: ContentType;
  data: ContentData;
  children?: React.ReactNode;
}
