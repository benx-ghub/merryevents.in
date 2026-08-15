'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

type Photo = { url: string; pathname: string; uploadedAt: string };
type Enquiry = { name: string; phone: string; submittedAt: string };

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('merryevents-admin-secret');
    if (saved) {
      setSecret(saved);
      setUnlocked(true);
    }
  }, []);

  const load = useCallback(async (key: string) => {
    const [photosRes, enquiriesRes] = await Promise.all([
      fetch('/api/photos'),
      fetch('/api/enquiry', { headers: { 'x-admin-secret': key } }),
    ]);
    const photosData = await photosRes.json();
    setPhotos(photosData.photos || []);
    if (enquiriesRes.ok) {
      const enquiriesData = await enquiriesRes.json();
      setEnquiries(enquiriesData.enquiries || []);
    }
  }, []);

  useEffect(() => {
    if (unlocked) load(secret);
  }, [unlocked, secret, load]);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem('merryevents-admin-secret', secret);
    setUnlocked(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'x-admin-secret': secret },
          body: formData,
        });
        if (!res.ok) throw new Error('Upload failed — check your admin key');
      }
      await load(secret);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function handleDelete(pathname: string) {
    try {
      const res = await fetch('/api/photos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': secret,
        },
        body: JSON.stringify({ pathname: p.url }),
      });
      if (!res.ok) {
        setError('Delete failed — check your admin key and try again');
        return;
      }
      setPhotos((prev) => prev.filter((p) => p.pathname !== pathname));
    } catch {
      setError('Delete failed — check your connection and try again');
    }
  }

  if (!unlocked) {
    return (
      <main className="max-w-sm mx-auto px-6 py-24">
        <h1 className="font-display text-3xl mb-6">Admin Access</h1>
        <form onSubmit={handleUnlock} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Admin key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-ink/40"
            required
          />
          <button type="submit" className="btn-primary justify-center">
            Unlock
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-3xl">Gallery Admin</h1>
        <label className="btn-primary cursor-pointer">
          {uploading ? 'Uploading…' : 'Add Photos'}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-ink/50 mb-4">
          Photos ({photos.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div key={p.pathname} className="relative group rounded-xl overflow-hidden aspect-square bg-stone">
              <Image src={p.url} alt="" fill className="object-cover" />
              <button
                onClick={() => handleDelete(p.url)}
                className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          ))}
          {photos.length === 0 && (
            <p className="text-sm text-ink/50 col-span-full">
              No photos yet. Click &quot;Add Photos&quot; to upload.
            </p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-widest text-ink/50 mb-4">
          Enquiries ({enquiries.length})
        </h2>
        <div className="flex flex-col divide-y divide-ink/10 rounded-xl border border-ink/10 overflow-hidden">
          {enquiries.map((en, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 bg-stone/60 text-sm">
              <span className="font-medium">{en.name}</span>
              <a href={`tel:${en.phone}`} className="text-ink/70 hover:text-ink">
                {en.phone}
              </a>
              <span className="text-ink/40 text-xs">
                {new Date(en.submittedAt).toLocaleString()}
              </span>
            </div>
          ))}
          {enquiries.length === 0 && (
            <p className="text-sm text-ink/50 px-4 py-3">No enquiries yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
