import { prisma } from '@/lib/prisma';
import ReferenceForm from '@/components/admin/ReferenceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function EditReferencePage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params;
  const reference = await prisma.reference.findUnique({
    where: { id: params.id },
  });

  if (!reference) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/references" 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Referensi</h1>
      </div>

      <ReferenceForm initialData={reference} />
    </div>
  );
}
