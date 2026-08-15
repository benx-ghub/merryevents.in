import Image from 'next/image';
import Link from 'next/link';
import EnquiryForm from './components/EnquiryForm';
import { getPhotos } from '../lib/photos';

export const revalidate = 0;

const services = [
  'Event Planning',
  'Luxury Décor',
  'Photo & Film',
  'Venue Support',
  'Food Service',
  'Bridal Styling',
];

export default async function Home() {
  const photos = await getPhotos();
  const preview = photos.slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 border-y border-ink/10">
        <div className="px-6 md:px-12 py-16 flex flex-col justify-center">
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Where Your Dream Event Comes to Life
          </h1>
          <p className="mt-6 text-ink/60 max-w-sm">
            We create unforgettable weddings and celebrations with seamless
            execution, stunning design, and heartfelt experiences.
          </p>
          <div className="mt-8">
            <Link href="#enquire" className="btn-primary">
              Book Now
            </Link>
          </div>
        </div>
        <div className="relative min-h-[360px] md:min-h-0 border-t md:border-t-0 md:border-l border-ink/10 flex items-center justify-center p-10 bg-clay/30">
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-xl rotate-1 bg-stone">
            {preview[0] ? (
              <Image
                src={preview[0].url}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ink/30 text-sm">
                Add your first photo from the admin panel
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats / About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-5xl leading-tight">
          Crafting Beautiful Events With Passion &amp; Precision
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-6 items-stretch text-left">
          <div className="bg-stone rounded-2xl p-8">
            <p className="font-display text-3xl mb-2">10+</p>
            <p className="text-ink/60 text-sm">Years of experience planning celebrations across Kerala.</p>
          </div>
          <div className="bg-stone rounded-2xl p-8">
            <p className="font-display text-3xl mb-2">300+</p>
            <p className="text-ink/60 text-sm">Successful weddings and events delivered end to end.</p>
          </div>
          <div className="bg-stone rounded-2xl p-8">
            <p className="font-display text-3xl mb-2">1:1</p>
            <p className="text-ink/60 text-sm">Personal planning — every event styled around you.</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-ink/10 py-20 bg-ink text-cream">
        <div className="max-w-6xl mx-auto px-6">
          <p className="uppercase tracking-widest text-cream/50 text-xs mb-6">
            What we do
          </p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-10 font-display text-3xl">
            {services.map((s) => (
              <li key={s} className="border-b border-cream/15 pb-4">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-4xl">Our Recent Moments</h2>
            <p className="text-ink/60 text-sm mt-2">
              A look at the celebrations we&apos;ve been part of.
            </p>
          </div>
          <Link href="/gallery" className="btn-outline hidden sm:inline-flex">
            View Full Gallery
          </Link>
        </div>

        {preview.length === 0 ? (
          <p className="text-ink/50 text-sm">
            No photos yet — upload some from the admin panel to fill this
            gallery.
          </p>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {preview.map((p) => (
              <div key={p.url} className="mb-4 break-inside-avoid rounded-xl overflow-hidden">
                <Image
                  src={p.url}
                  alt=""
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Enquiry */}
      <section id="enquire" className="max-w-6xl mx-auto px-6 pb-24">
        <EnquiryForm />
      </section>
    </main>
  );
}
