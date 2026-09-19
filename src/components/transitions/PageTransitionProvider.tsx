"use client";

/**
 * PageTransitionProvider.tsx — Swiss Architectural Editorial Page Transitions
 * 
 * Infallible, Rock-Solid & Buttery-Smooth:
 * 1. ZERO-INVENTION & ZERO-BOX POLICY: 5-column architectural slat curtain with 1px hairline dividers.
 * 2. SEAMLESS CHOREOGRAPHY:
 *    - Exit Phase (0.38s): Slats rise up from bottom with staggered wave (`power3.inOut`) + route destination telemetry.
 *    - Routing Handshake: `router.push()` + scroll reset to top `(0, 0)` on Lenis and window.
 *    - Enter Phase (0.42s): Slats seamlessly retract to top with reverse stagger + new page content reveal.
 * 3. GLOBAL ROUTE INTERCEPTION: Seamlessly enhances all internal Next.js `<Link>` and `<a>` navigations.
 * 4. BROWSER HISTORY SUPPORT: Handles back / forward browser navigation gracefully without getting stuck.
 * 5. 100% ACCESSIBILITY & REDUCED MOTION: Instant routing bypass when `prefers-reduced-motion` is enabled.
 * 6. FAIL-SAFE WATCHDOG: 2.0s hard timeout guarantees the screen is never locked.
 */

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { soundEngine } from "@/lib/sound/soundEngine";
import styles from "./PageTransition.module.css";

