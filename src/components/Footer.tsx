import Link from "next/link";

const INSTAGRAM = "https://www.instagram.com/rotorpros_braking/";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-soft">
      {/* marquee strip */}
      <div className="overflow-hidden border-b border-line py-3 select-none">
        <div className="marquee whitespace-nowrap flex">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {[
                "ZERO FADE",
                "TRACK PROVEN",
                "FORGED IN-HOUSE",
                "STOP HARDER",
                "ZERO2SIXTY",
              ].map((t) => (
                <span
                  key={t}
                  className="font-display text-2xl px-8 text-line tracking-widest"
                >
                  {t} <span className="text-blue">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-display text-2xl">
            ZERO<span className="text-blue-bright">2</span>SIXTY
          </Link>
          <p className="mt-4 text-muted max-w-sm text-sm leading-relaxed">
            High-performance braking hardware engineered for people who treat the
            brake pedal as an offensive weapon. Track-validated. Street-legal.
          </p>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted hover:text-blue-bright transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
            </svg>
            @rotorpros_braking
          </a>
        </div>

        <div>
          <h4 className="kicker mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/shop" className="hover:text-fg">All Products</Link></li>
            <li><Link href="/shop?c=big-brake-kits" className="hover:text-fg">Big Brake Kits</Link></li>
            <li><Link href="/shop?c=rotors" className="hover:text-fg">Rotors</Link></li>
            <li><Link href="/shop?c=pads" className="hover:text-fg">Brake Pads</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="kicker mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-fg">The Tech</Link></li>
            <li><Link href="/contact" className="hover:text-fg">Contact Us</Link></li>
            <li><Link href="/shop" className="hover:text-fg">Fitment Guide</Link></li>
            <li>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <span>© {new Date().getFullYear()} Zero2Sixty Braking. All rights reserved.</span>
          <span>Built for stopping. Not for slowing down.</span>
        </div>
      </div>
    </footer>
  );
}
