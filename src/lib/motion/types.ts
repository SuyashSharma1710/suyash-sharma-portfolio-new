/**
 * Centralized Motion System — Type Definitions
 * 
 * Strict separation of:
 * - Interaction State (raw pointer, devices, events)
 * - Animation State (physics springs, velocities, transforms)
 * - React UI State (structural/aria props only)
 */

export type MotionProperty =
  | "x"
  | "y"
  | "z"
  | "rotateX"
  | "rotateY"
  | "rotateZ"
  | "scale"
  | "scaleX"
  | "scaleY"
  | "skewX"
  | "skewY"
  | "opacity"
  | "blur";

export interface SpringConfig {
  /** Spring stiffness / spring constant k. Higher = snappier. (Default: 180) */
  stiffness?: number;
  /** Spring damping coefficient c. Higher = less oscillation. (Default: 20) */
  damping?: number;
  /** Mass of the object. Higher = more inertia. (Default: 1) */
  mass?: number;
  /** Distance threshold to consider value at rest. (Default: 0.001) */
  restDelta?: number;
  /** Velocity threshold to consider value at rest. (Default: 0.001) */
  restSpeed?: number;
  /** Delay in milliseconds before spring responds to target changes. (Default: 0) */
  delay?: number;
  /** Optional fixed duration in seconds (switches from harmonic spring to timed easing curve). */
  duration?: number;
  /** Custom easing function if duration is specified. */
  easing?: (t: number) => number;
  /** Output multiplier applied to the target before solving. (Default: 1) */
  multiplier?: number;
  /** Whether to prevent spring overshoot. (Default: false) */
  clamp?: boolean;
}

export type MotionPropertyConfigs = Partial<Record<MotionProperty, SpringConfig>>;

export interface PointerState {
  /** Raw viewport clientX */
  clientX: number;
  /** Raw viewport clientY */
  clientY: number;
  /** Position relative to element bounding box top-left (0 to width) */
  localX: number;
  /** Position relative to element bounding box top-left (0 to height) */
  localY: number;
  /** Normalized position across element (0 at left/top, 1 at right/bottom) */
  relX: number;
  /** Normalized position across element (0 at left/top, 1 at right/bottom) */
  relY: number;
  /** Normalized position from center (-1 at left/top, 0 at center, +1 at right/bottom) */
  normX: number;
  /** Normalized position from center (-1 at left/top, 0 at center, +1 at right/bottom) */
  normY: number;
  /** Horizontal velocity (px / ms) */
  vx: number;
  /** Vertical velocity (px / ms) */
  vy: number;
  /** Total scalar speed magnitude (px / ms) */
  speed: number;
  /** Heading angle of velocity vector in radians */
  angle: number;
  /** Whether the pointer is currently within the element bounds */
  isInside: boolean;
  /** Whether the primary pointer button / touch is pressed down */
  isDown: boolean;
  /** Device pointer type */
  pointerType: "mouse" | "touch" | "pen";
  /** Timestamp of last recorded event (DOMHighResTimeStamp) */
  timestamp: number;
}

export interface DeviceProfile {
  /** Primary input has touch capability */
  isTouch: boolean;
  /** Primary pointer is coarse (e.g. finger/touchscreen) */
  isCoarse: boolean;
  /** User has enabled prefers-reduced-motion in OS settings */
  reducedMotion: boolean;
  /** Current measured rolling average FPS */
  fps: number;
  /** True if frame budget exceeds 33ms consistently */
  isLowPower: boolean;
}

export interface MotionChannelState {
  current: number;
  target: number;
  velocity: number;
  isSettled: boolean;
  targetTime: number; // for delay handling
  startTime: number;  // for timed easing
  startValue: number; // for timed easing
}

export type MotionSubscriber = (dt: number, time: number, profile: DeviceProfile) => boolean;

export interface MotionOutputValues {
  x: number;
  y: number;
  z: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
  opacity: number;
  blur: number;
}

export type MotionOutputFormat =
  | "transform"      // Directly updates element.style.transform/opacity/filter
  | "css-variables"  // Updates CSS custom properties on element (e.g. --motion-x)
  | "custom";        // Calls a direct subscriber callback
