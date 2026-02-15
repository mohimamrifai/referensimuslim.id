'use client';

import Link from "next/link";
import { 
  BookOpen, 
  Moon, 
  Heart, 
  Users, 
  GraduationCap, 
  History,
  LucideIcon 
} from 'lucide-react';
import type { CategoryTreeItem } from "@/app/actions/category";

interface MobileCategoryGridProps {
  categories: CategoryTreeItem[];
}

export default function MobileCategoryGrid({ categories }: MobileCategoryGridProps) {
  const categoryConfig: Record<string, { icon: LucideIcon, colorClass: string, iconColorClass: string }> = {
    'Pengetahuan Islam': { 
      icon: BookOpen, 
      colorClass: 'bg-blue-50 border-blue-100', 
      iconColorClass: 'text-blue-600 bg-blue-100' 
    },
    'Praktik Ibadah': { 
      icon: Moon, 
      colorClass: 'bg-emerald-50 border-emerald-100', 
      iconColorClass: 'text-emerald-600 bg-emerald-100' 
    },
    'Akhlak & Tasawuf': { 
      icon: Heart, 
      colorClass: 'bg-purple-50 border-purple-100', 
      iconColorClass: 'text-purple-600 bg-purple-100' 
    },
    'Kehidupan Islami': { 
      icon: Users, 
      colorClass: 'bg-orange-50 border-orange-100', 
      iconColorClass: 'text-orange-600 bg-orange-100' 
    },
    'Sumber Belajar': { 
      icon: GraduationCap, 
      colorClass: 'bg-pink-50 border-pink-100', 
      iconColorClass: 'text-pink-600 bg-pink-100' 
    },
    'Sejarah': { 
      icon: History, 
      colorClass: 'bg-amber-50 border-amber-100', 
      iconColorClass: 'text-amber-600 bg-amber-100' 
    },
  };

  return (
    <div className="md:hidden space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-bold text-gray-900">Kategori</h2>
        <Link href="/kategori" className="text-sm font-semibold text-orange-700 hover:text-orange-800">
          Lihat Semua
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, index) => {
          const config = categoryConfig[cat.name] || { 
            icon: BookOpen, 
            colorClass: 'bg-gray-50 border-gray-100', 
            iconColorClass: 'text-gray-600 bg-gray-100' 
          };
          const Icon = config.icon;
          const count = cat.count;

          return (
            <Link 
              key={index} 
              href={`/kategori/${cat.slug}`} 
              className={`aspect-square flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all hover:shadow-sm ${config.colorClass}`}
            >
              <div className={`p-2 rounded-full ${config.iconColorClass}`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-0.5">{cat.name}</h3>
                <p className="text-[10px] text-gray-500">{count} konten</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
