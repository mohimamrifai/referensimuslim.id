 "use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, BookOpen, Video, Mic, Tags, Menu, LogOut, Settings, FolderTree, Users as UsersIcon, BookMarked, MonitorPlay, UserPlus } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menus = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Artikel", href: "/dashboard/post", icon: BookOpen },
    { title: "Video", href: "/dashboard/videos", icon: Video },
    { title: "Podcast", href: "/dashboard/podcasts", icon: Mic },
    { title: "Kategori & Sub Kategori", href: "/dashboard/categories", icon: FolderTree },
    { title: "Manajemen Tags", href: "/dashboard/tags", icon: Tags },
    { title: "Penulis", href: "/dashboard/authors", icon: UsersIcon },
    { title: "Referensi", href: "/dashboard/references", icon: BookMarked },
    { title: "Daftar Ngaji", href: "/dashboard/ngaji", icon: UserPlus },
    { title: "Iklan", href: "/dashboard/ads", icon: MonitorPlay },
    { title: "Pengaturan", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle Sidebar"
              className="inline-flex md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-gray-900">
              <div className="relative w-16 h-16 overflow-hidden">
                <Image src="/logo.png" alt="Referensimuslim.id Logo" fill className="object-contain" />
              </div>
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-gray-500">Admin</span>
            <button 
              onClick={() => signOut({ callbackUrl: '/login-admin' })}
              className="inline-flex p-2 rounded hover:bg-gray-100"
              title="Keluar"
            >
              <LogOut className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed md:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-white border-r border-gray-100 z-40 transform transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="h-full p-3 space-y-2 overflow-y-auto custom-scrollbar">
            {menus.map((item) => {
              const Icon = item.icon;
              const disabled = (item as { disabled?: boolean }).disabled;
              const isActive = item.href === '/dashboard' 
                ? pathname === '/dashboard' 
                : pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  aria-disabled={disabled}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    disabled
                      ? "text-gray-400 pointer-events-none"
                      : isActive
                        ? "bg-orange-50 text-orange-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-orange-600" : "text-gray-500 group-hover:text-gray-700"}`} />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
