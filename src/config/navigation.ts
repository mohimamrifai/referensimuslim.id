import { Home, BookOpen, Video, Mic, Info, UserPlus, PlayCircle, Headphones } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type NavigationItem = {
  name: string;
  href: string;
  type: 'artikel' | 'video' | 'podcast' | null;
  icon: LucideIcon;
  mobileIcon?: LucideIcon; // Optional, defaults to icon if not provided
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { 
    name: 'Beranda', 
    href: '/', 
    type: null, 
    icon: Home 
  },
  { 
    name: 'Artikel', 
    href: '/search?q=&type=artikel', 
    type: 'artikel', 
    icon: BookOpen 
  },
  { 
    name: 'Video', 
    href: '/search?q=&type=video', 
    type: 'video', 
    icon: Video,
    mobileIcon: PlayCircle
  },
  { 
    name: 'Podcast', 
    href: '/search?q=&type=podcast', 
    type: 'podcast', 
    icon: Mic,
    mobileIcon: Headphones
  },
  { 
    name: 'Tentang Kami', 
    href: '/about', 
    type: null, 
    icon: Info 
  },
  { 
    name: 'Daftar Ngaji', 
    href: '/daftar-ngaji', 
    type: null, 
    icon: UserPlus 
  },
];
