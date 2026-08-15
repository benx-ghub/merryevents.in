import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedUrl, setFeaturedUrl } from '../../../lib/featured';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const url = await getFeaturedUrl();
  return NextResponse.json({ url });
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ error: 'url required' }, { status: 400 });
  }
  await setFeaturedUrl(url);
  return NextResponse.json({ ok: true });
}
