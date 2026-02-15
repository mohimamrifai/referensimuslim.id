'use client';

import { CheckCircle2, Award, Library, ShieldCheck } from 'lucide-react';

export default function TrustBadgeSection() {
  const items = [
    { label: 'Konten Terverifikasi', icon: CheckCircle2 },
    { label: 'Ulama Bersertifikat', icon: Award },
    { label: 'Referensi Akademis', icon: Library },
    { label: 'Data Aman', icon: ShieldCheck },
  ];

  return (
    <div className="mt-8 pt-8 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-default group">
              <div className="p-2 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                <Icon className="w-6 h-6 text-orange-600" />
              </div>
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
