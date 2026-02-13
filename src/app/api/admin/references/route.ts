import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const references = await prisma.reference.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(references);
  } catch (error) {
    console.error('Error fetching references:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    if (!body.name) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const reference = await prisma.reference.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        institution: body.institution,
        verified: body.verified || false,
      },
    });
    
    return NextResponse.json(reference);
  } catch (error) {
    console.error('Error creating reference:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
