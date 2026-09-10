"use client";

/**
 * Nav — Navigation
 * Desktop: transparent → scrolled (backdrop), links, theme toggle
 * Mobile:  full-screen editorial overlay menu
 *
 * Accessibility: focus trap, Escape key, body scroll lock, semantic nav
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { siteConfig } from "@/content/site";
import styles from "./Nav.module.css";

export function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const menuRef                   = useRef<HTMLDivElement>(null);
  const triggerRef                = useRef<HTMLButtonElement>(null);
  const firstLinkRef              = useRef<HTMLAnchorElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Focus first link
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
      if (e.shiftKey && first && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && last && document.activeElement === last) {
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
      <header
        className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ""}`}
        role="banner"
      >
        <div className={`container ${styles.navInner}`}>
          {/* Wordmark */}
          <Link href="/" className={styles.wordmark} aria-label="Suyash Sharma — home">
            SUYASH<sup className={styles.wordmarkSup}>®</sup>
          </Link>

          {/* Desktop navigation */}
          <nav
            className={styles.desktopNav}
            aria-label="Primary navigation"
          >
            <ul className={styles.navLinks} role="list">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
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
            {siteConfig.navigation.map((item, idx) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  ref={idx === 0 ? firstLinkRef : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
