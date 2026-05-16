import Link from "next/link";
import RotorArt from "@/components/RotorArt";

export const metadata = {
  title: "The Tech — Zero2Sixty",
  description:
    "How Zero2Sixty engineers fade-free, flex-free braking systems.",
};

const PILLARS = [
  {
    n: "01",
    t: "Thermal Management",
    d: "Directional-vane two-piece rotors with aluminum hats pull heat out of the friction surface and keep it off your fluid. Less mass, more airflow, zero coning.",
  },
  {
    n: "02",
    t: "Structural Rigidity",
    d: "Forged monobloc calipers are machined from a single billet. No bolted halves to spread under load — every PSI you push goes straight into the pad.",
  },
  {
    n: "03",
    t: "Friction Science",
    d: "Compounds developed on a dyno and validated on track. Flat torque curve from a cold pit-out to a glowing third stint. Predictable every single lap.",
  },
  {
    n: "04",
    t: "Hydraulic Integrity",
    d: "Stainless braided PTFE lines and 326°C dry-boil fluid keep the pedal where you left it — high, firm, and honest under sustained abuse.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-fade" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="kicker">Engineered, not assembled</p>
            <h1 className="headline text-5xl sm:text-7xl mt-4">
              We Build
              <br />
              <span className="text-blue-bright text-glow">Stopping Power.</span>
            </h1>
            <p className="mt-6 text-muted text-lg max-w-lg leading-relaxed">
              Zero2Sixty started in a two-bay shop with one obsession: brakes
              that never quit. Today every component we ship is designed,
              tortured and signed off in-house — because the only acceptable
              amount of fade is zero.
            </p>
          </div>
          <div className="relative aspect-square max-w-sm mx-auto w-full">
            <RotorArt className="w-full h-full" spin glow />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="kicker">The Four Pillars</p>
        <h2 className="headline text-4xl sm:text-5xl mt-3 mb-12">
          Why Our Brakes Don&apos;t Quit
        </h2>
        <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
          {PILLARS.map((p) => (
            <div key={p.n} className="bg-panel p-8 group hover:bg-panel-2 transition-colors">
              <span className="font-display text-5xl text-line group-hover:text-blue/40 transition-colors">
                {p.n}
              </span>
              <h3 className="font-display text-2xl mt-4">{p.t}</h3>
              <p className="mt-3 text-muted leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-bg-soft">
        <div className="mx-auto max-w-7xl px-5 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["12K+", "Cars upgraded"],
            ["0", "Acceptable fade"],
            ["48hr", "Avg. dispatch"],
            ["100%", "Track-validated"],
          ].map(([b, s]) => (
            <div key={s}>
              <div className="font-display text-4xl sm:text-5xl text-glow">
                {b}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted mt-2">
                {s}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h2 className="headline text-4xl sm:text-5xl">
          Ready to out-brake everyone?
        </h2>
        <p className="mt-4 text-muted">
          Browse the arsenal or talk to our team about your build.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/shop" className="btn btn-primary">
            Shop the Arsenal
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Talk to Us
          </Link>
        </div>
      </section>
    </>
  );
}
