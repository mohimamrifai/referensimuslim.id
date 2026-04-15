import type { Metadata } from "next";
import { Poppins, Geist_Mono, Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <body className={`${poppins.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
