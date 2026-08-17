'use client';

import { useState } from 'react';
import Image from 'next/image';

type Photo = { url: string; pathname: string; uploadedAt: string };

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {photos.map((p, i) => (
          <button
            key={p.url}
            onClick={() => setSelected(i)}
            className="mb-4 block w-full break-inside-avoid rounded-xl overflow-hidden"
          >
            <Image
              src={p.url}
              alt=""
              width={600}
              height={600}
              className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center"
            aria-label="Close"
          >
            &times;
          </button>

          {selected > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected((s) => (s !== null ? s - 1 : s));
              }}
              className="absolute left-2 md:left-4 text-white text-4xl px-2 py-4"
              aria-label="Previous"
            >
              &#8249;
            </button>
          )}

          {selected < photos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected((s) => (s !== null ? s + 1 : s));
              }}
              className="absolute right-2 md:right-4 text-white text-4xl px-2 py-4"
              aria-label="Next"
            >
              &#8250;
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[selected].url}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
