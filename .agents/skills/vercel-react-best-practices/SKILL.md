---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. Use when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns, avoid async waterfalls, optimize bundle sizes, and manage server/client boundaries.
---

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel Engineering.

## When to Apply
- Writing new React components or Next.js pages/layouts
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues and bundle size optimization
- Refactoring existing React/Next.js code
- Managing Server vs Client Component boundaries

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Core Principles

### 1. Eliminating Waterfalls (CRITICAL)
- **Check Cheap Conditions First**: Test cheap synchronous conditions before awaiting remote flags or promises.
- **Defer Await**: Move `await` down into conditional branches where the data is actually consumed.
- **Parallelize Operations**: Use `Promise.all()` for independent asynchronous tasks.
- **Suspense Streaming**: Wrap slow async components in `<Suspense>` boundaries to unblock initial page render.

### 2. Bundle Size Optimization (CRITICAL)
- **Direct Imports**: Avoid barrel file re-exports for large libraries; import directly from the subpath.
- **Dynamic Imports**: Use `next/dynamic` or `React.lazy()` for heavy client-only widgets, dialogs, and non-critical components.
- **Defer Third-Party Scripts**: Load non-essential scripts after hydration.
- **Conditional Loading**: Only load modules when the corresponding feature or user interaction occurs.

### 3. Server-Side Performance (HIGH)
- **Server Components by Default**: Keep components server-rendered unless client interactivity, state, or browser APIs are needed.
- **Request Deduplication**: Use `React.cache()` for per-request function memoization.
- **Minimize RSC Serialization**: Pass only the necessary primitive props across server-to-client boundaries.
- **Static I/O Hoisting**: Hoist static config and metadata outside request-scoped render loops.

### 4. Re-render Optimization (MEDIUM)
- **State Colocation**: Keep state as close as possible to where it is used.
- **Children as Props**: Use composition (`children`) to prevent child trees from re-rendering when parent state changes.
- **Stable Callbacks and Objects**: Memoize complex computed values or callbacks passed down deep component hierarchies only when measured profiling justifies it.
