"use client";

/**
 * Centralized Motion System — Tilt Primitive
 * 
 * 3D Perspective Tilt surface:
 * - Velocity-aware rotation and damping
 * - Zero React re-renders during motion
 * - Respects Zero-Box policy (seamless on open canvas)
 * - Auto-disabled on touch devices and reduced-motion modes
 */

import React, { useRef } from "react";
import { usePointerMotion } from "../usePointerMotion";
import { motionPresets } from "../presets";
import { SpringConfig } from "../types";

export interface TiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  config?: SpringConfig;
  disabled?: boolean;
  as?: React.ElementType;
}

export function Tilt({
  children,
  className = "",
  maxTilt = 10,
  perspective = 1000,
  config = motionPresets.tilt,
  disabled = false,
  as: Component = "div",
}: TiltProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  usePointerMotion(containerRef, {
    maxTilt,
    perspective,
    properties: {
      rotateX: config,
      rotateY: config,
    },
    disabled,
  });

  return (
    <Component
      ref={containerRef}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </Component>
  );
}
