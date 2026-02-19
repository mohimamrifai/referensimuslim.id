'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

const authorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export async function createAuthor(data: z.infer<typeof authorSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = authorSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const author = await prisma.author.create({
      data: result.data,
    });

    revalidatePath('/dashboard/authors');
    return { success: true, data: author };
  } catch (error) {
    console.error('Error creating author:', error);
    return { success: false, error: 'Failed to create author' };
  }
}

export async function updateAuthor(id: string, data: z.infer<typeof authorSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = authorSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const author = await prisma.author.update({
      where: { id },
      data: result.data,
    });

    revalidatePath('/dashboard/authors');
    return { success: true, data: author };
  } catch (error) {
    console.error('Error updating author:', error);
    return { success: false, error: 'Failed to update author' };
  }
}

export async function deleteAuthor(id: string) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.author.delete({
      where: { id },
    });

    revalidatePath('/dashboard/authors');
    return { success: true };
  } catch (error) {
    console.error('Error deleting author:', error);
    return { success: false, error: 'Failed to delete author' };
  }
}
