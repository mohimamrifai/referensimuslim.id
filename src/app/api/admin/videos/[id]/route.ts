import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { ContentStatus } from '@prisma/client';
import { unlink } from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const video = await prisma.content.findUnique({
      where: { id },
      include: {
        tags: true,
        category: true,
        subcategory: true,
        author: true,
        reference: true,
      },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.categoryId || !body.authorId || !body.videoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if video exists
    const existingVideo = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingVideo) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Generate slug if changed
    let finalSlug = body.slug;
    if (body.slug && body.slug !== existingVideo.slug) {
        // Ensure unique if changed
        const existingSlug = await prisma.content.findUnique({ where: { slug: body.slug } });
        if (existingSlug && existingSlug.id !== id) {
            finalSlug = `${body.slug}-${Date.now()}`;
        }
    } else if (!body.slug) {
        // Fallback if slug is empty
        finalSlug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }

    // Prepare tags update logic
    const tagIds: string[] = [];
    if (body.tags && Array.isArray(body.tags)) {
        for (const tagName of body.tags) {
            const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            const tag = await prisma.tag.upsert({
                where: { slug: tagSlug },
                update: {},
                create: { name: tagName, slug: tagSlug },
            });
            tagIds.push(tag.id);
        }
    }

    const video = await prisma.content.update({
      where: { id },
      data: {
        title: body.title,
        slug: finalSlug,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        status: body.status || ContentStatus.DRAFT,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null,
        authorId: body.authorId,
        referenceId: body.referenceId || null,
        
        videoUrl: body.videoUrl,
        duration: body.duration,
        
        publishedAt: body.status === 'PUBLISHED' && existingVideo.status !== 'PUBLISHED' ? new Date() : existingVideo.publishedAt,
        
        tags: {
            set: tagIds.map(id => ({ id })),
        }
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error updating video:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();

  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get video first to check for image
    const video = await prisma.content.findUnique({
      where: { id },
      select: { image: true }
    });

    if (video?.image) {
       // Check if it's a local file
       if (video.image.includes('/api/view-image/')) {
          const filename = video.image.split('/').pop();
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting video:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
