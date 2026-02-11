'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}) {
  try {
    // Validate required fields
    if (!data.name || !data.slug) {
      return { success: false, error: 'Nama dan Slug wajib diisi' };
    }

    // Check if slug exists
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        parentId: data.parentId || null,
      }
    });

    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    console.error('Create category error:', error);
    return { success: false, error: 'Gagal membuat kategori' };
  }
}

export async function updateCategory(id: string, data: {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}) {
  try {
    // Check if slug exists (exclude current)
    const existing = await prisma.category.findFirst({
      where: { 
        slug: data.slug,
        NOT: { id }
      }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        parentId: data.parentId || null,
      }
    });

    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    console.error('Update category error:', error);
    return { success: false, error: 'Gagal mengupdate kategori' };
  }
}

export async function deleteCategory(id: string) {
  try {
    // Check if category has contents
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { 
            contents: true,
            subContents: true,
            children: true
          }
        }
      }
    });

    if (!category) return { success: false, error: 'Kategori tidak ditemukan' };

    if (category._count.contents > 0 || category._count.subContents > 0) {
      return { success: false, error: 'Tidak dapat menghapus kategori yang memiliki konten' };
    }

    if (category._count.children > 0) {
      return { success: false, error: 'Tidak dapat menghapus kategori yang memiliki subkategori' };
    }

    await prisma.category.delete({
      where: { id }
    });

    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    console.error('Delete category error:', error);
    return { success: false, error: 'Gagal menghapus kategori' };
  }
}
