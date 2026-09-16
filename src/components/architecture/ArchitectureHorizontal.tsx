"use client";

/**
 * ArchitectureHorizontal — Horizontal Pinned Scroll Sequence
 * Implements modern editorial horizontal scroll inspired by madeinuxstudio.com & grigoletti.ch
 * Panel 1: System Architecture & Live Telemetry (Image 2)
 * Panel 2: 4 Full-Height Columns with On-Hover Background Image Reveals (Image 3 & 4)
 * Built with GSAP ScrollTrigger and @gsap/react per gsap-react & gsap-scrolltrigger skills.
 */
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroHUD } from "@/components/hero/HeroHUD";
import styles from "./ArchitectureHorizontal.module.css";

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

export function ArchitectureHorizontal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(getDistance(), 600)}`,
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
      id="architecture-sequence"
      className={styles.section}
      aria-label="System Architecture and Disciplines"
    >
      {/* Top Editorial Label */}
      <div className="container">
        <div className={styles.topBar}>
          <span className={styles.topBarLabel}>ARCHITECTURE &amp; DISCIPLINES</span>
          <span className={styles.topBarHint}>SCROLL HORIZONTALLY →</span>
        </div>
      </div>

      {/* Horizontal Viewport pinned by GSAP */}
      <div className={styles.viewport}>
        <div ref={trackRef} className={styles.track}>
          {/* Panel 1: System Architecture & Live Telemetry (Image 2) */}
          <div className={styles.archPanel}>
            <div className={styles.archPanelContent}>
              <HeroHUD />
            </div>
          </div>

          {/* Panel 2: 4 Full-Height Columns with Background Image Hover (Image 3 & 4) */}
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
                    sizes="(max-width: 900px) 85vw, 360px"
                    className={styles.colBgImage}
                  />
                  <div className={styles.colBgOverlay} />
                </div>

                {/* Column Content */}
                <div className={styles.colContent}>
                  {/* Top: Giant Number & Eyebrow */}
                  <div className={styles.colTop}>
                    <span className={styles.colEyebrow}>{discipline.eyebrow}</span>
                    <span className={styles.giantNumber}>{discipline.number}</span>
                  </div>

                  {/* Middle: Title */}
                  <div className={styles.colMiddle}>
                    <h3 className={styles.colTitle}>{discipline.title}</h3>
                  </div>

                  {/* Bottom: Description & Circle Action Arrow */}
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
