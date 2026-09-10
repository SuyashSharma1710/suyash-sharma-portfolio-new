/**
 * FinalCTA — Section 09
 * "LET'S BUILD SOMETHING INTERESTING."
 */
import Link from "next/link";
import { siteConfig } from "@/content/site";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section id="contact-cta" className={styles.section} aria-label="Get in touch">
      <div className="container">
        <div className={`${styles.inner} reveal`}>
          <h2 className={styles.heading}>
            Let&apos;s build<br />
            something<br />
            <span className={styles.headingMuted}>interesting.</span>
          </h2>

          <p className={styles.sub}>
            Have a product, system, or ambitious idea in mind? Let&apos;s talk.
          </p>

          <div className={styles.actions}>
            <Link
              href="/contact"
              className={styles.ctaPrimary}
              id="cta-start-conversation"
            >
              Start a conversation
            </Link>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className={styles.ctaSecondary}
              id="cta-email"
            >
              Email me
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
