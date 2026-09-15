import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { experience } from "@/content/experience";
import { LogoShowcase } from "@/components/logo/LogoShowcase";
import styles from "./AboutPage.module.css";

export const metadata: Metadata = {
  title: "About & Engineering Philosophy",
  description:
    "Background, technical approach, and engineering experience of Suyash Sharma — Full-Stack Engineer based in Delhi, India.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Return to Overview</span>
          </Link>
          <span className={styles.sectionIndex}>BACKGROUND & PHILOSOPHY</span>
        </div>

        <header className={styles.headerContent}>
          <h1 className={styles.heading}>About & Philosophy</h1>
          <p className={styles.lead}>
            Full-Stack Engineer building robust digital systems where architectural rigor, design precision, and intelligent compute converge.
          </p>
        </header>

        <div className={styles.editorialGrid}>
          {/* Left Column: Portrait & Specifications */}
          <aside className={styles.leftCol} aria-label="Portrait and Quick Facts">
            <div className={styles.imageFrame}>
              <div className={styles.portraitWrapper}>
                <Image
                  src="/images/suyash-editorial.jpg"
                  alt="Suyash Sharma — Full-Stack Engineer"
                  width={480}
                  height={640}
                  priority
                  className={styles.portrait}
                  sizes="(max-width: 900px) 100vw, 380px"
                />
              </div>
              <div className={styles.imageCaption}>
                <span className={styles.captionDot} aria-hidden="true" />
                <span>Suyash Sharma · {siteConfig.location}</span>
              </div>
            </div>

            <div className={styles.specLedger}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Location</span>
                <span className={styles.specValue}>{siteConfig.location}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Focus</span>
                <span className={styles.specValue}>Full-Stack & Systems</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Availability</span>
                <span className={styles.specValue}>{siteConfig.availability.label}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Direct Email</span>
                <span className={styles.specValue}>{siteConfig.social.email}</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Bio Narrative & Experience Timeline */}
          <div className={styles.rightCol}>
            <section className={styles.bioSection} aria-label="Personal Ethos & Background">
              <h2 className={styles.subHeading}>ETHOS & APPROACH</h2>
              
              <p className={styles.paragraph}>
                Software engineering is fundamentally about <strong>clarity under complexity</strong>. I focus on building scalable web platforms, high-performance backends, and low-friction user interfaces that feel immediate, reliable, and intentional.
              </p>

              <p className={styles.paragraph}>
                From architecting resilient database schemas with PostgreSQL/Supabase and fine-tuning server-side rendering pipelines in Next.js, to engineering offline-first desktop tools with Rust and C++, I prioritize engineering judgment over trend-driven complexity.
              </p>
            </section>

            <section className={styles.experienceTimeline} aria-label="Professional Experience Track">
              <h2 className={styles.subHeading}>EXPERIENCE TRACK</h2>

              {experience.map((item) => (
                <article key={`${item.company}-${item.period}`} className={styles.expItem}>
                  <span className={styles.expPeriod}>{item.period}</span>
                  <h3 className={styles.expRole}>{item.role}</h3>
                  <span className={styles.expCompany}>{item.company}</span>
                  <p className={styles.expSummary}>{item.summary}</p>
                </article>
              ))}
            </section>
          </div>
        </div>

        {/* Brand Identity & Logo Concepts Showcase */}
        <LogoShowcase />
      </div>
    </div>
  );
}
