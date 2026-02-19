import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, User, Calendar, MapPin, Phone, Briefcase, GraduationCap, Heart, Clock } from 'lucide-react';

export default async function NgajiDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const registration = await prisma.ngajiRegistration.findUnique({
    where: { id: params.id },
  });

  if (!registration) {
    notFound();
  }

  const detailItems = [
    { label: 'Nama Lengkap', value: registration.fullName, icon: User },
    { label: 'Jenis Kelamin', value: registration.gender, icon: User },
    { label: 'Tempat, Tanggal Lahir', value: `${registration.birthPlace}, ${new Date(registration.birthDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, icon: Calendar },
    { label: 'Usia', value: `${registration.age} Tahun`, icon: Clock },
    { label: 'Domisili', value: registration.address, icon: MapPin },
    { label: 'Nomor WhatsApp', value: registration.whatsapp, icon: Phone },
    { label: 'Pendidikan Terakhir', value: registration.education, icon: GraduationCap },
    { label: 'Pekerjaan', value: registration.occupation, icon: Briefcase },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-8 sm:pb-12 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/dashboard/ngaji"
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Detail Pendaftar</h1>
          <p className="text-sm sm:text-base text-gray-500">Informasi lengkap pendaftar ngaji</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-4 sm:pb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">{registration.fullName}</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Mendaftar pada {new Date(registration.createdAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${
              registration.gender === 'Laki-laki' 
                ? 'bg-blue-50 text-blue-700' 
                : 'bg-pink-50 text-pink-700'
            }`}>
              {registration.gender}
            </span>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {detailItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500">{item.label}</p>
                    <p className="font-medium text-gray-900 mt-0.5 text-sm sm:text-base break-words">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Motivation Section */}
          <div className="bg-indigo-50 rounded-xl p-4 sm:p-6 border border-indigo-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-indigo-800">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <h3 className="font-bold text-sm sm:text-base">Motivasi Mengaji</h3>
            </div>
            <p className="text-indigo-900 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {registration.motivation}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}