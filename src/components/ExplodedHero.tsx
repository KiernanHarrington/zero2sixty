"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  createScope,
  createTimeline,
  onScroll,
  animate,
  stagger,
  type Scope,
} from "animejs";

/* Round so SSR and client SVG coordinates are byte-identical
   (full-precision trig differs by 1 ULP and breaks hydration). */
const r = (n: number) => Math.round(n * 100) / 100;

/* Assembly order along the hub axis, inboard -> outboard.
   ex = exploded offset (px along the axis) from the assembled
   position. Leader callouts read like an engineering drawing. */
type Part = { id: string; n: string; label: string; sub: string; ex: number };

const PARTS: Part[] = [
  { id: "knuckle", n: "01", label: "Steering knuckle", sub: "Mount face", ex: -560 },
  { id: "carrier", n: "02", label: "Caliper carrier", sub: "Cast bracket", ex: -370 },
  { id: "rotor", n: "03", label: "Vented rotor", sub: "2-piece, 380mm", ex: -150 },
  { id: "padIn", n: "04", label: "Inboard pad", sub: "Race compound", ex: 70 },
  { id: "caliper", n: "05", label: "Monobloc caliper", sub: "6-piston, forged", ex: 250 },
  { id: "padOut", n: "06", label: "Outboard pad", sub: "Race compound", ex: 430 },
  { id: "pins", n: "07", label: "Guide pins + bolts", sub: "Torqued hardware", ex: 600 },
  { id: "hose", n: "08", label: "Braided line", sub: "Banjo + washers", ex: 760 },
];

const AX = 760; // assembled centerline x
const AY = 250; // assembled centerline y

/* ---- line-art part glyphs, all centered on (AX, AY) ---- */

function Rotor() {
  // vented two-piece disc seen in 3/4 (ellipses), drilled + vanes
  const holes = Array.from({ length: 22 });
  return (
    <g className="dp dp-rotor" style={{ transform: `translateX(${PARTS[2].ex}px)` }}>
      <ellipse cx={AX} cy={AY} rx="118" ry="150" />
      <ellipse cx={AX} cy={AY} rx="104" ry="133" opacity="0.5" />
      <ellipse cx={AX} cy={AY} rx="52" ry="66" />
      <ellipse cx={AX} cy={AY} rx="20" ry="26" />
      {holes.map((_, i) => {
        const a = (i / holes.length) * Math.PI * 2;
        return (
          <ellipse
            key={i}
            cx={r(AX + Math.cos(a) * 80)}
            cy={r(AY + Math.sin(a) * 102)}
            rx="3.4"
            ry="4.3"
            opacity="0.7"
          />
        );
      })}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <circle key={i} cx={r(AX + Math.cos(a) * 36)} cy={r(AY + Math.sin(a) * 46)} r="4" />
        );
      })}
    </g>
  );
}

function Disc({ id, idx }: { id: string; idx: number }) {
  // generic round element (knuckle / carrier) as a hub-flange ring
  return (
    <g className={`dp dp-${id}`} style={{ transform: `translateX(${PARTS[idx].ex}px)` }}>
      <ellipse cx={AX} cy={AY} rx="58" ry="84" />
      <ellipse cx={AX} cy={AY} rx="26" ry="40" opacity="0.6" />
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2 + 0.5;
        return (
          <circle key={i} cx={r(AX + Math.cos(a) * 42)} cy={r(AY + Math.sin(a) * 62)} r="4.5" />
        );
      })}
    </g>
  );
}

function Pad({ id, idx, flip }: { id: string; idx: number; flip?: number }) {
  const x = AX + (flip ?? 0);
  return (
    <g className={`dp dp-${id}`} style={{ transform: `translateX(${PARTS[idx].ex}px)` }}>
      <path
        d={`M ${x} ${AY - 96} q -16 96 0 192 q -22 -96 0 -192 Z`}
        fill="none"
      />
      <path d={`M ${x} ${AY - 96} q -16 96 0 192`} />
      <path d={`M ${x - 7} ${AY - 80} q -12 80 0 160`} opacity="0.55" />
    </g>
  );
}

function Caliper() {
  const x = AX;
  return (
    <g className="dp dp-caliper" style={{ transform: `translateX(${PARTS[4].ex}px)` }}>
      <path
        d={`M ${x - 30} ${AY - 132}
            h 70 a 26 26 0 0 1 26 26
            v 64 a 60 90 0 0 1 -60 90
            h -36 a 60 90 0 0 1 -60 -90
            v -64 a 26 26 0 0 1 26 -26 Z`}
        fill="none"
      />
      <ellipse cx={x - 6} cy={AY} rx="40" ry="62" opacity="0.5" />
      {[-34, 0, 34].map((dy) => (
        <ellipse key={dy} cx={x - 6} cy={AY + dy} rx="13" ry="16" opacity="0.7" />
      ))}
    </g>
  );
}

function Bolts() {
  const x = AX;
  return (
    <g className="dp dp-pins" style={{ transform: `translateX(${PARTS[6].ex}px)` }}>
      {[-70, 70].map((dy) => (
        <g key={dy}>
          <line x1={x - 26} y1={AY + dy} x2={x + 30} y2={AY + dy} />
          <polygon
            points={`${x - 26},${AY + dy - 9} ${x - 38},${AY + dy} ${x - 26},${AY + dy + 9}`}
            fill="none"
          />
          <circle cx={x + 30} cy={AY + dy} r="6" fill="none" />
        </g>
      ))}
    </g>
  );
}

