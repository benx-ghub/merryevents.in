import { list, put, del } from '@vercel/blob';

export type Photo = {
  url: string;
  pathname: string;
  uploadedAt: string;
};

export async function getPhotos(): Promise<Photo[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const { blobs } = await list({ prefix: 'gallery/' });
  return blobs
    .map((b) => ({
      url: b.url,
      pathname: b.pathname,
      uploadedAt: new Date(b.uploadedAt).toISOString(),
    }))
    .sort((a, b) => (a.uploadedAt < b.uploadedAt ? 1 : -1));
}

export async function addPhoto(file: File): Promise<Photo> {
  const ext = file.name.split('.').pop() || 'jpg';
  const key = `gallery/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;
  const blob = await put(key, file, { access: 'public' });
  return {
    url: blob.url,
    pathname: blob.pathname,
    uploadedAt: new Date().toISOString(),
  };
}

export async function deletePhoto(pathname: string): Promise<void> {
  await del(pathname);
}
