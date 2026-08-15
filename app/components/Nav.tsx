import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  return (
    <header className="w-full">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide text-ink/80">
          <Link href="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <Link href="/#about" className="hover:text-ink transition-colors">
            About
          </Link>
          <Link href="/#services" className="hover:text-ink transition-colors">
            Services
          </Link>
          <Link href="/gallery" className="hover:text-ink transition-colors">
            Gallery
          </Link>
        </div>

        <Link href="/" className="flex items-center gap-2 mx-auto md:mx-0">
          <Image
            src="/merryevents-logo.png"
            alt="Merry Events"
            width={220}
            height={58}
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/#enquire" className="btn-primary">
            Enquire Now
          </Link>
        </div>
      </nav>
    </header>
  );
}
