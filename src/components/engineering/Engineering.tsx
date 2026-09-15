"use client";

/**
 * Engineering — Section 05
 * Interactive Engineering System Matrix, Connected System Topology & Live Telemetry Inspector
 * Governed strictly by RULES.md Rule 2 (Zero-Invention) and Centralized Motion System
 */
import { useState, useMemo } from "react";
import Link from "next/link";
import { engineeringSubsystems } from "@/content/engineering";
import type { TechItem } from "@/content/types";
import { Magnetic } from "@/lib/motion/components/Magnetic";
import { DecryptedText } from "@/components/ui/DecryptedText";
import styles from "./Engineering.module.css";

// Flattened list for quick ID lookups
const allTechItems: TechItem[] = engineeringSubsystems.flatMap((sub) => sub.items);
const techItemMap = new Map<string, TechItem>(allTechItems.map((item) => [item.id, item]));

const DEFAULT_INSPECTOR: {
  title: string;
  category: string;
  role: string;
  specs: string[];
  projectTitle: string;
  projectUrl: string;
} = {
  title: "System Topology",
  category: "Full-Stack Architecture · 4 Layers",
  role: "An integrated production architecture engineered for sub-50ms query latency, strict end-to-end TypeScript contracts, local neural inference, and cloud infrastructure.",
  specs: ["100% Type-Safe Contracts", "Sub-50ms Latency Budget", "Local Neural Inference", "Automated Edge CI/CD"],
  projectTitle: "Glint & Pitchery",
  projectUrl: "#work",
};

export function Engineering() {
  const [activeTechId, setActiveTechId] = useState<string | null>(null);

  const activeTech = useMemo(() => {
    if (!activeTechId) return null;
    return techItemMap.get(activeTechId) || null;
  }, [activeTechId]);

  const connectedIds = useMemo(() => {
    if (!activeTech) return new Set<string>();
    return new Set(activeTech.connectedIds);
  }, [activeTech]);

  const connectedTechNames = useMemo(() => {
    if (!activeTech) return [];
    return activeTech.connectedIds
      .map((id) => techItemMap.get(id)?.name)
      .filter((name): name is string => Boolean(name));
  }, [activeTech]);

  return (
    <section
      id="engineering"
      className={styles.section}
      aria-label="Engineering stack and system topology"
      data-has-active={activeTechId !== null}
    >
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.label}>Depth · Engineering System</p>
            <h2 className={styles.heading}>Engineering Stack</h2>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerBadge}>
              <span className={styles.liveDot} aria-hidden="true" />
              [ ACTIVE SUBSYSTEMS ]
            </span>
          </div>
        </div>

        {/* 4-Column Subsystem Grid Matrix (Option 2 & 3) */}
        <div className={styles.matrixGrid} role="region" aria-label="Subsystem Architecture Grid">
          {engineeringSubsystems.map((subsystem) => (
            <div key={subsystem.label} className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={styles.columnCategory}>{subsystem.label}</span>
                <h3 className={styles.columnTitle}>{subsystem.title}</h3>
              </div>

              <ul className={styles.techList} aria-label={`${subsystem.label} technologies`}>
                {subsystem.items.map((tech) => {
                  const isActive = activeTechId === tech.id;
                  const isConnected = connectedIds.has(tech.id);

                  return (
                    <li key={tech.id} className={styles.pillWrapper}>
                      <Magnetic strength={0.15}>
                        <button
                          type="button"
                          className={styles.techPill}
                          data-active={isActive ? "true" : undefined}
                          data-connected={isConnected ? "true" : undefined}
                          onMouseEnter={() => setActiveTechId(tech.id)}
                          onFocus={() => setActiveTechId(tech.id)}
                          onMouseLeave={() => setActiveTechId(null)}
                          onClick={() => setActiveTechId((prev) => (prev === tech.id ? null : tech.id))}
                          aria-label={`${tech.name} - ${tech.role}`}
                        >
                          <div className={styles.pillLeft}>
                            <span className={styles.glyph} aria-hidden="true">
                              {tech.glyph}
                            </span>
                            <span className={styles.techName}>
                              {tech.name}
                            </span>
                          </div>
                          <span className={styles.statusIndicator} aria-hidden="true" />
                        </button>
                      </Magnetic>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Live Engineering Inspector HUD (Option 1) */}
        <div className={styles.inspectorDock} role="complementary" aria-label="Stack telemetry inspector">
          <div className={styles.inspectorTopRow}>
            <div className={styles.inspectorStatus}>
              <span className={styles.liveDot} aria-hidden="true" />
              <span>{activeTech ? `INSPECTOR · ${activeTech.category.toUpperCase()}` : "INSPECTOR · ARCHITECTURE OVERVIEW"}</span>
            </div>
            <div className={styles.inspectorMeta}>
              {activeTech ? (
                <span className={styles.topologyCount}>
                  ● {connectedIds.size} CONNECTED NODES
                </span>
              ) : (
                <span className={styles.topologyCount}>
                  ● ALL SYSTEMS NOMINAL
                </span>
              )}
            </div>
          </div>

          <div className={styles.inspectorBody}>
            <div className={styles.inspectorMain}>
              <span className={styles.inspectorCategory}>
                {activeTech ? activeTech.category : DEFAULT_INSPECTOR.category}
              </span>
              <h4 className={styles.inspectorTitle}>
                <DecryptedText
                  key={activeTech ? activeTech.id : "default"}
                  text={activeTech ? activeTech.name : DEFAULT_INSPECTOR.title}
                  speed={95}
                  charactersPerStep={1}
                  repeatInterval={12000}
                  animateOn="view"
                />
              </h4>
            </div>

            <div className={styles.inspectorDetails}>
              <p className={styles.inspectorRole}>
                {activeTech ? activeTech.role : DEFAULT_INSPECTOR.role}
              </p>

              <div className={styles.inspectorFoot}>
                <ul className={styles.specTags} aria-label="Technical specifications">
                  {(activeTech?.specs || DEFAULT_INSPECTOR.specs).map((spec) => (
                    <li key={spec} className={styles.specTag}>
                      {spec}
                    </li>
                  ))}
                  {connectedTechNames.length > 0 && (
                    <li className={styles.specTag}>
                      Linked: {connectedTechNames.slice(0, 3).join(", ")}
                    </li>
                  )}
                </ul>

                {activeTech?.project ? (
                  <Link
                    href={`#work`}
                    className={styles.projectChip}
                    aria-label={`View ${activeTech.project.title} project`}
                  >
                    <span className={styles.projectChipLabel}>Verified In:</span>
                    <strong>{activeTech.project.title} ↗</strong>
                  </Link>
                ) : (
                  <Link href="#work" className={styles.projectChip}>
                    <span className={styles.projectChipLabel}>Production:</span>
                    <strong>View Selected Work ↗</strong>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
