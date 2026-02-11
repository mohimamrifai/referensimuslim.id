'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateCategoryModal from './CreateCategoryModal';

export default function CreateCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors w-full md:w-auto"
      >
        <Plus className="w-4 h-4" />
        Buat Kategori Baru
      </button>

      <CreateCategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
