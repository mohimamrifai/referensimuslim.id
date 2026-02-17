import { getAdvertisements } from "@/app/actions/ads";
import AdList from "@/components/admin/ads/AdList";

export const dynamic = "force-dynamic";

export default async function AdsPage() {
  const ads = await getAdvertisements();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Iklan</h1>
          <p className="text-gray-500 mt-1">Kelola banner iklan di website</p>
        </div>
      </div>

      <AdList ads={ads} />
    </div>
  );
}
