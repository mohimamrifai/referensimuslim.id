// src/components/admin/ui/LinkPopover.tsx
'use client';

import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface LinkPopoverProps {
  editor: Editor | null;
}

export default function LinkPopover({ editor }: LinkPopoverProps) {
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');

  if (!editor) {
    return null;
  }

  const handleLinkOpenChange = (open: boolean) => {
    setIsLinkOpen(open);
    if (open) {
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

  return (
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
  );
}
