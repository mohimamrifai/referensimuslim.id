'use client';

import { Editor } from '@tiptap/react';
import {
  Bold, Italic, List, ListOrdered, Heading2, Quote,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ArrowUpDown, Languages,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RichTextToolbarProps {
  editor: Editor | null;
}

export default function RichTextToolbar({ editor }: RichTextToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <>
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
        );
      </div>
    </>
  );
}
