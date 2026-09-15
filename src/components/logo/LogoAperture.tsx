import React from "react";
import { LogoProps } from "./LogoConvergence";

/**
 * Concept 02: The Dual Aperture / Orbital Telemetry
 * Nodal Vector Mark.
 * Symbolizes systems discovery, continuous feedback loops, and intelligent coordination.
 */
export function LogoAperture({
  size = 28,
  className = "",
  strokeWidth = 2.2,
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
      aria-label="Suyash Sharma Monogram — Dual Aperture"
      {...props}
    >
      {/* Outer Orbital Telemetry Arcs */}
      <path
        d="M 16 5.5 A 10.5 10.5 0 0 1 26.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M 16 26.5 A 10.5 10.5 0 0 1 5.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* S-Vector Core Spine */}
      <path
        d="M 16 5.5 C 10.5 5.5 8 9 8 12.5 C 8 16 11 16 16 16 C 21 16 24 16 24 19.5 C 24 23 21.5 26.5 16 26.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {showTelemetry && (
        <>
          {/* 4 Corner CAD Registration Brackets */}
          <path
            d="M 4 8 V 4 H 8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="square"
            opacity="0.5"
          />
          <path
            d="M 24 4 H 28 V 8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="square"
            opacity="0.5"
          />
          <path
            d="M 4 24 V 28 H 8"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="square"
            opacity="0.5"
          />
          <path
            d="M 24 28 H 28 V 24"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="square"
            opacity="0.5"
          />

          {/* Central Nodal Point */}
          <circle
            cx="16"
            cy="16"
            r="1.5"
            fill="currentColor"
          />

          {/* Orbital Satellite Node */}
          <circle
            cx="24"
            cy="8.5"
            r="1"
            fill="currentColor"
            opacity="0.75"
          />
          <circle
            cx="8"
            cy="23.5"
            r="1"
            fill="currentColor"
            opacity="0.75"
          />
        </>
      )}
    </svg>
  );
}
