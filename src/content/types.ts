/**
 * Typed Content Contracts
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
  availability: {
    status: "available" | "limited" | "unavailable";
    label: string;
  };
  navigation: NavItem[];
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
  role?: string;
  sections?: ProjectCaseStudySection[];
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
  title: string;
  description: string;
  technologies: string[];
}

export interface LabItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: string;
  href?: string;
}
