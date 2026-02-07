import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import CategorySidebar from "@/components/CategorySidebar";

export const metadata: Metadata = {
  title: "Referensimuslim.id - Referensi Muslim Masa Kini",
  description: "Portal E-News Islami (Magazine) dengan fokus keterbacaan dan konten ilmiah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Navbar />
        
        <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-[var(--sidebar-width)] bg-white overflow-hidden border-r border-gray-200 z-40">
          <CategorySidebar />
        </div>

        <div className="flex flex-col min-h-[calc(100vh-4rem)] md:pl-[var(--sidebar-width)] transition-all duration-300">
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>

        <MobileBottomNav />
      </body>
    </html>
  );
}
