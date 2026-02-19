export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type Theme = 'light' | 'dark' | 'system';

export type SortOrder = 'asc' | 'desc';

export interface Category {
  id: string;
  name: string;
  slug?: string;
  children?: Category[];
  parentId?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Author {
  id: string;
  name: string;
  image?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Reference {
  id: string;
  name: string;
  url?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
