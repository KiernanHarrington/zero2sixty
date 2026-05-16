/**
 * Zero2Sixty brand mark — a slotted performance brake rotor in an
 * aggressive cut-corner tile. Replaces the old "0" glyph. Scales
 * cleanly from favicon size up to large display.
 */
/* Round so SSR and client SVG coords are byte-identical
   (full-precision trig differs by 1 ULP and breaks hydration). */
const r2 = (n: number) => Math.round(n * 100) / 100;

export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative grid place-items-center bg-[linear-gradient(135deg,var(--blue-bright),var(--blue)_55%,#0b3c8f)] cut-corner group-hover:brightness-110 transition-[filter] ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-[68%] h-[68%]"
        fill="none"
        aria-hidden="true"
      >
        {/* rotor disc */}
        <circle cx="16" cy="16" r="11" stroke="#fff" strokeWidth="2" />
        {/* hub */}
        <circle cx="16" cy="16" r="3.6" stroke="#fff" strokeWidth="1.8" />
        {/* drilled cooling holes */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={r2(16 + Math.cos(a) * 7.4)}
              cy={r2(16 + Math.sin(a) * 7.4)}
              r="1.35"
              fill="#fff"
            />
          );
        })}
        {/* directional slot */}
        <path
          d="M16 5.2 A10.8 10.8 0 0 1 23.6 8.4"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
