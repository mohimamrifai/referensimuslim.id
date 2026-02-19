'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';

// Schema Validation
const categorySchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  slug: z.string().min(1, 'Slug wajib diisi'),
  description: z.string().optional(),
  parentId: z.string().optional().nullable(),
});

export type CategoryTreeItem = {
  id: string;
  name: string;
  slug: string;
  children: {
    id: string;
    name: string;
    slug: string;
    count: number;
  }[];
  count: number;
};

export async function getCategoryTree(): Promise<CategoryTreeItem[]> {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            _count: {
              select: { subContents: true }
            }
          },
          orderBy: { name: 'asc' }
        },
        _count: {
          select: { contents: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      children: cat.children.map(child => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
        count: child._count.subContents
      })),
      count: cat._count.contents
    }));
  } catch (error) {
    console.error('Error fetching category tree:', error);
    return [];
  }
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = categorySchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    // Check if slug exists
    const existing = await prisma.category.findUnique({
      where: { slug: result.data.slug }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.category.create({
      data: {
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description,
        parentId: result.data.parentId || null,
      }
    });

    revalidatePath('/dashboard/categories');
    return { success: true };
  } catch (error) {
    console.error('Create category error:', error);
    return { success: false, error: 'Gagal membuat kategori' };
  }
}

export async function updateCategory(id: string, data: z.infer<typeof categorySchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = categorySchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    // Check if slug exists in OTHER categories
    const existing = await prisma.category.findFirst({
      where: { 
        slug: result.data.slug,
        NOT: { id }
      }
    });

    if (existing) {
      return { success: false, error: 'Slug sudah digunakan' };
    }

    await prisma.category.update({
      where: { id },
      data: {
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description,
        parentId: result.data.parentId || null,
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
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    // Check if category has children or content
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        contents: true,
        subContents: true
      }
    });

    if (!category) {
      return { success: false, error: 'Kategori tidak ditemukan' };
    }

    if (category.children.length > 0) {
      return { success: false, error: 'Hapus subkategori terlebih dahulu' };
    }

    if (category.contents.length > 0 || category.subContents.length > 0) {
      return { success: false, error: 'Kategori masih memiliki konten' };
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
