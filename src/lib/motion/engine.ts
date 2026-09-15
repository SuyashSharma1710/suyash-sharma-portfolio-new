/**
 * Centralized Motion System — Unified RAF Engine
 * 
 * Manages a single global requestAnimationFrame loop across the application.
 * - Zero React re-renders during continuous loops
 * - Auto-sleeps when all motion channels reach rest state (0% CPU at idle)
 * - Measures rolling average FPS and flags low-power mode for graceful degradation
 * - Tracks OS reduced-motion and touch device profiles
 */

import { DeviceProfile, MotionSubscriber } from "./types";

class MotionEngine {
  private subscribers = new Map<string, MotionSubscriber>();
  private rafId: number | null = null;
  private lastTime = 0;
  private isRunning = false;
  private frameCount = 0;
  private fpsBuffer: number[] = [];
  private fpsAvg = 60;
  private isLowPower = false;

  private profile: DeviceProfile = {
    isTouch: false,
    isCoarse: false,
    reducedMotion: false,
    fps: 60,
    isLowPower: false,
  };

  constructor() {
    if (typeof window !== "undefined") {
      this.initDeviceProfile();
    }
  }

  private initDeviceProfile(): void {
    const checkMedia = () => {
      const coarseMedia = window.matchMedia("(pointer: coarse)");
      const touchMedia = window.matchMedia("(hover: none)");
      const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

      this.profile.isCoarse = coarseMedia.matches;
      this.profile.isTouch = touchMedia.matches || ("ontouchstart" in window);
      this.profile.reducedMotion = motionMedia.matches;

      // Event listeners for dynamic media changes
      coarseMedia.addEventListener?.("change", (e) => {
        this.profile.isCoarse = e.matches;
      });
      motionMedia.addEventListener?.("change", (e) => {
        this.profile.reducedMotion = e.matches;
      });
    };

    checkMedia();
  }

  /**
   * Subscribe an update callback to the central ticker loop.
   * The callback must return `true` if it still has active animations,
   * or `false` if it has settled to rest.
   */
  public subscribe(id: string, callback: MotionSubscriber): () => void {
    this.subscribers.set(id, callback);
    this.wake();

    return () => {
      this.subscribers.delete(id);
      if (this.subscribers.size === 0) {
        this.sleep();
      }
    };
  }

  /**
   * Wake the engine if it is sleeping.
   */
  public wake(): void {
    if (typeof window === "undefined") return;
    if (!this.isRunning && this.subscribers.size > 0) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.rafId = window.requestAnimationFrame(this.tick);
    }
  }

  /**
   * Put the engine to sleep when no active motion channels require updates.
   */
  private sleep(): void {
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isRunning = false;
  }

  /**
   * Central single RAF loop.
   */
  private tick = (time: DOMHighResTimeStamp): void => {
    if (!this.isRunning) return;

    const rawDelta = time - this.lastTime;
    this.lastTime = time;

    // Cap delta at 100ms to prevent huge physics jumps on tab backgrounding/resuming
    const dt = Math.min(rawDelta, 100);

    // Track rolling FPS for graceful degradation
    if (rawDelta > 0) {
      const instantFps = 1000 / rawDelta;
      this.fpsBuffer.push(instantFps);
      if (this.fpsBuffer.length > 30) this.fpsBuffer.shift();

      this.frameCount++;
      if (this.frameCount % 15 === 0) {
        const sum = this.fpsBuffer.reduce((acc, val) => acc + val, 0);
        this.fpsAvg = Math.round(sum / this.fpsBuffer.length);
        this.profile.fps = this.fpsAvg;

        // Flag low-power if fps drops below 35 for sustained period
        this.isLowPower = this.fpsAvg < 35;
        this.profile.isLowPower = this.isLowPower;
      }
    }

    let anyActive = false;

    // Execute all subscribers
    this.subscribers.forEach((callback) => {
      try {
        const isActive = callback(dt, time, this.profile);
        if (isActive) {
          anyActive = true;
        }
      } catch (err) {
        console.error("[MotionEngine] Error in subscriber:", err);
      }
    });

    if (anyActive) {
      this.rafId = window.requestAnimationFrame(this.tick);
    } else {
      this.sleep();
    }
  };

  /**
   * Get current device and performance profile.
   */
  public getProfile(): Readonly<DeviceProfile> {
    return this.profile;
  }
}

// Global singleton instance
export const motionEngine = new MotionEngine();
