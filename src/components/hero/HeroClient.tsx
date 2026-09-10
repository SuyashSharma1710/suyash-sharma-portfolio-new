"use client";

/**
 * HeroClient — GSAP entrance animation for the hero
 * Runs after hydration; content is visible without JS (static final state)
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Hero.module.css";

interface HeroClientProps {
  children: React.ReactNode;
}

export function HeroClient({ children }: HeroClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger all .heroReveal elements into view
      tl.fromTo(
        "[data-hero-reveal]",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          clearProps: "all",
        },
        0
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={styles.content}>
      {children}
    </div>
  );
}
