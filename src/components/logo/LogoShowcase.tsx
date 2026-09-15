"use client";

import React, { useState } from "react";
import { LogoPrimary } from "./LogoPrimary";
import { LogoConvergence } from "./LogoConvergence";
import { LogoAperture } from "./LogoAperture";
import { LogoMonolith } from "./LogoMonolith";
import styles from "./LogoShowcase.module.css";

interface ConceptItem {
  id: "primary" | "convergence" | "aperture" | "monolith";
  number: string;
  name: string;
  headline: string;
  rationale: string;
  component: React.ComponentType<{ size?: number | string; showTelemetry?: boolean }>;
  svgPath: string;
  rawSvg: string;
}

const concepts: ConceptItem[] = [
  {
    id: "primary",
    number: "01",
    name: "Primary Emblem",
    headline: "Solid Interlocking S-Matrix",
    rationale:
      "Precision interlocking angular geometries with dual 45° optical channels and clean outer bounding radii. High-impact structural silhouette engineered for instant brand recall.",
    component: LogoPrimary,
    svgPath: "/logos/logo.svg",
    rawSvg: `<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M500 492C500 496.418 496.418 500 492 500H7.99999C3.58171 500 0 496.418 0 492V350.006C0 345.588 3.58172 342.006 8 342.006H89.6006L219.626 342.02C221.722 342.02 223.733 341.198 225.229 339.731L373.781 194.011C375.276 192.544 377.288 191.722 379.383 191.722H492C496.418 191.722 500 195.303 500 199.722V492ZM500 150C500 154.418 496.418 158 492 158H297.088C297.087 158 297.087 158 297.087 158.001C297.087 158.002 297.086 158.002 297.086 158.002L280.452 158C278.356 158 276.345 158.822 274.849 160.289L126.312 305.994C124.816 307.461 122.805 308.283 120.71 308.283H8C3.58173 308.283 0 304.701 0 300.283V8.00001C0 3.58173 3.58172 0 8 0H492C496.418 0 500 3.58172 500 8V150Z" fill="currentColor"/>
</svg>`,
  },
  {
    id: "convergence",
    number: "02",
    name: "The S-Convergence",
    headline: "Precision Caliper Monogram",
    rationale:
      "Orthogonal caliper brackets with 45° chamfers, micro registration ticks, and central nodal convergence. Represents the synthesis of systems architecture, interface craft, and algorithmic intelligence.",
    component: LogoConvergence,
    svgPath: "/logos/logo-convergence.svg",
    rawSvg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 24.5 7.5 H 12 C 8.686 7.5 6 10.186 6 13.5 C 6 16.814 8.686 16.5 12 16.5 H 20 C 23.314 16.5 26 16.186 26 19.5 C 26 22.814 23.314 25.5 20 25.5 H 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="24.5" y1="5" x2="24.5" y2="10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
  <line x1="7.5" y1="23" x2="7.5" y2="28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
  <circle cx="16" cy="16.5" r="1.4" fill="currentColor"/>
  <line x1="2.5" y1="16.5" x2="4.5" y2="16.5" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <line x1="27.5" y1="16.5" x2="29.5" y2="16.5" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <path d="M 3 6 H 5 M 3 6 V 8" stroke="currentColor" stroke-width="1" stroke-linecap="square" opacity="0.4"/>
  <path d="M 29 26 H 27 M 29 26 V 24" stroke="currentColor" stroke-width="1" stroke-linecap="square" opacity="0.4"/>
</svg>`,
  },
  {
    id: "aperture",
    number: "03",
    name: "The Dual Aperture",
    headline: "Orbital Telemetry Vector",
    rationale:
      "Dual concentric orbital arcs with a continuous S-vector spine and 4 CAD corner registration crosshairs. Evokes quantum systems, radar discovery, and low-latency continuous data flow.",
    component: LogoAperture,
    svgPath: "/logos/logo-aperture.svg",
    rawSvg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 16 5.5 A 10.5 10.5 0 0 1 26.5 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  <path d="M 16 26.5 A 10.5 10.5 0 0 1 5.5 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
  <path d="M 16 5.5 C 10.5 5.5 8 9 8 12.5 C 8 16 11 16 16 16 C 21 16 24 16 24 19.5 C 24 23 21.5 26.5 16 26.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M 4 8 V 4 H 8" stroke="currentColor" stroke-width="1.1" stroke-linecap="square" opacity="0.5"/>
  <path d="M 24 4 H 28 V 8" stroke="currentColor" stroke-width="1.1" stroke-linecap="square" opacity="0.5"/>
  <path d="M 4 24 V 28 H 8" stroke="currentColor" stroke-width="1.1" stroke-linecap="square" opacity="0.5"/>
  <path d="M 24 28 H 28 V 24" stroke="currentColor" stroke-width="1.1" stroke-linecap="square" opacity="0.5"/>
  <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
  <circle cx="24" cy="8.5" r="1" fill="currentColor" opacity="0.75"/>
  <circle cx="8" cy="23.5" r="1" fill="currentColor" opacity="0.75"/>
</svg>`,
  },
  {
    id: "monolith",
    number: "04",
    name: "The Monolith",
    headline: "Architectural S-Glyph",
    rationale:
      "Interlocking solid polygonal facets separated by a 45° precision optical slit and CAD reference marks. High-impact modernist silhouette inspired by Swiss typefoundry craft.",
    component: LogoMonolith,
    svgPath: "/logos/logo-monolith.svg",
    rawSvg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 6.5 6.5 H 25.5 V 12.5 H 14.5 L 10.5 16.5 H 6.5 Z" fill="currentColor"/>
  <path d="M 25.5 25.5 H 6.5 V 19.5 H 17.5 L 21.5 15.5 H 25.5 Z" fill="currentColor"/>
  <line x1="10.5" y1="16.5" x2="21.5" y2="15.5" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1.5 1.5" opacity="0.35"/>
  <line x1="16" y1="2.5" x2="16" y2="4.5" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  <line x1="16" y1="27.5" x2="16" y2="29.5" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  <line x1="2.5" y1="6.5" x2="4.5" y2="6.5" stroke="currentColor" stroke-width="1" opacity="0.5"/>
  <line x1="27.5" y1="25.5" x2="29.5" y2="25.5" stroke="currentColor" stroke-width="1" opacity="0.5"/>
</svg>`,
  },
];

const sizeOptions = [20, 28, 48, 80];

export function LogoShowcase() {
  const [selectedSize, setSelectedSize] = useState<number>(48);
  const [stageTheme, setStageTheme] = useState<"auto" | "light" | "dark">("auto");
  const [showTelemetry, setShowTelemetry] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopySvg = (id: string, rawSvg: string) => {
    navigator.clipboard.writeText(rawSvg);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className={styles.showcase} aria-label="Brand Logo Concepts Showcase">
      <header className={styles.header}>
        <span className={styles.eyebrow}>Visual Identity & Telemetry</span>
        <h2 className={styles.title}>Brand Identity — SVG Architecture</h2>
        <p className={styles.description}>
          Crafted specifically for the Swiss editorial canvas. Each concept is a mathematical, vector-perfect emblem functioning across 16px micro-favicons up to architectural scale.
        </p>
      </header>

      {/* Interactive Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Scale:</span>
          {sizeOptions.map((sz) => (
            <button
              key={sz}
              className={`${styles.sizeBtn}${selectedSize === sz ? ` ${styles.active}` : ""}`}
              onClick={() => setSelectedSize(sz)}
              type="button"
            >
              {sz}px
            </button>
          ))}
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel}>Canvas:</span>
          <button
            className={`${styles.toggleBtn}${stageTheme === "auto" ? ` ${styles.active}` : ""}`}
            onClick={() => setStageTheme("auto")}
            type="button"
          >
            System
          </button>
          <button
            className={`${styles.toggleBtn}${stageTheme === "light" ? ` ${styles.active}` : ""}`}
            onClick={() => setStageTheme("light")}
            type="button"
          >
            Light
          </button>
          <button
            className={`${styles.toggleBtn}${stageTheme === "dark" ? ` ${styles.active}` : ""}`}
            onClick={() => setStageTheme("dark")}
            type="button"
          >
            Dark
          </button>
        </div>

        <div className={styles.controlGroup}>
          <button
            className={`${styles.toggleBtn}${showTelemetry ? ` ${styles.active}` : ""}`}
            onClick={() => setShowTelemetry(!showTelemetry)}
            type="button"
          >
            Telemetry: {showTelemetry ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Concepts Grid */}
      <div className={styles.conceptsGrid}>
        {concepts.map((concept) => {
          const LogoComp = concept.component;
          const stageClass =
            stageTheme === "light"
              ? styles.stageLight
              : stageTheme === "dark"
              ? styles.stageDark
              : "";

          return (
            <article key={concept.id} className={styles.conceptCard}>
              <div className={styles.conceptMeta}>
                <span>CONCEPT {concept.number}</span>
                <span className={styles.conceptName}>{concept.name}</span>
              </div>

              {/* Live Canvas Stage */}
              <div className={`${styles.canvasStage} ${stageClass}`}>
                <LogoComp
                  size={selectedSize}
                  showTelemetry={showTelemetry}
                  aria-label={`${concept.name} SVG`}
                />
              </div>

              {/* Navigation Lockup Test */}
              <div className={styles.lockupPreview}>
                <LogoComp size={18} showTelemetry={false} />
                <span className={styles.lockupText}>SUYASH</span>
                <span className={styles.lockupSub}>SYSTEM SPEC</span>
              </div>

              <div className={styles.conceptDetails}>
                <h3 className={styles.conceptHeadline}>{concept.headline}</h3>
                <p className={styles.conceptRationale}>{concept.rationale}</p>
              </div>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={`${styles.actionBtn} ${copiedId === concept.id ? styles.actionBtnPrimary : ""}`}
                  onClick={() => handleCopySvg(concept.id, concept.rawSvg)}
                >
                  {copiedId === concept.id ? "✓ Copied SVG" : "Copy SVG"}
                </button>
                <a
                  href={concept.svgPath}
                  download={`suyash-logo-${concept.id}.svg`}
                  className={styles.actionBtn}
                >
                  Download .svg
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
