'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import CreateTagModal from './CreateTagModal';

export default function CreateTagButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="w-max gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
      >
        <Plus className="w-4 h-4" />
        Tambah Tag
      </Button>

      <CreateTagModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
