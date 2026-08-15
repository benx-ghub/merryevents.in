import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry, getEnquiries } from '@/lib/enquiries';

export async function POST(req: NextRequest) {
  const { name, phone } = await req.json();
  if (!name || !phone) {
    return NextResponse.json(
      { error: 'Name and phone are required' },
      { status: 400 }
    );
  }
  await addEnquiry(String(name).slice(0, 100), String(phone).slice(0, 20));
  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const enquiries = await getEnquiries();
  return NextResponse.json({ enquiries });
}
