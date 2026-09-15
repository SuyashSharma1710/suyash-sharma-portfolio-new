/**
 * Centralized Motion System — Physics Presets
 * 
 * Mathematically tuned spring parameters for organic, high-end Swiss editorial feel:
 * - High responsive stiffness without high-frequency jitter
 * - Critically damped or slightly underdamped for subtle tactile feedback
 * - Configured with zero overshoot where clarity is mandatory
 */

import { SpringConfig } from "./types";

export const motionPresets = {
  /** Snappy & crisp: Best for interactive focus rings, active indicator pills, and micro-toggles */
  snappy: {
    stiffness: 340,
    damping: 28,
    mass: 1,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** Elegant & smooth: Best for editorial content reveals, accordions, and narrative transitions */
  smooth: {
    stiffness: 180,
    damping: 22,
    mass: 1,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** Magnetic attraction: Fast response with tactile pull for buttons and interactive tags */
  magnetic: {
    stiffness: 260,
    damping: 20,
    mass: 0.8,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** Magnetic release: Gentle settling when mouse leaves an interactive target */
  magneticRelease: {
    stiffness: 170,
    damping: 18,
    mass: 1,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** 3D Perspective Tilt: Controlled rotation with high rotational inertia */
  tilt: {
    stiffness: 220,
    damping: 24,
    mass: 1.1,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** Velocity stretch / skew: Dynamic skew proportional to mouse flick */
  velocityStretch: {
    stiffness: 280,
    damping: 25,
    mass: 1,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** Heavy physical inertia: Deep layered cards and backdrop depth planes */
  heavyInertia: {
    stiffness: 90,
    damping: 16,
    mass: 2.2,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,

  /** Gentle floating parallax: Smooth mouse follower and ambient layers */
  subtleParallax: {
    stiffness: 130,
    damping: 20,
    mass: 1.4,
    restDelta: 0.001,
    restSpeed: 0.001,
  } satisfies SpringConfig,
} as const;
