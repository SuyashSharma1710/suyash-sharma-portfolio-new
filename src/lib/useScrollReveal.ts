"use client";

/**
 * useScrollReveal — IntersectionObserver based scroll reveal
 * Adds .is-visible to elements with .reveal class when they enter viewport
 * Respects prefers-reduced-motion (CSS handles instant visibility)
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Defer until after React 19 hydration has fully settled
    const timer = setTimeout(() => {
      if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Pure CSS in motion.css handles opacity: 1 !important for reduced motion
      if (prefersReduced) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-visible", "true");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
      );

      const elements = document.querySelectorAll<HTMLElement>(".reveal, .reveal-fade");
      elements.forEach((el) => {
        if (!el.getAttribute("data-visible")) {
          observer?.observe(el);
        }
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);
}
