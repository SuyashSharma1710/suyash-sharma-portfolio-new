/**
 * Laravel Projects Content
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 * Verified client websites and platforms delivered by Suyash Sharma.
 */
import type { LaravelProject } from "./types";

export const laravelProjects: LaravelProject[] = [
  {
    slug: "himalayan-crafts",
    title: "Himalayan Crafts",
    platform: "Laravel",
    category: "E-Commerce / Laravel",
    year: "2025",
    summary:
      "Artisan handicraft e-commerce and heritage catalog platform powered by custom Laravel backend architecture, relational inventory schemas, and international shipping calculators.",
    description:
      "Architected a custom Laravel web platform for Himalayan Crafts featuring customized catalog management, artisan stories, relational product attributes, and multi-currency checkout integrations.",
    featured: false,
    role: "Laravel Developer",
    technologies: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript", "Tailwind CSS"],
    liveUrl: "https://www.himalayancrafts.org/",
    coverImage: "/images/previews/himalyancraft.png",
    deliverables: [
      "Custom Laravel Backend & Models",
      "Relational Inventory Management",
      "Multi-Currency & Global Shipping",
    ],
  },
];
