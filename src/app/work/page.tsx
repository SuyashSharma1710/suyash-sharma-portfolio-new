import type { Metadata } from "next";
import Link from "next/link";
import { ArchiveIndex } from "@/components/work/ArchiveIndex";

export const metadata: Metadata = {
  title: "Work & Project Archive — Suyash Sharma",
  description:
    "Complete index of production systems, developer tools, open-source repositories, and digital experiments engineered by Suyash Sharma.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkPage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "var(--nav-height, 80px)" }}>
      <div className="container" style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingBottom: "1rem" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "var(--space-4)",
          }}
        >
          <span>←</span>
          <span>RETURN TO OVERVIEW</span>
        </Link>
      </div>
      <ArchiveIndex showTitle={true} />
    </main>
  );
}
