'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextAlign } from '@tiptap/extension-text-align';
import LineHeight from 'tiptap-extension-line-height';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { useEffect, useState } from 'react';
import {
  Bold, Italic, List, ListOrdered, Link as LinkIcon,
  Image as ImageIcon, Heading2, Quote,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ArrowUpDown, Languages,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  // State untuk Popover Link & Image
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LineHeight.configure({
        types: ['heading', 'paragraph'],
      }),
      FontFamily,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md',
      },
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      if (editor.getText().trim() === '' && content.trim() !== '') {
        editor.commands.setContent(content);
      } else if (content.includes('Test judul')) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  // --- Handlers untuk Link ---
  const handleLinkOpenChange = (open: boolean) => {
    setIsLinkOpen(open);
    if (open) {
      // Ambil URL yang sudah ada jika teks yang di-block sudah berupa link
      const previousUrl = editor.getAttributes('link').href;
      setLinkUrl(previousUrl || '');
    }
  };

  const submitLink = () => {
    editor.chain().focus();
    if (linkUrl === '') {
      editor.chain().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setIsLinkOpen(false);
    setLinkUrl('');
  };

  // --- Handlers untuk Image ---
  const submitImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 border p-2 rounded-md bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
        >
          <Quote className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`h-8 w-8 p-0 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''}`}
        >
          <AlignJustify className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            if (editor.isActive('textStyle', { fontFamily: 'KFGQPC HAFS Uthmanic Script Regular' })) {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily('KFGQPC HAFS Uthmanic Script Regular').run();
            }
          }}
          className={`h-8 px-2 flex items-center gap-1 text-[10px] font-semibold ${editor.isActive('textStyle', { fontFamily: 'KFGQPC HAFS Uthmanic Script Regular' }) ? 'bg-gray-200' : ''}`}
          title="Arabic Font"
        >
          <Languages className="w-4 h-4" />
          <span>Arab</span>
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <div className="flex items-center gap-1 group relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 flex items-center gap-1 text-xs"
            onClick={() => {
              const current = editor.getAttributes('paragraph').lineHeight || '1.5';
              const next = current === '1.5' ? '2.0' : current === '2.0' ? '1.0' : '1.5';
              editor.chain().focus().setLineHeight(next).run();
            }}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="font-mono text-[10px]">{editor.getAttributes('paragraph').lineHeight || '1.5'}</span>
          </Button>
        </div>
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

        {/* POPOVER UNTUK LINK */}
        <Popover open={isLinkOpen} onOpenChange={handleLinkOpenChange}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3" align="start">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Masukkan URL (https://...)"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="h-8 text-sm flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    submitLink();
                  }
                }}
              />
              <Button type="button" size="sm" className="h-8" onClick={submitLink}>
                Save
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* POPOVER UNTUK IMAGE */}
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

      </div>
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}