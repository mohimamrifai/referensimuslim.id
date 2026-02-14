'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const SocialMediaSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL format'),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

type ActionState = {
  success: boolean;
  message?: string;
  error?: string;
} | null;

export async function getSocialMedias() {
  try {
    const socialMedias = await prisma.socialMedia.findMany({
      orderBy: { order: 'asc' },
    });
    return { success: true, data: socialMedias };
  } catch (error) {
    console.error('Failed to fetch social medias:', error);
    return { success: false, error: 'Failed to fetch social medias' };
  }
}

export async function createSocialMedia(prevState: ActionState, formData: FormData) {
  try {
    const rawData = {
      platform: formData.get('platform'),
      url: formData.get('url'),
      isActive: formData.get('isActive') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    };

    const validatedData = SocialMediaSchema.parse(rawData);

    await prisma.socialMedia.create({
      data: validatedData,
    });

    revalidatePath('/dashboard/settings');
    return { success: true, message: 'Social media created successfully' };
  } catch (error) {
    console.error('Failed to create social media:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to create social media' };
  }
}

export async function updateSocialMedia(prevState: ActionState, formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const rawData = {
      platform: formData.get('platform'),
      url: formData.get('url'),
      isActive: formData.get('isActive') === 'on',
      order: parseInt(formData.get('order') as string) || 0,
    };

    const validatedData = SocialMediaSchema.parse(rawData);

    await prisma.socialMedia.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath('/dashboard/settings');
    return { success: true, message: 'Social media updated successfully' };
  } catch (error) {
    console.error('Failed to update social media:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Failed to update social media' };
  }
}

export async function deleteSocialMedia(id: string) {
  try {
    await prisma.socialMedia.delete({
      where: { id },
    });

    revalidatePath('/dashboard/settings');
    return { success: true, message: 'Social media deleted successfully' };
  } catch (error) {
    console.error('Failed to delete social media:', error);
    return { success: false, error: 'Failed to delete social media' };
  }
}
