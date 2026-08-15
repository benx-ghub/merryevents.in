import Image from 'next/image';
import { getPhotos } from '../../lib/photos';

export const revalidate = 0;

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="font-display text-5xl mb-2">Our Gallery</h1>
      <p className="text-ink/60 mb-12">
        Moments from the celebrations we&apos;ve helped bring to life.
      </p>

      {photos.length === 0 ? (
        <p className="text-ink/50 text-sm">Photos coming soon.</p>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((p) => (
            <div key={p.url} className="mb-4 break-inside-avoid rounded-xl overflow-hidden">
              <Image
                src={p.url}
                alt=""
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
