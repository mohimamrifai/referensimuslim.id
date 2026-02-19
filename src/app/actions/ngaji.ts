'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

const RegistrationSchema = z.object({
  fullName: z.string().min(1, 'Nama lengkap wajib diisi'),
  gender: z.enum(['Laki-laki', 'Perempuan'], {
    message: 'Pilih jenis kelamin',
  }),
  birthPlace: z.string().min(1, 'Tempat lahir wajib diisi'),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Tanggal lahir tidak valid',
  }),
  age: z.number().min(1, 'Usia wajib diisi'),
  address: z.string().min(1, 'Domisili wajib diisi'),
  whatsapp: z.string().min(1, 'Nomor WA wajib diisi'),
  education: z.string().min(1, 'Pendidikan terakhir wajib diisi'),
  occupation: z.string().min(1, 'Pekerjaan wajib diisi'),
  motivation: z.string().min(1, 'Motivasi wajib diisi'),
});

export type RegistrationState = {
  success: boolean;
  message?: string;
  errors?: {
    [key: string]: string[] | undefined;
  };
};

export async function registerNgaji(_prevState: unknown, formData: FormData): Promise<RegistrationState> {
  try {
    const rawData = {
      fullName: formData.get('fullName'),
      gender: formData.get('gender'),
      birthPlace: formData.get('birthPlace'),
      birthDate: formData.get('birthDate'),
      age: Number(formData.get('age')),
      address: formData.get('address'),
      whatsapp: formData.get('whatsapp'),
      education: formData.get('education'),
      occupation: formData.get('occupation'),
      motivation: formData.get('motivation'),
    };

    // Handle "Yang lain" fields if necessary, but for now we assume the select/input logic is handled in frontend
    // If the frontend sends the custom value directly in 'education' or 'occupation', it works fine.

    const validatedData = RegistrationSchema.parse(rawData);

    await prisma.ngajiRegistration.create({
      data: {
        ...validatedData,
        birthDate: new Date(validatedData.birthDate),
      },
    });

    return { success: true, message: 'Pendaftaran berhasil dikirim!' };
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: 'Terjadi kesalahan saat mengirim pendaftaran.' };
  }
}

export async function createNgaji(data: z.infer<typeof RegistrationSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = RegistrationSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const registration = await prisma.ngajiRegistration.create({
      data: {
        ...result.data,
        birthDate: new Date(result.data.birthDate),
      },
    });

    revalidatePath('/dashboard/ngaji');
    return { success: true, data: registration };
  } catch (error) {
    console.error('Error creating ngaji registration:', error);
    return { success: false, error: 'Failed to create registration' };
  }
}

export async function updateNgaji(id: string, data: z.infer<typeof RegistrationSchema>) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  const result = RegistrationSchema.safeParse(data);
  if (!result.success) {
    return { success: false, error: result.error.issues[0].message };
  }

  try {
    const registration = await prisma.ngajiRegistration.update({
      where: { id },
      data: {
        ...result.data,
        birthDate: new Date(result.data.birthDate),
      },
    });

    revalidatePath('/dashboard/ngaji');
    return { success: true, data: registration };
  } catch (error) {
    console.error('Error updating ngaji registration:', error);
    return { success: false, error: 'Failed to update registration' };
  }
}

export async function deleteNgaji(id: string) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.ngajiRegistration.delete({
      where: { id },
    });

    revalidatePath('/dashboard/ngaji');
    return { success: true };
  } catch (error) {
    console.error('Error deleting ngaji registration:', error);
    return { success: false, error: 'Failed to delete registration' };
  }
}
