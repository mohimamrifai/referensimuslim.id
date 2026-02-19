'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';

const adSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  imageUrl: z.string().min(1, 'Gambar wajib diisi'),
  targetUrl: z.string().optional().nullable(),
  position: z.string().default('HOME_TOP'),
  isActive: z.boolean().default(true),
});

export async function getAdvertisements() {
  return await prisma.advertisement.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getAdvertisement(id: string) {
  return await prisma.advertisement.findUnique({
    where: { id },
  });
}

export async function createAdvertisement(formData: FormData) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const rawData = {
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    targetUrl: formData.get('targetUrl'),
    position: formData.get('position'),
    isActive: formData.get('isActive') === 'true',
  };

  // Convert to expected types
  const data = {
    title: typeof rawData.title === 'string' ? rawData.title : '',
    imageUrl: typeof rawData.imageUrl === 'string' ? rawData.imageUrl : '',
    targetUrl: typeof rawData.targetUrl === 'string' && rawData.targetUrl ? rawData.targetUrl : null,
    position: typeof rawData.position === 'string' ? rawData.position : 'HOME_TOP',
    isActive: rawData.isActive,
  };

  const result = adSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    await prisma.advertisement.create({
      data: {
        title: result.data.title,
        imageUrl: result.data.imageUrl,
        targetUrl: result.data.targetUrl,
        position: result.data.position,
        isActive: result.data.isActive,
      },
    });

    revalidatePath('/dashboard/ads');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Create ad error:', error);
    return { success: false, error: 'Gagal membuat iklan' };
  }
}

export async function updateAdvertisement(id: string, formData: FormData) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const rawData = {
    title: formData.get('title'),
    imageUrl: formData.get('imageUrl'),
    targetUrl: formData.get('targetUrl'),
    position: formData.get('position'),
    isActive: formData.get('isActive') === 'true',
  };

  const data = {
    title: typeof rawData.title === 'string' ? rawData.title : '',
    imageUrl: typeof rawData.imageUrl === 'string' ? rawData.imageUrl : '',
    targetUrl: typeof rawData.targetUrl === 'string' && rawData.targetUrl ? rawData.targetUrl : null,
    position: typeof rawData.position === 'string' ? rawData.position : 'HOME_TOP',
    isActive: rawData.isActive,
  };

  const result = adSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    await prisma.advertisement.update({
      where: { id },
      data: {
        title: result.data.title,
        imageUrl: result.data.imageUrl,
        targetUrl: result.data.targetUrl,
        position: result.data.position,
        isActive: result.data.isActive,
      },
    });

    revalidatePath('/dashboard/ads');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Update ad error:', error);
    return { success: false, error: 'Gagal mengupdate iklan' };
  }
}

export async function deleteAdvertisement(id: string) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.advertisement.delete({
      where: { id },
    });

    revalidatePath('/dashboard/ads');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Delete ad error:', error);
    return { success: false, error: 'Gagal menghapus iklan' };
  }
}

export async function toggleAdvertisementStatus(id: string, isActive: boolean) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.advertisement.update({
      where: { id },
      data: { isActive },
    });
    
    revalidatePath('/dashboard/ads');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Toggle ad status error:', error);
    return { success: false, error: 'Gagal mengubah status iklan' };
  }
}
