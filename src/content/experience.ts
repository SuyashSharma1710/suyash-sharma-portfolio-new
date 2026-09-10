/**
 * Experience Content
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 *
 * Source: Suyash Sharma resume, dated 2026-09-09.
 */
import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    period: "March 2025 – Present",
    role: "Senior Web Developer",
    company: "Cliq Media",
    summary:
      "Developed, deployed, and maintained production full-stack applications using React.js, Next.js, Node.js, and Supabase.",
    highlights: [
      "Designed and integrated REST APIs, web services, authentication, third-party integrations, and database-driven workflows using PostgreSQL/Supabase and Row-Level Security (RLS).",
      "Managed Vercel/Railway deployments, Git-based CI/CD, debugging, issue resolution, and performance optimization.",
      "Collaborated with clients and stakeholders to translate requirements into technical solutions and deliver customized production websites.",
    ],
    technologies: ["React.js", "Next.js", "Node.js", "Supabase", "PostgreSQL", "REST APIs", "Vercel", "Railway", "CI/CD"],
  },
  {
    period: "2024 – Present",
    role: "Freelance & Contract Full-Stack Developer",
    company: "Freelance, agency, and contract engagements",
    summary:
      "Delivered 10+ paid web projects across freelance, agency, and contract engagements, developing web applications and digital solutions using React.js, Next.js, Node.js, Django, and TypeScript.",
    highlights: [
      "Integrated REST APIs, authentication, RBAC, and database-driven workflows.",
      "Managed requirements, deployment, debugging, maintenance, and post-launch technical support.",
    ],
    technologies: ["React.js", "Next.js", "Node.js", "Django", "TypeScript", "REST APIs", "RBAC"],
  },
  {
    period: "December 2024 – February 2025",
    role: "Software Development Intern",
    company: "The Coding Cult Pvt. Ltd.",
    summary:
      "Developed a modular team and task-management application with multi-level RBAC and workflow automation.",
    highlights: [
      "Optimized backend and database workflows, improving task-assignment efficiency by 40%.",
      "Containerized services with Docker, reducing deployment setup time by 50%.",
      "Performed API testing, debugging, and validation using Postman to maintain application stability and data integrity.",
    ],
    technologies: ["RBAC", "Docker", "Postman", "API Testing"],
  },
  {
    period: "September 2023 – October 2023",
    role: "Web Development Intern",
    company: "Sync Intern",
    summary:
      "Developed four full-stack Django/Python applications, implementing relational database models and server-side routing.",
    highlights: [
      "Optimized server-side logic and database queries, improving execution efficiency by 50%.",
      "Completed additional testing and bug fixing.",
    ],
    technologies: ["Django", "Python", "Relational Databases"],
  },
];
