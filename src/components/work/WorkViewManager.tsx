"use client";

/**
 * WorkViewManager.tsx — Master Orchestrator for Work & Archive Views
 * Governed by RULES.md Rule 10.1 (Zero-Box Policy) and Swiss Editorial Aesthetic.
 * Manages category filtering and view toggling between Editorial View (huyml.co inspired)
 * and List View (tabular ArchiveIndex).
 */

import { useState, useMemo } from "react";
import { EditorialWorkView } from "./EditorialWorkView";
import { ArchiveIndex } from "./ArchiveIndex";
import { projects as appsProjects } from "@/content/projects";
import { shopifyProjects } from "@/content/shopify-projects";
import { wordpressProjects } from "@/content/wordpress-projects";
import { laravelProjects } from "@/content/laravel-projects";
import type { Project, ClientProject } from "@/content/types";
import styles from "./WorkViewManager.module.css";

type CategoryFilter = "all" | "apps" | "shopify" | "wordpress" | "laravel";
type ViewMode = "editorial" | "list";

export function WorkViewManager() {
  const [viewMode, setViewMode] = useState<ViewMode>("editorial");
  const [category, setCategory] = useState<CategoryFilter>("all");

  // Combine all 34 authentic projects into a master array
  const allMasterProjects = useMemo<(Project | ClientProject)[]>(() => {
    return [
      ...appsProjects,
      ...shopifyProjects,
      ...wordpressProjects,
      ...laravelProjects,
    ];
  }, []);

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    switch (category) {
      case "apps":
        return appsProjects;
      case "shopify":
        return shopifyProjects;
      case "wordpress":
        return wordpressProjects;
      case "laravel":
        return laravelProjects;
      case "all":
      default:
        return allMasterProjects;
    }
  }, [category, allMasterProjects]);

  return (
    <div className={styles.managerSection}>
      <div className="container">
        {/* ─────────────────────────────────────────────────────────────
            Unified Master Toolbar: Category Filters + View Mode Switcher
        ───────────────────────────────────────────────────────────── */}
        <div className={styles.controlsToolbar} role="toolbar" aria-label="Work archive controls">
          {/* Category Filter Tabs */}
          <div className={styles.categoryTabsGroup} role="tablist" aria-label="Filter projects by category">
            <button
              type="button"
              role="tab"
              aria-selected={category === "all"}
              className={`${styles.categoryBtn} ${category === "all" ? styles.categoryBtnActive : ""}`}
              onClick={() => setCategory("all")}
              id="work-filter-all"
            >
              <span>All Projects</span>
              <span className={styles.categoryCount}>({allMasterProjects.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === "apps"}
              className={`${styles.categoryBtn} ${category === "apps" ? styles.categoryBtnActive : ""}`}
              onClick={() => setCategory("apps")}
              id="work-filter-apps"
            >
              <span>Systems &amp; AI Apps</span>
              <span className={styles.categoryCount}>({appsProjects.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === "shopify"}
              className={`${styles.categoryBtn} ${category === "shopify" ? styles.categoryBtnActive : ""}`}
              onClick={() => setCategory("shopify")}
              id="work-filter-shopify"
            >
              <span>Shopify Stores</span>
              <span className={styles.categoryCount}>({shopifyProjects.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === "wordpress"}
              className={`${styles.categoryBtn} ${category === "wordpress" ? styles.categoryBtnActive : ""}`}
              onClick={() => setCategory("wordpress")}
              id="work-filter-wordpress"
            >
              <span>WordPress / PHP</span>
              <span className={styles.categoryCount}>({wordpressProjects.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={category === "laravel"}
              className={`${styles.categoryBtn} ${category === "laravel" ? styles.categoryBtnActive : ""}`}
              onClick={() => setCategory("laravel")}
              id="work-filter-laravel"
            >
              <span>Laravel</span>
              <span className={styles.categoryCount}>({laravelProjects.length})</span>
            </button>
          </div>

          {/* View Mode Switcher (Editorial vs. List) */}
          <div className={styles.viewSwitcherGroup} role="group" aria-label="Select view layout">
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "editorial" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("editorial")}
              aria-pressed={viewMode === "editorial"}
              id="view-editorial"
            >
              <svg
                className={styles.toggleIcon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="5" height="12" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="2" width="5" height="5.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9" y="9.5" width="5" height="4.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Editorial</span>
            </button>
            <button
              type="button"
              className={`${styles.viewToggleBtn} ${viewMode === "list" ? styles.viewToggleBtnActive : ""}`}
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              id="view-list"
            >
              <svg
                className={styles.toggleIcon}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>List View</span>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Active View Presentation
        ───────────────────────────────────────────────────────────── */}
        {viewMode === "editorial" ? (
          <EditorialWorkView projects={filteredProjects} />
        ) : (
          <ArchiveIndex
            showTitle={false}
            controlledCategory={category}
            onCategoryChange={setCategory}
            hideFilterBar={true}
          />
        )}
      </div>
    </div>
  );
}
