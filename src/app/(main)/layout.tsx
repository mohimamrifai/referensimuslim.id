import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Footer from "@/components/layout/Footer";
import CategorySidebar from "@/components/content/CategorySidebar";
import { getCategoryTree } from "@/app/actions/category";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategoryTree();

  return (
    <>
        <Navbar />
        
        <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-(--sidebar-width) bg-white overflow-hidden border-r border-gray-200 z-40">
          <CategorySidebar categories={categories} />
        </div>

        <div className="flex flex-col min-h-[calc(100vh-4rem)] md:pl-(--sidebar-width) transition-all duration-300">
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>

        <MobileBottomNav />
    </>
  );
}