const NUM_COLUMNS = 5;
const SAFETY_TIMEOUT_MS = 2000;

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Clean semantic route titles (NO numbered prefixes per RULES.md Rule 10.2)
function getRouteTitle(pathname: string): string {
  if (!pathname || pathname === "/") return "Overview";
  if (pathname.startsWith("/work")) return "Work & Archive";
  if (pathname.startsWith("/about")) return "About & Philosophy";
  if (pathname.startsWith("/contact")) return "Direct Inquiries";
  if (pathname.startsWith("/lab")) return "Lab & Experiments";

  // Dynamic route fallback
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (last) {
    return last
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return "Overview";
}

interface PageTransitionContextValue {
  navigate: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  navigate: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const slatsRef = useRef<(HTMLDivElement | null)[]>([]);
  const telemetryRef = useRef<HTMLDivElement>(null);

  const [destinationTitle, setDestinationTitle] = useState<string>("Overview");
  const [isActive, setIsActive] = useState<boolean>(false);

  const isTransitioningRef = useRef<boolean>(false);
  const pendingHrefRef = useRef<string | null>(null);
  const prevPathnameRef = useRef<string>(pathname);
  const watchdogTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear watchdog
  const clearWatchdog = useCallback(() => {
    if (watchdogTimerRef.current) {
      clearTimeout(watchdogTimerRef.current);
      watchdogTimerRef.current = null;
    }
  }, []);

  // Force unlock fail-safe
  const forceUnlock = useCallback(() => {
    clearWatchdog();
    isTransitioningRef.current = false;
    pendingHrefRef.current = null;
    setIsActive(false);

    if (containerRef.current) {
      gsap.set(containerRef.current, { visibility: "hidden" });
    }
    const validSlats = slatsRef.current.filter(Boolean);
    if (validSlats.length > 0) {
      gsap.set(validSlats, { scaleY: 0 });
    }
    if (telemetryRef.current) {
      gsap.set(telemetryRef.current, { opacity: 0 });
    }
  }, [clearWatchdog]);

  // Enter Phase Animation (slats pull up to reveal incoming page)
  const playEnterAnimation = useCallback(() => {
    clearWatchdog();

    const validSlats = slatsRef.current.filter(Boolean);
    if (validSlats.length === 0 || !containerRef.current) {
      forceUnlock();
      return;
    }

    // Reset scroll to top immediately
    try {
      window.dispatchEvent(new CustomEvent("portfolio:reset-scroll"));
      window.scrollTo(0, 0);
    } catch {
      // scroll fallback
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsActive(false);
        isTransitioningRef.current = false;
        pendingHrefRef.current = null;
        if (containerRef.current) {
          gsap.set(containerRef.current, { visibility: "hidden" });
        }
        // Refresh ScrollTrigger positions after page DOM stabilizes
        setTimeout(() => {
          try {
            ScrollTrigger.refresh();
          } catch {
            // refresh fallback
          }
        }, 80);
      },
    });

    // Telemetry fades out upwards
    if (telemetryRef.current) {
      tl.to(
        telemetryRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.22,
          ease: "power2.in",
        },
        0
      );
    }

    // Slats retract to top
    gsap.set(validSlats, { transformOrigin: "top center" });
    tl.to(
      validSlats,
      {
        scaleY: 0,
        duration: 0.42,
        ease: "power3.inOut",
        stagger: {
          amount: 0.14,
          from: "end",
        },
      },
      "-=0.08"
    );
  }, [clearWatchdog, forceUnlock]);

  // Exit Phase Animation (slats rise up to cover current page)
  const navigate = useCallback(
    (href: string) => {
      // 1. Check if user prefers reduced motion
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        try {
          window.dispatchEvent(new CustomEvent("portfolio:reset-scroll"));
          window.scrollTo(0, 0);
        } catch {
          // ignore
        }
        router.push(href);
        return;
      }

      // 2. Prevent redundant transitions if already transitioning or navigating to same route
      const cleanTarget = (href.split("?")[0] || "").split("#")[0] || "";
      const cleanCurrent = (pathname.split("?")[0] || "").split("#")[0] || "";

      if (cleanTarget === cleanCurrent && !href.includes("#")) {
        // Already on this page -> smooth scroll to top
        try {
          window.dispatchEvent(new CustomEvent("portfolio:reset-scroll"));
          window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
          window.scrollTo(0, 0);
        }
        return;
      }

      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      pendingHrefRef.current = href;

      const title = getRouteTitle(cleanTarget);
      setDestinationTitle(title);
      setIsActive(true);

      // Start safety watchdog
      clearWatchdog();
      watchdogTimerRef.current = setTimeout(() => {
        forceUnlock();
      }, SAFETY_TIMEOUT_MS);

      const validSlats = slatsRef.current.filter(Boolean);
      if (validSlats.length === 0 || !containerRef.current) {
        router.push(href);
        return;
      }

      // Play aerodynamic transition whoosh
      soundEngine.play("whoosh");

      gsap.set(containerRef.current, { visibility: "visible" });
      gsap.set(validSlats, {
        transformOrigin: "bottom center",
        scaleY: 0,
      });

      if (telemetryRef.current) {
        gsap.set(telemetryRef.current, {
          opacity: 0,
          y: 12,
        });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Trigger actual Next.js navigation
          router.push(href);
        },
      });

      // Slats rise from bottom
      tl.to(validSlats, {
        scaleY: 1,
        duration: 0.38,
        ease: "power3.inOut",
        stagger: {
          amount: 0.14,
          from: "start",
        },
      });

      // Telemetry appears at center
      if (telemetryRef.current) {
        tl.to(
          telemetryRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.15"
        );
      }
    },
    [clearWatchdog, forceUnlock, pathname, router]
  );

  // Watch for Next.js route change completion
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;

      if (isTransitioningRef.current) {
        // Route change happened via programmatic transition -> play enter reveal
        playEnterAnimation();
      } else {
        // Route change happened via browser Back/Forward or direct link -> smooth scroll reset
        try {
          window.dispatchEvent(new CustomEvent("portfolio:reset-scroll"));
          window.scrollTo(0, 0);
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 80);
        } catch {
          // ignore
        }
      }
    }
  }, [pathname, playEnterAnimation]);

  // Global Anchor Click Interceptor (delegated to document for 100% link coverage)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore modified clicks (cmd, ctrl, shift, alt) or right/middle clicks
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, downloads, new tabs, mailto, tel, and pure hash jumps
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.getAttribute("rel")?.includes("external")
      ) {
        return;
      }

      // Check if same origin internal link
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) {
          return;
        }

        // It is an internal route navigation!
        e.preventDefault();
        navigate(url.pathname + url.search + url.hash);
      } catch {
        // fallback to standard navigation
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      clearWatchdog();
    };
  }, [clearWatchdog, navigate]);

  return (
    <PageTransitionContext.Provider
      value={{
        navigate,
        isTransitioning: isActive,
      }}
    >
      {children}

      {/* Persistent 5-Column Architectural Slat Curtain */}
      <div
        ref={containerRef}
        className={`${styles.transitionOverlay}${isActive ? ` ${styles.active}` : ""}`}
        aria-hidden="true"
      >
        <div className={styles.columnsCurtain}>
          {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
            <div
              key={`transition-slat-${i}`}
              ref={(el) => {
                slatsRef.current[i] = el;
              }}
              className={styles.maskColumn}
            />
          ))}
        </div>

        {/* Minimal Editorial Telemetry */}
        <div ref={telemetryRef} className={styles.telemetryCenter}>
          <div className={styles.telemetryTag}>
            <span className={styles.telemetryDot} />
            <span className={styles.telemetryLabel}>SUYASH SHARMA // NAVIGATION</span>
          </div>
          <span className={styles.destinationTitle}>{destinationTitle}</span>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
