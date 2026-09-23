import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactJsonLd } from "@/components/seo/JsonLd";
import { SocialIcon } from "@/components/icons/SocialIcons";
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

const externalNetworks = [
  {
    name: "GitHub",
    platform: "github",
    href: siteConfig.social.github,
    meta: "Repositories",
  },
  {
    name: "LinkedIn",
    platform: "linkedin",
    href: siteConfig.social.linkedin,
    meta: "Profile",
  },
  ...(siteConfig.social.twitter
    ? [
        {
          name: "X (Twitter)",
          platform: "twitter",
          href: siteConfig.social.twitter,
          meta: "@SuyashSHARMA170",
        },
      ]
    : []),
  ...(siteConfig.social.facebook
    ? [
        {
          name: "Facebook",
          platform: "facebook",
          href: siteConfig.social.facebook,
          meta: "Page",
        },
      ]
    : []),
  ...(siteConfig.social.instagram
    ? [
        {
          name: "Instagram",
          platform: "instagram",
          href: siteConfig.social.instagram,
          meta: "@yashbhardwaj56",
        },
      ]
    : []),
];

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
                <SocialIcon name="email" size={20} className={styles.emailIcon} />
                <span>{siteConfig.social.email}</span>
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
                {externalNetworks.map((net) => (
                  <a
                    key={net.name}
                    href={net.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.networkLink}
                    id={`contact-network-${net.platform}`}
                    aria-label={`${net.name} (${net.meta}) - opens in new tab`}
                  >
                    <div className={styles.linkTitleGroup}>
                      <SocialIcon name={net.platform} size={20} className={styles.networkIcon} />
                      <span className={styles.linkLabel}>{net.name}</span>
                    </div>
                    <span className={styles.linkMeta}>
                      <span>{net.meta}</span>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
