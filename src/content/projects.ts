/**
 * Projects Content
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 *
 * Sources: GitHub profile and Suyash Sharma's resume (2026-09-09).
 * Placeholders marked [PROJECT DESCRIPTION REQUIRED] require a source.
 */
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "glint",
    title: "Glint",
    category: "AI / Search",
    year: "2026",
    summary:
      "Ultra-fast private hybrid search engine & Raycast-grade spotlight for codebases. Combines BM25 + ONNX vector embeddings + Reciprocal Rank Fusion with local RAG synthesis.",
    description:
      "Glint is a strictly local, privacy-first search engine for codebases. It combines BM25 keyword search with ONNX-powered vector embeddings using Reciprocal Rank Fusion — delivering search quality comparable to cloud systems, entirely offline. Built with Tauri for a native desktop experience and Rust for the core search engine.",
    featured: true,
    technologies: ["TypeScript", "Rust", "Tauri", "ONNX", "React", "RAG", "Vector Search", "BM25"],
    githubUrl: "https://github.com/SuyashSharma1710/glint",
    coverImage: "/images/previews/glint.jpg",
    role: "Solo engineer",
  },
  {
    slug: "pixelspace",
    title: "PixelSpace",
    category: "Desktop App",
    year: "2026",
    summary:
      "High-performance, strictly local Electron desktop app that crushes heavy images into WebP/AVIF using a C++ processing engine.",
    description:
      "PixelSpace is a local-first image optimization tool for developers and designers. It uses a C++ processing engine via Sharp to convert and compress images to modern formats (WebP, AVIF) without uploading anything to a server. Designed to be fast, private, and frictionless.",
    featured: true,
    technologies: ["Electron", "React", "JavaScript", "C++", "Sharp", "WebP", "AVIF"],
    githubUrl: "https://github.com/SuyashSharma1710/PixelSpace",
    coverImage: "/images/previews/pixelspace.jpg",
    role: "Solo engineer",
  },
  {
    slug: "pitchery",
    title: "Pitchery",
    category: "SaaS / Product",
    year: "2026",
    featured: true,
    summary:
      "A full-stack platform for pitch creation and startup discovery, with founder profiles, search and filtering, comments, and private founder-investor reach-outs.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Neon PostgreSQL", "Drizzle ORM", "Zod", "Tailwind CSS"],
    githubUrl: "https://github.com/SuyashSharma1710/pitchery",
    liveUrl: "https://pitchery.vercel.app",
    coverImage: "/images/previews/pitchery.jpg",
  },
  {
    slug: "fanout",
    title: "Fanout",
    category: "Web App",
    year: "2026",
    summary: "Real-time event routing gateway and websocket fanout notification system for distributed web clients.",
    featured: false,
    technologies: ["JavaScript"],
    githubUrl: "https://github.com/SuyashSharma1710/fanout",
    liveUrl: "https://fanout-nu.vercel.app",
    coverImage: "/images/previews/fanout.jpg",
  },
  {
    slug: "syncflow",
    title: "Syncflow P.M.T.",
    category: "Productivity",
    year: "2026",
    summary:
      "A workspace and task-management platform with nested projects, Kanban boards, timeline tracking, full-text search, relational data access, and optimistic updates with error rollback.",
    featured: false,
    technologies: ["Next.js", "Supabase", "PostgreSQL", "Zustand", "Tailwind CSS"],
    githubUrl: "https://github.com/SuyashSharma1710/syncflow_pmt",
  },
  {
    slug: "hol",
    title: "Harmony of Life",
    category: "Full-Stack",
    year: "2026",
    summary: "[PROJECT DESCRIPTION REQUIRED — describe what HoL does in 1-2 sentences]",
    featured: false,
    technologies: ["TypeScript"],
    githubUrl: "https://github.com/SuyashSharma1710/HoL",
  },
  {
    slug: "car-rental",
    title: "Car Rental",
    category: "Web App",
    year: "2026",
    summary: "[PROJECT DESCRIPTION REQUIRED — describe what this car rental platform does in 1-2 sentences]",
    featured: false,
    technologies: ["TypeScript", "Next.js"],
    githubUrl: "https://github.com/SuyashSharma1710/car-rental",
  },
];

/** Featured projects for the homepage Selected Work section */
export const featuredProjects = projects.filter((p) => p.featured);
