"use client";

/**
 * About — Homepage Section
 * Open Editorial Canvas layout with Swiss typographic precision.
 * Governed strictly by RULES.md Rule 2 (Zero-Invention), Rule 10.1 (Zero-Box Policy),
 * Rule 10.2 (No Numbered Prefixes), and Master Plan §23.
 * Features React Bits: TrueFocus, Magnet, DecryptedText, ParallaxImage.
 */
import Link from "next/link";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { TrueFocus } from "@/components/ui/TrueFocus";
import { Magnetic } from "@/lib/motion/components/Magnetic";
import { siteConfig } from "@/content/site";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-label="About Suyash Sharma">
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column: Heading & Architectural Portrait Frame */}
          <div className={styles.leftCol}>
            <div className={styles.titleGroup}>
              <div className={styles.labelWrapper}>
                <span className={styles.statusDot} aria-hidden="true" />
                <DecryptedText
                  text="Perspective · Profile"
                  animateOn="view"
                  speed={40}
                  className={styles.sectionTag}
                />
              </div>
              <h2 className={styles.heading}>
                About <span className={styles.headingAccent}>Your&apos;s Truly</span>
              </h2>
            </div>

            <div className={styles.imageFrame}>
              {/* Corner Architectural Markers */}
              <span className={`${styles.cornerMark} ${styles.markTL}`} aria-hidden="true">+</span>
              <span className={`${styles.cornerMark} ${styles.markTR}`} aria-hidden="true">+</span>
              <span className={`${styles.cornerMark} ${styles.markBL}`} aria-hidden="true">+</span>
              <span className={`${styles.cornerMark} ${styles.markBR}`} aria-hidden="true">+</span>

              <div className={styles.imageInner}>
                <ParallaxImage
                  src="/images/suyash-editorial.jpg"
                  alt="Suyash Sharma — Full-Stack Engineer"
                  width={480}
                  height={620}
                  imageClassName={styles.portrait}
                  sizes="(max-width: 900px) 100vw, 440px"
                  speed={0.12}
                  scale={1.12}
                />
              </div>

              {/* Technical Metadata Ledger Bar */}
              <div className={styles.imageCaption}>
                <div className={styles.captionLeft}>
                  <span className={styles.livePulse} aria-hidden="true" />
                  <span className={styles.captionText}>{siteConfig.name} · {siteConfig.location}</span>
                </div>
                <span className={styles.coords}>28.6139° N, 77.2090° E</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Swiss Specification Ledger */}
          <div className={styles.rightCol}>
            <div className={styles.narrativeGroup}>
              <TrueFocus
                sentence="Building where engineering, design, and intelligence meet."
                blurAmount={2.5}
                className={styles.lead}
              />

              <p className={styles.bio}>
                I&apos;m a <strong>Full-Stack Software Engineer</strong> based in Delhi, India,
                architecting and delivering scalable web platforms, high-throughput backend services,
                and production client applications across professional and contract engagements.
                I work across React 19, Next.js 15, Node.js, TypeScript, PostgreSQL, and cloud deployments
                with a focus on high reliability, microsecond performance, and clean interfaces.
              </p>

              <p className={styles.bioSecondary}>
                Beyond web platforms, I engineer local-first systems and offline search engines using
                <strong> Rust</strong>, <strong>C++</strong>, and <strong>ONNX vector embeddings</strong>—prioritizing
                zero-cloud dependency, privacy, and architectural judgment over unnecessary framework bloat.
              </p>
            </div>

            {/* Swiss Editorial Specification Ledger */}
            <div className={styles.specLedger} aria-label="Engineering specifications ledger">
              <div className={styles.specRow}>
                <span className={styles.specKey}>LOCATION</span>
                <span className={styles.specValue}>{siteConfig.location} [IST · UTC +5:30]</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>SPECIALIZATION</span>
                <span className={styles.specValue}>Full-Stack Platforms · AI Systems · Desktop Tools</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>CORE TECHNOLOGIES</span>
                <span className={styles.specValue}>Next.js · React · TypeScript · Node.js · Rust · PostgreSQL</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>DELIVERY TRACK</span>
                <span className={styles.specValue}>25+ Verified Production Client Platforms &amp; Stores</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>AVAILABILITY</span>
                <span className={styles.specValueHighlight}>
                  <span className={styles.statusDotSmall} aria-hidden="true" />
                  {siteConfig.availability.label}
                </span>
              </div>
            </div>

            {/* Editorial Action Links matching FinalCTA button styling */}
            <div className={styles.actions}>
              <Magnetic strength={0.28}>
                <Link
                  href="/about"
                  className={styles.ctaPrimary}
                  id="about-read-more"
                >
                  <span>Read more about my journey</span>
                  <span className={styles.arrowIcon} aria-hidden="true">↗</span>
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${siteConfig.social.email}`}
                  className={styles.ctaSecondary}
                  id="about-contact-link"
                >
                  <span>Direct Contact</span>
                  <span className={styles.arrow} aria-hidden="true">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
