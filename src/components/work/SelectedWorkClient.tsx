"use client";

/**
 * SelectedWorkClient — Open Editorial Stacking Broadside Sheets
 * Strictly adheres to RULES.md Rule 10.1 (Zero-Box Policy) & Rule 10.2 (No Numbered Prefixes)
 * Open canvas broadside sheets that pin, stack, and scale smoothly on scroll without card boxes.
 */

import { useRef } from "react";
import Link from "next/link";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
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
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 960px) and (prefers-reduced-motion: no-preference)",
          isMobileOrReduced: "(max-width: 959px), (prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop } = (context.conditions || {}) as { isDesktop?: boolean };

          if (isDesktop) {
            const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
            if (panels.length === 0) return;

            panels.forEach((panel, index) => {
              if (index < panels.length - 1) {
                const nextPanel = panels[index + 1]!;
                gsap.to(panel, {
                  scale: 0.96 - index * 0.015,
                  opacity: 0.35,
                  filter: "blur(1px)",
                  transformOrigin: "top center",
                  ease: "none",
                  scrollTrigger: {
                    trigger: nextPanel,
                    start: "top 75%",
                    end: "top 20%",
                    scrub: true,
                  },
                });
              }
            });
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
      aria-label="Selected Work & Systems"
    >
      <div className="container">
        {/* Section Top Header */}
        <div className={styles.topHeader}>
          <div className={styles.headerInner}>
            <div className={styles.headerLeft}>
              <h2 className={styles.label}>Selected Work &amp; Systems</h2>
            </div>
            <div className={styles.headerRight}>
              <Link href="/work" className={styles.viewAll} id="view-all-work">
                <span>Complete Archive</span>
                <span className={styles.viewAllArrow} aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stacking Open Broadside Panels */}
        <div className={styles.stackContainer}>
          {projects.map((project, index) => {
            const dest = project.liveUrl ?? project.githubUrl ?? "#";
            const isExternal = dest.startsWith("http");
            const coverImg = project.coverImage || `/images/previews/${project.slug}.png`;
            const stackOffset = index * 16;

            return (
              <article
                key={project.slug}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                className={styles.stackPanel}
                style={{
                  top: `calc(var(--nav-height) + 1rem + ${stackOffset}px)`,
                  zIndex: index + 1,
                }}
                aria-label={`Featured Project: ${project.title}`}
              >
                {/* Open Broadside Content Grid */}
                <div className={styles.rowGrid}>
                  {/* Left Column: Narrative & Metadata */}
                  <div className={styles.infoCol}>
                    {/* Open Meta Bar */}
                    <div className={styles.metaBar}>
                      <span className={styles.metaCategory}>{project.category}</span>
                      <span className={styles.metaDivider}>/</span>
                      <span className={styles.metaYear}>{project.year}</span>
                      {project.role && (
                        <>
                          <span className={styles.metaDivider}>/</span>
                          <span className={styles.metaRole}>{project.role}</span>
                        </>
                      )}
                    </div>

                    <div className={styles.titleGroup}>
                      <h3 className={styles.projectTitle}>
                        <Link
                          href={dest}
                          className={styles.titleLink}
                          id={`project-title-${project.slug}`}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          <span>{project.title}</span>
                          <span className={styles.titleArrow} aria-hidden="true">↗</span>
                        </Link>
                      </h3>
                      <p className={styles.projectSummary}>{project.summary}</p>
                    </div>

                    {/* Engineering Specification Ledger */}
                    <div className={styles.techWrapper}>
                      <span className={styles.specLabel}>ENGINEERING STACK</span>
                      <div className={styles.techSpecs}>
                        {project.technologies.slice(0, 6).join("  ·  ")}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className={styles.actions}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionLinkPrimary}
                          aria-label={`Launch live app for ${project.title}`}
                        >
                          <span>Live Application</span>
                          <span className={styles.actionArrow} aria-hidden="true">↗</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionLink}
                          aria-label={`View source code for ${project.title}`}
                        >
                          <span>Source Code</span>
                          <span className={styles.actionArrow} aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Real Photographic Preview */}
                  <div className={styles.mediaCol}>
                    <Link
                      href={dest}
                      className={styles.mediaLink}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <div className={styles.mediaFrame}>
                        <ParallaxImage
                          src={coverImg}
                          alt={`${project.title} interface architecture`}
                          width={760}
                          height={475}
                          imageClassName={styles.previewImage}
                          sizes="(max-width: 959px) 100vw, 680px"
                          priority={index === 0}
                          speed={0.12}
                          scale={1.12}
                        />
                        <div className={styles.mediaBadge}>
                          <span className={styles.badgeDot} aria-hidden="true" />
                          <span>ACTIVE PRODUCTION · {project.year}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
