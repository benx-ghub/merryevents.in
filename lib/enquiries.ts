import { list, put } from '@vercel/blob';

export type Enquiry = {
  name: string;
  phone: string;
  submittedAt: string;
};

async function sendNotificationEmail(name: string, phone: string) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Merry Events Website <onboarding@resend.dev>',
        to: process.env.NOTIFY_EMAIL || 'merryevents.in@gmail.com',
        subject: `New enquiry: ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p>Submitted just now via merryevents.in</p>`,
      }),
    });
  } catch (err) {
    console.error('Email notification failed', err);
  }
}

export async function addEnquiry(name: string, phone: string): Promise<void> {
  const key = `enquiries/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.json`;
  const record: Enquiry = { name, phone, submittedAt: new Date().toISOString() };
  await put(key, JSON.stringify(record), {
    access: 'public',
    contentType: 'application/json',
  });
  await sendNotificationEmail(name, phone);
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
