import { getPhotos } from '../../lib/photos';
import GalleryGrid from '../components/GalleryGrid';

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
        <GalleryGrid photos={photos} />
      )}
    </main>
  );
}
