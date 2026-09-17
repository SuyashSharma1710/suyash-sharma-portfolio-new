/**
 * Content Types
 * Governed by RULES.md and Master Plan v2
 */

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  availability: {
    status: "available" | "limited" | "unavailable";
    label: string;
  };
  navigation: NavItem[];
  social: {
    github: string;
    linkedin: string;
    instagram?: string;
    email: string;
  };
  location: string;
}

export interface ProjectCaseStudySection {
  title: string;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description?: string;
  featured: boolean;
  coverImage?: string;
  technologies: string[];
  href?: string;
  githubUrl?: string;
  liveUrl?: string;
  role?: string;
  sections?: ProjectCaseStudySection[];
}

export interface ClientProject extends Project {
  platform?: "Shopify" | "Shopify Plus" | "WordPress" | "WooCommerce" | "Laravel" | "Custom";
  client?: string;
  deliverables?: string[];
}

export interface ShopifyProject extends Project {
  platform: "Shopify" | "Shopify Plus";
  storeType?: string;
  deliverables?: string[];
}

export interface WordPressProject extends Project {
  platform: "WordPress" | "WooCommerce";
  cmsType?: string;
  deliverables?: string[];
}

export interface LaravelProject extends Project {
  platform: "Laravel";
  deliverables?: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  summary: string;
  highlights?: string[];
  technologies: string[];
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  tagline?: string;
}

export interface LabItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: string;
  status: "experimental" | "prototype" | "active" | "archived";
  technologies: string[];
  githubUrl?: string;
  href?: string;
}

export interface TechItem {
  id: string;
  name: string;
  glyph: string;
  category: "Frontend" | "Backend" | "AI & Search" | "Infrastructure";
  role: string;
  connectedIds: string[];
  project?: {
    title: string;
    slug?: string;
    url?: string;
  };
  specs?: string[];
}

export interface TechSubsystem {
  number: string;
  label: "Frontend" | "Backend" | "AI & Search" | "Infrastructure";
  title: string;
  description: string;
  items: TechItem[];
}
