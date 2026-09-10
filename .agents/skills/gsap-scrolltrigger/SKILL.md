---
name: gsap-scrolltrigger
description: Official GSAP ScrollTrigger guidelines — scroll-driven animations, pinning, scrubbing, trigger points, mobile considerations, and layout refresh handling.
---

# GSAP ScrollTrigger

Authoritative guide for implementing scroll-driven animations and scroll interactions with GSAP ScrollTrigger.

## When to Apply
- Implementing scroll-linked animations or reveal effects
- Pinning sections or coordinating horizontal scroll containers
- Setting up scrubbed progress timelines linked to page scroll
- Managing ScrollTrigger recalculations on resize or font load

## Core Rules & Best Practices

### 1. Plugin Registration
Register `ScrollTrigger` globally once in client modules before instantiating triggers:

```tsx
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
```

### 2. ScrollTrigger with `useGSAP()`
Always initialize `ScrollTrigger` instances inside `useGSAP()` with a component `scope` so triggers are killed automatically on unmount:

```tsx
useGSAP(
  () => {
    gsap.from(".card", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".card-container",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  },
  { scope: containerRef }
);
```

### 3. Pinning Guidelines
- Pin the trigger container, not child elements directly inside the active animation.
- Ensure `pinSpacing: true` is maintained unless explicit overlay behavior is intended.
- Avoid heavy layout calculations inside scroll loop callbacks.

### 4. Layout Changes & Refresh
- Call `ScrollTrigger.refresh()` if dynamic content loads, fonts render, or accordion panels change heights.
- Test scroll trigger behavior on both desktop and mobile viewports.
