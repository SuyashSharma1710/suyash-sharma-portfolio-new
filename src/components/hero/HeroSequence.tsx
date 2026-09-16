"use client";

/**
 * HeroSequence.tsx — Unified Hero-to-Architecture Horizontal Scroll Sequence
 * Implements smooth GSAP pinned scroll starting directly from the Hero section.
 * Panel 0: Editorial Hero (Left Typography + Right Portrait, vertically centered)
 * Panel 1: 01.1 System Architecture & Live Telemetry (Checkered blueprint grid)
 * Panel 2..5: 4 Widened Full-Height Columns with Background Image Hover Reveals
 * Built according to gsap-react & gsap-scrolltrigger skills and RULE 10.1 (Zero-Box Policy).
 */
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroHUD } from "@/components/hero/HeroHUD";
import { siteConfig } from "@/content/site";
import styles from "./HeroSequence.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface DisciplineColumn {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
}

const DISCIPLINES: DisciplineColumn[] = [
  {
    id: "fullstack",
    number: "1",
    eyebrow: "FULL-STACK ARCHITECTURE",
    title: "Full-Stack Development",
    description:
      "Scalable web platforms engineered with Next.js 15, React 19, TypeScript, and edge-native zero-cold-start cloud architectures.",
    href: "#work",
    image: "/images/disciplines/fullstack.jpg",
    alt: "Full-Stack Development and Distributed Web Platforms",
  },
  {
    id: "ai",
    number: "2",
    eyebrow: "AI SYSTEMS & LOCAL RAG",
    title: "AI Systems & Local RAG",
    description:
      "High-precision retrieval-augmented generation pipelines, local ONNX neural execution, and intelligent semantic vector workflows.",
    href: "#work",
    image: "/images/disciplines/ai.jpg",
    alt: "AI Systems and Local Vector RAG Architecture",
  },
  {
    id: "perf",
    number: "3",
    eyebrow: "HIGH-THROUGHPUT COMPUTING",
    title: "High-Performance Systems",
    description:
      "Extreme SIMD acceleration, C++ processing pipelines, image compression algorithms, and hardware-accelerated computation engines.",
    href: "#work",
    image: "/images/disciplines/perf.jpg",
    alt: "C++ High-Performance SIMD Processing",
  },
  {
    id: "infra",
    number: "4",
    eyebrow: "CORE INFRASTRUCTURE",
    title: "Core Infrastructure",
    description:
      "Containerized Docker platforms, automated telemetry pipelines, and fault-tolerant cloud microservices maintaining 99.9% uptime.",
    href: "/contact",
    image: "/images/disciplines/infra.jpg",
    alt: "Core Cloud Infrastructure and Telemetry",
  },
];

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Pinned Horizontal Scroll on Desktop (min-width: 900px)
      mm.add("(min-width: 900px)", () => {
        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getDistance(), 1000)}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="hero-sequence"
      className={styles.sequenceSection}
      aria-label="Introduction, System Architecture, and Engineering Disciplines"
    >
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {/* ─────────────────────────────────────────────────────────────
              Panel 0: Editorial Hero (100vw, Vertically Centered)
          ───────────────────────────────────────────────────────────── */}
          <div className={styles.heroPanel}>
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <div className={styles.heroGrid}>
                  {/* Left Column: Typographic Core & Narrative */}
                  <div className={styles.heroLeft}>
                    {/* Eyebrow / Availability Status */}
                    <div className={styles.eyebrow}>
                      <span className={styles.availabilityDot} aria-hidden="true" />
                      <span className={styles.eyebrowLabel}>
                        {siteConfig.availability.label}
                      </span>
                    </div>

                    {/* Headline */}
                    <h1 className={styles.headline}>
                      <span className={styles.headlineWord}>
                        <span className={styles.headlineInner}>Full-Stack</span>
                      </span>
                      <span className={styles.headlineWord}>
                        <span className={styles.headlineInner}>Engineer.</span>
                      </span>
                    </h1>

                    {/* Editorial Bio Statement */}
                    <p className={styles.supporting}>
                      I design and engineer digital products where performance,
                      clarity, and intelligence meet. Specializing in AI-powered
                      systems, local RAG architectures, and responsive web platforms.
                    </p>

                    {/* CTAs */}
                    <div className={styles.ctas}>
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

                  {/* Right Column: Editorial Portrait Image (suyash-bw.jpg) */}
                  <div className={styles.heroRight}>
                    <div className={styles.heroImageFrame}>
                      <Image
                        src="/images/suyash-bw.jpg"
                        alt="Suyash Sharma — Full-Stack Engineer"
                        width={640}
                        height={800}
                        priority
                        className={styles.heroPortrait}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 560px"
                      />
                      <div className={styles.heroImageCaption}>
                        <span className={styles.heroCaptionDot} aria-hidden="true" />
                        <span className={styles.heroCaptionText}>
                          Suyash Sharma · Full-Stack Engineer · Delhi, IN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              Panel 1: System Architecture & Live Telemetry (Checkered Grid)
          ───────────────────────────────────────────────────────────── */}
          <div className={styles.archPanel} id="telemetry-panel">
            <div className={styles.archPanelContent}>
              <HeroHUD />
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              Panel 2: 4 Widened Full-Height Columns (Image 3 & 4)
          ───────────────────────────────────────────────────────────── */}
          <div className={styles.columnsWrapper}>
            {DISCIPLINES.map((discipline) => (
              <Link
                key={discipline.id}
                href={discipline.href}
                className={styles.column}
                id={`discipline-${discipline.id}`}
              >
                {/* On-Hover Background Image Reveal */}
                <div className={styles.colBgWrapper} aria-hidden="true">
                  <Image
                    src={discipline.image}
                    alt={discipline.alt}
                    fill
                    sizes="(max-width: 900px) 85vw, 440px"
                    className={styles.colBgImage}
                  />
                  <div className={styles.colBgOverlay} />
                </div>

                {/* Column Content */}
                <div className={styles.colContent}>
                  {/* Top: Giant Number in Hero Display Serif & Eyebrow */}
                  <div className={styles.colTop}>
                    <span className={styles.colEyebrow}>{discipline.eyebrow}</span>
                    <span className={styles.giantNumber}>{discipline.number}</span>
                  </div>

                  {/* Middle: Title */}
                  <div className={styles.colMiddle}>
                    <h2 className={styles.colTitle}>{discipline.title}</h2>
                  </div>

                  {/* Bottom: Description & Circular Action Arrow */}
                  <div className={styles.colBottom}>
                    <p className={styles.colDescription}>{discipline.description}</p>
                    <div className={styles.circleArrow} aria-hidden="true">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.circleArrowSvg}
                      >
                        <path
                          d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
