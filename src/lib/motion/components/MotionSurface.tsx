"use client";

/**
 * Centralized Motion System — MotionSurface Primitive
 * 
 * Multi-physics surface combining:
 * - 3D Perspective Tilt
 * - Magnetic translation
 * - Dynamic velocity-aware skew
 * - Direct GPU-accelerated compositing
 */

import React, { useRef } from "react";
import { usePointerMotion } from "../usePointerMotion";
import { motionPresets } from "../presets";
import { SpringConfig } from "../types";

export interface MotionSurfaceProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  maxTilt?: number;
  perspective?: number;
  enableVelocitySkew?: boolean;
  tiltConfig?: SpringConfig;
  magneticConfig?: SpringConfig;
  skewConfig?: SpringConfig;
  disabled?: boolean;
  as?: React.ElementType;
}

export function MotionSurface({
  children,
  className = "",
  magneticStrength = 0.15,
  maxTilt = 8,
  perspective = 900,
  enableVelocitySkew = true,
  tiltConfig = motionPresets.tilt,
  magneticConfig = motionPresets.magnetic,
  skewConfig = motionPresets.velocityStretch,
  disabled = false,
  as: Component = "div",
}: MotionSurfaceProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  usePointerMotion(containerRef, {
    magneticStrength,
    maxTilt,
    perspective,
    enableVelocitySkew,
    properties: {
      x: magneticConfig,
      y: magneticConfig,
      rotateX: tiltConfig,
      rotateY: tiltConfig,
      skewX: skewConfig,
      skewY: skewConfig,
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
