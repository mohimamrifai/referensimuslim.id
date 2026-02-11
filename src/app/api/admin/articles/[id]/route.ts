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
    const article = await prisma.content.findUnique({
      where: { id },
      include: {
        tags: true,
        category: true,
        subcategory: true,
        author: true,
        reference: true,
      },
    });

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
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
    if (!body.title || !body.categoryId || !body.authorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if article exists
    const existingArticle = await prisma.content.findUnique({
      where: { id },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    // Generate slug if changed
    let finalSlug = body.slug;
    if (body.slug && body.slug !== existingArticle.slug) {
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
    // We use a transaction to first clear tags then set new ones (or just use set with connectOrCreate if feasible, 
    // but Prisma doesn't support set: [...] with connectOrCreate easily for implicit m-n).
    // The cleanest way for implicit m-n replacement is set: [ {id: ...}, {id: ...} ].
    // But we have names, not IDs.
    // So we first need to ensure all tags exist and get their IDs.
    
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

    const article = await prisma.content.update({
      where: { id },
      data: {
        title: body.title,
        slug: finalSlug,
        excerpt: body.excerpt,
        content: body.content,
        image: body.image,
        // Type is not usually changeable, but we can if needed. Assuming fixed for now or passed.
        // type: body.type, 
        status: body.status || ContentStatus.DRAFT,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null,
        authorId: body.authorId,
        referenceId: body.referenceId || null,
        readTime: body.readTime,
        publishedAt: body.status === 'PUBLISHED' && existingArticle.status !== 'PUBLISHED' ? new Date() : existingArticle.publishedAt,
        
        tags: {
            set: tagIds.map(id => ({ id })),
        }
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error updating article:', error);
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
    // Get article first to check for image
    const article = await prisma.content.findUnique({
      where: { id },
      select: { image: true }
    });

    if (article?.image) {
       // Check if it's a local file (e.g., /api/view-image/...)
       // Our upload logic stores as /api/view-image/filename
       if (article.image.includes('/api/view-image/')) {
          const filename = article.image.split('/').pop();
          if (filename) {
             const filepath = path.join(process.cwd(), 'src/assets/uploads', filename);
             try {
                await unlink(filepath);
             } catch (e) {
                console.error('Failed to delete image file:', e);
                // Continue deletion even if file delete fails
             }
          }
       }
    }

    await prisma.content.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
