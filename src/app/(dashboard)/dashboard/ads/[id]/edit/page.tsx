import { getAdvertisement } from "@/app/actions/ads";
import AdForm from "@/components/admin/ads/AdForm";
import { notFound } from "next/navigation";

interface EditAdPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAdPage({ params }: EditAdPageProps) {
  const { id } = await params;
  const ad = await getAdvertisement(id);

  if (!ad) {
    notFound();
  }

  return <AdForm initialData={ad} isEdit />;
}
