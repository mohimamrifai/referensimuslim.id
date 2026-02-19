'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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
