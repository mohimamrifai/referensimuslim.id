'use client';

import { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';
import { toggleMaintenanceMode } from '@/app/actions/settings';

interface MaintenanceSwitchProps {
  initialStatus: boolean;
}

export default function MaintenanceSwitch({ initialStatus }: MaintenanceSwitchProps) {
  const [isMaintenance, setIsMaintenance] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newState = !isMaintenance;
    // Optimistic update
    setIsMaintenance(newState);

    startTransition(async () => {
      try {
        const result = await toggleMaintenanceMode(isMaintenance);
        if (result.success) {
          toast.success(newState ? 'Mode Maintenance diaktifkan' : 'Mode Maintenance dinonaktifkan');
        } else {
          // Revert on failure (though action currently throws or returns success)
          setIsMaintenance(!newState);
          toast.error('Gagal mengubah status');
        }
      } catch {
        setIsMaintenance(!newState);
        toast.error('Terjadi kesalahan saat mengubah status');
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
      <div className="space-y-0.5">
        <label className="text-base font-medium text-gray-900 block">
          Maintenance Mode
        </label>
        <p className="text-sm text-gray-500">
          Jika aktif, website hanya dapat diakses oleh Admin. Pengunjung umum akan melihat halaman maintenance.
        </p>
      </div>
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2
          ${isMaintenance ? 'bg-indigo-600' : 'bg-gray-200'}
          ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        role="switch"
        aria-checked={isMaintenance}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
            ${isMaintenance ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
