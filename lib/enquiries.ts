import { list, put } from '@vercel/blob';

export type Enquiry = {
  name: string;
  phone: string;
  submittedAt: string;
};

export async function addEnquiry(name: string, phone: string): Promise<void> {
  const key = `enquiries/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.json`;
  const record: Enquiry = { name, phone, submittedAt: new Date().toISOString() };
  await put(key, JSON.stringify(record), {
    access: 'public',
    contentType: 'application/json',
  });
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const { blobs } = await list({ prefix: 'enquiries/' });
  const records = await Promise.all(
    blobs.map(async (b) => {
      const res = await fetch(b.url);
      return (await res.json()) as Enquiry;
    })
  );
  return records.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
}
