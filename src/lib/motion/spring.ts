/**
 * Centralized Motion System — Physics Spring & Interpolator
 * 
 * High-performance solver supporting:
 * - Second-order damped harmonic oscillator (semi-implicit Euler with sub-stepping)
 * - Continuous velocity injection and momentum preservation
 * - Independent property config (stiffness, damping, mass, delay, duration, easing, multiplier)
 * - Zero allocations during solver loop
 */

import { SpringConfig, MotionChannelState, DeviceProfile } from "./types";

const DEFAULT_SPRING: Required<Omit<SpringConfig, "delay" | "duration" | "easing">> = {
  stiffness: 180,
  damping: 20,
  mass: 1,
  restDelta: 0.001,
  restSpeed: 0.001,
  multiplier: 1,
  clamp: false,
};

export function createChannelState(initialValue = 0): MotionChannelState {
  return {
    current: initialValue,
    target: initialValue,
    velocity: 0,
    isSettled: true,
    targetTime: 0,
    startTime: 0,
    startValue: initialValue,
  };
}

/**
 * Standard cubic ease-out curve for timed transitions.
 */
export function easeOutCubic(t: number): number {
  const f = t - 1;
  return f * f * f + 1;
}

/**
 * Standard smooth quintic ease-out curve.
 */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Set target for a motion channel with delay support.
 */
export function setChannelTarget(
  channel: MotionChannelState,
  rawTarget: number,
  config: SpringConfig = {},
  now: number = performance.now()
): void {
  const mult = config.multiplier ?? 1;
  const target = rawTarget * mult;

  if (config.delay && config.delay > 0) {
    channel.targetTime = now + config.delay;
  } else {
    channel.targetTime = 0;
  }

  if (config.duration && config.duration > 0) {
    channel.startTime = now + (config.delay ?? 0);
    channel.startValue = channel.current;
  }

  channel.target = target;
  channel.isSettled = false;
}

/**
 * Inject external velocity into an active spring (e.g. from pointer flick / throw).
 */
export function injectVelocity(
  channel: MotionChannelState,
  velocity: number
): void {
  channel.velocity += velocity;
  channel.isSettled = false;
}

/**
 * Step the spring physics by dt milliseconds.
 * Returns true if the channel is still moving, false if it has settled to rest.
 */
export function stepChannel(
  channel: MotionChannelState,
  config: SpringConfig = {},
  dtMs: number,
  now: number,
  profile: DeviceProfile
): boolean {
  if (channel.isSettled) return false;

  // If reduced motion is requested, snap instantly to target
  if (profile.reducedMotion) {
    channel.current = channel.target;
    channel.velocity = 0;
    channel.isSettled = true;
    return false;
  }

  // Handle delay
  if (channel.targetTime > 0 && now < channel.targetTime) {
    return true; // waiting for delay to expire
  }

  // Handle timed duration mode
  if (config.duration && config.duration > 0) {
    if (now < channel.startTime) return true;

    const durationMs = config.duration * 1000;
    const elapsed = now - channel.startTime;
    const progress = Math.min(1, Math.max(0, elapsed / durationMs));
    const easingFn = config.easing ?? easeOutCubic;
    const eased = easingFn(progress);

    channel.current = channel.startValue + (channel.target - channel.startValue) * eased;

    if (progress >= 1) {
      channel.current = channel.target;
      channel.velocity = 0;
      channel.isSettled = true;
      return false;
    }
    return true;
  }

  // Harmonic spring solver
  const k = config.stiffness ?? DEFAULT_SPRING.stiffness;
  const c = config.damping ?? DEFAULT_SPRING.damping;
  const m = config.mass ?? DEFAULT_SPRING.mass;
  const restDelta = config.restDelta ?? DEFAULT_SPRING.restDelta;
  const restSpeed = config.restSpeed ?? DEFAULT_SPRING.restSpeed;
  const clamp = config.clamp ?? DEFAULT_SPRING.clamp;

  // Convert dt to seconds
  const dtSec = dtMs / 1000;

  // Sub-step count: on low-power devices, use 2 sub-steps, otherwise 4 for numerical stability
  const subSteps = profile.isLowPower ? 2 : 4;
  const subDt = dtSec / subSteps;

  let current = channel.current;
  let velocity = channel.velocity;
  const target = channel.target;

  for (let i = 0; i < subSteps; i++) {
    const displacement = current - target;
    const springForce = -k * displacement;
    const dampingForce = -c * velocity;
    const acceleration = (springForce + dampingForce) / m;

    velocity += acceleration * subDt;
    current += velocity * subDt;

    if (clamp) {
      if ((target > channel.startValue && current > target) ||
          (target < channel.startValue && current < target)) {
        current = target;
        velocity = 0;
        break;
      }
    }
  }

  channel.current = current;
  channel.velocity = velocity;

  // Check settling threshold
  const distFromTarget = Math.abs(current - target);
  const speed = Math.abs(velocity);

  if (distFromTarget < restDelta && speed < restSpeed) {
    channel.current = target;
    channel.velocity = 0;
    channel.isSettled = true;
    return false;
  }

  return true;
}
