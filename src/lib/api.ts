export async function uploadImage(file: File, folder?: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  if (folder) formData.append('folder', folder);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Upload failed');

  return data.url;
}
