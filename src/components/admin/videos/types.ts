import { Category, Author, Reference } from '@/types';

export type { Category, Author, Reference };

export interface VideoData {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  image?: string | null;
  categoryId?: string;
  subcategoryId?: string | null;
  authorId?: string;
  referenceId?: string | null;
  status?: string;
  videoUrl?: string | null;
  duration?: string | null;
  tags?: string[];
}

export interface VideoFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  categoryId: string;
  subcategoryId: string;
  authorId: string;
  referenceId: string;
  status: string;
  videoUrl: string;
  duration: string;
  tags: string[];
}
