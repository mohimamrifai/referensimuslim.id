import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();
  
  // Check auth
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.fullName || !body.whatsapp || !body.address || !body.age || !body.gender || !body.motivation || !body.birthPlace || !body.birthDate || !body.education || !body.occupation) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const registration = await prisma.ngajiRegistration.create({
      data: {
        fullName: body.fullName,
        whatsapp: body.whatsapp,
        address: body.address,
        age: parseInt(body.age),
        gender: body.gender,
        motivation: body.motivation,
        birthPlace: body.birthPlace,
        birthDate: new Date(body.birthDate),
        education: body.education,
        occupation: body.occupation,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error creating ngaji registration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
