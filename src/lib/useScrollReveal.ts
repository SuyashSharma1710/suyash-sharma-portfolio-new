"use client";

/**
 * useScrollReveal — IntersectionObserver based scroll reveal
 * Adds .is-visible to elements with .reveal class when they enter viewport
 * Respects prefers-reduced-motion (skips animation, shows content immediately)
 */
import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Show all immediately
      document
        .querySelectorAll<HTMLElement>(".reveal, .reveal-fade")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document
      .querySelectorAll<HTMLElement>(".reveal, .reveal-fade")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
