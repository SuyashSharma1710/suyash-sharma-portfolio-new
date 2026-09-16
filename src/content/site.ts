/**
 * Site Configuration
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 * All data is real and confirmed by the user.
 */
import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Suyash Sharma",
  title: "Suyash — Full-Stack Engineer",
  description:
    "Full-Stack Engineer building products where engineering, design, and intelligence meet. Based in Delhi, India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://suyashsharma.dev",
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
