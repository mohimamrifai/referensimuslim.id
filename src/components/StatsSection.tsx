'use client';

import { Users, FileText, GraduationCap, Star } from 'lucide-react';

export default function StatsSection({ 
  articleCount = 2500, 
  authorCount = 45 
}: { 
  articleCount?: number; 
  authorCount?: number; 
}) {
  const stats = [
    { 
      label: 'Pembaca Aktif', 
      value: '125.000+', 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Artikel Berkualitas', 
      value: `${articleCount}+`, 
      icon: FileText, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      label: 'Ulama Kontributor', 
      value: `${authorCount}+`, 
      icon: GraduationCap, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    },
    { 
      label: 'Rating Kepuasan', 
      value: '4.9/5', 
      icon: Star, 
      color: 'text-amber-500', 
      bg: 'bg-amber-50' 
    },
  ];

  return (
    <div className="py-8 bg-gray-50 rounded-xl px-6">
      <div className="text-center mb-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Pusat Referensi Islam Terpercaya
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Menyajikan ribuan konten berkualitas yang dikurasi oleh asatidzah berkompeten untuk menemani perjalanan menuntut ilmu Anda.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-full ${stat.bg} mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="font-bold text-lg md:text-2xl text-gray-900 mb-0.5">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
