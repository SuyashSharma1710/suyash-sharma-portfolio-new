"use client";

/**
 * Footer — Swiss Architectural Broadsheet Footer
 * Section 10 · Continuity & Index
 * Features:
 * - 4-Column Editorial Directory (Identity & Status, Navigation Index, External Networks, Dispatch & Telemetry)
 * - Monumental Typographic Wordmark Anchor
 * - Live IST Delhi Telemetry & Stack Signature
 * - Magnetic "Return to Top" Interaction
 */

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { LogoPrimary } from "../logo/LogoPrimary";
import { FooterTime } from "./FooterTime";
import { DecryptedText } from "../ui/DecryptedText";
import { Magnetic } from "@/lib/motion/components/Magnetic";
import { SocialIcon, SocialPlatform } from "../icons/SocialIcons";
import styles from "./Footer.module.css";

interface ChannelItem {
  label: string;
  handle: string;
  platform: SocialPlatform;
  href: string;
}

const channels: ChannelItem[] = [
  { label: "GitHub", handle: "SuyashSharma1710", platform: "github", href: siteConfig.social.github },
  { label: "LinkedIn", handle: "suyash-sharma", platform: "linkedin", href: siteConfig.social.linkedin },
  ...(siteConfig.social.twitter
    ? [{ label: "X / Twitter", handle: "@SuyashSHARMA170", platform: "twitter" as SocialPlatform, href: siteConfig.social.twitter }]
    : []),
  ...(siteConfig.social.facebook
    ? [{ label: "Facebook", handle: "Suyash Sharma", platform: "facebook" as SocialPlatform, href: siteConfig.social.facebook }]
    : []),
  ...(siteConfig.social.instagram
    ? [{ label: "Instagram", handle: "@yashbhardwaj56", platform: "instagram" as SocialPlatform, href: siteConfig.social.instagram }]
    : []),
];

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={`container ${styles.container}`}>
        {/* ── Top Architectural Broadsheet Grid ── */}
        <div className={styles.broadsheetGrid}>
          {/* Column 1: Identity & Status */}
          <div className={styles.colIdentity}>
            <Magnetic strength={0.15}>
              <Link href="/" className={styles.wordmark} aria-label="Suyash Sharma — Home">
                <LogoPrimary size={22} aria-hidden="true" />
                <span>
                  SUYASH<sup className={styles.wordmarkSup}>®</sup>
                </span>
              </Link>
            </Magnetic>

            <p className={styles.descriptor}>
              Full-Stack Software Engineer &amp; Systems Architect building high-throughput web platforms, offline AI search engines, and resilient digital products.
            </p>

            <div className={styles.availabilityBadge}>
              <span className={styles.statusPulse} aria-hidden="true" />
              <span className={styles.statusLabel}>{siteConfig.availability.label}</span>
            </div>
          </div>

          {/* Column 2: Navigation Directory */}
          <nav className={styles.colNav} aria-label="Footer navigation directory">
            <span className={styles.colHeading}>INDEX</span>
            <ul className={styles.navList} role="list">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink}>
                    <span>{item.label}</span>
                    <span className={styles.navArrow} aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Verified Channels & Networks */}
          <section className={styles.colChannels} aria-label="Verified external networks">
            <span className={styles.colHeading}>CHANNELS</span>
            <ul className={styles.channelList} role="list">
              {channels.map(({ label, handle, platform, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.channelLink}
                    id={`footer-${platform}`}
                    aria-label={`${label}: ${handle} (opens in new tab)`}
                  >
                    <div className={styles.channelInfo}>
                      <SocialIcon name={platform} size={15} className={styles.channelIcon} />
                      <span className={styles.channelLabel}>{label}</span>
                    </div>
                    <span className={styles.externalMarker} aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 4: Direct Dispatch & Telemetry */}
          <div className={styles.colTelemetry}>
            <span className={styles.colHeading}>DISPATCH &amp; CV</span>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className={styles.dispatchLink}
              id="footer-email-dispatch"
            >
              <SocialIcon name="email" size={15} className={styles.channelIcon} />
              <span>{siteConfig.social.email}</span>
            </a>

            <Magnetic strength={0.2}>
              <a
                href={siteConfig.resume || "/resume/resume.pdf"}
                download="Suyash_Sharma_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resumeDownloadButton}
                id="footer-download-resume"
                aria-label="Download Suyash Sharma Resume PDF"
              >
                <span className={styles.downloadIcon} aria-hidden="true">↓</span>
                <span>Download Resume</span>
                <span className={styles.resumeBadge} aria-hidden="true">PDF</span>
              </a>
            </Magnetic>

            <div className={styles.telemetryLedger}>
              <FooterTime />
              <div className={styles.stackTag}>
                <span className={styles.tagDot} aria-hidden="true" />
                <span>Next.js 15 · TypeScript · React 19</span>
              </div>
            </div>
          </div>
        </div>


        {/* ── Bottom Legal & Back to Top Bar ── */}
        <div className={styles.bottomBar}>
          <span className={styles.copyright}>
            © {year} Suyash Sharma · All Rights Reserved
          </span>

          <span className={styles.originStatement}>
            <DecryptedText
              text="Engineered with architectural rigor · Delhi, India"
              speed={45}
              animateOn="hover"
            />
          </span>

          <Magnetic strength={0.25}>
            <button
              onClick={scrollToTop}
              className={styles.backToTopButton}
              aria-label="Return to top of page"
              id="footer-back-to-top"
            >
              <span>Return to top</span>
              <span className={styles.topArrow} aria-hidden="true">↑</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
