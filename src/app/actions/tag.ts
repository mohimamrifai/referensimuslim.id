'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';

const tagSchema = z.object({
  name: z.string().min(1, 'Nama tag wajib diisi'),
  slug: z.string().min(1, 'Slug tag wajib diisi'),
});

export async function getTags() {
  return await prisma.tag.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { contents: true }
      }
    }
  });
}

export async function createTag(data: z.infer<typeof tagSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = tagSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const existing = await prisma.tag.findUnique({
      where: { slug: result.data.slug }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.tag.create({
      data: {
        name: result.data.name,
        slug: result.data.slug,
      }
    });

    revalidatePath('/dashboard/tags');
    return { success: true };
  } catch (error) {
    console.error('Create tag error:', error);
    return { success: false, error: 'Gagal membuat tag' };
  }
}

export async function updateTag(id: string, data: z.infer<typeof tagSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = tagSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const existing = await prisma.tag.findFirst({
      where: { 
        slug: result.data.slug,
        NOT: { id }
      }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.tag.update({
      where: { id },
      data: {
        name: result.data.name,
        slug: result.data.slug,
      }
    });

    revalidatePath('/dashboard/tags');
    return { success: true };
  } catch (error) {
    console.error('Update tag error:', error);
    return { success: false, error: 'Gagal mengupdate tag' };
  }
}

export async function deleteTag(id: string) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.tag.delete({
      where: { id }
    });

    revalidatePath('/dashboard/tags');
    return { success: true };
  } catch (error) {
    console.error('Delete tag error:', error);
    return { success: false, error: 'Gagal menghapus tag' };
  }
}
