import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
           <div className="bg-indigo-100 p-6 rounded-full">
             <Wrench className="w-12 h-12 text-indigo-600" />
           </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Website Sedang Dalam Perbaikan
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Kami sedang melakukan pemeliharaan sistem untuk meningkatkan kualitas layanan. 
            Mohon maaf atas ketidaknyamanan ini. Silakan kunjungi kami kembali beberapa saat lagi.
          </p>
        </div>
        <div className="pt-12 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Referensimuslim.id. All rights reserved.
        </div>
      </div>
    </div>
  );
}
