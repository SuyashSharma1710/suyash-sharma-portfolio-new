/**
 * Projects Content
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 * Verified production platforms, open-source systems, and full-stack web applications.
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
    coverImage: "/images/previews/glint.png",
    role: "Solo Engineer",
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
    coverImage: "/images/previews/pixelspace.png",
    role: "Solo Engineer",
  },
  {
    slug: "pitchery",
    title: "Pitchery",
    category: "SaaS / Product",
    year: "2026",
    featured: true,
    summary:
      "A full-stack platform for pitch creation and startup discovery, with founder profiles, search and filtering, comments, and private founder-investor reach-outs.",
    description:
      "Pitchery is a modern startup ecosystem platform allowing founders to craft structured pitch decks, discover early-stage ventures, engage in founder-investor discussions, and coordinate direct outreach with real-time notifications.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Neon PostgreSQL", "Drizzle ORM", "Zod", "Tailwind CSS"],
    githubUrl: "https://github.com/SuyashSharma1710/pitchery",
    liveUrl: "https://pitchery.vercel.app/",
    coverImage: "/images/previews/pitchery.png",
    role: "Full-Stack Engineer",
  },
  {
    slug: "syncflow-pmt",
    title: "Syncflow P.M.T.",
    category: "Productivity / SaaS",
    year: "2026",
    featured: true,
    summary:
      "A workspace and task-management platform with nested projects, Kanban boards, timeline tracking, full-text search, relational data access, and optimistic updates with error rollback.",
    description:
      "Built an agile project management suite featuring drag-and-drop Kanban boards, sprint milestone tracking, real-time collaboration via Supabase, and resilient optimistic UI updates.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Zustand", "Tailwind CSS"],
    githubUrl: "https://github.com/SuyashSharma1710/syncflow_pmt",
    liveUrl: "https://syncflow-pmt.vercel.app/",
    coverImage: "/images/previews/Syncflow.png",
    role: "Full-Stack Engineer",
  },
  {
    slug: "the-harmony-of-life",
    title: "The Harmony of Life",
    category: "Full-Stack / Wellness",
    year: "2025",
    featured: false,
    summary:
      "Holistic wellness and lifestyle web portal featuring guided meditation audio tracks, curated workshops, and member event scheduling.",
    description:
      "Developed an immersive, tranquil lifestyle platform with dynamic audio streaming players, retreat booking workflows, and responsive editorial layout typography.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "https://theharmonyoflife.com/",
    coverImage: "/images/previews/hol.png",
    role: "Full-Stack Engineer",
  },
  {
    slug: "warranty-system",
    title: "Warranty System",
    category: "Enterprise / Management",
    year: "2025",
    featured: false,
    summary:
      "Enterprise product warranty registration, verification, and claims tracking portal with barcode validation and automated ticket lifecycles.",
    description:
      "Engineered an enterprise claims management platform supporting customer warranty registrations, serial number validation engines, and administrative resolution pipelines.",
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "REST API"],
    liveUrl: "https://warrentysystem.vercel.app/",
    coverImage: "/images/previews/warrenty-sync.png",
    role: "Full-Stack Engineer",
  },
  {
    slug: "osho-task",
    title: "Osho Task",
    category: "Web App / Productivity",
    year: "2025",
    featured: false,
    summary:
      "Fast, minimalist productivity dashboard with categorized task queues, progress tracking metrics, and state persistence.",
    description:
      "Created a focused personal productivity application featuring keyboard-driven task orchestration, prioritized queues, and localized state persistence.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://osho-task.vercel.app/",
    coverImage: "/images/previews/osho-event-lander.png",
    role: "Frontend Engineer",
  },
  {
    slug: "fanout",
    title: "Fanout",
    category: "Infrastructure / Gateway",
    year: "2025",
    featured: false,
    summary:
      "Real-time event routing gateway and websocket fanout notification system for high-concurrency distributed web clients.",
    description:
      "Engineered a low-latency event fanout gateway handling pub/sub message propagation, connection pooling, and resilient client reconnection loops.",
    technologies: ["Next.js", "TypeScript", "WebSockets", "Node.js", "JavaScript"],
    githubUrl: "https://github.com/SuyashSharma1710/fanout",
    liveUrl: "https://fanout-nu.vercel.app/",
    coverImage: "/images/previews/fanout.png",
    role: "Systems / Backend Engineer",
  },
  {
    slug: "communion",
    title: "Communion",
    category: "Web App / Community",
    year: "2025",
    featured: false,
    summary:
      "Multi-page community events and collective congregation platform featuring multi-route state handling, event directory, and RSVP coordination.",
    description:
      "Developed a multi-page web application featuring responsive event discovery, interactive venue maps, community discussions, and RSVP booking flows.",
    technologies: ["React", "React Router", "TypeScript", "Tailwind CSS", "Vite"],
    liveUrl: "https://communion-react-router-multipage.vercel.app/",
    coverImage: "/images/previews/communion-event-listing.png",
    role: "Frontend Engineer",
  },
];

/** Featured projects for the homepage Selected Work section */
export const featuredProjects = projects.filter((p) => p.featured);
