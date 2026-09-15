import React from "react";

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  showTelemetry?: boolean;
}

/**
 * Concept 01: The S-Convergence
 * Precision Caliper Monogram.
 * Symbolizes the convergence of Systems Architecture, Interface Craft, and Algorithmic Intelligence.
 */
export function LogoConvergence({
  size = 28,
  className = "",
  strokeWidth = 2.4,
  showTelemetry = true,
  ...props
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Suyash Sharma Monogram — S-Convergence"
      {...props}
    >
      {/* Precision Caliper S-Spine */}
      <path
        d="M 24.5 7.5 H 12 C 8.686 7.5 6 10.186 6 13.5 C 6 16.814 8.686 16.5 12 16.5 H 20 C 23.314 16.5 26 16.186 26 19.5 C 26 22.814 23.314 25.5 20 25.5 H 7.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {showTelemetry && (
        <>
          {/* Top caliper end registration tick */}
          <line
            x1="24.5"
            y1="5"
            x2="24.5"
            y2="10"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Bottom caliper end registration tick */}
          <line
            x1="7.5"
            y1="23"
            x2="7.5"
            y2="28"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Central convergence node */}
          <circle
            cx="16"
            cy="16.5"
            r="1.4"
            fill="currentColor"
          />

          {/* Lateral reference ticks */}
          <line
            x1="2.5"
            y1="16.5"
            x2="4.5"
            y2="16.5"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <line
            x1="27.5"
            y1="16.5"
            x2="29.5"
            y2="16.5"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Corner frame cues */}
          <path
            d="M 3 6 H 5 M 3 6 V 8"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
            opacity="0.4"
          />
          <path
            d="M 29 26 H 27 M 29 26 V 24"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
            opacity="0.4"
          />
        </>
      )}
    </svg>
  );
}
