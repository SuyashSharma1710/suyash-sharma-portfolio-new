"use client";

/**
 * EditorialWorkView.tsx — Swiss Architectural Editorial Stage for Projects
 * Inspired by huyml.co, governed by RULES.md Rule 10.1 (Zero-Box Policy) & Rule 10.2
 * Layout:
 * - Left: Typographic Colophon / Credits Ledger
 * - Center: Dramatic 3D Floating Perspective Artwork with Monumental Display Title
 * - Right: Typographic Project Roster with sibling-dimming & instant preview activation
 */

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project, ClientProject } from "@/content/types";
import styles from "./EditorialWorkView.module.css";

gsap.registerPlugin(useGSAP);

interface EditorialWorkViewProps {
  projects: (Project | ClientProject)[];
}

export function EditorialWorkView({ projects }: EditorialWorkViewProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const listTrackRef = useRef<HTMLDivElement>(null);

  // Guard if list is empty or changes
  const activeProject = projects[selectedIndex] || projects[0];

  // Reset index when project list changes (e.g. category filter)
  useEffect(() => {
    setSelectedIndex(0);
  }, [projects]);

  // GSAP quickTo references for buttery-smooth 60fps 3D mouse tilt
  const rotXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotYTo = useRef<gsap.QuickToFunc | null>(null);
  const scaleTo = useRef<gsap.QuickToFunc | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (previewCardRef.current) {
        // Initial architectural 3D floating perspective orientation
        gsap.set(previewCardRef.current, {
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
          rotationY: -3,
          rotationX: 1.5,
          scale: 1,
        });

        rotXTo.current = gsap.quickTo(previewCardRef.current, "rotationX", {
          duration: 0.35,
          ease: "power2.out",
        });
        rotYTo.current = gsap.quickTo(previewCardRef.current, "rotationY", {
          duration: 0.35,
          ease: "power2.out",
        });
        scaleTo.current = gsap.quickTo(previewCardRef.current, "scale", {
          duration: 0.35,
          ease: "power2.out",
        });
      }
    },
    { scope: containerRef }
  );

  // Smooth project transition effect on change
  const handleSelectProject = contextSafe((index: number) => {
    if (index === selectedIndex || index < 0 || index >= projects.length) return;
    setSelectedIndex(index);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    // 1. Center Title reveal
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }

    // 2. Center Preview crossfade & lift
    if (previewCardRef.current) {
      gsap.fromTo(
        previewCardRef.current,
        { opacity: 0.65, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }

    // 3. Left Ledger metadata shift
    if (ledgerRef.current) {
      const rows = ledgerRef.current.querySelectorAll("[data-spec-row]");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power2.out" }
      );
    }
  });

  // Next / Previous helpers
  const handlePrev = useCallback(() => {
    if (selectedIndex > 0) {
      handleSelectProject(selectedIndex - 1);
    }
  }, [selectedIndex, handleSelectProject]);

  const handleNext = useCallback(() => {
    if (selectedIndex < projects.length - 1) {
      handleSelectProject(selectedIndex + 1);
    }
  }, [selectedIndex, projects.length, handleSelectProject]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (selectedIndex < projects.length - 1) {
          handleSelectProject(selectedIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (selectedIndex > 0) {
          handleSelectProject(selectedIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, projects.length, handleSelectProject]);

  // Interactive 3D mouse parallax tilt over preview container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!previewCardRef.current || !rotXTo.current || !rotYTo.current) return;
    const rect = previewCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Fluid responsive tilt angles: -7deg to +7deg for X, -9deg to +9deg for Y
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 9;

    rotXTo.current(rotateX);
    rotYTo.current(rotateY);
    scaleTo.current?.(1.015);
  };

  const handleMouseLeave = () => {
    if (!rotXTo.current || !rotYTo.current) return;
    // Return smoothly to architectural rest orientation
    rotXTo.current(1.5);
    rotYTo.current(-3);
    scaleTo.current?.(1);
  };

  if (!activeProject) return null;

  // Resolve cover image and destination link
  const coverImg =
    activeProject.coverImage || `/images/previews/${activeProject.slug}.png`;
  const primaryDest = activeProject.liveUrl || activeProject.githubUrl || "#";
  const isExternal = primaryDest.startsWith("http");
  const deliverablesList = (activeProject as ClientProject).deliverables;
  const platformName = (activeProject as ClientProject).platform;

  const formattedIndex = String(selectedIndex + 1).padStart(2, "0");
  const formattedTotal = String(projects.length).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className={styles.editorialWrapper}
      aria-label="Editorial visual project showcase"
    >
      <div className={styles.stageGrid}>
        {/* ─────────────────────────────────────────────────────────────
            Left Column: Colophon / Architectural Credits Ledger
        ───────────────────────────────────────────────────────────── */}
        <aside className={styles.specColumn} aria-label="Project Credits & Colophon">
          {/* Monument Counter */}
          <div className={styles.counterBlock}>
            <span className={styles.giantIndex}>{formattedIndex}</span>
            <span className={styles.totalCount}>/ {formattedTotal}</span>
          </div>

          {/* Metadata Ledger */}
          <div ref={ledgerRef} className={styles.specLedgerList}>
            {/* Domain */}
            <div data-spec-row className={styles.specRow}>
              <span className={styles.specLabel}>Domain</span>
              <span className={styles.specValue}>{activeProject.category}</span>
            </div>

            {/* Scope / Role */}
            <div data-spec-row className={styles.specRow}>
              <span className={styles.specLabel}>
                {platformName ? "Platform & Scope" : "Discipline"}
              </span>
              <span className={styles.specValue}>
                {platformName
                  ? `${platformName} · ${deliverablesList?.[0] ?? "Full Lifecycle Production"}`
                  : (activeProject.role ?? "Full-Stack System Architecture")}
              </span>
            </div>

            {/* Release */}
            <div data-spec-row className={styles.specRow}>
              <span className={styles.specLabel}>Timeline</span>
              <span className={styles.specValue}>{activeProject.year} · Live Platform</span>
            </div>

            {/* Core Stack (Typographic, no pill boxes) */}
            <div data-spec-row className={styles.specRow}>
              <span className={styles.specLabel}>Technologies</span>
              <p className={styles.techStackLine}>
                {activeProject.technologies.slice(0, 6).join("  ·  ")}
              </p>
            </div>

            {/* Summary Narrative */}
            <div data-spec-row className={styles.specRow}>
              <span className={styles.specLabel}>Overview</span>
              <div className={styles.projectNarrativeWrapper}>
                <p className={styles.projectNarrative}>{activeProject.summary}</p>
              </div>
            </div>

            {/* Refined Editorial Links */}
            <div data-spec-row className={styles.actionsGroup}>
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.editorialActionLink}
                >
                  <span className={styles.actionLinkLabel}>Launch Live Platform</span>
                  <span className={styles.actionLinkArrow} aria-hidden="true">↗</span>
                </a>
              )}
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.editorialActionLinkSecondary}
                >
                  <span className={styles.actionLinkLabel}>Source Repository</span>
                  <span className={styles.actionLinkArrow} aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* ─────────────────────────────────────────────────────────────
            Center Stage: Focal Visual Preview & Monumental Title
        ───────────────────────────────────────────────────────────── */}
        <main className={styles.centerStage} aria-label="Visual Stage">
          {/* Monumental Editorial Title Header */}
          <div className={styles.stageHeroHeader}>
            <span className={styles.stageCategoryTag}>
              {activeProject.category}
            </span>
            <h2 ref={titleRef} className={styles.stageMainTitle}>
              {activeProject.title}
            </h2>
          </div>

          {/* Floating 3D Perspective Artwork Card */}
          <div
            className={styles.previewPerspectiveContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={previewCardRef} className={styles.previewFrameWrapper}>
              <div className={styles.previewImageContainer}>
                <Image
                  src={coverImg}
                  alt={`${activeProject.title} — ${activeProject.category}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className={styles.previewImage}
                />
              </div>
            </div>
          </div>

          {/* Controls Bar Below Preview */}
          <div className={styles.stageControlsBar}>
            <div className={styles.stageLivePill}>
              <span className={styles.liveDot} aria-hidden="true" />
              <span>Verified Production</span>
            </div>

            {/* Stepper Buttons */}
            <div className={styles.navArrowsGroup} aria-label="Project stepper">
              <button
                type="button"
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className={styles.arrowBtn}
                aria-label="Previous project"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={selectedIndex === projects.length - 1}
                className={styles.arrowBtn}
                aria-label="Next project"
              >
                →
              </button>
            </div>
          </div>
        </main>

        {/* ─────────────────────────────────────────────────────────────
            Right Column: Typographic Project Roster (huyml.co Style)
        ───────────────────────────────────────────────────────────── */}
        <nav className={styles.navigatorColumn} aria-label="Project Roster">
          <div className={styles.navigatorHeader}>
            <span className={styles.navigatorHeading}>PROJECT SELECTION</span>
            <span className={styles.navigatorCount}>
              {formattedTotal} ARCHIVE {projects.length === 1 ? "ENTRY" : "ENTRIES"}
            </span>
          </div>

          <div ref={listTrackRef} className={styles.projectsListTrack}>
            {projects.map((project, idx) => {
              const isActive = idx === selectedIndex;
              const itemIndex = String(idx + 1).padStart(2, "0");

              return (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => handleSelectProject(idx)}
                  onMouseEnter={() => handleSelectProject(idx)}
                  className={`${styles.projectNavItem} ${
                    isActive ? styles.activeItem : ""
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div className={styles.navItemTop}>
                    <span className={styles.navItemCategory}>
                      {project.category}
                    </span>
                    <span className={styles.navItemIndex}>{itemIndex}</span>
                  </div>
                  <div className={styles.navItemTitleRow}>
                    <span className={styles.navItemTitle}>{project.title}</span>
                    <span className={styles.navItemArrow} aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <p className={styles.navItemExcerpt}>
                    {project.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

