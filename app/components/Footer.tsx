import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-ink text-cream mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <Image
            src="/merryevents-logo.png"
            alt="Merry Events"
            width={170}
            height={44}
            className="mb-4 invert"
          />
          <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
            We plan and design weddings and celebrations, from first idea to
            final dance.
          </p>
        </div>

        <div className="text-sm">
          <p className="uppercase tracking-widest text-cream/50 text-xs mb-3">
            Contact
          </p>
          <ul className="space-y-2 text-cream/80">
            <li>
              <a href="mailto:merryevents.in@gmail.com" className="hover:text-cream">
                merryevents.in@gmail.com
              </a>
            </li>
            <li>0000000000 / 9999999999</li>
            <li>merryevents.in</li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="uppercase tracking-widest text-cream/50 text-xs mb-3">
            Follow
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/merryevents.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:bg-cream hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-cream/30 flex items-center justify-center hover:bg-cream hover:text-ink transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.77.46 3.45 1.34 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.51 2 12.04 2zm5.8 14.11c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.12-4.85-4.31-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.11.31.02.5-.08.19-.13.31-.26.47-.13.16-.27.36-.39.48-.13.13-.26.27-.11.53.14.26.63 1.04 1.36 1.69.94.83 1.72 1.09 1.98 1.21.26.13.41.11.56-.06.16-.18.66-.77.84-1.03.18-.26.36-.22.6-.13.24.08 1.53.72 1.79.85.26.13.44.19.5.3.06.11.06.65-.17 1.33z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Merry Events. All rights reserved.
      </div>
    </footer>
  );
}
