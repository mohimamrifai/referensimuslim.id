'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { uploadImage } from '@/lib/api';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  aspectRatio?: 'video' | 'square' | 'banner';
}

export default function ImageUploader({ 
  value, 
  onChange, 
  label = 'Upload Gambar',
  folder = 'uploads',
  aspectRatio = 'video'
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {value ? (
        <div className={`relative w-full ${
          aspectRatio === 'square' ? 'aspect-square max-w-[200px]' : 
          aspectRatio === 'banner' ? 'aspect-[970/250] max-w-[970px]' :
          'aspect-video max-w-md'
        } rounded-lg overflow-hidden border bg-gray-100`}>
          <Image 
            src={value} 
            alt="Uploaded" 
            fill 
            className="object-cover" 
            unoptimized={value.startsWith('/uploads') || value.startsWith('/api/view-image')}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-white rounded-full shadow hover:bg-red-50 text-red-600 z-10 w-6 h-6 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className={`flex items-center justify-center w-full ${
          aspectRatio === 'square' ? 'max-w-[200px]' : 
          aspectRatio === 'banner' ? 'max-w-[970px]' :
          'max-w-md'
        }`}>
          <label className={`flex flex-col items-center justify-center w-full ${
            aspectRatio === 'square' ? 'aspect-square' : 
            aspectRatio === 'banner' ? 'aspect-[970/250]' :
            'h-40'
          } border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-2" />
              ) : (
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
              )}
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Klik untuk upload</span>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG (Max 2MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
