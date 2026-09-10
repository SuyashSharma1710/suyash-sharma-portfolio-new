---
name: vercel-next-js-best-practices
description: Next.js App Router architectural guidelines and best practices from Vercel. Use when structuring App Router layouts, routes, server components, client boundaries, metadata, font/image optimization, route handlers, error handling, and deployment configurations.
---

# Vercel Next.js Best Practices

Authoritative architectural guidelines for Next.js App Router applications.

## When to Apply
- Creating or modifying App Router directory structure (`app/layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`)
- Defining Server Components vs Client Components (`"use client"`)
- Optimizing fonts (`next/font/google` or `next/font/local`) and images (`next/image`)
- Setting up static and dynamic metadata (`Metadata`, OpenGraph, Twitter cards)
- Implementing error boundaries and loading UI
- Designing route architecture and streaming patterns

## Core Architectural Rules

### 1. Server Components by Default
- Treat Server Components as the default building block.
- Push `"use client"` directives to the leaves of the component tree.
- Keep data-heavy and content-heavy layouts and pages on the server to minimize client bundle weight.
- Pass server-rendered JSX or children into Client Components rather than making the entire container a Client Component.

### 2. Layout and Routing Structure
- Root layout (`app/layout.tsx`) must define `<html>` and `<body>` tags and should never be a Client Component.
- Use `loading.tsx` for instant UI feedback via React Suspense.
- Implement `error.tsx` (must be a Client Component) with recoverability options and clean error logging.
- Implement `not-found.tsx` for missing routes or explicit `notFound()` calls.

### 3. Font and Asset Optimization
- Use `next/font` for zero-layout-shift (CLS) font loading. Font files are automatically hosted with the same domain as static assets.
- Configure `next/image` with explicit `width`, `height`, or `fill` with `sizes` to reserve layout space and prevent CLS.
- Use `priority` only on above-the-fold hero images (maximum 1-2 per page).

### 4. Metadata and SEO
- Define static metadata using the `metadata` export in `layout.tsx` or `page.tsx`.
- Use `generateMetadata` for dynamic routes.
- Always include `title`, `description`, `metadataBase`, `openGraph`, `twitter`, and `robots`.
- Configure `sitemap.ts` and `robots.ts` using Next.js metadata route conventions.

### 5. Client Component Discipline
- Only add `"use client"` when component requires:
  - React state hooks (`useState`, `useReducer`)
  - React effect hooks (`useEffect`, `useLayoutEffect`, `useGSAP`)
  - Browser APIs (`window`, `document`, `navigator`, `localStorage`)
  - Event listeners (`onClick`, `onScroll`, `onPointerMove`)
  - Animation / WebGL lifecycles
