import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NgajiForm from '@/components/admin/ngaji/NgajiForm';

export default function CreateNgajiPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/ngaji"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Pendaftar Baru</h1>
          <p className="text-gray-500">Isi form berikut untuk menambahkan data pendaftar baru</p>
        </div>
      </div>

      <NgajiForm />
    </div>
  );
}