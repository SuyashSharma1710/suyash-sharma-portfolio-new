"use client";

/**
 * Experience — Section 06
 * Interactive Swiss Architectural Chronology & Engineering Deliverables Drawer
 * Governed strictly by RULES.md Rule 2 (Zero-Invention) and Rule 10.1 (Zero-Box Policy)
 */
import { useState } from "react";
import { experience } from "@/content/experience";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { ShinyText } from "@/components/ui/ShinyText";
import { Magnetic } from "@/lib/motion/components/Magnetic";
import styles from "./Experience.module.css";

const hasRealData = experience.some((e) => !e.period.startsWith("["));

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (idx: number) => {
    setHoveredIndex(idx);
    setExpandedIndex(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const toggleRow = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="experience" className={styles.section} aria-label="Work experience">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.label}>Experience · Track Record</p>
            <h2 className={styles.heading}>Selected Experience</h2>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.headerBadge}>
              [ {String(experience.length).padStart(2, "0")} ENGAGEMENTS ]
            </span>
          </div>
        </div>

        {!hasRealData ? (
          <div className={styles.placeholder} role="status">
            <p>
              <strong>[EXPERIENCE REQUIRED]</strong> — Please share your resume or work history.
            </p>
          </div>
        ) : (
          <div
            className={styles.list}
            role="region"
            aria-label="Professional chronology"
            data-has-hovered={hoveredIndex !== null}
            onMouseLeave={handleMouseLeave}
          >
            {experience.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              const isPresent = item.period.toLowerCase().includes("present");
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  className={styles.item}
                  data-expanded={isExpanded}
                  data-hovered={isHovered}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onFocus={() => handleMouseEnter(idx)}
                >
                  <button
                    type="button"
                    className={styles.rowTrigger}
                    onClick={() => toggleRow(idx)}
                    aria-expanded={isExpanded}
                    aria-controls={`exp-drawer-${idx}`}
                    id={`exp-header-${idx}`}
                  >
                    {/* Left: Period & Status */}
                    <div className={styles.periodCol}>
                      <span className={styles.period}>{item.period}</span>
                      {isPresent && (
                        <span className={styles.activeTag}>
                          <span className={styles.activeDot} aria-hidden="true" />
                          <ShinyText speed={4} className={styles.activeText}>
                            ACTIVE ROLE
                          </ShinyText>
                        </span>
                      )}
                    </div>

                    {/* Center: Role, Company & Short Summary */}
                    <div className={styles.roleCol}>
                      <div className={styles.roleHeader}>
                        <h3 className={styles.roleTitle}>{item.role}</h3>
                        <span className={styles.companyName}>· {item.company}</span>
                      </div>
                      <p className={styles.summaryText}>{item.summary}</p>
                    </div>

                    {/* Right: Expand Indicator */}
                    <div className={styles.actionCol}>
                      <Magnetic strength={0.18}>
                        <span className={styles.expandButton} aria-hidden="true">
                          <span className={styles.expandIcon}>{isExpanded ? "−" : "+"}</span>
                          <span className={styles.expandLabel}>
                            {isExpanded ? "COLLAPSE" : "DELIVERABLES"}
                          </span>
                        </span>
                      </Magnetic>
                    </div>
                  </button>

                  {/* Expandable Architectural Drawer */}
                  <div
                    id={`exp-drawer-${idx}`}
                    role="region"
                    aria-labelledby={`exp-header-${idx}`}
                    className={styles.drawerWrapper}
                  >
                    <div className={styles.drawerContent}>
                      <div className={styles.drawerBody}>
                        {/* Key Engineering Deliverables */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className={styles.highlightsBlock}>
                            <span className={styles.drawerSubheading}>
                              <DecryptedText
                                text="KEY DELIVERABLES & ARCHITECTURE"
                                speed={65}
                                animateOn="view"
                              />
                            </span>
                            <ul className={styles.highlightsList}>
                              {item.highlights.map((highlight, hIdx) => (
                                <li key={hIdx} className={styles.highlightItem}>
                                  <span className={styles.bullet} aria-hidden="true">
                                    —
                                  </span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Verified Technology Ledger */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className={styles.techBlock}>
                            <span className={styles.drawerSubheading}>VERIFIED STACK</span>
                            <ul className={styles.techLedger} aria-label="Technologies used">
                              {item.technologies.map((tech) => (
                                <li key={tech} className={styles.techTag}>
                                  {tech}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
