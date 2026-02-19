'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { ContentType, ContentStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { unlink } from 'fs/promises';
import path from 'path';

const podcastSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().optional().nullable(),
  authorId: z.string().min(1, "Author is required"),
  referenceId: z.string().optional().nullable(),
  status: z.string().default(ContentStatus.DRAFT),
  videoUrl: z.string().min(1, "Audio/Video URL is required"),
  duration: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function createPodcast(formData: z.infer<typeof podcastSchema>) {
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const validatedFields = podcastSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields', details: validatedFields.error.flatten() };
  }

  const { data } = validatedFields;

  try {
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const existing = await prisma.content.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const podcast = await prisma.content.create({
      data: {
        title: data.title,
        slug: finalSlug,
        excerpt: data.excerpt,
        content: data.content || '',
        image: data.image,
        type: ContentType.PODCAST,
        status: (data.status as ContentStatus) || ContentStatus.DRAFT,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId || null,
        authorId: data.authorId,
        referenceId: data.referenceId || null,
        videoUrl: data.videoUrl,
        duration: data.duration,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        tags: data.tags && data.tags.length > 0 ? {
          connectOrCreate: data.tags.map((tagName: string) => {
            const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return {
              where: { slug: tagSlug },
              create: { name: tagName, slug: tagSlug }
            };
          })
        } : undefined,
      },
    });

    revalidatePath('/dashboard/podcasts');
    revalidatePath('/kategori/[parent]/[slug]');
    revalidatePath('/');
    
    return { success: true, data: podcast };
  } catch (error) {
    console.error('Error creating podcast:', error);
    return { error: 'Internal Server Error' };
  }
}

export async function updatePodcast(id: string, formData: z.infer<typeof podcastSchema>) {
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  const validatedFields = podcastSchema.safeParse(formData);
  
  if (!validatedFields.success) {
    return { error: 'Invalid fields', details: validatedFields.error.flatten() };
  }

  const { data } = validatedFields;

  try {
    const existingPodcast = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingPodcast) {
      return { error: 'Podcast not found' };
    }

    let finalSlug = data.slug;
    if (data.slug && data.slug !== existingPodcast.slug) {
        const existingSlug = await prisma.content.findUnique({ where: { slug: data.slug } });
        if (existingSlug && existingSlug.id !== id) {
            finalSlug = `${data.slug}-${Date.now()}`;
        }
    } else if (!data.slug) {
        finalSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    const tagIds: string[] = [];
    if (data.tags && Array.isArray(data.tags)) {
        for (const tagName of data.tags) {
            const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const tag = await prisma.tag.upsert({
                where: { slug: tagSlug },
                update: {},
                create: { name: tagName, slug: tagSlug },
            });
            tagIds.push(tag.id);
        }
    }

    const podcast = await prisma.content.update({
      where: { id },
      data: {
        title: data.title,
        slug: finalSlug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        status: (data.status as ContentStatus) || ContentStatus.DRAFT,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId || null,
        authorId: data.authorId,
        referenceId: data.referenceId || null,
        videoUrl: data.videoUrl,
        duration: data.duration,
        publishedAt: data.status === 'PUBLISHED' && existingPodcast.status !== 'PUBLISHED' ? new Date() : existingPodcast.publishedAt,
        tags: {
            set: tagIds.map(id => ({ id })),
        }
      },
    });

    revalidatePath('/dashboard/podcasts');
    revalidatePath(`/dashboard/podcasts/${id}/edit`);
    revalidatePath('/kategori/[parent]/[slug]');
    revalidatePath('/');

    return { success: true, data: podcast };
  } catch (error) {
    console.error('Error updating podcast:', error);
    return { error: 'Internal Server Error' };
  }
}

export async function deletePodcast(id: string) {
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { error: 'Unauthorized' };
  }

  try {
    const podcast = await prisma.content.findUnique({
      where: { id },
      select: { image: true }
    });

    if (podcast?.image) {
       if (podcast.image.includes('/api/view-image/')) {
          const filename = podcast.image.split('/').pop();
          if (filename) {
             const filepath = path.join(process.cwd(), 'src/assets/uploads', filename);
             try {
                await unlink(filepath);
             } catch (e) {
                console.error('Failed to delete image file:', e);
             }
          }
       }
    }

    await prisma.content.delete({
      where: { id },
    });

    revalidatePath('/dashboard/podcasts');
    return { success: true };
  } catch (error) {
    console.error('Error deleting podcast:', error);
    return { error: 'Internal Server Error' };
  }
}
