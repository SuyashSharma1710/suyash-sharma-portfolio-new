/**
 * Lab Content
 * Experimental projects — sourced from GitHub
 */
import type { LabItem } from "./types";

export const labItems: LabItem[] = [
  {
    slug: "glint",
    title: "Glint",
    date: "2026",
    description:
      "A Raycast-grade hybrid search engine for codebases. BM25 + ONNX vector embeddings + RRF + local RAG — entirely offline, no cloud dependency.",
    type: "AI / Search",
    status: "experimental",
    technologies: ["Rust", "TypeScript", "Tauri", "ONNX", "RAG"],
    githubUrl: "https://github.com/SuyashSharma1710/glint",
  },
  {
    slug: "pixelspace",
    title: "PixelSpace",
    date: "2026",
    description:
      "Local image optimization desktop app. Drops image weight by converting to WebP/AVIF using a C++ engine — fast, private, no upload required.",
    type: "Desktop App",
    status: "active",
    technologies: ["Electron", "React", "C++", "Sharp"],
    githubUrl: "https://github.com/SuyashSharma1710/PixelSpace",
  },
];
