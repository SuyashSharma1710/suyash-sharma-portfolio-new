import type { Metadata } from "next";
import Link from "next/link";
import { labItems } from "@/content/lab";
import styles from "./LabPage.module.css";

export const metadata: Metadata = {
  title: "Lab & Experiments",
  description:
    "Experimental software artifacts, offline AI tools, and system prototypes engineered by Suyash Sharma.",
  alternates: {
    canonical: "/lab",
  },
};

export default function LabPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Return to Overview</span>
          </Link>
          <span className={styles.sectionIndex}>LABORATORY & EXPERIMENTS</span>
        </div>

        <header className={styles.headerContent}>
          <h1 className={styles.heading}>Lab & Prototypes</h1>
          <p className={styles.lead}>
            Offline-first search architectures, desktop performance utilities, and system experiments built to explore technical boundaries.
          </p>
        </header>

        <section aria-label="Experimental Projects Index" className={styles.labList}>
          {labItems.map((item) => (
            <a
              key={item.slug}
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.labItem}
            >
              <span className={styles.labYear}>{item.date}</span>
              
              <div className={styles.labTitleCol}>
                <h2 className={styles.labTitle}>{item.title}</h2>
                <span className={styles.labType}>{item.type}</span>
              </div>

              <p className={styles.labDescription}>{item.description}</p>

              <ul className={styles.labTechList} aria-label="Technologies used">
                {item.technologies.map((tech) => (
                  <li key={tech} className={styles.techTag}>
                    [{tech}]
                  </li>
                ))}
              </ul>

              <span className={styles.labAction}>
                <span>Source</span>
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </section>
      </div>
    </div>
  );
}
