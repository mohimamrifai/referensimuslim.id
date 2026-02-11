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
    if (!body.title || !body.categoryId || !body.authorId || !body.videoUrl) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug if not provided
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    // Ensure unique slug
    const existing = await prisma.content.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const podcast = await prisma.content.create({
      data: {
        title: body.title,
        slug: finalSlug,
        excerpt: body.excerpt,
        content: body.content, // HTML description
        image: body.image,
        type: ContentType.PODCAST,
        status: body.status || ContentStatus.DRAFT,
        categoryId: body.categoryId,
        subcategoryId: body.subcategoryId || null,
        authorId: body.authorId,
        referenceId: body.referenceId || null,
        
        // Podcast uses videoUrl for YouTube link (same as video)
        videoUrl: body.videoUrl,
        duration: body.duration,
        
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

    return NextResponse.json(podcast);
  } catch (error) {
    console.error('Error creating podcast:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
    const session = await auth();
    
    // Check auth
    if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const page = Number(searchParams.get('page')) || 1;
        const limit = Number(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        const where = {
            type: ContentType.PODCAST,
            ...(search && {
                title: {
                    contains: search,
                    mode: 'insensitive' as const,
                },
            }),
        };

        const [podcasts, total] = await Promise.all([
            prisma.content.findMany({
                where,
                include: {
                    category: true,
                    author: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limit,
            }),
            prisma.content.count({ where }),
        ]);

        return NextResponse.json({
            data: podcasts,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching podcasts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
