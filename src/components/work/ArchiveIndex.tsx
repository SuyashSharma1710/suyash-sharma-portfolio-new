"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects as appsProjects } from "@/content/projects";
import { shopifyProjects } from "@/content/shopify-projects";
import { wordpressProjects } from "@/content/wordpress-projects";
import { laravelProjects } from "@/content/laravel-projects";
import type { Project, ClientProject } from "@/content/types";
import styles from "./ArchiveIndex.module.css";

gsap.registerPlugin(useGSAP);

type CategoryFilter = "all" | "apps" | "shopify" | "wordpress" | "laravel";

interface ArchiveIndexProps {
  showTitle?: boolean;
  limit?: number;
  initialFilter?: CategoryFilter;
}

export function ArchiveIndex({
  showTitle = true,
  limit,
  initialFilter = "all",
}: ArchiveIndexProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialFilter);
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine all 34 authentic projects into a master archive
  const allMasterProjects = useMemo<(Project | ClientProject)[]>(() => {
    // Return all software apps, Shopify client stores, WordPress client platforms, and Laravel
    return [
      ...appsProjects,
      ...shopifyProjects,
      ...wordpressProjects,
      ...laravelProjects,
    ];
  }, []);

  // Filter based on selected category
  const filteredProjects = useMemo(() => {
    let list: (Project | ClientProject)[] = [];
    switch (activeCategory) {
      case "apps":
        list = appsProjects;
        break;
      case "shopify":
        list = shopifyProjects;
        break;
      case "wordpress":
        list = wordpressProjects;
        break;
      case "laravel":
        list = laravelProjects;
        break;
      case "all":
      default:
        list = allMasterProjects;
        break;
    }
    return limit ? list.slice(0, limit) : list;
  }, [activeCategory, allMasterProjects, limit]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe((rowEl: HTMLElement) => {
    if (!containerRef.current) return;

    // Check reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const allRows = containerRef.current.querySelectorAll<HTMLElement>("[data-archive-row]");
    const siblingRows = Array.from(allRows).filter((r) => r !== rowEl);

    // Detect dark theme
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") !== "light" &&
      (document.documentElement.getAttribute("data-theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    // In light mode: old black capsule (#0d0c0a) with white text
    // In dark mode: opposite cream capsule (#F5F0E8) with dark text
    const activeBg = isDark ? "#F5F0E8" : "#0d0c0a";
    const activeText = isDark ? "#0D0D0D" : "#ffffff";
    const activeMeta = isDark ? "#5C5650" : "#9d968e";
    const activeBadgeBg = isDark ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.15)";
    const activeBadgeBorder = isDark ? "rgba(0, 0, 0, 0.18)" : "rgba(255, 255, 255, 0.25)";
    const activeShadow = isDark ? "0 12px 32px rgba(0, 0, 0, 0.65)" : "0 12px 32px rgba(0, 0, 0, 0.2)";

    // Dim sibling rows smoothly
    gsap.to(siblingRows, {
      opacity: 0.28,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Animate active row container
    gsap.to(rowEl, {
      backgroundColor: activeBg,
      boxShadow: activeShadow,
      opacity: 1,
      zIndex: 2,
      duration: 0.38,
      ease: "power3.out",
      overwrite: "auto",
    });

    // Expand thumbnail preview smoothly if present
    const previewWrapper = rowEl.querySelector<HTMLElement>("[data-preview]");
    const previewImg = rowEl.querySelector<HTMLElement>("[data-preview-img]");
    if (previewWrapper) {
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

    // Illuminate project title
    const title = rowEl.querySelector<HTMLElement>("[data-title]");
    if (title) {
      gsap.to(title, {
        color: activeText,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Slide in status badge pill
    const badge = rowEl.querySelector<HTMLElement>("[data-badge]");
    if (badge) {
      const badgePill = badge.querySelector<HTMLElement>("[data-badge-pill]");
      if (badgePill) {
        gsap.to(badgePill, {
          backgroundColor: activeBadgeBg,
          color: activeText,
          borderColor: activeBadgeBorder,
          duration: 0.3,
          overwrite: "auto",
        });
      }
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
        color: activeText,
        x: 4,
        y: -4,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    // Illuminate meta column text color
    const meta = rowEl.querySelector<HTMLElement>("[data-meta]");
    if (meta) {
      gsap.to(meta, {
        color: activeMeta,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  });

  const handleMouseLeave = contextSafe((rowEl: HTMLElement) => {
    if (!containerRef.current) return;

    // Check reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

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
      boxShadow: "none",
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

  const getBadgeLabel = (item: Project | ClientProject) => {
    const p = item as ClientProject;
    if (p.platform === "Shopify" || p.platform === "Shopify Plus") {
      return "SHOPIFY STORE";
    }
    if (p.platform === "WordPress" || p.platform === "WooCommerce") {
      return "WORDPRESS";
    }
    if (p.platform === "Laravel") {
      return "LARAVEL APP";
    }
    if (item.liveUrl) {
      return "LIVE APP";
    }
    return "GITHUB REPO";
  };

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
              <span className={styles.archiveCount}>
                {String(filteredProjects.length).padStart(2, "0")} REPOSITORIES
              </span>
            </div>
          </div>
        )}

        {/* Category Filter Controls */}
        <div className={styles.filterBar} role="tablist" aria-label="Filter archive projects">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`${styles.filterBtn} ${activeCategory === "all" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory("all")}
            id="filter-all"
          >
            <span>All Projects</span>
            <span className={styles.filterCount}>({allMasterProjects.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "apps"}
            className={`${styles.filterBtn} ${activeCategory === "apps" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory("apps")}
            id="filter-apps"
          >
            <span>Systems &amp; Web Apps</span>
            <span className={styles.filterCount}>({appsProjects.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "shopify"}
            className={`${styles.filterBtn} ${activeCategory === "shopify" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory("shopify")}
            id="filter-shopify"
          >
            <span>Shopify Stores</span>
            <span className={styles.filterCount}>({shopifyProjects.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "wordpress"}
            className={`${styles.filterBtn} ${activeCategory === "wordpress" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory("wordpress")}
            id="filter-wordpress"
          >
            <span>WordPress / PHP</span>
            <span className={styles.filterCount}>({wordpressProjects.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "laravel"}
            className={`${styles.filterBtn} ${activeCategory === "laravel" ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveCategory("laravel")}
            id="filter-laravel"
          >
            <span>Laravel</span>
            <span className={styles.filterCount}>({laravelProjects.length})</span>
          </button>
        </div>

        {/* Interactive Swiss Hover Table */}
        <div className={styles.table}>
          {filteredProjects.map((project) => {
            const dest = project.liveUrl ?? project.githubUrl ?? `/work/${project.slug}`;
            const isExternal = !dest.startsWith("/");
            const badgeLabel = getBadgeLabel(project);

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
                    <span className={styles.badgePill} data-badge-pill>
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
