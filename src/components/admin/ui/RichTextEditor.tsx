'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextAlign } from '@tiptap/extension-text-align';
import LineHeight from 'tiptap-extension-line-height';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { useEffect } from 'react';
import RichTextToolbar from './RichTextToolbar';
import LinkPopover from './LinkPopover';
import ImagePopover from './ImagePopover';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 border p-2 rounded-md bg-gray-50">
        <RichTextToolbar editor={editor} />
        <LinkPopover editor={editor} />
        <ImagePopover editor={editor} />
      </div>
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}