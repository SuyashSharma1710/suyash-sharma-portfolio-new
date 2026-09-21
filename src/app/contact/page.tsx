import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactJsonLd } from "@/components/seo/JsonLd";
import styles from "./ContactPage.module.css";

export const metadata: Metadata = {
  title: "Contact & Inquiries",
  description:
    "Direct communication channels, consulting inquiries, and project availability for Suyash Sharma — Full-Stack Engineer in Delhi, India.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Inquiries — Suyash Sharma",
    description:
      "Direct communication channels, consulting inquiries, and project availability for Suyash Sharma — Full-Stack Engineer in Delhi, India.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <ContactJsonLd />
      <div className="container">
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <span aria-hidden="true">←</span>
            <span>Return to Overview</span>
          </Link>
          <span className={styles.sectionIndex}>DIRECT INQUIRIES</span>
        </div>

        <header className={styles.headerContent}>
          <h1 className={styles.heading}>Start a Conversation</h1>
          <p className={styles.lead}>
            Available for select full-stack engineering roles, systems architecture consulting, and technical contract projects.
          </p>
        </header>

        <div className={styles.channelsGrid}>
          {/* Contact Form Section */}
          <section className={styles.formSection} aria-label="Direct Transmission Form">
            <h2 className={styles.subHeading}>DISPATCH INQUIRY</h2>
            <ContactForm />
          </section>

          {/* Direct Frequency & Networks Sidebar */}
          <div className={styles.sidebarSection}>
            <section className={styles.directSection} aria-label="Direct Email Inquiries">
              <h2 className={styles.subHeading}>PRIMARY DISPATCH</h2>
              
              <a href={`mailto:${siteConfig.social.email}`} className={styles.primaryEmailLink}>
                {siteConfig.social.email}
              </a>

              <div className={styles.statusLedger}>
                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Availability</span>
                  <span className={styles.statusValue}>{siteConfig.availability.label}</span>
                </div>
                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Location & Time</span>
                  <span className={styles.statusValue}>{siteConfig.location} (IST)</span>
                </div>
                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Response Window</span>
                  <span className={styles.statusValue}>Within 24–48 hours</span>
                </div>
              </div>
            </section>

            <section className={styles.networksSection} aria-label="Professional Networks & Code Repositories">
              <h2 className={styles.subHeading}>EXTERNAL REGISTRIES</h2>

              <div className={styles.linksList}>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.networkLink}
                >
                  <span className={styles.linkLabel}>GitHub</span>
                  <span className={styles.linkMeta}>
                    <span>Repositories</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>

                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.networkLink}
                >
                  <span className={styles.linkLabel}>LinkedIn</span>
                  <span className={styles.linkMeta}>
                    <span>Profile</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>

                {siteConfig.social.twitter && (
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.networkLink}
                  >
                    <span className={styles.linkLabel}>X (Twitter)</span>
                    <span className={styles.linkMeta}>
                      <span>@SuyashSHARMA170</span>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                )}

                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.networkLink}
                  >
                    <span className={styles.linkLabel}>Facebook</span>
                    <span className={styles.linkMeta}>
                      <span>Page</span>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                )}

                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.networkLink}
                  >
                    <span className={styles.linkLabel}>Instagram</span>
                    <span className={styles.linkMeta}>
                      <span>@yashbhardwaj56</span>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
