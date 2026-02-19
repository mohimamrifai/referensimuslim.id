import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Category, Author, Reference } from '@/types'; // Need to ensure these types are available globally or import from specific location

// Define generic interfaces for the form data and initial data
export interface BaseFormData {
  tags: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface BaseInitialData {
  id?: string;
  tags?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface UseContentFormProps<T extends BaseFormData> {
  initialData?: BaseInitialData;
  initialFormData: T;
  apiEndpoint: string;
  redirectPath: string;
  resourceName: string; // e.g., 'article', 'video'
  createAction?: (data: T) => Promise<{ success?: boolean; error?: string; data?: unknown }>;
  updateAction?: (id: string, data: T) => Promise<{ success?: boolean; error?: string; data?: unknown }>;
}

export function useContentForm<T extends BaseFormData>({
  initialData,
  initialFormData,
  apiEndpoint,
  redirectPath,
  resourceName,
  createAction,
  updateAction,
}: UseContentFormProps<T>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<T>(initialFormData);

  // Initialize form data from initialData
  useEffect(() => {
    if (initialData) {
      // Create a new object to avoid reference issues
      const newFormData = { ...initialFormData };
      
      // Map initialData fields to formData
      // This assumes keys match. If complex mapping is needed, pass a mapper function.
      // For now, we do a shallow merge which covers most cases in this project.
      Object.keys(initialFormData).forEach((key) => {
        if (initialData[key] !== undefined && initialData[key] !== null) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (newFormData as any)[key] = initialData[key];
        }
      });
      
      // Ensure tags is array
      if (!newFormData.tags) newFormData.tags = [];
      
      setFormData(newFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);
  // Note: We deliberately exclude initialFormData from deps to prevent reset on every render 
  // if the parent passes a new object literal.

  // Fetch dependencies (categories, authors, references)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/data');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories);
          setAuthors(data.authors);
          setReferences(data.references);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id && updateAction) {
        const result = await updateAction(initialData.id, formData);
        if (result.error) {
          throw new Error(result.error);
        }
      } else if (!initialData?.id && createAction) {
        const result = await createAction(formData);
        if (result.error) {
          throw new Error(result.error);
        }
      } else {
        // Fallback to API route
        const url = initialData?.id 
          ? `${apiEndpoint}/${initialData.id}` 
          : apiEndpoint;
        
        const method = initialData?.id ? 'PUT' : 'POST';
  
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `Failed to ${method === 'POST' ? 'create' : 'update'} ${resourceName}`);
        }
      }

      // Handle success (common for both actions and API)
      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(
        initialData 
          ? `Error updating ${resourceName}` 
          : `Error creating ${resourceName}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData({ ...formData, tags: [...formData.tags, newTag] });
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return {
    formData,
    setFormData,
    categories,
    authors,
    references,
    loading,
    initialLoading,
    tagInput,
    setTagInput,
    handleTagKeyDown,
    removeTag,
    handleSubmit
  };
}
