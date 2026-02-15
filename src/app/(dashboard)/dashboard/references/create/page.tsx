import ReferenceForm from '@/components/admin/references/ReferenceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateReferencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/references" 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Tambah Referensi Baru</h1>
      </div>

      <ReferenceForm />
    </div>
  );
}
