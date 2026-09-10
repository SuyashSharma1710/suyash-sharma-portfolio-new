---
name: gsap-react
description: Official GSAP guidelines for React and Next.js applications — useGSAP hook, scoping, refs, cleanup, SSR-safety, and timeline lifecycle management.
---

# GSAP with React

Authoritative guide for integrating GreenSock Animation Platform (GSAP) with React and Next.js.

## When to Apply
- Creating animations in React or Next.js components
- Using the `@gsap/react` `useGSAP()` hook
- Managing animation cleanup, scoping, and React StrictMode lifecycles
- Coordinating multi-element tweens and timelines

## Core Integration Rules

### 1. Always Use `useGSAP()` Hook
In modern React and Next.js, use `@gsap/react`'s `useGSAP()` instead of standard `useEffect()`.
- Automatically handles garbage collection and animation cleanup upon component unmount.
- Prevents double-invocation issues in React StrictMode.
- Provides built-in element scoping.

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function AnimatedBox() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".box", { x: 100, duration: 1 });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className="box">Content</div>
    </div>
  );
}
```

### 2. Element Scoping and Refs
- Always provide a container `ref` as `{ scope: containerRef }`.
- Scoping ensures selector queries (`".box"`) target only children within the component DOM boundary.
- Avoid global document queries (`document.querySelector`).

### 3. Next.js Client Boundary
- GSAP DOM animations require browser APIs and must be placed inside Client Components (`"use client"`).
- Keep GSAP animation wrappers isolated as leaf components around server-rendered static content.
