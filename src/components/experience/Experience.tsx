/**
 * Experience — Section 06
 * Shows verified experience from the typed content layer.
 */
import { experience } from "@/content/experience";
import styles from "./Experience.module.css";

const hasRealData = experience.some((e) => !e.period.startsWith("["));

export function Experience() {
  return (
    <section id="experience" className={styles.section} aria-label="Work experience">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.label}>Experience</p>
          <h2 className={styles.heading}>Selected Experience</h2>
        </div>

        {!hasRealData ? (
          <div className={styles.placeholder} role="status">
            <p>
              <strong>[EXPERIENCE REQUIRED]</strong> — Please share your resume or work history.
              This section will display your real professional experience once provided.
            </p>
          </div>
        ) : (
          <ul className={styles.list} aria-label="Work history">
            {experience.map((item, idx) => (
              <li key={idx} className={`${styles.item} reveal`}>
                <span className={styles.period}>{item.period}</span>
                <div className={styles.info}>
                  <span className={styles.role}>{item.role}</span>
                  <span className={styles.company}>{item.company}</span>
                  <p className={styles.summary}>{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
