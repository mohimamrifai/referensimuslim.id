// src/components/admin/ui/ImagePopover.tsx
'use client';

import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ImagePopoverProps {
  editor: Editor | null;
}

export default function ImagePopover({ editor }: ImagePopoverProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const submitImage = () => {
    editor.chain().focus();
    if (imageUrl) {
      editor.chain().setImage({ src: imageUrl }).run();
    }
    setIsImageOpen(false);
    setImageUrl('');
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal mengunggah gambar');
      }

      const data = await response.json();
      editor.chain().focus().setImage({ src: data.url }).run();
      setIsImageOpen(false);
      setSelectedFile(null);
      setImageInputMode('url'); // Reset to URL mode after upload
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengunggah gambar.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Popover open={isImageOpen} onOpenChange={setIsImageOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex border-b mb-3">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium ${imageInputMode === 'url' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setImageInputMode('url')}
          >
            Link URL
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium ${imageInputMode === 'upload' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setImageInputMode('upload')}
          >
            Unggah Media
          </button>
        </div>
        {imageInputMode === 'url' ? (
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="URL Gambar (https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="h-8 text-sm flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  submitImage();
                }
              }}
            />
            <Button type="button" size="sm" className="h-8" onClick={submitImage}>
              Insert
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
              className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="button" size="sm" className="h-8" onClick={handleImageUpload} disabled={!selectedFile || isUploading}>
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                'Unggah'
              )}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
