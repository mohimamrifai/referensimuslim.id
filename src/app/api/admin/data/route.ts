import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [categories, authors, references, tags] = await Promise.all([
      prisma.category.findMany({
        where: { parentId: null },
        include: { children: true },
      }),
      prisma.author.findMany({ orderBy: { name: 'asc' } }),
      prisma.reference.findMany({ orderBy: { name: 'asc' } }),
      prisma.tag.findMany({ orderBy: { name: 'asc' } }),
    ]);

    return NextResponse.json({
      categories,
      authors,
      references,
      tags,
    });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
