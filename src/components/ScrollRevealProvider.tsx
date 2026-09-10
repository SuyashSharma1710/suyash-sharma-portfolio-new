"use client";

/**
 * ScrollRevealProvider — activates global IntersectionObserver scroll reveal
 * Thin client component — wraps the page to enable CSS .reveal animations
 */
import { useScrollReveal } from "@/lib/useScrollReveal";

export function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollReveal();
  return <>{children}</>;
}
