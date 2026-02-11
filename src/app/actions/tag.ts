'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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

export async function createTag(data: {
  name: string;
  slug: string;
}) {
  try {
    // Validate required fields
    if (!data.name || !data.slug) {
      return { success: false, error: 'Nama dan Slug wajib diisi' };
    }

    // Check if slug exists
    const existing = await prisma.tag.findUnique({
      where: { slug: data.slug }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.tag.create({
      data: {
        name: data.name,
        slug: data.slug,
      }
    });

    revalidatePath('/dashboard/tags');
    return { success: true };
  } catch (error) {
    console.error('Create tag error:', error);
    return { success: false, error: 'Gagal membuat tag' };
  }
}

export async function updateTag(id: string, data: {
  name: string;
  slug: string;
}) {
  try {
    // Check if slug exists (exclude current)
    const existing = await prisma.tag.findFirst({
      where: { 
        slug: data.slug,
        NOT: { id }
      }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
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
