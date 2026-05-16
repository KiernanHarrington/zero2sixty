type Props = {
  className?: string;
  spin?: boolean;
  glow?: boolean;
};

/**
 * Vented, cross-drilled, slotted performance brake disc.
 * Pure SVG so the site stays self-contained — no image assets.
 */
export default function RotorArt({ className, spin, glow }: Props) {
  const holes = Array.from({ length: 24 });
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Performance brake rotor"
    >
      <defs>
        <radialGradient id="rotorFace" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#2a3346" />
          <stop offset="55%" stopColor="#161b27" />
          <stop offset="100%" stopColor="#070a10" />
        </radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3d8bff" />
          <stop offset="50%" stopColor="#1f6bff" />
          <stop offset="100%" stopColor="#0b2f6e" />
        </linearGradient>
        <radialGradient id="hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a2030" />
          <stop offset="100%" stopColor="#05070b" />
        </radialGradient>
        {glow && (
          <filter id="rotorGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      <g
        filter={glow ? "url(#rotorGlow)" : undefined}
        className={spin ? "spin-slow" : undefined}
        style={{ transformOrigin: "100px 100px" }}
      >
        {/* outer ring */}
        <circle cx="100" cy="100" r="92" fill="url(#rim)" />
        <circle cx="100" cy="100" r="84" fill="url(#rotorFace)" />

        {/* curved cooling slots */}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path
            key={a}
            d="M100 24 A76 76 0 0 1 152 56"
            stroke="rgba(120,160,255,0.35)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            transform={`rotate(${a} 100 100)`}
          />
        ))}

        {/* cross-drilled holes, two rings */}
        {holes.map((_, i) => {
          const a = (i / holes.length) * Math.PI * 2;
          const r = i % 2 === 0 ? 62 : 48;
          return (
            <circle
              key={i}
              cx={100 + Math.cos(a) * r}
              cy={100 + Math.sin(a) * r}
              r="3.4"
              fill="#04060a"
              stroke="rgba(120,160,255,0.25)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* hat / hub */}
        <circle cx="100" cy="100" r="34" fill="url(#hub)" stroke="#1f6bff" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="9" fill="#02040a" stroke="#3d8bff" strokeWidth="1" />
        {[0, 72, 144, 216, 288].map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <circle
              key={a}
              cx={100 + Math.cos(rad) * 22}
              cy={100 + Math.sin(rad) * 22}
              r="3.6"
              fill="#04060a"
              stroke="#2a6bd6"
              strokeWidth="1"
            />
          );
        })}
      </g>
    </svg>
  );
}
