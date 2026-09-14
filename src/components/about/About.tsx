/**
 * About — Section 08
 * Editorial portrait & personal narrative — full story on /about page.
 */
import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-label="About Suyash">
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column: Heading & Editorial Portrait */}
          <div className={styles.leftCol}>
            <div className={styles.titleGroup}>
              <p className={styles.label}>Person · About</p>
              <h2 className={styles.heading}>
                About<br />Me
              </h2>
            </div>

            <div className={styles.imageFrame}>
              <Image
                src="/images/suyash-editorial.jpg"
                alt="Suyash Sharma — Full Stack Developer"
                width={420}
                height={560}
                className={styles.portrait}
                sizes="(max-width: 768px) 90vw, 420px"
              />
              <div className={styles.imageCaption}>
                <span className={styles.captionDot} aria-hidden="true" />
                <span className={styles.captionText}>Suyash Sharma · Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Narrative */}
          <div className={`${styles.body} reveal`}>
            <p className={styles.lead}>
              Building where engineering, design, and intelligence meet.
            </p>
            <p className={styles.bio}>
              I&apos;m a Full Stack Software Developer based in Delhi, India,
              building and maintaining web applications across professional,
              freelance, and contract engagements. I work across React,
              Next.js, Node.js, Django, REST APIs, and database-driven systems,
              with a focus on reliable deployment, performance, and technical
              support.
            </p>

            <div className={styles.metaLedger}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>Delhi, India</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Specialization</span>
                <span className={styles.metaValue}>Full-Stack &amp; AI Systems</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Approach</span>
                <span className={styles.metaValue}>High-performance &amp; Clean Architecture</span>
              </div>
            </div>

            <Link href="/about" className={styles.link} id="about-read-more">
              Read more about my journey
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
