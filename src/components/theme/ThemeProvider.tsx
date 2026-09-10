"use client";

/**
 * ThemeProvider
 * Reads prefers-color-scheme, reads localStorage override,
 * sets data-theme on <html>, provides toggle.
 *
 * Rule: Do not store high-frequency values in React state.
 * The theme is set directly on the DOM — no context provider needed
 * for simple toggle usage.
 */

import { useEffect } from "react";

const STORAGE_KEY = "theme-preference";

/** Inline script to run before React hydrates — prevents flash of wrong theme */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || system;
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync on mount in case the inline script didn't run (SSR edge cases)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", system);

    // Listen for system preference changes (when no override)
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        document.documentElement.setAttribute(
          "data-theme",
          e.matches ? "dark" : "light"
        );
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <>{children}</>;
}

/** Toggle between light and dark, persisting preference */
export function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") ?? "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch (_) {}
}

/** Get current theme */
export function getTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return (
    (document.documentElement.getAttribute("data-theme") as
      | "light"
      | "dark") ?? "dark"
  );
}
