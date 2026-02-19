'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import ConfirmDialog from '../ui/ConfirmDialog';

interface NgajiActionMenuProps {
  id: string;
  name: string;
}

export default function NgajiActionMenu({ id, name }: NgajiActionMenuProps) {
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
      const res = await fetch(`/api/admin/ngaji/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete');
      }
      
      toast.success('Data berhasil dihapus');
      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal menghapus data');
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

      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          ref={menuRef}
          style={{ 
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`
          }}
          className="fixed z-[60] w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
        >
          <Link
            href={`/dashboard/ngaji/${id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            <Eye className="w-4 h-4" />
            Detail
          </Link>
          <Link
            href={`/dashboard/ngaji/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
            onClick={() => setIsOpen(false)}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              setShowDeleteDialog(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
          >
            <Trash2 className="w-4 h-4" />
            Hapus
          </button>
        </div>,
        document.body
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Hapus Data"
        message={`Apakah Anda yakin ingin menghapus data ${name}? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Hapus"
        variant="danger"
        loading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}