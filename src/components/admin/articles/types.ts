export interface Category {
  id: string;
  name: string;
  children: Category[];
}

export interface Author {
  id: string;
  name: string;
}

export interface Reference {
  id: string;
  name: string;
}

export interface ArticleData {
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
  readTime?: string | null;
  tags?: string[];
}

export interface ArticleFormData {
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
  readTime: string;
  tags: string[];
}
