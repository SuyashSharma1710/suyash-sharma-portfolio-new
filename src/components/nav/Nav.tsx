"use client";

/**
 * Nav — Dynamic Square-ish Floating Dock & Editorial Navigation
 * - Top state: Full-width, transparent, open editorial canvas.
 * - Scrolled state (>40px): Morphs into a square-ish floating dock with frosted gradual blur.
 * - Direction-aware: Smoothly slides up on scroll down, drops down on scroll up.
 * - Sliding focus indicator: Fluid spring tracking across links on hover and active route.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme/ThemeToggle";
import { LogoPrimary } from "../logo/LogoPrimary";
import { siteConfig } from "@/content/site";
import styles from "./Nav.module.css";

interface IndicatorStyle {
  left: number;
  width: number;
  opacity: number;
}

export function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname                  = usePathname();

  const lastScrollY               = useRef(0);
  const menuRef                   = useRef<HTMLDivElement>(null);
  const triggerRef                = useRef<HTMLButtonElement>(null);
  const firstLinkRef              = useRef<HTMLAnchorElement>(null);
  const navListRef                = useRef<HTMLUListElement>(null);

  // Sliding indicator state
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  /* Scroll & Direction detection */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check top boundary
          if (currentScrollY <= 40) {
            setScrolled(false);
            setHidden(false);
          } else {
            setScrolled(true);

            // Determine scroll direction
            const delta = currentScrollY - lastScrollY.current;
            if (delta > 8 && currentScrollY > 120) {
              // Scrolling down -> hide dock to give full focus to content
              setHidden(true);
            } else if (delta < -5) {
              // Scrolling up -> reveal dock immediately
              setHidden(false);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Update sliding indicator position */
  const updateIndicator = useCallback((targetHref: string | null) => {
    if (!navListRef.current) return;

    const activeOrHovered = targetHref || pathname;
    const items = Array.from(navListRef.current.querySelectorAll<HTMLAnchorElement>("a[data-href]"));

    const matchingElement = items.find((item) => {
      const href = item.getAttribute("data-href");
      return href === activeOrHovered || (href !== "/" && activeOrHovered?.startsWith(`${href}/`));
    });

    if (matchingElement) {
      const listRect = navListRef.current.getBoundingClientRect();
      const elRect = matchingElement.getBoundingClientRect();

      setIndicatorStyle({
        left: elRect.left - listRect.left,
        width: elRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname]);

  // Sync indicator on route change or hover change
  useEffect(() => {
    updateIndicator(hoveredHref);
  }, [pathname, hoveredHref, updateIndicator]);

  /* Body scroll lock when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => firstLinkRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Escape key to close */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && menuOpen) {
      setMenuOpen(false);
      triggerRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* Focus trap inside mobile menu */
  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (!menuOpen) return;
    const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0] as HTMLElement | undefined;
    const last  = focusable[focusable.length - 1] as HTMLElement | undefined;
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <div
        className={`${styles.navWrapper}${hidden && !menuOpen ? ` ${styles.hidden}` : ""}${scrolled ? ` ${styles.docked}` : ""}`}
      >
        <header
          className={`${styles.nav}${scrolled ? ` ${styles.docked}` : ""}`}
          role="banner"
        >
          <div className={`container ${styles.navInner}`}>
            {/* Wordmark Lockup */}
            <Link
              href="/"
              className={styles.wordmark}
              aria-label="Suyash Sharma — home"
              onMouseEnter={() => setHoveredHref("/")}
              onMouseLeave={() => setHoveredHref(null)}
            >
              <LogoPrimary size={18} aria-hidden="true" />
              <span>SUYASH<sup className={styles.wordmarkSup}>®</sup></span>
            </Link>

            {/* Desktop navigation with dynamic sliding indicator */}
            <nav
              className={styles.desktopNav}
              aria-label="Primary navigation"
            >
              <ul
                ref={navListRef}
                className={styles.navLinks}
                role="list"
                onMouseLeave={() => setHoveredHref(null)}
              >
                {/* Dynamic Sliding Square-ish Indicator */}
                <li
                  className={styles.slidingIndicator}
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                    opacity: indicatorStyle.opacity,
                  }}
                  aria-hidden="true"
                />

                {siteConfig.navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                  return (
                    <li key={item.href} className={styles.navItem}>
                      <Link
                        href={item.href}
                        data-href={item.href}
                        className={`${styles.navLink}${isActive ? ` ${styles.active}` : ""}`}
                        aria-current={isActive ? "page" : undefined}
                        onMouseEnter={() => setHoveredHref(item.href)}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className={styles.activeDot} aria-hidden="true" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions: theme toggle + mobile trigger */}
            <div className={styles.navActions}>
              <ThemeToggle />
              <button
                ref={triggerRef}
                id="mobile-menu-trigger"
                className={styles.menuTrigger}
                onClick={() => setMenuOpen((o) => !o)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <span className={styles.menuLine} />
                <span className={styles.menuLine} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`${styles.mobileMenu}${menuOpen ? ` ${styles.open}` : ""}`}
        onKeyDown={handleMenuKeyDown}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavLinks} role="list">
            {siteConfig.navigation.map((item, idx) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.mobileNavLink}${isActive ? ` ${styles.active}` : ""}`}
                    onClick={closeMenu}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.mobileFooter}>
          <span className={styles.mobileEmail}>
            {siteConfig.social.email}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
