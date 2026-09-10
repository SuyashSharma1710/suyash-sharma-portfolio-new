/**
 * Capabilities Content
 * Four pillars — confirmed by user
 */
import type { CapabilityItem } from "./types";

export const capabilities: CapabilityItem[] = [
  {
    id: "digital-products",
    number: "01",
    title: "Digital Products",
    description:
      "Web applications, SaaS platforms, and user-facing products — built to be fast, clear, and useful. From architecture to interface, I work across the full product lifecycle.",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "ai-systems",
    number: "02",
    title: "AI Systems",
    description:
      "Search, retrieval, intelligent workflows, LLM interfaces and automation. I build systems where reasoning, discovery, and automation create real product value — not AI theater.",
    technologies: ["LLM APIs", "RAG", "Vector Search", "ONNX", "Rust"],
  },
  {
    id: "full-stack-systems",
    number: "03",
    title: "Full-Stack Systems",
    description:
      "End-to-end system design from database schema to deployment pipeline. APIs, authentication, background jobs, cloud infrastructure — the complete engineering layer.",
    technologies: ["Node.js", "APIs", "PostgreSQL", "Prisma", "Docker", "CI/CD"],
  },
  {
    id: "ecommerce",
    number: "04",
    title: "E-Commerce",
    description:
      "Storefronts, payment integration, inventory management, and conversion-focused experiences. Performance and reliability are non-negotiable when money is on the line.",
    technologies: ["Next.js", "TypeScript", "Payment APIs", "Prisma"],
  },
];
