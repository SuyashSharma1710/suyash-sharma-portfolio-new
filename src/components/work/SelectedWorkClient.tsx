"use client";

/**
 * SelectedWorkClient — Vertical Layered Scroll Stack
 * Strictly adheres to RULES.md Rule 10.1 (Zero-Box Policy) & Rule 10.2 (No Numbered Prefixes)
 * Layered broadside panels that pin, scale, and stack sequentially as the user scrolls.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(1);

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
            const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
            if (cards.length === 0) return;

            cards.forEach((card, index) => {
              // Update active index counter as each card comes into view
              ScrollTrigger.create({
                trigger: card,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveIndex(index + 1),
                onEnterBack: () => setActiveIndex(index + 1),
              });

              // Apply progressive depth scaling and dimming to previous cards
              if (index < cards.length - 1) {
                const nextCard = cards[index + 1]!;
                gsap.to(card, {
                  scale: 0.94 - index * 0.02,
                  opacity: 0.5,
                  filter: "blur(1.5px)",
                  transformOrigin: "top center",
                  ease: "none",
                  scrollTrigger: {
                    trigger: nextCard,
                    start: "top 75%",
                    end: "top 25%",
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
              <h2 className={styles.label}>Selected Work & Systems</h2>
              <span className={styles.counter} aria-live="polite">
                [ {String(activeIndex).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} ]
              </span>
            </div>
            <div className={styles.headerRight}>
              <Link href="/work" className={styles.viewAll} id="view-all-work">
                Complete Archive
                <span className={styles.viewAllArrow} aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical Layered Scroll Stack */}
        <div className={styles.stackContainer}>
          {projects.map((project, index) => {
            const dest = project.liveUrl ?? project.githubUrl ?? `/work/${project.slug}`;
            const isExternal = !dest.startsWith("/");
            const coverImg = project.coverImage || `/images/previews/${project.slug}.jpg`;
            const stackOffset = index * 16;

            return (
              <article
                key={project.slug}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={styles.stackCard}
                style={{
                  top: `calc(var(--nav-height) + 1.25rem + ${stackOffset}px)`,
                  zIndex: index + 1,
                }}
                aria-label={`Featured Project: ${project.title}`}
              >
                {/* Top Meta Bar */}
                <div className={styles.cardHeader}>
                  <div className={styles.headerBadges}>
                    <span className={styles.categoryBadge}>{project.category}</span>
                    <span className={styles.yearBadge}>{project.year}</span>
                    {project.role && (
                      <span className={styles.roleBadge}>{project.role}</span>
                    )}
                  </div>
                  <span className={styles.projectNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>

                {/* 2-Column Broadside Content */}
                <div className={styles.cardBody}>
                  {/* Left Column: Narrative & Metadata */}
                  <div className={styles.infoCol}>
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

                    {/* Technology Spec Row */}
                    <div className={styles.techWrapper}>
                      <span className={styles.specLabel}>ENGINEERING STACK</span>
                      <ul className={styles.techList} aria-label="Technologies used">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <li key={tech} className={styles.techTag}>
                            [{tech}]
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Links */}
                    <div className={styles.actions}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtnPrimary}
                          aria-label={`Launch live app for ${project.title}`}
                        >
                          Live Application ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.actionBtn}
                          aria-label={`View source code for ${project.title}`}
                        >
                          Source Code ↗
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
                        <Image
                          src={coverImg}
                          alt={`${project.title} interface architecture`}
                          width={760}
                          height={475}
                          className={styles.previewImage}
                          sizes="(max-width: 959px) 100vw, 680px"
                          priority={index === 0}
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
