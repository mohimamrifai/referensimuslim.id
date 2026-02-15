import SettingsForm from '@/components/admin/SettingsForm';
import SocialMediaSettings from '@/components/admin/SocialMediaSettings';
import { Settings } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const socialMedias = await prisma.socialMedia.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-6 sm:pb-12 space-y-4 sm:space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-700" />
          Pengaturan
        </h1>
        <p className="text-gray-500">Kelola informasi profil, keamanan akun, dan konfigurasi situs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
             <h2 className="text-xl font-semibold text-gray-800">Profil & Keamanan</h2>
          </div>
          <SettingsForm />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
             <h2 className="text-xl font-semibold text-gray-800">Media Sosial</h2>
          </div>
          <SocialMediaSettings initialData={socialMedias} />
        </div>
      </div>
    </div>
  );
}
