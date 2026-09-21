/**
 * Footer — Section 10
 * SUYASH® / Digital Engineer / Delhi, India / GitHub / LinkedIn / Email
 * Enhanced with DecryptedText telemetry and Magnetic social links.
 */

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { LogoPrimary } from "../logo/LogoPrimary";
import { FooterTime } from "./FooterTime";
import { DecryptedText } from "../ui/DecryptedText";
import { Magnetic } from "@/lib/motion/components/Magnetic";
import styles from "./Footer.module.css";

const socials = [
  { label: "GitHub",    href: siteConfig.social.github,    external: true },
  { label: "LinkedIn",  href: siteConfig.social.linkedin,  external: true },
  ...(siteConfig.social.twitter ? [{ label: "X (Twitter)", href: siteConfig.social.twitter, external: true }] : []),
  ...(siteConfig.social.facebook ? [{ label: "Facebook", href: siteConfig.social.facebook, external: true }] : []),
  ...(siteConfig.social.instagram ? [{ label: "Instagram", href: siteConfig.social.instagram, external: true }] : []),
  { label: "Email",     href: `mailto:${siteConfig.social.email}`, external: false },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={`container ${styles.inner}`}>
        {/* Left */}
        <div className={styles.left}>
          <Magnetic strength={0.15}>
            <Link href="/" className={styles.wordmark} aria-label="Suyash Sharma">
              <LogoPrimary size={20} aria-hidden="true" />
              <span>SUYASH<sup className={styles.wordmarkSup}>®</sup></span>
            </Link>
          </Magnetic>
          <span className={styles.descriptor}>
            <DecryptedText text="Full-Stack Engineer · AI · Product" speed={60} animateOn="hover" />
          </span>
          <span className={styles.location}>
            <DecryptedText text={`${siteConfig.location} · ${year}`} speed={55} animateOn="hover" />
          </span>
        </div>

        {/* Center */}
        <nav className={styles.center} aria-label="Social links">
          <ul className={styles.socialLinks} role="list">
            {socials.map(({ label, href, external }) => (
              <li key={label}>
                <Magnetic strength={0.22}>
                  <a
                    href={href}
                    className={styles.socialLink}
                    id={`footer-${label.toLowerCase()}`}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={external ? `${label} (opens in new tab)` : label}
                  >
                    <span>{label}</span>
                    {external && <span className={styles.externalIcon} aria-hidden="true">↗</span>}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right */}
        <div className={styles.right}>
          <span className={styles.copyright}>
            © {year} Suyash Sharma
          </span>
          <FooterTime />
        </div>
      </div>
    </footer>
  );
}
