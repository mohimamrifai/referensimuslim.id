'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import CreateCategoryModal from './CreateCategoryModal';

export default function CreateCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-max gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        <Plus className="w-4 h-4" />
        Buat Kategori Baru
      </Button>

      <CreateCategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
