"use client";

/**
 * Centralized Motion System — Magnetic Primitive
 * 
 * Magnetic attraction component for buttons, links, icons, and action pills:
 * - Direct GPU-accelerated translate3d transforms
 * - Zero React re-renders during interaction
 * - Injects release momentum when cursor exits
 * - Graceful fallback on touch devices (no stuck magnetic state)
 */

import React, { useRef } from "react";
import { usePointerMotion } from "../usePointerMotion";
import { motionPresets } from "../presets";
import { SpringConfig } from "../types";

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  config?: SpringConfig;
  disabled?: boolean;
  as?: React.ElementType;
}

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
  config = motionPresets.magnetic,
  disabled = false,
  as: Component = "div",
}: MagneticProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  usePointerMotion(containerRef, {
    magneticStrength: strength,
    properties: {
      x: config,
      y: config,
    },
    disabled,
  });

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform",
      }}
    >
      {children}
    </Component>
  );
}
