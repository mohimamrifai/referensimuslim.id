'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { deleteAuthor } from '@/app/actions/authors';
import toast from 'react-hot-toast';

interface AuthorActionMenuProps {
  authorId: string;
  name: string;
  hasContents: boolean;
}

export default function AuthorActionMenu({ authorId, name, hasContents }: AuthorActionMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) &&
        menuRef.current && 
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 192 // w-48 = 192px
      });
    }
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAuthor(authorId);

      if (!result.success) {
        throw new Error(result.error);
      }
      
      setShowDeleteDialog(false);
      toast.success('Penulis berhasil dihapus');
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal menghapus penulis');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div 
          ref={menuRef}
          style={{ 
            position: 'fixed',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            zIndex: 50
          }}
          className="w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
        >
          <button
            onClick={() => {
              router.push(`/dashboard/authors/${authorId}/edit`);
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => {
              if (hasContents) return;
              setShowDeleteDialog(true);
              setIsOpen(false);
            }}
            disabled={hasContents}
            className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left ${
              hasContents 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-red-600 hover:bg-red-50'
            }`}
            title={hasContents ? "Penulis ini memiliki konten aktif" : "Hapus penulis"}
          >
            <Trash2 className="w-4 h-4" />
            Hapus
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Hapus Penulis"
        message={`Apakah Anda yakin ingin menghapus penulis "${name}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        loading={isDeleting}
      />
    </>
  );
}
