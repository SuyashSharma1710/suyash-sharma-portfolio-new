"use client";

/**
 * TextPressure — Variable Font Physics & Proximity Pressure
 * Corrected, fully typed, SSR-safe, CSS-Module driven, and accessibility compliant.
 */

import React, { useEffect, useRef, useState, useCallback, useId } from "react";
import styles from "./TextPressure.module.css";
import { motionEngine } from "@/lib/motion/engine";

export interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Mathematically clean normalized interpolation bounded strictly between minVal and maxVal
const interpolateAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  if (maxDist <= 0) return minVal;
  const norm = Math.max(0, 1 - distance / maxDist);
  // Smooth cosine/cubic ease-out curve for fluid pressure feel
  const eased = Math.sin((norm * Math.PI) / 2);
  return minVal + (maxVal - minVal) * eased;
};

export function TextPressure({
  text = "Compressa",
  fontFamily = "var(--font-display)",
  fontUrl,
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor,
  strokeColor = "var(--color-ink)",
  strokeWidth = 1,
  className = "",
  minFontSize = 24,
}: TextPressureProps) {
  const uniqueId = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const isInteractingRef = useRef(false);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split("");

  // Dynamically inject webfont link if custom fontUrl is provided
  useEffect(() => {
    if (!fontUrl) return;
    const linkId = `font-link-${fontFamily.replace(/[^a-zA-Z0-9]/g, "-")}`;
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  }, [fontUrl, fontFamily]);

  // Handle pointer tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      isInteractingRef.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
        isInteractingRef.current = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Compute fluid font size based on container dimensions
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    if (containerW === 0) return;

    const divisor = flex ? Math.max(1, chars.length * 0.55) : Math.max(1, chars.length * 0.6);
    let newFontSize = containerW / divisor;
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0 && containerH > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale, flex]);

  useEffect(() => {
    setSize();
    let timer: NodeJS.Timeout;
    const debouncedSetSize = () => {
      clearTimeout(timer);
      timer = setTimeout(setSize, 60);
    };

    window.addEventListener("resize", debouncedSetSize, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", debouncedSetSize);
    };
  }, [setSize]);

  // Smooth physics animation loop
  useEffect(() => {
    const profile = motionEngine.getProfile();
    if (profile.reducedMotion) return;

    let rafId: number;

    const animate = () => {
      // Smooth lerp cursor tracking
      const dx = cursorRef.current.x - mouseRef.current.x;
      const dy = cursorRef.current.y - mouseRef.current.y;
      mouseRef.current.x += dx * 0.12;
      mouseRef.current.y += dy * 0.12;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = Math.max(120, titleRect.width * 0.45);

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.round(interpolateAttr(d, maxDist, 75, 125)) : 100;
          const wght = weight ? Math.round(interpolateAttr(d, maxDist, 300, 800)) : 400;
          const italVal = italic ? interpolateAttr(d, maxDist, 0, 1).toFixed(2) : "0";
          const alphaVal = alpha ? interpolateAttr(d, maxDist, 0.4, 1).toFixed(2) : "1";

          const newFontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      aria-label={text}
    >
      <h1
        ref={titleRef}
        id={`text-pressure-${uniqueId}`}
        className={`${styles.title} ${flex ? styles.flex : ""} ${stroke ? styles.stroke : ""}`}
        style={{
          fontFamily,
          fontSize: `${fontSize.toFixed(1)}px`,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          color: stroke ? "transparent" : textColor || "var(--color-ink)",
          WebkitTextStroke: stroke ? `${strokeWidth}px ${strokeColor}` : undefined,
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className={styles.char}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}

export default TextPressure;
