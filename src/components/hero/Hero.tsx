/**
 * Hero — Server & Client Hybrid Component
 * Editorial dual-column layout inspired by madeinuxstudio.com & khanhnguyen.design.
 * Left: Typographic gravitas & narrative statement.
 * Right: Interactive Technical Architecture HUD (HeroHUD).
 * Bottom: 4-Column Architectural Metadata Ledger with live Delhi clock.
 */
import Image from "next/image";
import Link from "next/link";
import { HeroClient } from "./HeroClient";
import { siteConfig } from "@/content/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <HeroClient>
        <div className="container">
          {/* Main Dual-Column Body */}
          <div className={styles.mainGrid}>
            {/* Left Column: Typographic & Narrative Core */}
            <div className={styles.leftCol}>
              {/* Eyebrow / Availability Status */}
              <div className={styles.eyebrow} data-hero-reveal>
                <span className={styles.availabilityDot} aria-hidden="true" />
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

              {/* Supporting Editorial Statement */}
              <p className={styles.supporting} data-hero-reveal>
                I design and engineer digital products where performance,
                clarity, and intelligence meet. Specializing in AI-powered
                systems, local RAG architectures, and responsive web platforms.
              </p>

              {/* Primary & Secondary Action CTAs */}
              <div className={styles.ctas} data-hero-reveal>
                <a href="#work" className={styles.ctaPrimary} id="hero-view-work">
                  Explore Work
                  <span className={styles.ctaArrow} aria-hidden="true">↓</span>
                </a>
                <Link
                  href="/contact"
                  className={styles.ctaSecondary}
                  id="hero-start-conversation"
                >
                  Start a conversation
                  <span className={styles.ctaArrow} aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Editorial Portrait Image (per user directive) */}
            <div className={styles.rightCol} data-hero-reveal>
              <div className={styles.heroImageFrame}>
                <Image
                  src="/images/suyash-editorial.jpg"
                  alt="Suyash Sharma — Full-Stack Engineer"
                  width={560}
                  height={700}
                  priority
                  className={styles.heroPortrait}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                />
                <div className={styles.heroImageCaption}>
                  <span className={styles.heroCaptionDot} aria-hidden="true" />
                  <span className={styles.heroCaptionText}>Suyash Sharma · Full-Stack Engineer · Delhi, IN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroClient>
    </section>
  );
}
