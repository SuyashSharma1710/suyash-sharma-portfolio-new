"use client";

/**
 * useScrollReveal — IntersectionObserver based scroll reveal
 * Adds .is-visible to elements with .reveal class when they enter viewport
 * Respects prefers-reduced-motion (skips animation, shows content immediately)
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Defer slightly to ensure React hydration has fully completed across all trees
    const timer = setTimeout(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        document
          .querySelectorAll<HTMLElement>(".reveal, .reveal-fade")
          .forEach((el) => el.setAttribute("data-visible", "true"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute("data-visible", "true");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      document
        .querySelectorAll<HTMLElement>(".reveal, .reveal-fade")
        .forEach((el) => {
          if (el.getAttribute("data-visible") !== "true") {
            observer?.observe(el);
          }
        });
    }, 20);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);
}
