"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/content/projects";
import styles from "./ArchiveIndex.module.css";

gsap.registerPlugin(useGSAP);

interface ArchiveIndexProps {
  showTitle?: boolean;
  limit?: number;
}

export function ArchiveIndex({ showTitle = true, limit }: ArchiveIndexProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe((rowEl: HTMLElement) => {
    if (!containerRef.current) return;
    const allRows = containerRef.current.querySelectorAll<HTMLElement>("[data-archive-row]");
    const siblingRows = Array.from(allRows).filter((r) => r !== rowEl);

    // Dim sibling rows
    gsap.to(siblingRows, {
      opacity: 0.32,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Animate active row container
    gsap.to(rowEl, {
      backgroundColor: "#0d0c0a",
      paddingLeft: "clamp(1.25rem, 2.4vw, 2.5rem)",
      paddingRight: "clamp(1.25rem, 2.4vw, 2.5rem)",
      borderRadius: "6px",
      opacity: 1,
      zIndex: 2,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Expand thumbnail preview smoothly
    const previewWrapper = rowEl.querySelector<HTMLElement>("[data-preview]");
    const previewImg = rowEl.querySelector<HTMLElement>("[data-preview-img]");
    if (previewWrapper) {
      // Responsive expansion width
      const targetWidth = window.innerWidth <= 900 ? 110 : 170;
      gsap.to(previewWrapper, {
        width: targetWidth,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
    if (previewImg) {
      gsap.fromTo(
        previewImg,
        { scale: 1.18 },
        {
          scale: 1,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }

    // Shift and colorize project title
    const title = rowEl.querySelector<HTMLElement>("[data-title]");
    if (title) {
      gsap.to(title, {
        color: "#ffffff",
        x: 6,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Slide in status badge pill
    const badge = rowEl.querySelector<HTMLElement>("[data-badge]");
    if (badge) {
      gsap.to(badge, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
        overwrite: "auto",
      });
    }

    // Move external arrow diagonally
    const arrow = rowEl.querySelector<HTMLElement>("[data-arrow]");
    if (arrow) {
      gsap.to(arrow, {
        color: "#ffffff",
        x: 4,
        y: -4,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    // Soften meta column text color
    const meta = rowEl.querySelector<HTMLElement>("[data-meta]");
    if (meta) {
      gsap.to(meta, {
        color: "#9d968e",
        duration: 0.3,
        overwrite: "auto",
      });
    }
  });

  const handleMouseLeave = contextSafe((rowEl: HTMLElement) => {
    if (!containerRef.current) return;
    const allRows = containerRef.current.querySelectorAll<HTMLElement>("[data-archive-row]");

    // Restore sibling rows opacity
    gsap.to(allRows, {
      opacity: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Reset row container
    gsap.to(rowEl, {
      backgroundColor: "transparent",
      paddingLeft: "clamp(0.75rem, 1.5vw, 1.5rem)",
      paddingRight: "clamp(0.75rem, 1.5vw, 1.5rem)",
      borderRadius: "0px",
      zIndex: 1,
      duration: 0.35,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    // Collapse preview wrapper
    const previewWrapper = rowEl.querySelector<HTMLElement>("[data-preview]");
    const previewImg = rowEl.querySelector<HTMLElement>("[data-preview-img]");
    if (previewWrapper) {
      gsap.to(previewWrapper, {
        width: 0,
        opacity: 0,
        scale: 0.85,
        duration: 0.35,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }
    if (previewImg) {
      gsap.to(previewImg, {
        scale: 1.15,
        duration: 0.35,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }

    // Reset title
    const title = rowEl.querySelector<HTMLElement>("[data-title]");
    if (title) {
      gsap.to(title, {
        color: "var(--color-ink)",
        x: 0,
        duration: 0.35,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    }

    // Reset badge
    const badge = rowEl.querySelector<HTMLElement>("[data-badge]");
    if (badge) {
      gsap.to(badge, {
        opacity: 0,
        x: -12,
        duration: 0.25,
        ease: "power2.in",
        overwrite: "auto",
      });
    }

    // Reset arrow
    const arrow = rowEl.querySelector<HTMLElement>("[data-arrow]");
    if (arrow) {
      gsap.to(arrow, {
        color: "var(--color-muted)",
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }

    // Reset meta
    const meta = rowEl.querySelector<HTMLElement>("[data-meta]");
    if (meta) {
      gsap.to(meta, {
        color: "var(--color-muted)",
        duration: 0.3,
        overwrite: "auto",
      });
    }
  });

  return (
    <div
      ref={containerRef}
      className={styles.archiveSection}
      aria-label="Project archive directory"
    >
      <div className="container">
        {showTitle && (
          <div className={styles.archiveHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.archiveLabel}>ARCHIVE · PROJECT DIRECTORY</span>
              <h2 className={styles.archiveTitle}>All Projects &amp; Codebases</h2>
            </div>
            <div className={styles.headerRight}>
              <span className={styles.countBadge}>
                [ {String(projects.length).padStart(2, "0")} REPOSITORIES ]
              </span>
            </div>
          </div>
        )}

        {/* Interactive Swiss Hover Table */}
        <div className={styles.table}>
          {displayProjects.map((project) => {
            const dest = project.liveUrl ?? project.githubUrl ?? `/work/${project.slug}`;
            const isExternal = !dest.startsWith("/");
            const badgeLabel = project.liveUrl ? "LIVE DEMO" : "GITHUB REPO";

            return (
              <a
                key={project.slug}
                href={dest}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={styles.row}
                data-archive-row
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                onFocus={(e) => handleMouseEnter(e.currentTarget)}
                onBlur={(e) => handleMouseLeave(e.currentTarget)}
                id={`archive-row-${project.slug}`}
                aria-label={`${project.title} — ${project.category} (${project.year})`}
              >
                {/* Left: Metadata (Year, Category) */}
                <div className={styles.metaCol} data-meta>
                  <span className={styles.metaYear}>{project.year}</span>
                  <span className={styles.metaDot}>,</span>
                  <span className={styles.metaCategory}>{project.category}</span>
                </div>

                {/* Center / Main: Title & Hover Preview */}
                <div className={styles.titleCol}>
                  {/* Inline Preview Image (Expands on Hover via GSAP) */}
                  {project.coverImage && (
                    <div className={styles.previewWrapper} data-preview aria-hidden="true">
                      <Image
                        src={project.coverImage}
                        alt={`${project.title} interface preview`}
                        width={180}
                        height={120}
                        className={styles.previewImage}
                        data-preview-img
                      />
                    </div>
                  )}

                  <h3 className={styles.projectTitle} data-title>
                    {project.title}
                  </h3>

                  {/* Status Badge (Slides in on Hover via GSAP) */}
                  <div className={styles.badgeWrapper} data-badge>
                    <span className={styles.badgePill}>
                      <span className={styles.badgeArrow}>↗</span>
                      <span>{badgeLabel}</span>
                    </span>
                  </div>
                </div>

                {/* Right: External Link Arrow */}
                <div className={styles.arrowCol}>
                  <span className={styles.rowArrow} data-arrow aria-hidden="true">
                    ↗
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
