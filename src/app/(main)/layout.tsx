import Navbar from "@/components/layout/Navbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Footer from "@/components/layout/Footer";
import AdSpaceServer from "@/components/content/AdSpaceServer";

import { auth } from "@/auth";
import { getMaintenanceStatus } from "@/app/actions/settings";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = await getMaintenanceStatus();
  
  if (isMaintenance) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    
    if (role !== 'ADMIN') {
      redirect('/maintenance');
    }
  }

  return (
    <>
        <Navbar adSlot={<AdSpaceServer position="NAVBAR_TOP" />} />
        <div className="flex flex-col min-h-[calc(100vh-4rem)] transition-all duration-300">
          <main className="grow">
            {children}
          </main>
          <Footer />
        </div>

        <MobileBottomNav />
    </>
  );
}
