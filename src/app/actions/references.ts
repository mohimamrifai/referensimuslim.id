'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

const referenceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  image: z.string().optional(),
  institution: z.string().optional(),
  verified: z.boolean().optional(),
});

export async function createReference(data: z.infer<typeof referenceSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = referenceSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const reference = await prisma.reference.create({
      data: result.data,
    });

    revalidatePath('/dashboard/references');
    return { success: true, data: reference };
  } catch (error) {
    console.error('Error creating reference:', error);
    return { success: false, error: 'Failed to create reference' };
  }
}

export async function updateReference(id: string, data: z.infer<typeof referenceSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = referenceSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const reference = await prisma.reference.update({
      where: { id },
      data: result.data,
    });

    revalidatePath('/dashboard/references');
    return { success: true, data: reference };
  } catch (error) {
    console.error('Error updating reference:', error);
    return { success: false, error: 'Failed to update reference' };
  }
}

export async function deleteReference(id: string) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.reference.delete({
      where: { id },
    });

    revalidatePath('/dashboard/references');
    return { success: true };
  } catch (error) {
    console.error('Error deleting reference:', error);
    return { success: false, error: 'Failed to delete reference' };
  }
}
