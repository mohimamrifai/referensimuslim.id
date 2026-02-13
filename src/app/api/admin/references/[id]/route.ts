import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const reference = await prisma.reference.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { contents: true }
        }
      }
    });

    if (!reference) {
      return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
    }

    return NextResponse.json(reference);
  } catch (error) {
    console.error('Error fetching reference:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const reference = await prisma.reference.update({
      where: { id: params.id },
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        institution: body.institution,
        verified: body.verified,
      },
    });

    return NextResponse.json(reference);
  } catch (error) {
    console.error('Error updating reference:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if reference has contents
    const reference = await prisma.reference.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { contents: true }
        }
      }
    });

    if (!reference) {
      return NextResponse.json({ error: 'Reference not found' }, { status: 404 });
    }

    if (reference._count.contents > 0) {
      return NextResponse.json(
        { error: 'Cannot delete reference with associated contents' },
        { status: 400 }
      );
    }

    await prisma.reference.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting reference:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
