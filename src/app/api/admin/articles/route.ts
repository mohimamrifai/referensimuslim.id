import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { ContentType, ContentStatus } from '@prisma/client';

export async function POST(request: Request) {
  const session = await auth();
  
  // Check auth
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.categoryId || !body.authorId) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug if not provided
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // Ensure unique slug
    const existing = await prisma.content.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const article = await prisma.content.create({
      data: {
        title: body.title,
        slug: finalSlug,
        excerpt: body.excerpt,
        content: body.content, // HTML from editor
        image: body.image,
        type: ContentType.ARTIKEL, // For now assuming Article creation
        status: body.status || ContentStatus.DRAFT,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null,
        authorId: body.authorId,
        referenceId: body.referenceId || null,
        // Optional fields
        readTime: body.readTime,
        publishedAt: body.status === 'PUBLISHED' ? new Date() : null,
        tags: body.tags && body.tags.length > 0 ? {
          connectOrCreate: body.tags.map((tagName: string) => {
            const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return {
              where: { slug: tagSlug },
              create: { name: tagName, slug: tagSlug }
            };
          })
        } : undefined,
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
