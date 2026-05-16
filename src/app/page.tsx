import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import RotorArt from "@/components/RotorArt";

const featured = PRODUCTS.filter((p) =>
  ["apex-6-big-brake-kit", "g-slot-2pc-rotor", "rp-race-pads", "monobloc-6-caliper"].includes(
    p.slug
  )
);

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[680px] h-[680px] opacity-40 hidden lg:block">
          <RotorArt className="w-full h-full" spin glow />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <p className="kicker rise">High Performance Braking</p>
          <h1 className="headline text-6xl sm:text-7xl lg:text-[8.5rem] mt-5 rise">
            STOP
            <br />
            <span className="text-blue-bright text-glow">HARDER.</span>
            <br />
            <span className="outline-text">GO FASTER.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted rise">
            Zero2Sixty builds track-validated braking hardware for drivers who
            treat the pedal as an offensive weapon. Zero fade. Zero flex. Zero
            compromise.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 rise">
            <Link href="/shop" className="btn btn-primary">
              Shop the Arsenal
            </Link>
            <Link href="/shop?c=big-brake-kits" className="btn btn-ghost">
              Big Brake Kits →
            </Link>
          </div>
        </div>

        {/* stat bar */}
        <div className="relative border-y border-line bg-bg-soft/70">
          <div className="mx-auto max-w-7xl px-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
            {[
              ["100–0", "MPH benchmark"],
              ["326°C", "Dry boil fluid"],
              ["0", "Fade. Period."],
              ["12K+", "Drivers stopped"],
            ].map(([big, small]) => (
              <div key={small} className="px-5 py-7 text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl text-glow">
                  {big}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted mt-1">
                  {small}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="kicker">The Arsenal</p>
            <h2 className="headline text-4xl sm:text-5xl mt-3">Pick Your Weapon</h2>
          </div>
          <Link href="/shop" className="text-sm uppercase tracking-widest font-semibold text-blue-bright hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.id}
              href={`/shop?c=${c.id}`}
              className="group relative panel cut-corner p-7 overflow-hidden transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-7xl text-line absolute -bottom-3 right-3 group-hover:text-blue/30 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <h3 className="font-display text-2xl group-hover:text-blue-bright transition-colors">
                  {c.label}
                </h3>
                <p className="mt-2 text-sm text-muted">{c.blurb}</p>
                <span className="mt-6 inline-block text-sm font-semibold uppercase tracking-widest text-blue-bright opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      <section className="border-y border-line bg-bg-soft">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="kicker">Hand-picked</p>
              <h2 className="headline text-4xl sm:text-5xl mt-3">
                Front-Line Hardware
              </h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STORY ===== */}
      <section className="mx-auto max-w-7xl px-5 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative aspect-square max-w-md mx-auto w-full">
          <div className="absolute inset-0 radial-fade" />
          <RotorArt className="relative w-full h-full" spin glow />
        </div>
        <div>
          <p className="kicker">Engineered, not assembled</p>
          <h2 className="headline text-4xl sm:text-5xl mt-3">
            Built In-House.
            <br />
            <span className="text-blue-bright">Proven On Track.</span>
          </h2>
          <p className="mt-5 text-muted leading-relaxed">
            Every rotor ring, caliper body and pad compound is spec&apos;d,
            tested and abused by us before it ever touches your car. We
            simulate the worst day at the track — then build for worse.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ["Forged monobloc calipers", "One billet. No flex under load."],
              ["Two-piece floating rotors", "Less mass, no thermal coning."],
              ["Race-grade friction", "Flat torque curve, cold to glowing."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-4">
                <span className="mt-1 w-2 h-2 bg-blue rotate-45 shrink-0 glow" />
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted">{d}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn btn-ghost mt-9">
            The Full Tech →
          </Link>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden border-t border-line">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#0b3c8f,#1f6bff_55%,#0b3c8f)]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center">
          <h2 className="headline text-4xl sm:text-6xl text-white">
            Your brakes are the limit.
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Change that today. Free fitment check on every order.
          </p>
          <Link
            href="/shop"
            className="btn mt-8 bg-white text-[#06122e] hover:bg-fg"
          >
            Build My Setup
          </Link>
        </div>
      </section>
    </>
  );
}
