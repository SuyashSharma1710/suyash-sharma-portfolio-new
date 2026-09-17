/**
 * Client CMS & E-Commerce Projects (Shopify, WordPress, Laravel)
 * Governed by RULES.md Rule 2 — Zero-Invention Policy
 *
 * Source: 25+ verified client web platforms delivered by Suyash Sharma.
 */
import type { ClientProject, Project } from "./types";
import { shopifyProjects } from "./shopify-projects";
import { wordpressProjects } from "./wordpress-projects";
import { laravelProjects } from "./laravel-projects";
import { projects as engineeringProjects } from "./projects";

export { shopifyProjects } from "./shopify-projects";
export { wordpressProjects } from "./wordpress-projects";
export { laravelProjects } from "./laravel-projects";

/** All client projects combined (Shopify + WordPress + Laravel) */
export const clientProjects: ClientProject[] = [
  ...shopifyProjects,
  ...wordpressProjects,
  ...laravelProjects,
];

/** Alias for CMS projects */
export const cmsProjects = clientProjects;

/** Complete unified portfolio of all 34 engineering systems & client platforms */
export const allPortfolioProjects: Project[] = [
  ...engineeringProjects,
  ...shopifyProjects,
  ...wordpressProjects,
  ...laravelProjects,
];

/** Helper functions to filter by platform */
export const getShopifyProjects = () => shopifyProjects;
export const getWordPressProjects = () => wordpressProjects;
export const getLaravelProjects = () => laravelProjects;
export const getClientProjectsByPlatform = (
  platform: "Shopify" | "WordPress" | "WooCommerce" | "Laravel"
) =>
  clientProjects.filter(
    (p) =>
      p.platform === platform ||
      (platform === "Shopify" && p.platform?.startsWith("Shopify")) ||
      (platform === "WordPress" && (p.platform === "WordPress" || p.platform === "WooCommerce"))
  );
