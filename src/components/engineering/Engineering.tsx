/**
 * Engineering — Section 05
 * Technologies grouped by system, not proficiency bars.
 * Only lists technologies confirmed from real GitHub projects.
 */
import styles from "./Engineering.module.css";

const techGroups = [
  {
    label: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "CSS Modules", "Tailwind CSS"],
  },
  {
    label: "Backend",
    technologies: ["Node.js", "REST APIs", "PostgreSQL", "Prisma", "Drizzle ORM"],
  },
  {
    label: "AI & Search",
    technologies: ["LLM APIs", "RAG", "Vector Search", "ONNX", "BM25", "Ollama"],
  },
  {
    label: "Infrastructure",
    technologies: ["Docker", "GitHub Actions", "Vercel", "Cloud Platforms", "CI/CD"],
  },
] as const;

export function Engineering() {
  return (
    <section id="engineering" className={styles.section} aria-label="Engineering stack">
      <div className="container">
        <div className={styles.header}>
          <p className={styles.label}>05 — Depth · Engineering</p>
          <h2 className={styles.heading}>Engineering Stack</h2>
        </div>

        <div className={styles.groups}>
          {techGroups.map((group) => (
            <div key={group.label} className={`${styles.group} reveal`}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              <ul className={styles.techList}>
                {group.technologies.map((tech) => (
                  <li key={tech} className={styles.techItem}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
