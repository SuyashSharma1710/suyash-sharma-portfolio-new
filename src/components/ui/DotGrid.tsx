import React from "react";
import styles from "./DotGrid.module.css";

export interface DotGridProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
}

export function DotGrid({
  className = "",
  dotSize = 1.5,
  gap = 32,
  opacity = 0.05,
}: DotGridProps) {
  return (
    <div
      className={`${styles.dotGrid} ${className}`}
      style={{
        opacity,
        backgroundSize: `${gap}px ${gap}px`,
        backgroundImage: `radial-gradient(var(--color-ink) ${dotSize}px, transparent ${dotSize}px)`,
      }}
      aria-hidden="true"
    />
  );
}
