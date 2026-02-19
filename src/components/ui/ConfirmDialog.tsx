'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Konfirmasi',
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  
  const footerContent = (
    <>
      <Button
        variant="outline"
        onClick={onCancel}
        disabled={loading}
      >
        {cancelLabel}
      </Button>
      <Button
        onClick={onConfirm}
        disabled={loading}
        loading={loading}
        className={`${
          variant === 'danger' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' :
          variant === 'warning' ? 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500' :
          'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        } text-white`}
      >
        {confirmLabel}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      showCloseButton={false}
      footer={footerContent}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full flex-shrink-0 ${
          variant === 'danger' ? 'bg-red-100 text-red-600' : 
          variant === 'warning' ? 'bg-amber-100 text-amber-600' : 
          'bg-blue-100 text-blue-600'
        }`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}
