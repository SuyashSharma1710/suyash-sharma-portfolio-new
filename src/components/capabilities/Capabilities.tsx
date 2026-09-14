/**
 * Capabilities — Section 04
 */
import { capabilities } from "@/content/capabilities";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <section id="capabilities" className={styles.section} aria-label="What I build">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.label}>Capability · What I Build</p>
          <h2 className={styles.heading}>What I Build</h2>
        </div>

        <ul className={styles.grid} aria-label="Capability areas">
          {capabilities.map((cap) => (
            <li key={cap.id} className={`${styles.item} reveal`}>
              <span className={styles.itemNumber} aria-hidden="true">{cap.number}</span>
              <h3 className={styles.itemTitle}>{cap.title}</h3>
              <p className={styles.itemDescription}>{cap.description}</p>
              <ul className={styles.itemTechs} aria-label={`Technologies for ${cap.title}`}>
                {cap.technologies.map((tech) => (
                  <li key={tech} className={styles.techTag}>{tech}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
