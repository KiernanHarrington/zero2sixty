"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RotorArt from "./RotorArt";

/**
 * Decisive hero photograph: a black forged wheel over a gold caliper,
 * shot dark and close. Verified resolving (HTTP 200, image/jpeg).
 * Photo: Rana Singh / Unsplash.
 */
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1757910869199-c5832bd15f11?auto=format&fit=crop&w=2400&q=80";

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoOk, setPhotoOk] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Subtle scroll parallax on the photo layer only (the rotor owns
  // its own CSS transform). Disabled under reduced-motion and on
  // small viewports. SSR-safe: no transform until after mount.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (reduce || !wide) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 600);
        if (photoRef.current) {
          photoRef.current.style.transform = `translate3d(0, ${y * 0.12}px, 0) scale(1.06)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[88vh] flex items-center">
      {/* Intentional dark field underneath — this is the image-failed
          and image-loading state, and it already reads as designed. */}
      <div className="absolute inset-0 bg-bg" />

      {photoOk && (
        <div
          ref={photoRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "scale(1.06)" }}
        >
          <Image
            src={HERO_PHOTO}
            alt="A black forged wheel over a gold brake caliper, shot close and low-lit in a workshop."
            fill
            priority
            sizes="100vw"
            quality={82}
            onLoad={() => setLoaded(true)}
            onError={() => setPhotoOk(false)}
            className={`object-cover object-[68%_center] transition-opacity duration-[1200ms] ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      )}

      {/* Legibility scrim */}
      <div className="absolute inset-0 hero-scrim" />

      {/* Engineered focal object, right-anchored, overlapping the fold */}
      <div
        className="pointer-events-none absolute -right-[18%] sm:-right-[8%] lg:right-[2%] top-1/2 -translate-y-1/2
                   w-[88vw] sm:w-[62vw] lg:w-[46vw] max-w-[760px] aspect-square"
        aria-hidden
      >
        <div className="rotor-settle w-full h-full">
          <div className="rotor-idle w-full h-full origin-center">
            <RotorArt className="w-full h-full opacity-90" glow />
          </div>
        </div>
      </div>

      {/* Copy stack — left-aligned, asymmetric, orchestrated reveal */}
      <div className="relative mx-auto max-w-7xl px-5 w-full">
        <div className="max-w-2xl py-24 lg:py-28">
          <p className="reveal reveal-1 text-xs uppercase tracking-[0.42em] font-semibold text-blue-bright">
            Motorsport-grade braking
          </p>

          <h1 className="reveal reveal-2 hero-title mt-6">
            Braking, engineered
            <br />
            to a tolerance
            <br />
            <span className="text-blue-bright">you can feel.</span>
          </h1>

          <div className="reveal reveal-2 hero-rule mt-7" />

          <p className="reveal reveal-3 mt-7 text-lg leading-relaxed text-muted max-w-xl">
            Forged calipers, two-piece floating rotors, race-validated
            compounds. Every component specified, instrumented and signed off
            in-house before it carries a car.
          </p>

          <div className="reveal reveal-4 mt-10 flex flex-wrap items-center gap-7">
            <Link href="/shop" className="btn btn-primary">
              Shop the Arsenal
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-fg hover:text-blue-bright transition-colors"
            >
              See the engineering
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {photoOk && (
        <span className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-muted/70">
          Photo · Rana Singh / Unsplash
        </span>
      )}
    </section>
  );
}
