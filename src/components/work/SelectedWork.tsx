/**
 * SelectedWork — Section 03
 * Editorial sequence of featured projects — not a card grid.
 */
import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  return (
    <section id="work" className={styles.section} aria-label="Selected work">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.label}>03 — Proof · Selected Work</p>
          <Link href="/work" className={styles.viewAll} id="view-all-work">
            View all work
            <span className={styles.viewAllArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        <ol className={styles.projectList} aria-label="Featured projects">
          {featuredProjects.map((project, index) => {
            const dest = project.liveUrl ?? project.githubUrl ?? `/work/${project.slug}`;
            const isExternal = !dest.startsWith("/");
            return (
              <li key={project.slug} className={`${styles.project} reveal`}>
                <Link
                  href={dest}
                  className={styles.projectLink}
                  id={`project-${project.slug}`}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={`${project.title} — ${project.category}`}
                >
                  <span className={styles.projectNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectCategory}>{project.category}</span>
                      <span className={styles.projectYear} aria-label={`Year: ${project.year}`}>{project.year}</span>
                    </div>
                    <p className={styles.projectSummary}>{project.summary}</p>
                    {project.technologies.length > 0 && (
                      <ul className={styles.projectTags} aria-label="Technologies">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <li key={tech} className={styles.tag}>{tech}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <span className={styles.projectArrow} aria-hidden="true">↗</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
