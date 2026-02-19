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
    const registration = await prisma.ngajiRegistration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
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
    if (!body.fullName || !body.whatsapp || !body.address || !body.age || !body.gender || !body.motivation || !body.birthPlace || !body.birthDate || !body.education || !body.occupation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if registration exists
    const existingRegistration = await prisma.ngajiRegistration.findUnique({
      where: { id },
    });

    if (!existingRegistration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    const registration = await prisma.ngajiRegistration.update({
      where: { id },
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
    console.error('Error updating registration:', error);
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
    // Check if registration exists
    const registration = await prisma.ngajiRegistration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    await prisma.ngajiRegistration.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
