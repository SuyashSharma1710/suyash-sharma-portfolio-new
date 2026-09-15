"use client";

/**
 * FinalCTA — Section 09
 * "LET'S BUILD SOMETHING INTERESTING."
 * Enhanced with React Bits Typographic Physics, Variable Proximity, Shiny Text, Dither Wave & Magnetic Buttons
 */

import { useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { ShinyText } from "@/components/ui/ShinyText";
import { Dither } from "@/components/ui/Dither";
import { Magnetic } from "@/lib/motion/components/Magnetic";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="contact-cta" className={styles.section} aria-label="Get in touch">
      {/* React Bits Dithered Waves WebGL Background */}
      <Dither
        waveSpeed={0.05}
        waveFrequency={3}
        waveAmplitude={0.3}
        colorNum={4}
        pixelSize={2}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        opacity={0.85}
      />

      <div className={`container ${styles.containerRel}`}>
        <div className={`${styles.inner} reveal`}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.eyebrowText}>INITIATE COLLABORATION</span>
          </div>

          <h2 className={styles.heading}>
            <span className={styles.headingLine}>Let&apos;s build</span>
            <span className={styles.headingLine}>something</span>
            <span className={styles.headingLineMuted}>
              <ShinyText speed={4}>interesting.</ShinyText>
            </span>
          </h2>

          <p className={styles.sub}>
            Have a product, system, or ambitious idea in mind? Let&apos;s talk.
          </p>

          <div className={styles.actions}>
            <Magnetic strength={0.28}>
              <Link
                href="/contact"
                className={styles.ctaPrimary}
                id="cta-start-conversation"
              >
                <span>Start a conversation</span>
                <span className={styles.arrowIcon} aria-hidden="true">↗</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className={styles.ctaSecondary}
                id="cta-email"
              >
                <span>Email me</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
