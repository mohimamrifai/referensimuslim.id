import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NgajiForm from '@/components/admin/ngaji/NgajiForm';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditNgajiPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const registration = await prisma.ngajiRegistration.findUnique({
    where: { id },
  });

  if (!registration) {
    notFound();
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Edit Data Pendaftar</h1>
          <p className="text-gray-500">Perbarui informasi data pendaftar</p>
        </div>
      </div>

      <NgajiForm 
        initialData={{
          id: registration.id,
          fullName: registration.fullName,
          whatsapp: registration.whatsapp,
          address: registration.address,
          age: registration.age,
          gender: registration.gender,
          motivation: registration.motivation,
          birthPlace: registration.birthPlace,
          birthDate: registration.birthDate.toISOString(),
          education: registration.education,
          occupation: registration.occupation,
        }}
        isEditing
      />
    </div>
  );
}