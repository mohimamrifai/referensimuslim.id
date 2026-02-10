'use server';

import { prisma } from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';

export async function incrementView(slug: string) {
  if (!slug) return;

  try {
    await prisma.content.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });
    
    // Opsional: Revalidate path jika ingin data terupdate instan di server component
    // revalidatePath(`/${slug}`);
  } catch (error) {
    console.error('Failed to increment view:', error);
  }
}
