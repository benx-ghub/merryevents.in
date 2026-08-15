import { put, list, del } from '@vercel/blob';

const FEATURED_KEY = 'meta/featured.json';

export async function getFeaturedUrl(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: FEATURED_KEY });
    const match = blobs.find((b) => b.pathname === FEATURED_KEY);
    if (!match) return null;
    const res = await fetch(match.url, { cache: 'no-store' });
    const data = await res.json();
    return data.url || null;
  } catch {
    return null;
  }
}

export async function setFeaturedUrl(url: string): Promise<void> {
  try {
    const { blobs } = await list({ prefix: FEATURED_KEY });
    const existing = blobs.find((b) => b.pathname === FEATURED_KEY);
    if (existing) {
      await del(existing.url);
    }
  } catch {
    // nothing to delete yet, that's fine
  }
  await put(FEATURED_KEY, JSON.stringify({ url }), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
}
