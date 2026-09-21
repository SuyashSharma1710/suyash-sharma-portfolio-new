/**
 * Site Configuration
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 * All data is real and confirmed by the user.
 */
import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Suyash Sharma",
  jobTitle: "Full-Stack Engineer & Systems Architect",
  title: "Suyash Sharma — Full-Stack Engineer & Systems Architect",
  description:
    "Full-Stack Engineer building high-performance web platforms, offline AI search systems, and production web applications where architectural rigor, design precision, and intelligent compute converge. Based in Delhi, India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://suyashsharma.dev",
  locale: "en_IN",
  keywords: [
    "Suyash Sharma",
    "Full-Stack Engineer",
    "Systems Architect",
    "Next.js Developer",
    "React 19",
    "TypeScript",
    "Node.js",
    "Rust",
    "Tauri",
    "ONNX AI Search",
    "PostgreSQL",
    "Supabase",
    "Web Development Delhi",
    "Software Engineer Portfolio",
  ],
  availability: {
    status: "available",
    label: "Available for selected projects",
  },
  navigation: [
    { label: "Work",    href: "/work" },
    { label: "Lab",     href: "/lab" },
    { label: "About",   href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  social: {
    github:    "https://github.com/SuyashSharma1710",
    linkedin:  "https://www.linkedin.com/in/suyash-sharma-756375196",
    instagram: "https://www.instagram.com/yashbhardwaj56/",
    email:     "suyashsharma171001@gmail.com",
  },
  location: "Delhi, India",
};
