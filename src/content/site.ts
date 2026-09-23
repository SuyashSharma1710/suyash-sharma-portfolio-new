/**
 * Site Configuration & Central Domain Management
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 * All data is real and confirmed by the user.
 *
 * CENTRAL DOMAIN CONFIGURATION:
 * Update SITE_DOMAIN below (or provide NEXT_PUBLIC_SITE_URL in environment variables).
 * All metadataBase, canonical URLs, OpenGraph/Twitter cards, dynamic preview images,
 * JSON-LD Schemas, sitemap.xml, and robots.txt will update from this single source of truth.
 */
import type { SiteConfig } from "./types";

export const SITE_DOMAIN = "suyash-sharma-portfolio-new.vercel.app";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`;

export const siteConfig: SiteConfig = {
  name: "Suyash Sharma",
  domain: SITE_DOMAIN,
  jobTitle: "Full-Stack Engineer & Systems Architect",
  title: "Suyash Sharma — Full-Stack Engineer & Systems Architect",
  description:
    "Full-Stack Engineer building high-performance web applications, offline AI search systems, and scalable digital platforms in Delhi, India.",
  url: SITE_URL,
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
    twitter:   "https://x.com/SuyashSHARMA170",
    facebook:  "https://www.facebook.com/share/1CAau7erM6/",
    instagram: "https://www.instagram.com/yashbhardwaj56/",
    email:     "suyashsharma171001@gmail.com",
    phone:     "+91 87550 63079",
  },
  phone: "+91 87550 63079",
  postalCode: "110065",
  alumniOf: [
    { name: "College of Engineering Roorkee", type: "CollegeOrUniversity" },
    { name: "Chandigarh University", type: "CollegeOrUniversity" },
    { name: "Scaler (IIT Roorkee)", type: "EducationalOrganization" },
  ],
  resume: "/resume/resume.pdf",
  location: "Delhi, India",
};
