"use client";

/**
 * SmoothScrollProvider — Lenis Smooth Scrolling Engine
 * 
 * Delivers refined, momentum-damped mouse wheel scrolling:
 * - Frame-locked synchronization with GSAP ScrollTrigger
 * - 100% native touch scrolling on mobile / touchscreens (zero input lag)
 * - Automatic bypass for users with prefers-reduced-motion
 * - Native keyboard navigation compatibility (Space, PgUp, PgDn, Arrows)
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect OS prefers-reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      syncTouch: false, // Preserves 100% native touch physics on mobile/touch screens
      autoRaf: false,   // Frame-locked to GSAP ticker
    });

    lenisRef.current = lenis;

    // Synchronize scroll events with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis RAF from GSAP ticker for 60/120fps sync
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
