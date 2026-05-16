import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ExplodedHero from "@/components/ExplodedHero";

const featured = PRODUCTS.filter((p) =>
  ["apex-6-big-brake-kit", "g-slot-2pc-rotor", "rp-race-pads", "monobloc-6-caliper"].includes(
    p.slug
  )
);

export default function Home() {
  return (
    <>
      {/* ===== HERO — exploded assembly diagram (scroll-scrubbed) ===== */}
      <ExplodedHero />

      {/* Single proof line — not the big-number stat template */}
      <div className="border-y border-line bg-bg-soft">
        <div className="mx-auto max-w-7xl px-5 py-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="text-fg font-semibold">Engineered in-house.</span>
          <span>
            Track-validated across 12,000+ cars. The only acceptable amount of
            fade is zero.
          </span>
        </div>
      </div>

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

      {/* Tech follow-through */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 grid gap-8 sm:grid-cols-3">
          {[
            ["Forged monobloc calipers", "One billet. No flex under load."],
            ["Two-piece floating rotors", "Less mass, no thermal coning."],
            ["Race-grade friction", "Flat torque curve, cold to glowing."],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-4">
              <span className="mt-1.5 w-2 h-2 bg-blue rotate-45 shrink-0 glow" />
              <div>
                <div className="font-semibold">{t}</div>
                <div className="text-sm text-muted">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-16">
          <Link href="/about" className="btn btn-ghost">
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
