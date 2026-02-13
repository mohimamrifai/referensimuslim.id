import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

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
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        _count: {
          select: { contents: true }
        }
      }
    });

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    return NextResponse.json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
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
    if (!body.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if author exists
    const existingAuthor = await prisma.author.findUnique({
      where: { id },
    });

    if (!existingAuthor) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    const author = await prisma.author.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.error('Error updating author:', error);
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
    // Check if author has contents
    const author = await prisma.author.findUnique({
      where: { id },
      include: {
        _count: {
          select: { contents: true }
        }
      }
    });

    if (!author) {
      return NextResponse.json({ error: 'Author not found' }, { status: 404 });
    }

    if (author._count.contents > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete author because they have associated content.' 
      }, { status: 400 });
    }

    await prisma.author.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
