'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import CreateTagModal from './CreateTagModal';

export default function CreateTagButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm w-max"
      >
        <Plus className="w-4 h-4" />
        Tambah Tag
      </button>

      <CreateTagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
