'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

interface ArticleActionMenuProps {
  articleId: string;
  slug: string;
}

export default function ArticleActionMenu({ articleId, slug }: ArticleActionMenuProps) {
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
      // Calculate position: align right edge of menu with right edge of button
      // Menu width is w-48 (12rem = 192px)
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 192
      });
    }
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete');
      
      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Gagal menghapus artikel');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
        title="Menu Aksi"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={menuRef}
          className="fixed w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-1"
          style={{ 
            top: `${menuPosition.top}px`, 
            left: `${menuPosition.left}px` 
          }}
        >
          <Link
            href={`/${slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Eye className="w-4 h-4" />
            Lihat Artikel
          </Link>
          <Link
            href={`/dashboard/post/${articleId}/edit`}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Pencil className="w-4 h-4" />
            Edit Artikel
          </Link>
          <button
            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
            onClick={() => {
              setIsOpen(false);
              setShowDeleteDialog(true);
            }}
          >
            <Trash2 className="w-4 h-4" />
            Hapus Artikel
          </button>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Hapus Artikel"
        message="Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan dan akan menghapus gambar terkait."
        confirmLabel="Ya, Hapus"
        variant="danger"
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
