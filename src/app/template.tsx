"use client";

/**
 * template.tsx — Next.js App Router Per-Page Entrance Wrapper
 * Re-instantiated on every route change. Provides a subtle, clean
 * editorial entrance lift that clears inline transforms on completion.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || !containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      {children}
    </div>
  );
}
