import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  
  // Check auth
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const authors = await prisma.author.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { contents: true }
        }
      }
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  
  // Check auth
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const author = await prisma.author.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error('Error creating author:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
