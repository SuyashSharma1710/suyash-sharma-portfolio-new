"use client";

/**
 * Preloader.tsx — Editorial Pixel Matrix Logo Assembly & Column Mask Reveal
 * 
 * Concept:
 * 1. Chunky 12x12 pixel matrix assembles the brand logo block-by-block with GSAP stagger.
 * 2. Seamless fusion into the crisp solid vector brand monogram.
 * 3. 8-column vertical mask shutters slim down ("mask columns getting thin") to reveal the page.
 * 
 * Governed strictly by Centralized Motion System and gsap-react skills.
 */
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Preloader.module.css";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const GRID_SIZE = 12;
const LOGO_VIEWBOX_SIZE = 500;
const STEP = LOGO_VIEWBOX_SIZE / GRID_SIZE;
const BLOCK_PADDING = 3; // Gap between chunky pixel blocks

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

const NUM_COLUMNS = 8;

export function Preloader() {
  const [isRendered, setIsRendered] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasVisited = useRef(false);

  // Check session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyLoaded = sessionStorage.getItem("suyash_preloader_seen");
      if (alreadyLoaded) {
        hasVisited.current = true;
        setIsRendered(false);
      }
    }
  }, []);

  useGSAP(
    () => {
      if (hasVisited.current || !containerRef.current) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Lock scroll while preloader is active
      document.body.style.overflow = "hidden";

      if (prefersReducedMotion) {
        document.body.style.overflow = "";
        setIsRendered(false);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          sessionStorage.setItem("suyash_preloader_seen", "true");
          setIsRendered(false);
        },
      });

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
