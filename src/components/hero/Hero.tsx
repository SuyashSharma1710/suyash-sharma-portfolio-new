/**
 * Hero — Server Component
 * Copy and structure are server-rendered.
 * GSAP entrance is delegated to HeroClient (client component).
 */
import Link from "next/link";
import { HeroClient } from "./HeroClient";
import { HeroSVG } from "./HeroSVG";
import { siteConfig } from "@/content/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section
      id="hero"
      className={styles.hero}
      aria-label="Introduction"
    >
      {/* Abstract system visualization (decorative) */}
      <div className={styles.visualization} aria-hidden="true">
        <div className={styles.svg}>
          <HeroSVG />
        </div>
      </div>

      {/* Hero content — GSAP entrance */}
      <HeroClient>
        <div className="container">
          {/* Eyebrow */}
          <div className={styles.eyebrow} data-hero-reveal>
            <span
              className={styles.availabilityDot}
              aria-hidden="true"
            />
            <span className={styles.eyebrowLabel}>
              {siteConfig.availability.label}
            </span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineWord}>
              <span className={styles.headlineInner} data-hero-reveal>
                Full-Stack
              </span>
            </span>
            <span className={styles.headlineWord}>
              <span className={styles.headlineInner} data-hero-reveal>
                Engineer.
              </span>
            </span>
          </h1>

          {/* Supporting statement */}
          <p className={styles.supporting} data-hero-reveal>
            I design and engineer digital products where performance,
            clarity, and intelligence meet.
          </p>

          {/* CTAs */}
          <div className={styles.ctas} data-hero-reveal>
            <Link href="/work" className={styles.ctaPrimary} id="hero-view-work">
              View Work
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className={styles.ctaSecondary}
              id="hero-start-conversation"
            >
              Start a conversation
              <span className={styles.ctaArrow} aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Availability */}
          <div className={styles.availability} data-hero-reveal aria-label={siteConfig.availability.label}>
            <span
              className={styles.availabilityDot}
              aria-hidden="true"
            />
            <span>
              DELHI, INDIA · 2026
            </span>
          </div>
        </div>
      </HeroClient>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
