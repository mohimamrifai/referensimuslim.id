// src/components/content/AdSpaceServer.tsx
import AdSpace from './AdSpace';
import { getAdSpace } from '@/app/actions/ads';

interface AdSpaceServerProps {
  position: string;
}

export default async function AdSpaceServer({ position }: AdSpaceServerProps) {
  const ad = await getAdSpace(position);
  return <AdSpace ad={ad} />;
}
