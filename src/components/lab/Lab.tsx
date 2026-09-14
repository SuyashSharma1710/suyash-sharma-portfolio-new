/**
 * Lab — Section 07
 */
import Link from "next/link";
import { labItems } from "@/content/lab";
import styles from "./Lab.module.css";

export function Lab() {
  return (
    <section id="lab" className={styles.section} aria-label="Lab — experimental work">
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Curiosity · Lab</p>
            <h2 className={styles.heading}>Lab</h2>
          </div>
          <Link href="/lab" className={styles.viewAll} id="view-all-lab">
            View all experiments →
          </Link>
        </div>

        <ul className={styles.grid} aria-label="Lab experiments">
          {labItems.map((item) => {
            const dest = item.githubUrl ?? item.href ?? `/lab/${item.slug}`;
            const isExternal = !dest.startsWith("/");
            return (
              <li key={item.slug} className="reveal">
                <Link
                  href={dest}
                  className={styles.item}
                  id={`lab-${item.slug}`}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={`${item.title} — ${item.type}`}
                >
                  <div className={styles.itemTop}>
                    <span
                      className={styles.status}
                      data-status={item.status}
                    >
                      {item.status}
                    </span>
                    <span className={styles.itemArrow} aria-hidden="true">↗</span>
                  </div>

                  <span className={styles.itemType}>{item.type}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>

                  <ul className={styles.itemTechs} aria-label="Technologies">
                    {item.technologies.map((t) => (
                      <li key={t} className={styles.techTag}>{t}</li>
                    ))}
                  </ul>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
