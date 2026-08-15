import { NextRequest, NextResponse } from 'next/server';
import { getPhotos, addPhoto, deletePhoto } from '../../../lib/photos';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function isAuthorized(req: NextRequest) {
  const secret = req.headers.get('x-admin-secret');
  return Boolean(secret) && secret === process.env.ADMIN_SECRET;
}

export async function GET() {
  const photos = await getPhotos();
  return NextResponse.json({ photos });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  const photo = await addPhoto(file);
  return NextResponse.json({ photo });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { pathname } = await req.json();
  if (!pathname) {
    return NextResponse.json({ error: 'pathname required' }, { status: 400 });
  }
  await deletePhoto(pathname);
  return NextResponse.json({ ok: true });
}
