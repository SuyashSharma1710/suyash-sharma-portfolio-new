"use client";

/**
 * Preloader.tsx — Editorial Pixel Matrix Logo Assembly & Column Mask Reveal
 * 
 * Infallible, Rock-Solid & Buttery-Smooth Engineering:
 * 1. ZERO-FLASH INITIAL STATE: Pure CSS ensures all blocks and logos start 100% invisible.
 *    The screen starts cleanly blank with the 8 column mask shutters covering the page.
 * 2. SEAMLESS CHOREOGRAPHY:
 *    - Phase 1: Blank masked canvas, telemetry HUD slides in (0.35s).
 *    - Phase 2: Pixel blocks pop in with staggered spring overshoot (0.75s).
 *    - Phase 3: Tabular numeric counter counts synchronously from 000% to 100%.
 *    - Phase 4: Solid vector monogram logo fuses in with glow bloom as pixel blocks dissolve.
 *    - Phase 5: Deliberate hold (0.25s) on the resolved mark.
 *    - Phase 6: Center stage gracefully dissolves upward (0.35s).
 *    - Phase 7: 8 vertical columns slim down (scaleX: 1 -> 0) from center outward (0.75s) to reveal page.
 * 3. 100% IDEMPOTENT DISMISS: Single teardown controller restores scroll, kills timeline, and cleans up.
 * 4. FAIL-SAFE WATCHDOG: 3.5s hard timeout guarantees the page is never locked under any circumstance.
 * 5. KEYBOARD ESCAPE & A11Y: Instant skip with ESC key or screen reader bypass.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Preloader.module.css";

// Register GSAP plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const GRID_SIZE = 12;
const LOGO_VIEWBOX_SIZE = 500;
const STEP = LOGO_VIEWBOX_SIZE / GRID_SIZE;
const BLOCK_PADDING = 3; // Gap between chunky pixel blocks
const NUM_COLUMNS = 8;
const MAX_WATCHDOG_TIMEOUT_MS = 3500; // Hard cutoff to prevent any stall

// Generate the 12x12 binary logo mask
function isInsideLogo(cx: number, cy: number): boolean {
  // Top ribbon
  if (cy >= 0 && cy <= 308 && cx >= 0 && cx <= 500) {
    if (cy <= 158) return true;
    const maxX = 280 - (cy - 158) * (154 / 150);
    if (cx <= maxX) return true;
  }
  // Bottom ribbon
  if (cy >= 192 && cy <= 500 && cx >= 0 && cx <= 500) {
    if (cy >= 342) return true;
    const minX = 374 - (cy - 192) * (154 / 150);
    if (cx >= minX) return true;
  }
  return false;
}

interface PixelBlock {
  id: string;
  r: number;
  c: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const PIXEL_BLOCKS: PixelBlock[] = [];
for (let r = 0; r < GRID_SIZE; r++) {
  for (let c = 0; c < GRID_SIZE; c++) {
    const cx = (c + 0.5) * STEP;
    const cy = (r + 0.5) * STEP;
    if (isInsideLogo(cx, cy)) {
      PIXEL_BLOCKS.push({
        id: `block-${r}-${c}`,
        r,
        c,
        x: c * STEP + BLOCK_PADDING / 2,
        y: r * STEP + BLOCK_PADDING / 2,
        width: STEP - BLOCK_PADDING,
        height: STEP - BLOCK_PADDING,
      });
    }
  }
}

export function Preloader() {
  const [isRendered, setIsRendered] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDismissedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const watchdogRef = useRef<NodeJS.Timeout | null>(null);

  // 100% Idempotent Dismissal Controller
  const dismiss = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;

    // 1. Clear safety watchdog timer
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }

    // 2. Safely kill any active GSAP timeline
    if (tlRef.current) {
      try {
        tlRef.current.kill();
      } catch {
        // Timeline kill fallback
      }
      tlRef.current = null;
    }

    // 3. Unconditionally restore document scroll
    try {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    } catch {
      // DOM access fallback
    }

    // 4. Notify downstream animations (hero, nav)
    try {
      window.dispatchEvent(new CustomEvent("portfolio:preloader-complete"));
    } catch {
      // Event dispatch fallback
    }

    // 5. Unmount cleanly
    setIsRendered(false);
  }, []);

  // Mount & Preflight Lifecycle
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isHomepage = window.location.pathname === "/";
    let hasSeenPreloader = false;
    try {
      hasSeenPreloader = sessionStorage.getItem("portfolio_preloader_seen") === "true";
    } catch {
      // storage fallback
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !isHomepage || hasSeenPreloader) {
      dismiss();
      return;
    }

    try {
      sessionStorage.setItem("portfolio_preloader_seen", "true");
    } catch {
      // ignore
    }

    // Lock scroll during preloader
    try {
      document.body.style.overflow = "hidden";
    } catch {
      // ignore
    }

    // Hard watchdog safety cutoff
    watchdogRef.current = setTimeout(() => {
      dismiss();
    }, MAX_WATCHDOG_TIMEOUT_MS);

    // Keyboard ESC shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Unmount cleanup — guarantees scroll unlock
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (watchdogRef.current) {
        clearTimeout(watchdogRef.current);
      }
      try {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      } catch {
        // ignore
      }
    };
  }, [dismiss]);

  // GSAP Animation Sequence
  useGSAP(
    () => {
      if (!isRendered || isDismissedRef.current || !containerRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        dismiss();
        return;
      }

      try {
        const tl = gsap.timeline({
          onComplete: () => {
            dismiss();
          },
        });
        tlRef.current = tl;

        // 1. Initial State
        gsap.set(`.${styles.pixelBlock}`, {
          scale: 0,
          opacity: 0,
          transformOrigin: "center center",
        });
        gsap.set(`.${styles.solidLogo}`, { opacity: 0 });
        gsap.set(`.${styles.maskColumn}`, { scaleX: 1 });
        gsap.set(`.${styles.telemetry}`, { opacity: 0, y: 8 });

        // Progress counter animation object
        const counterObj = { val: 0 };

        // 2. Entrance Sequence
        tl.to(`.${styles.telemetry}`, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        })
          // Pixel blocks assembly with dynamic digital ripple
          .to(
            `.${styles.pixelBlock}`,
            {
              scale: 1,
              opacity: 1,
              duration: 0.45,
              ease: "back.out(1.8)",
              stagger: {
                amount: 0.75,
                from: "random",
              },
            },
            "-=0.1"
          )
          // Numeric progress tracker (0 → 100%)
          .to(
            counterObj,
            {
              val: 100,
              duration: 0.9,
              ease: "power2.inOut",
              onUpdate: () => {
                setProgress(Math.round(counterObj.val));
              },
            },
            "<"
          )
          // Solid Vector Logo fuses in with subtle bloom
          .to(
            `.${styles.solidLogo}`,
            {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.15"
          )
          // Pixel blocks dissolve as solid logo takes over
          .to(
            `.${styles.pixelBlock}`,
            {
              opacity: 0,
              duration: 0.25,
              ease: "power2.out",
            },
            "<"
          )
          // Brief deliberate hold on the resolved mark
          .to({}, { duration: 0.25 })
          // Center content lifts away
          .to(
            `.${styles.centerContent}`,
            {
              opacity: 0,
              scale: 0.96,
              y: -12,
              duration: 0.35,
              ease: "power3.in",
            }
          )
          // 3. Mask Columns getting thin (scaleX: 1 → 0) in center-outward ripple
          .to(
            `.${styles.maskColumn}`,
            {
              scaleX: 0,
              duration: 0.75,
              ease: "power3.inOut",
              stagger: {
                amount: 0.35,
                from: "center",
              },
            },
            "-=0.1"
          );
      } catch (err) {
        console.warn("Preloader animation fallback activated:", err);
        dismiss();
      }
    },
    { scope: containerRef }
  );

  if (!isRendered) return null;

  return (
    <div
      ref={containerRef}
      className={styles.preloaderOverlay}
      aria-label="Portfolio initialization loader"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* 8-Column Mask Slats Curtain */}
      <div className={styles.columnsCurtain} aria-hidden="true">
        {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
          <div key={i} className={styles.maskColumn} />
        ))}
      </div>

      {/* Central Interactive Animation Stage */}
      <div className={styles.centerContent}>
        {/* Top Header Telemetry */}
        <div className={styles.topTelemetry}>
          <span className={styles.telemetryDot} aria-hidden="true" />
          <span className={styles.telemetryBrand}>SUYASH SHARMA · 2026</span>
        </div>

        {/* Pixel-by-Pixel Logo Canvas */}
        <div className={styles.logoStage}>
          <svg
            viewBox="0 0 500 500"
            className={styles.pixelSvg}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Blueprint Grid Dots */}
            {Array.from({ length: GRID_SIZE }).map((_, r) =>
              Array.from({ length: GRID_SIZE }).map((__, c) => (
                <rect
                  key={`bg-dot-${r}-${c}`}
                  x={c * STEP + STEP / 2 - 1}
                  y={r * STEP + STEP / 2 - 1}
                  width={2}
                  height={2}
                  className={styles.gridDot}
                />
              ))
            )}

            {/* Chunky Pixel Blocks */}
            {PIXEL_BLOCKS.map((block) => (
              <rect
                key={block.id}
                x={block.x}
                y={block.y}
                width={block.width}
                height={block.height}
                rx={3}
                fill="var(--color-ink)"
                className={styles.pixelBlock}
              />
            ))}

            {/* Solid Vector Monogram Mark (Fuses on top) */}
            <path
              d="M500 492C500 496.418 496.418 500 492 500H7.99999C3.58171 500 0 496.418 0 492V350.006C0 345.588 3.58172 342.006 8 342.006H89.6006L219.626 342.02C221.722 342.02 223.733 341.198 225.229 339.731L373.781 194.011C375.276 192.544 377.288 191.722 379.383 191.722H492C496.418 191.722 500 195.303 500 199.722V492ZM500 150C500 154.418 496.418 158 492 158H297.088C297.087 158 297.087 158 297.087 158.001C297.087 158.002 297.086 158.002 297.086 158.002L280.452 158C278.356 158 276.345 158.822 274.849 160.289L126.312 305.994C124.816 307.461 122.805 308.283 120.71 308.283H8C3.58173 308.283 0 304.701 0 300.283V8.00001C0 3.58173 3.58172 0 8 0H492C496.418 0 500 3.58172 500 8V150Z"
              fill="var(--color-ink)"
              className={styles.solidLogo}
            />
          </svg>
        </div>

        {/* Bottom Loading Progress Readout */}
        <div className={styles.telemetry}>
          <div className={styles.progressRow}>
            <span className={styles.statusText}>
              {progress < 100 ? "INITIALIZING SUBSYSTEMS" : "ALL SYSTEMS READY"}
            </span>
            <span className={styles.percentText}>
              {String(progress).padStart(3, "0")}%
            </span>
          </div>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
