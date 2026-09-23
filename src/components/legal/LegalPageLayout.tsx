"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LegalDocument } from "@/content/legal";
import { openConsentSettings } from "@/lib/consent";
import styles from "./LegalPageLayout.module.css";

interface LegalPageLayoutProps {
  document: LegalDocument;
}

const directory = [
  { slug: "privacy", label: "Privacy Policy", href: "/privacy" },
  { slug: "terms", label: "Terms of Use", href: "/terms" },
  { slug: "cookies", label: "Cookie Policy", href: "/cookies" },
  { slug: "disclaimer", label: "Disclaimer", href: "/disclaimer" },
];

export function LegalPageLayout({ document }: LegalPageLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || !containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        `.${styles.colophonSidebar}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(
        `.${styles.headerBlock}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.35"
      )
      .fromTo(
        `.${styles.sectionBlock}`,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
        "-=0.3"
      );
    },
    { scope: containerRef, dependencies: [document.slug] }
  );

  return (
    <div ref={containerRef} className={`container ${styles.legalContainer}`}>
      <div className={styles.broadsheetGrid}>
        {/* Left Sticky Colophon & Table of Contents */}
        <aside className={styles.colophonSidebar} aria-label="Policy Colophon & Index">
          <div className={styles.ledgerHeader}>
            <span className={styles.ledgerCode}>LEGAL SPEC // {document.slug.toUpperCase()}</span>
            <div className={styles.ledgerStatus}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>ACTIVE &amp; ENFORCED</span>
            </div>
          </div>

          <div className={styles.metadataGroup}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>JURISDICTION</span>
              <span className={styles.metaValue}>Delhi, India (IT Act 2000 &amp; DPDP 2023)</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>LAST UPDATED</span>
              <span className={styles.metaValue}>{document.lastUpdated}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>EFFECTIVE DATE</span>
              <span className={styles.metaValue}>{document.effectiveDate}</span>
            </div>
          </div>

          <nav className={styles.tocSection} aria-label="Table of Contents">
            <span className={styles.tocHeading}>CONTENTS</span>
            <ul className={styles.tocList}>
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className={styles.tocLink}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.directoryGroup}>
            <span className={styles.directoryLabel}>ALL POLICIES</span>
            <div className={styles.directoryLinks}>
              {directory.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className={`${styles.directoryLink} ${
                    item.slug === document.slug ? styles.directoryLinkActive : ""
                  }`}
                >
                  <span>{item.slug === document.slug ? "●" : "○"}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {document.slug === "cookies" || document.slug === "privacy" ? (
            <div className={styles.directoryGroup}>
              <span className={styles.directoryLabel}>PREFERENCES</span>
              <button
                type="button"
                onClick={openConsentSettings}
                className={styles.directoryLink}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
              >
                <span>⚙</span>
                <span>Open Privacy &amp; Cookie Settings</span>
              </button>
            </div>
          ) : null}
        </aside>

        {/* Right Editorial Article */}
        <article className={styles.contentArticle}>
          <header className={styles.headerBlock}>
            <span className={styles.headerBadge}>OFFICIAL POLICY STATEMENT</span>
            <h1 className={styles.pageTitle}>{document.title}</h1>
            <p className={styles.subtitle}>{document.subtitle}</p>
          </header>

          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className={styles.paragraph}>
                  {para}
                </p>
              ))}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className={styles.bulletList}>
                  {section.bulletPoints.map((point, idx) => (
                    <li key={idx} className={styles.bulletItem}>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