function Hose() {
  const x = AX;
  return (
    <g className="dp dp-hose" style={{ transform: `translateX(${PARTS[7].ex}px)` }}>
      <path
        d={`M ${x - 30} ${AY + 120} C ${x - 10} ${AY + 60} ${x + 10} ${AY + 30} ${x} ${AY - 40}`}
        fill="none"
      />
      <path
        d={`M ${x - 30} ${AY + 120} C ${x - 10} ${AY + 60} ${x + 10} ${AY + 30} ${x} ${AY - 40}`}
        strokeDasharray="2 6"
        opacity="0.6"
      />
      <circle cx={x} cy={AY - 46} r="13" fill="none" />
      <circle cx={x} cy={AY - 46} r="5" fill="none" />
    </g>
  );
}

export default function ExplodedHero() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scope: Scope | undefined;

    scope = createScope({ root }).add(() => {
      if (reduce) {
        // Assembled, static, callouts visible. No motion.
        document
          .querySelectorAll<HTMLElement>(".dp")
          .forEach((el) => (el.style.transform = "translateX(0px)"));
        return;
      }

      // On-load: leader lines draw in, callouts + parts settle.
      animate(".leader", {
        strokeDashoffset: [320, 0],
        opacity: [0, 0.5],
        duration: 900,
        delay: stagger(70),
        ease: "out(3)",
      });
      animate(".callout", {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 700,
        delay: stagger(70, { start: 250 }),
        ease: "out(3)",
      });

      // Scroll: scrub the axial assemble -> lock -> re-explode.
      const tl = createTimeline({
        autoplay: onScroll({
          target: track.current!,
          enter: "top top",
          leave: "bottom bottom",
          sync: 0.7,
        }),
        defaults: { ease: "inOutSine", duration: 1000 },
      });

      PARTS.forEach((p) => {
        tl.add(`.dp-${p.id}`, { x: [p.ex, 0, p.ex] }, 0);
        tl.add(
          `.cl-${p.id}`,
          { opacity: [1, 0.12, 1], translateX: [0, 0, 0] },
          0
        );
      });
    });

    return () => scope?.revert();
  }, []);

  return (
    <section
      ref={track}
      className="relative"
      style={{ height: "min(360vh, 3600px)" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 radial-fade opacity-60" />

        {/* Hero copy */}
        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-20 sm:pt-24">
          <p className="text-xs uppercase tracking-[0.42em] font-semibold text-blue-bright">
            Exploded assembly · Front corner
          </p>
          <h1 className="hero-title mt-6 max-w-2xl">
            Braking, engineered
            <br />
            to a tolerance
            <br />
            <span className="text-blue-bright">you can feel.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-7">
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
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
            Scroll to assemble
          </p>
        </div>

        {/* Diagram */}
        <div
          ref={root}
          className="absolute inset-x-0 bottom-0 h-[68%] sm:h-[72%]"
        >
          <svg
            viewBox="0 0 1520 500"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Exploded technical diagram of a disc brake assembly"
          >
            {/* assembly centerline */}
            <line
              x1="40"
              y1={AY}
              x2="1480"
              y2={AY}
              stroke="var(--blue)"
              strokeWidth="1"
              strokeDasharray="3 9"
              opacity="0.4"
            />

            {/* numbered callouts + leaders, anchored at assembled x */}
            {PARTS.map((p, i) => {
              const cx = AX + p.ex;
              const top = i % 2 === 0;
              const railY = top ? 48 : 452;
              const labelY = top ? 30 : 482;
              return (
                <g key={p.id} className={`callout cl-${p.id}`}>
                  <polyline
                    className="leader"
                    points={`${r(cx)},${railY} ${r(cx)},${AY}`}
                    fill="none"
                    stroke="var(--blue-bright)"
                    strokeWidth="1"
                    strokeDasharray="320"
                    opacity="0.5"
                  />
                  <circle
                    cx={r(cx)}
                    cy={railY}
                    r="14"
                    fill="var(--bg)"
                    stroke="var(--blue-bright)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={r(cx)}
                    y={railY + 4}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill="var(--blue-bright)"
                  >
                    {p.n}
                  </text>
                  <text
                    x={r(cx)}
                    y={labelY}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--fg)"
                    style={{ textTransform: "uppercase", letterSpacing: "1.5px" }}
                  >
                    {p.label}
                  </text>
                  <text
                    x={r(cx)}
                    y={labelY + (top ? -14 : 16)}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--muted)"
                    style={{ letterSpacing: "1px" }}
                  >
                    {p.sub}
                  </text>
                </g>
              );
            })}

            {/* parts, in assembly order, all on the centerline */}
            <g
              stroke="var(--blue-bright)"
              strokeWidth="1.4"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <Disc id="knuckle" idx={0} />
              <Disc id="carrier" idx={1} />
              <Rotor />
              <Pad id="padIn" idx={3} flip={-150} />
              <Caliper />
              <Pad id="padOut" idx={5} flip={150} />
              <Bolts />
              <Hose />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
