/**
 * Positioning — Section 02
 * "I BUILD PRODUCTS WHERE ENGINEERING, DESIGN AND INTELLIGENCE MEET."
 * Server Component — no client state needed; CSS scroll reveal via IntersectionObserver
 */
import styles from "./Positioning.module.css";

const pillars = [
  "Product Engineering",
  "AI & Intelligent Systems",
  "Full-Stack Architecture",
  "Interaction & Experience",
  "Performance",
];

export function Positioning() {
  return (
    <section id="positioning" className={`${styles.section}`} aria-label="What I build">
      <div className="container">
        <p className={`${styles.label} reveal`}>02 — Position</p>
        <div className={styles.inner}>
          {/* Statement */}
          <h2 className={styles.statement}>
            <span className={styles.statementLine}>
              <span className={`${styles.statementLineInner} reveal`}>
                I build products
              </span>
            </span>
            <span className={styles.statementLine}>
              <span className={`${styles.statementLineInner} reveal reveal-delay-1`}>
                where engineering,
              </span>
            </span>
            <span className={styles.statementLine}>
              <span className={`${styles.statementLineInner} reveal reveal-delay-2`}>
                design and
              </span>
            </span>
            <span className={styles.statementLine}>
              <span className={`${styles.statementLineInner} reveal reveal-delay-3`}>
                intelligence meet.
              </span>
            </span>
          </h2>

          {/* Right column */}
          <div className={styles.right}>
            <p className={`${styles.supporting} reveal`}>
              From AI-powered platforms to scalable web applications, I turn
              complex technical problems into products that feel clear, fast,
              and intuitive.
            </p>
            <ul className={styles.pillars} aria-label="Core competencies">
              {pillars.map((p, i) => (
                <li
                  key={p}
                  className={`${styles.pillar} reveal reveal-delay-${i + 1}`}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
