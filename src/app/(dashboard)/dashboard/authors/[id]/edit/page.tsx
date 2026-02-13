import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft } from 'lucide-react';
import AuthorForm from '@/components/admin/AuthorForm';

export default async function EditAuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const author = await prisma.author.findUnique({
    where: { id },
  });

  if (!author) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/authors"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Penulis</h1>
          <p className="text-gray-500">Perbarui informasi penulis</p>
        </div>
      </div>

      <AuthorForm 
        initialData={{
          id: author.id,
          name: author.name,
          role: author.role,
          image: author.image,
          bio: author.bio,
        }}
        isEditing
      />
    </div>
  );
}
