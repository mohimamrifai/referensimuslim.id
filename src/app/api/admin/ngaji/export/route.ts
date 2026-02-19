import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import * as XLSX from 'xlsx';

export async function GET() {
  const session = await auth();

  // Check auth
  if (!session || (session.user as { role?: string }).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all registrations
    const registrations = await prisma.ngajiRegistration.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Format data for Excel
    const data = registrations.map((reg) => ({
      'ID': reg.id,
      'Nama Lengkap': reg.fullName,
      'Jenis Kelamin': reg.gender,
      'Tempat Lahir': reg.birthPlace,
      'Tanggal Lahir': new Date(reg.birthDate).toLocaleDateString('id-ID'),
      'Usia': reg.age,
      'No. WhatsApp': reg.whatsapp,
      'Pendidikan Terakhir': reg.education,
      'Pekerjaan': reg.occupation,
      'Domisili': reg.address,
      'Motivasi': reg.motivation,
      'Tanggal Daftar': new Date(reg.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Adjust column widths (optional but good for UX)
    const columnWidths = [
      { wch: 30 }, // ID
      { wch: 25 }, // Nama Lengkap
      { wch: 15 }, // Jenis Kelamin
      { wch: 15 }, // Tempat Lahir
      { wch: 15 }, // Tanggal Lahir
      { wch: 5 },  // Usia
      { wch: 15 }, // No. WhatsApp
      { wch: 20 }, // Pendidikan
      { wch: 20 }, // Pekerjaan
      { wch: 30 }, // Domisili
      { wch: 40 }, // Motivasi
      { wch: 20 }, // Tanggal Daftar
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftar Ngaji');

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Return response with headers for download
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="pendaftar-ngaji-${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Error exporting ngaji registrations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
