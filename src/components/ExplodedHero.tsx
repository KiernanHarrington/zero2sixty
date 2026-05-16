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

/* Disc-brake parts in true assembly order along the hub axis,
   inboard -> outboard. ex = exploded offset (px) along the axis. */
type Part = { id: string; n: string; label: string; sub: string; ex: number };

const PARTS: Part[] = [
  { id: "caliper", n: "01", label: "Monobloc caliper", sub: "6-piston · forged", ex: -560 },
  { id: "padIn", n: "02", label: "Inboard pad", sub: "Race compound", ex: -330 },
  { id: "padOut", n: "03", label: "Outboard pad", sub: "Race compound", ex: -150 },
  { id: "bolts", n: "04", label: "Caliper bolts", sub: "Torqued hardware", ex: 40 },
  { id: "rotor", n: "05", label: "Vented rotor + hub", sub: "2-piece · 380mm", ex: 250 },
];

const AX = 880;
const AY = 250;

/* ---- shaded metallic glyphs (3/4 view, grey gradients) ---- */

function Rotor() {
  const holes = Array.from({ length: 20 });
  return (
    <g className="dp dp-rotor" style={{ transform: `translateX(${PARTS[4].ex}px)` }}>
      {/* vented disc */}
      <ellipse cx={AX} cy={AY} rx="120" ry="156" fill="url(#steelFace)" stroke="#8a93a6" strokeWidth="1" />
      <ellipse cx={AX} cy={AY} rx="120" ry="156" fill="none" stroke="#cfd6e2" strokeWidth="2" opacity="0.5" />
      <ellipse cx={AX} cy={AY} rx="104" ry="135" fill="none" stroke="#5b6477" strokeWidth="1" opacity="0.6" />
      {holes.map((_, i) => {
        const a = (i / holes.length) * Math.PI * 2;
        return (
          <ellipse
            key={i}
            cx={r(AX + Math.cos(a) * 82)}
            cy={r(AY + Math.sin(a) * 108)}
            rx="3.6"
            ry="4.7"
            fill="#3a4150"
          />
        );
      })}
      {/* hub barrel */}
      <ellipse cx={AX + 30} cy={AY} rx="46" ry="62" fill="url(#steelHub)" stroke="#6b7587" strokeWidth="1" />
      <ellipse cx={AX + 30} cy={AY} rx="20" ry="27" fill="#2a3140" stroke="#8a93a6" strokeWidth="1" />
      {/* wheel studs */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - 0.3;
        return (
          <g key={i}>
            <line
              x1={r(AX + 30 + Math.cos(a) * 33)}
              y1={r(AY + Math.sin(a) * 44)}
              x2={r(AX + 64 + Math.cos(a) * 33)}
              y2={r(AY + Math.sin(a) * 44)}
              stroke="#aab3c4"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </g>
  );
}

function Pad({ id, idx, flip }: { id: string; idx: number; flip: number }) {
  const x = AX + flip;
  return (
    <g className={`dp dp-${id}`} style={{ transform: `translateX(${PARTS[idx].ex}px)` }}>
      {/* steel backing plate */}
      <path
        d={`M ${x - 14} ${AY - 104} L ${x + 14} ${AY - 96} L ${x + 14} ${AY + 96}
            L ${x - 14} ${AY + 104} Z`}
        fill="url(#steelPlate)"
        stroke="#8a93a6"
        strokeWidth="1"
      />
      {/* friction block */}
      <path
        d={`M ${x - 26} ${AY - 92} L ${x - 14} ${AY - 100} L ${x - 14} ${AY + 100}
            L ${x - 26} ${AY + 92} Z`}
        fill="#23272f"
        stroke="#10131a"
        strokeWidth="1"
      />
      <line x1={x - 20} y1={AY - 70} x2={x - 20} y2={AY + 70} stroke="#3a3f49" strokeWidth="1" />
    </g>
  );
}

function Caliper() {
  const x = AX;
  return (
    <g className="dp dp-caliper" style={{ transform: `translateX(${PARTS[0].ex}px)` }}>
      <path
        d={`M ${x - 40} ${AY - 128}
            h 76 a 30 30 0 0 1 30 30
            v 58 a 70 96 0 0 1 -70 96
            h -36 a 70 96 0 0 1 -70 -96
            v -58 a 30 30 0 0 1 30 -30 Z`}
        fill="url(#steelBody)"
        stroke="#6b7587"
        strokeWidth="1.5"
      />
      {/* bridge highlight */}
      <path
        d={`M ${x - 40} ${AY - 122} h 70`}
        stroke="#dfe5ee"
        strokeWidth="3"
        opacity="0.6"
        fill="none"
        strokeLinecap="round"
      />
      {/* piston bores */}
      {[-40, 0, 40].map((dy) => (
        <ellipse key={dy} cx={x - 4} cy={AY + dy} rx="15" ry="19" fill="#2a3140" stroke="#9aa3b4" strokeWidth="1.5" />
      ))}
      {/* bleed nipple */}
      <line x1={x + 60} y1={AY - 96} x2={x + 78} y2={AY - 110} stroke="#aab3c4" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function Bolts() {
  const x = AX;
  return (
    <g className="dp dp-bolts" style={{ transform: `translateX(${PARTS[3].ex}px)` }}>
      {[-58, 58].map((dy) => (
        <g key={dy}>
          <line x1={x - 30} y1={AY + dy} x2={x + 26} y2={AY + dy} stroke="url(#steelBolt)" strokeWidth="7" strokeLinecap="round" />
          <circle cx={x - 34} cy={AY + dy} r="9" fill="url(#steelHub)" stroke="#6b7587" strokeWidth="1" />
        </g>
      ))}
    </g>
  );
}

export default function ExplodedHero() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scope: Scope | undefined;

    // Pass the DOM element (not the ref object) — anime.js v4
    // resolves scoped selectors against scope.root directly.
    scope = createScope({ root: host }).add(() => {
      if (reduce) {
        host
          .querySelectorAll<HTMLElement>(".dp")
          .forEach((el) => (el.style.transform = "translateX(0px)"));
        if (paper.current) paper.current.style.opacity = "1";
        if (content.current) content.current.style.color = "#0b0e14";
        return;
      }

      animate(".leader", {
        strokeDashoffset: [320, 0],
        opacity: [0, 0.55],
        duration: 900,
        delay: stagger(70),
        ease: "out(3)",
      });
      animate(".callout", {
        opacity: [0, 1],
        translateY: [8, 0],
        duration: 700,
        delay: stagger(70, { start: 220 }),
        ease: "out(3)",
      });

      const tl = createTimeline({
        autoplay: onScroll({
          target: track.current!,
          enter: "top top",
          leave: "bottom bottom",
          sync: 0.6,
        }),
      });

      // flip to white as the mechanism comes together
      tl.add(paper.current!, { opacity: [0, 1], duration: 520, ease: "inOut(2)" }, 240);
      tl.add(content.current!, { color: ["#eaf0fb", "#0b0e14"], duration: 560, ease: "inOut(2)" }, 240);
      tl.add(".callout", { opacity: [1, 0], duration: 260, ease: "out(2)" }, 180);
      tl.add(".axisline", { opacity: [0.35, 0], duration: 220 }, 180);

      // parts snap in, tight and sequential
      PARTS.forEach((p, i) => {
        tl.add(`.dp-${p.id}`, { x: [p.ex, 0], duration: 460, ease: "out(4)" }, 340 + i * 110);
      });
      tl.add(".assembly", { scale: [1, 1.015, 1], duration: 360, ease: "out(3)" }, 340 + PARTS.length * 110);
    });

    return () => scope?.revert();
  }, []);

  return (
    <section ref={track} className="relative" style={{ height: "min(380vh, 3800px)" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div ref={paper} className="absolute inset-0 opacity-0" style={{ background: "#eef1f5" }} />

        <div ref={content} className="relative h-full" style={{ color: "#eaf0fb" }}>
          <div className="relative z-10 mx-auto max-w-7xl px-5 pt-20 sm:pt-24">
            <p className="text-xs uppercase tracking-[0.42em] font-semibold opacity-80">
              Exploded assembly · Front corner
            </p>
            <h1 className="hero-title mt-6 max-w-2xl">
              Braking, engineered
              <br />
              to a tolerance
              <br />
              you can feel.
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-7 py-3 text-sm font-semibold uppercase tracking-widest border border-current transition-transform hover:-translate-y-0.5"
              >
                Shop the Arsenal
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest"
              >
                See the engineering
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] opacity-60">
              Scroll to assemble
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-[66%] sm:h-[70%]">
            <svg
              viewBox="0 0 1640 500"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Exploded technical diagram of a disc brake assembly"
            >
              <defs>
                <linearGradient id="steelBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dfe4ec" />
                  <stop offset="45%" stopColor="#9aa3b4" />
                  <stop offset="100%" stopColor="#5a6273" />
                </linearGradient>
                <linearGradient id="steelPlate" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c7cedb" />
                  <stop offset="100%" stopColor="#727b8d" />
                </linearGradient>
                <radialGradient id="steelFace" cx="42%" cy="38%" r="70%">
                  <stop offset="0%" stopColor="#e3e8f0" />
                  <stop offset="55%" stopColor="#aeb6c6" />
                  <stop offset="100%" stopColor="#5a6273" />
                </radialGradient>
                <radialGradient id="steelHub" cx="40%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#eef1f6" />
                  <stop offset="100%" stopColor="#737c8e" />
                </radialGradient>
                <linearGradient id="steelBolt" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#cfd6e2" />
                  <stop offset="100%" stopColor="#6b7587" />
                </linearGradient>
              </defs>

              <line
                className="axisline"
                x1="40"
                y1={AY}
                x2="1600"
                y2={AY}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 9"
                opacity="0.35"
              />

              {PARTS.map((p, i) => {
                const cx = AX + p.ex;
                const top = i % 2 === 0;
                const railY = top ? 44 : 456;
                const labelY = top ? 26 : 486;
                return (
                  <g key={p.id} className={`callout cl-${p.id}`} fill="currentColor">
                    <polyline
                      className="leader"
                      points={`${r(cx)},${railY} ${r(cx)},${AY}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="320"
                      opacity="0.5"
                    />
                    <circle cx={r(cx)} cy={railY} r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x={r(cx)} y={railY + 4} textAnchor="middle" fontSize="13" fontWeight="700">
                      {p.n}
                    </text>
                    <text
                      x={r(cx)}
                      y={labelY}
                      textAnchor="middle"
                      fontSize="12"
                      style={{ textTransform: "uppercase", letterSpacing: "1.5px" }}
                    >
                      {p.label}
                    </text>
                    <text x={r(cx)} y={labelY + (top ? -14 : 16)} textAnchor="middle" fontSize="10" opacity="0.65">
                      {p.sub}
                    </text>
                  </g>
                );
              })}

              <g className="assembly" style={{ transformOrigin: `${AX}px ${AY}px` }}>
                <Caliper />
                <Pad id="padIn" idx={1} flip={-150} />
                <Pad id="padOut" idx={2} flip={-110} />
                <Bolts />
                <Rotor />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
