/**
 * Centralized Motion System — Unified Pointer & Velocity Tracker
 * 
 * High-performance pointer telemetry:
 * - Tracks raw pointer coordinates, normalized offsets, and vector velocity
 * - Exponential moving average smoothing for velocity estimation
 * - Distinguishes fine desktop pointers from coarse touch inputs
 * - Global singleton + scoped element tracker
 */

import { PointerState } from "./types";

const VELOCITY_ALPHA = 0.4; // Weight for exponential moving average

export function createEmptyPointerState(): PointerState {
  return {
    clientX: 0,
    clientY: 0,
    localX: 0,
    localY: 0,
    relX: 0.5,
    relY: 0.5,
    normX: 0,
    normY: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    angle: 0,
    isInside: false,
    isDown: false,
    pointerType: "mouse",
    timestamp: 0,
  };
}

class GlobalPointerTracker {
  private state: PointerState = createEmptyPointerState();
  private isInitialized = false;
  private listeners = new Set<(state: Readonly<PointerState>) => void>();
  private lastClientX = 0;
  private lastClientY = 0;
  private lastTimestamp = 0;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - this.lastTimestamp);

      // Instantaneous velocity (px / ms)
      const instVx = (e.clientX - this.lastClientX) / dt;
      const instVy = (e.clientY - this.lastClientY) / dt;

      // Smoothed velocity
      const vx = this.state.timestamp === 0 ? instVx : VELOCITY_ALPHA * instVx + (1 - VELOCITY_ALPHA) * this.state.vx;
      const vy = this.state.timestamp === 0 ? instVy : VELOCITY_ALPHA * instVy + (1 - VELOCITY_ALPHA) * this.state.vy;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);

      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
      this.lastTimestamp = now;

      this.state.clientX = e.clientX;
      this.state.clientY = e.clientY;
      this.state.vx = vx;
      this.state.vy = vy;
      this.state.speed = speed;
      this.state.angle = angle;
      this.state.pointerType = (e.pointerType as "mouse" | "touch" | "pen") || "mouse";
      this.state.timestamp = now;

      this.notify();
    };

    const onPointerDown = (e: PointerEvent) => {
      this.state.isDown = true;
      this.state.pointerType = (e.pointerType as "mouse" | "touch" | "pen") || "mouse";
      this.notify();
    };

    const onPointerUp = () => {
      this.state.isDown = false;
      this.notify();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
  }

  public subscribe(callback: (state: Readonly<PointerState>) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify(): void {
    this.listeners.forEach((cb) => cb(this.state));
  }

  public getState(): Readonly<PointerState> {
    return this.state;
  }
}

export const globalPointer = new GlobalPointerTracker();

/**
 * Computes element-relative coordinates and updates a scoped PointerState object.
 */
export function updateScopedPointer(
  state: PointerState,
  clientX: number,
  clientY: number,
  rect: DOMRect,
  isInside: boolean,
  pointerType: "mouse" | "touch" | "pen",
  now: number
): void {
  const dt = Math.max(1, now - (state.timestamp || now));

  const localX = clientX - rect.left;
  const localY = clientY - rect.top;

  const w = rect.width || 1;
  const h = rect.height || 1;

  const relX = Math.min(1, Math.max(0, localX / w));
  const relY = Math.min(1, Math.max(0, localY / h));

  const normX = (relX - 0.5) * 2; // -1 to 1
  const normY = (relY - 0.5) * 2; // -1 to 1

  const instVx = (clientX - state.clientX) / dt;
  const instVy = (clientY - state.clientY) / dt;

  const vx = state.timestamp === 0 ? instVx : VELOCITY_ALPHA * instVx + (1 - VELOCITY_ALPHA) * state.vx;
  const vy = state.timestamp === 0 ? instVy : VELOCITY_ALPHA * instVy + (1 - VELOCITY_ALPHA) * state.vy;
  const speed = Math.sqrt(vx * vx + vy * vy);
  const angle = Math.atan2(vy, vx);

  state.clientX = clientX;
  state.clientY = clientY;
  state.localX = localX;
  state.localY = localY;
  state.relX = relX;
  state.relY = relY;
  state.normX = normX;
  state.normY = normY;
  state.vx = vx;
  state.vy = vy;
  state.speed = speed;
  state.angle = angle;
  state.isInside = isInside;
  state.pointerType = pointerType;
  state.timestamp = now;
}
