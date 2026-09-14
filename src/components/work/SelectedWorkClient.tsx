"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/content/types";
import styles from "./SelectedWork.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SelectedWorkClientProps {
  projects: Project[];
}

export function SelectedWorkClient({ projects }: SelectedWorkClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isMobileOrReduced: "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop } = (context.conditions || {}) as { isDesktop?: boolean };

          if (isDesktop) {
            const track = trackRef.current;
            const pinContainer = pinContainerRef.current;
            if (!track || !pinContainer) return;

            // Compute exact horizontal travel distance
            const getScrollDistance = () => {
              const trackWidth = track.scrollWidth;
              const viewportWidth = window.innerWidth;
              // Add right padding buffer to comfortably show the last card
              return Math.max(0, trackWidth - viewportWidth + 96);
            };

            const tween = gsap.to(track, {
              x: () => -getScrollDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: pinContainer,
                pin: true,
                pinSpacing: true,
                start: "top top",
                end: () => `+=${getScrollDistance()}`,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                  if (progressBarRef.current) {
                    progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                  }
                  const index = Math.min(
                    projects.length,
                    Math.max(1, Math.floor(self.progress * projects.length * 0.999) + 1)
                  );
                  setActiveIndex(index);
                },
              },
            });

            return () => {
              tween.kill();
            };
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [projects] }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className={styles.section}
      aria-label="Selected work"
    >
      <div ref={pinContainerRef} className={styles.pinContainer}>
        {/* Section Top Header */}
        <div className={styles.topHeader}>
          <div className="container">
            <div className={styles.headerInner}>
              <div className={styles.headerLeft}>
                <span className={styles.label}>Proof · Selected Work</span>
                <span className={styles.counter} aria-live="polite">
                  [ {String(activeIndex).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ]
                </span>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.scrollHint} aria-hidden="true">
                  Scroll to explore <span className={styles.arrowIcon}>→</span>
                </span>
                <Link href="/work" className={styles.viewAll} id="view-all-work">
                  View all work
                  <span className={styles.viewAllArrow} aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Project Track */}
        <div className={styles.trackWrapper}>
          <ol ref={trackRef} className={styles.projectTrack} aria-label="Featured projects">
            {projects.map((project, index) => {
              const dest = project.liveUrl ?? project.githubUrl ?? `/work/${project.slug}`;
              const isExternal = !dest.startsWith("/");

              return (
                <li
                  key={project.slug}
                  className={styles.cardItem}
                  aria-label={`Project ${index + 1}: ${project.title}`}
                >
                  <article className={styles.card}>
                    {/* Card Top Meta */}
                    <div className={styles.cardHeader}>
                      <span className={styles.projectNumber} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className={styles.badges}>
                        <span className={styles.projectCategory}>{project.category}</span>
                        <span className={styles.projectYear}>{project.year}</span>
                        {project.role && (
                          <span className={styles.projectRole}>{project.role}</span>
                        )}
                      </div>
                    </div>

                    {/* Card Title & Summary */}
                    <div className={styles.cardBody}>
                      <h3 className={styles.projectTitle}>
                        <Link
                          href={dest}
                          className={styles.titleLink}
                          id={`project-title-${project.slug}`}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          {project.title}
                          <span className={styles.titleArrow} aria-hidden="true">↗</span>
                        </Link>
                      </h3>
                      <p className={styles.projectSummary}>{project.summary}</p>
                    </div>

                    {/* Technical Mockup / Visual Graphic */}
                    <div className={styles.schematicBox} aria-hidden="true">
                      {project.slug === "glint" && <GlintSchematic />}
                      {project.slug === "pixelspace" && <PixelSpaceSchematic />}
                      {project.slug === "pitchery" && <PitcherySchematic />}
                      {!["glint", "pixelspace", "pitchery"].includes(project.slug) && (
                        <DefaultSchematic title={project.title} />
                      )}
                    </div>

                    {/* Card Footer: Technologies & Action */}
                    <div className={styles.cardFooter}>
                      {project.technologies.length > 0 && (
                        <ul className={styles.techTags} aria-label="Technologies used">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <li key={tech} className={styles.tag}>
                              {tech}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className={styles.actions}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionBtn}
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            GitHub
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionBtnPrimary}
                            aria-label={`View live site for ${project.title}`}
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Bottom Pinned Progress Line */}
        <div className={styles.bottomBar} aria-hidden="true">
          <div className="container">
            <div className={styles.progressTrack}>
              <div ref={progressBarRef} className={styles.progressBar} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Technical Schematics (Crisp, High-Performance Editorial SVGs)
───────────────────────────────────────────────────────────── */

function GlintSchematic() {
  return (
    <svg
      className={styles.schematicSvg}
      viewBox="0 0 540 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="540" height="220" rx="6" fill="var(--color-surface-dark)" fillOpacity="0.4" />
      {/* Search Header Bar */}
      <rect x="24" y="24" width="492" height="34" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <circle cx="44" cy="41" r="5" stroke="var(--color-muted)" strokeWidth="1.5" />
      <line x1="48" y1="45" x2="54" y2="51" stroke="var(--color-muted)" strokeWidth="1.5" />
      <text x="64" y="46" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)">
        glint::hybrid_search(&quot;vector embeddings&quot;)
      </text>
      <rect x="440" y="32" width="64" height="18" rx="2" fill="var(--color-hover-bg)" stroke="var(--color-line)" />
      <text x="448" y="44" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">
        64.2ms
      </text>

      {/* Dual Pipeline Diagram */}
      <rect x="24" y="74" width="236" height="60" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <text x="36" y="92" fill="var(--color-muted)" fontSize="8.5" letterSpacing="0.08em" fontFamily="var(--font-mono)">
        [01] BM25 LEXICAL ENGINE
      </text>
      <text x="36" y="109" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)">
        Inverted Index · k1=1.2
      </text>
      <text x="36" y="123" fill="var(--color-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
        Token Weight · Latency: 4.2ms
      </text>

      <rect x="280" y="74" width="236" height="60" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <text x="292" y="92" fill="var(--color-muted)" fontSize="8.5" letterSpacing="0.08em" fontFamily="var(--font-mono)">
        [02] ONNX VECTOR PIPELINE
      </text>
      <text x="292" y="109" fill="var(--color-ink)" fontSize="10" fontFamily="var(--font-mono)">
        384-dim Embeddings · Cosine
      </text>
      <text x="292" y="123" fill="var(--color-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
        all-MiniLM-L6-v2 · 18.4ms
      </text>

      {/* Fusion Result Bar */}
      <rect x="24" y="148" width="492" height="48" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <text x="36" y="166" fill="var(--color-muted)" fontSize="8.5" letterSpacing="0.08em" fontFamily="var(--font-mono)">
        RECIPROCAL RANK FUSION (RRF) · SYNERGY RANK
      </text>
      <text x="36" y="182" fill="var(--color-ink)" fontSize="9.5" fontFamily="var(--font-mono)">
        Top Candidate: src/search/fusion.rs → Match 0.984 · Offline Verified
      </text>
    </svg>
  );
}

function PixelSpaceSchematic() {
  return (
    <svg
      className={styles.schematicSvg}
      viewBox="0 0 540 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="540" height="220" rx="6" fill="var(--color-surface-dark)" fillOpacity="0.4" />
      {/* Top Status */}
      <text x="24" y="36" fill="var(--color-muted)" fontSize="9" letterSpacing="0.08em" fontFamily="var(--font-mono)">
        C++ SIMD COMPRESSION MATRIX · BATCH ENGINE
      </text>
      <rect x="400" y="22" width="116" height="20" rx="2" fill="var(--color-hover-bg)" stroke="var(--color-line)" />
      <text x="412" y="36" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">
        -94.2% REDUCTION
      </text>

      {/* In vs Out Metrics */}
      <rect x="24" y="56" width="236" height="88" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <text x="36" y="78" fill="var(--color-muted)" fontSize="8.5" letterSpacing="0.08em" fontFamily="var(--font-mono)">
        RAW UNCOMPRESSED INPUT
      </text>
      <text x="36" y="106" fill="var(--color-ink)" fontSize="20" fontFamily="var(--font-display)">
        28.4 MB
      </text>
      <text x="36" y="128" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">
        Format: PNG / TIFF · 4096px
      </text>

      <rect x="280" y="56" width="236" height="88" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <text x="292" y="78" fill="var(--color-muted)" fontSize="8.5" letterSpacing="0.08em" fontFamily="var(--font-mono)">
        OPTIMIZED OUTPUT (AVIF / WEBP)
      </text>
      <text x="292" y="106" fill="var(--color-ink)" fontSize="20" fontFamily="var(--font-display)">
        1.64 MB
      </text>
      <text x="292" y="128" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">
        Lossless · Zero Artifacts
      </text>

      {/* Progress Bars */}
      <rect x="24" y="160" width="492" height="36" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <rect x="36" y="174" width="468" height="8" rx="2" fill="var(--color-line)" />
      <rect x="36" y="174" width="384" height="8" rx="2" fill="var(--color-ink)" />
    </svg>
  );
}

function PitcherySchematic() {
  return (
    <svg
      className={styles.schematicSvg}
      viewBox="0 0 540 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="540" height="220" rx="6" fill="var(--color-surface-dark)" fillOpacity="0.4" />
      {/* Top Header */}
      <text x="24" y="36" fill="var(--color-muted)" fontSize="10" letterSpacing="0.1em" fontFamily="var(--font-mono)">
        FOUNDER &amp; INVESTOR DISCOVERY SYSTEM · NEON POSTGRES
      </text>
      <circle cx="510" cy="32" r="4" fill="var(--color-ink)" />

      {/* Mock Cards Grid */}
      <rect x="24" y="56" width="154" height="140" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <rect x="36" y="70" width="48" height="8" rx="2" fill="var(--color-line)" />
      <rect x="36" y="86" width="110" height="16" rx="2" fill="var(--color-surface-dark)" fillOpacity="0.5" />
      <text x="36" y="124" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">AI Pitch Deck</text>
      <rect x="36" y="162" width="130" height="20" rx="2" fill="var(--color-hover-bg)" stroke="var(--color-line)" />
      <text x="46" y="176" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">Connect ↗</text>

      <rect x="193" y="56" width="154" height="140" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <rect x="205" y="70" width="48" height="8" rx="2" fill="var(--color-line)" />
      <rect x="205" y="86" width="110" height="16" rx="2" fill="var(--color-surface-dark)" fillOpacity="0.5" />
      <text x="205" y="124" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">SaaS Analytics</text>
      <rect x="205" y="162" width="130" height="20" rx="2" fill="var(--color-hover-bg)" stroke="var(--color-line)" />
      <text x="215" y="176" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">Connect ↗</text>

      <rect x="362" y="56" width="154" height="140" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <rect x="374" y="70" width="48" height="8" rx="2" fill="var(--color-line)" />
      <rect x="374" y="86" width="110" height="16" rx="2" fill="var(--color-surface-dark)" fillOpacity="0.5" />
      <text x="374" y="124" fill="var(--color-muted)" fontSize="9" fontFamily="var(--font-mono)">Fintech API</text>
      <rect x="374" y="162" width="130" height="20" rx="2" fill="var(--color-hover-bg)" stroke="var(--color-line)" />
      <text x="384" y="176" fill="var(--color-ink)" fontSize="9" fontFamily="var(--font-mono)">Connect ↗</text>
    </svg>
  );
}

function DefaultSchematic({ title }: { title: string }) {
  return (
    <svg
      className={styles.schematicSvg}
      viewBox="0 0 540 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="540" height="220" rx="6" fill="var(--color-surface-dark)" fillOpacity="0.4" />
      <rect x="24" y="24" width="492" height="172" rx="4" fill="var(--color-paper)" stroke="var(--color-line)" />
      <text x="44" y="60" fill="var(--color-muted)" fontSize="10" letterSpacing="0.1em" fontFamily="var(--font-mono)">
        TECHNICAL ARCHITECTURE
      </text>
      <text x="44" y="110" fill="var(--color-ink)" fontSize="20" fontFamily="var(--font-display)">
        {title}
      </text>
    </svg>
  );
}
