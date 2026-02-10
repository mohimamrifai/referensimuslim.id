import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create unique filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
  
  // Ensure directory exists
  // User requested to store in src folder to avoid public download on load
  const uploadDir = path.join(process.cwd(), 'src/assets/uploads');
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {
    console.error('Error creating upload dir', e);
  }

  const filepath = path.join(uploadDir, filename);
  
  try {
    await writeFile(filepath, buffer);
    return NextResponse.json({ 
      success: true, 
      url: `/api/view-image/${filename}` 
    });
  } catch (error) {
    console.error('Error saving file', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
