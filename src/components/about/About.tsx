/**
 * About — Section 08
 * Short teaser — full story on /about page.
 */
import Link from "next/link";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-label="About Suyash">
      <div className="container">
        <div className={styles.inner}>
          {/* Left */}
          <div>
            <p className={styles.label}>08 — Person · About</p>
            <h2 className={styles.heading}>
              About<br />Me
            </h2>
          </div>

          {/* Right */}
          <div className={`${styles.body} reveal`}>
            <p className={styles.bio}>
              I&apos;m a Full Stack Software Developer based in Delhi, India,
              building and maintaining web applications across professional,
              freelance, and contract engagements. I work across React,
              Next.js, Node.js, Django, REST APIs, and database-driven systems,
              with a focus on reliable deployment, performance, and technical
              support.
            </p>
            <Link href="/about" className={styles.link} id="about-read-more">
              Read more
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
