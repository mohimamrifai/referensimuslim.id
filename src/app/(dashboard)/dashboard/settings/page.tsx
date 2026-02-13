import SettingsForm from '@/components/admin/SettingsForm';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-700" />
          Pengaturan Akun
        </h1>
        <p className="text-gray-500">Kelola informasi profil dan keamanan akun Anda.</p>
      </div>

      <SettingsForm />
    </div>
  );
}
