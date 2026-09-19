/**
 * Lab — Section 07
 * Enhanced with PixelBlast interactive canvas particle shockwaves
 */
import Link from "next/link";
import { labItems } from "@/content/lab";
import { PixelBlast } from "@/components/ui/PixelBlast";
import styles from "./Lab.module.css";

export function Lab() {
  return (
    <section id="lab" className={styles.section} aria-label="Lab — experimental work">
      {/* Interactive retro pixel shockwave canvas */}
      <PixelBlast trigger="click" particleCount={22} pixelSize={3} speed={3.2} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className={styles.header}>
          <div>
            <p className={styles.label}>Curiosity · Lab</p>
            <h2 className={styles.heading}>Lab</h2>
          </div>
          <a
            href="https://github.com/SuyashSharma1710?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAll}
            id="view-all-lab"
          >
            <span>View all experiments</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className={styles.grid} aria-label="Lab experiments">
          {labItems.map((item) => {
            const dest = item.githubUrl ?? item.href ?? `/lab/${item.slug}`;
            const isExternal = !dest.startsWith("/");
            return (
              <li key={item.slug} className="reveal" suppressHydrationWarning>
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
