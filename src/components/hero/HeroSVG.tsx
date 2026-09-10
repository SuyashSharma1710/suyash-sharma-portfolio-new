/**
 * HeroSVG — Abstract system visualization
 * Nodes: CODE · AI · DATA · DESIGN · PRODUCT (center)
 * Static SVG baseline — no library needed
 */
export function HeroSVG() {
  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Connection lines */}
      <line x1="260" y1="260" x2="260" y2="80"  stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5"/>
      <line x1="260" y1="260" x2="420" y2="180" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5"/>
      <line x1="260" y1="260" x2="420" y2="360" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5"/>
      <line x1="260" y1="260" x2="100" y2="360" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5"/>
      <line x1="260" y1="260" x2="100" y2="180" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5"/>
      {/* Secondary connections */}
      <line x1="260" y1="80"  x2="420" y2="180" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      <line x1="420" y1="180" x2="420" y2="360" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      <line x1="420" y1="360" x2="100" y2="360" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      <line x1="100" y1="360" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
      <line x1="100" y1="180" x2="260" y2="80"  stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>

      {/* Center node — PRODUCT */}
      <circle cx="260" cy="260" r="48" stroke="currentColor" strokeWidth="1.5" opacity="0.9"/>
      <circle cx="260" cy="260" r="42" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      <text
        x="260" y="255"
        textAnchor="middle"
        fill="currentColor"
        fontSize="8"
        fontFamily="var(--font-body)"
        fontWeight="600"
        letterSpacing="0.14em"
        opacity="0.9"
      >
        PRODUCT
      </text>
      <text
        x="260" y="270"
        textAnchor="middle"
        fill="currentColor"
        fontSize="6"
        fontFamily="var(--font-body)"
        letterSpacing="0.1em"
        opacity="0.5"
      >
        ENGINEERING
      </text>

      {/* Outer nodes */}
      {/* TOP — CODE */}
      <circle cx="260" cy="80" r="26" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <text x="260" y="83" textAnchor="middle" fill="currentColor" fontSize="7.5" fontFamily="var(--font-body)" fontWeight="600" letterSpacing="0.12em" opacity="0.8">CODE</text>

      {/* TOP-RIGHT — AI */}
      <circle cx="420" cy="180" r="26" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <text x="420" y="183" textAnchor="middle" fill="currentColor" fontSize="7.5" fontFamily="var(--font-body)" fontWeight="600" letterSpacing="0.12em" opacity="0.8">AI</text>

      {/* BOTTOM-RIGHT — DATA */}
      <circle cx="420" cy="360" r="26" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <text x="420" y="363" textAnchor="middle" fill="currentColor" fontSize="7.5" fontFamily="var(--font-body)" fontWeight="600" letterSpacing="0.12em" opacity="0.8">DATA</text>

      {/* BOTTOM-LEFT — DESIGN */}
      <circle cx="100" cy="360" r="26" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <text x="100" y="363" textAnchor="middle" fill="currentColor" fontSize="7.5" fontFamily="var(--font-body)" fontWeight="600" letterSpacing="0.12em" opacity="0.8">DESIGN</text>

      {/* TOP-LEFT — SYSTEMS */}
      <circle cx="100" cy="180" r="26" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <text x="100" y="183" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-body)" fontWeight="600" letterSpacing="0.1em" opacity="0.8">SYSTEMS</text>

      {/* Ambient dots */}
      <circle cx="190" cy="140" r="2" fill="currentColor" opacity="0.2"/>
      <circle cx="340" cy="140" r="2" fill="currentColor" opacity="0.2"/>
      <circle cx="380" cy="280" r="2" fill="currentColor" opacity="0.15"/>
      <circle cx="140" cy="280" r="2" fill="currentColor" opacity="0.15"/>
      <circle cx="260" cy="430" r="2" fill="currentColor" opacity="0.2"/>
    </svg>
  );
}
