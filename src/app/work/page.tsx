import type { Metadata } from "next";
import Link from "next/link";
import { WorkViewManager } from "@/components/work/WorkViewManager";
import { WorkJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/content/site";
import styles from "./WorkPage.module.css";

export const metadata: Metadata = {
  title: "Work & Project Archive",
  description:
    "Complete index of production systems, developer tools, open-source repositories, and digital experiments engineered by Suyash Sharma.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Project Archive — Suyash Sharma",
    description:
      "Complete index of production systems, developer tools, open-source repositories, and digital experiments engineered by Suyash Sharma.",
    url: `${siteConfig.url}/work`,
  },
};

export default function WorkPage() {
  return (
    <div className={styles.pageWrapper}>
      <WorkJsonLd />
      <div className="container">
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Return to Overview</span>
          </Link>
          <span className={styles.sectionIndex}>PROJECT ARCHIVE</span>
        </div>

        <header className={styles.headerContent}>
          <h1 className={styles.heading}>Work & Archive</h1>
          <p className={styles.lead}>
            Engineered systems, production platforms, and technical architecture with a focus on performance, clarity, and reliability.
          </p>
        </header>
      </div>

      <WorkViewManager />
    </div>
  );
}
