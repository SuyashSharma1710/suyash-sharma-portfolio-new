# Suyash Developer Portfolio --- Master Homepage & Platform Execution Plan v2

**Status:** Pre-development / architecture lock\
**Project:** Brand-new portfolio repository\
**Primary route:** `/`\
**Architecture:** Next.js App Router + TypeScript\
**Deployment target:** Vercel\
**Design ambition:** Premium editorial + product engineering +
intelligent systems + controlled motion\
**Primary objective:** Build a portfolio that itself proves the quality
of engineering, product thinking, design judgment, accessibility
discipline, and performance awareness it claims.

------------------------------------------------------------------------

# 0. Executive Decision --- What Changed Before Development

This version supersedes the earlier homepage plan.

The most important discovery is that **development has not started and
this is a completely new repository**. Therefore, we should not carry
forward any assumptions about an existing architecture, dependencies,
components, routes, or styling system.

The project should be intentionally designed from first principles.

## Decisions locked now

### 1. Use current Next.js rather than Next.js 14

Use the current **Next.js 16 Active LTS line** at project initialization
rather than pinning the project to Next.js 14.

Next.js 16.3 is current in September 2026 and the official Next.js
release notes identify 16.3.3 as Active LTS. The App Router is the
preferred architecture for this project and provides Server Components,
route-level rendering, metadata, image/font optimization, and modern
navigation capabilities.

Reference: - https://nextjs.org/docs - https://nextjs.org/blog

### 2. Do not start with a CMS

The earlier plan considered Sanity/Contentful/Payload.

Do **not** add a CMS in v1.

Use typed local content first:

``` text
content/
├── site.ts
├── projects.ts
├── experience.ts
├── capabilities.ts
└── lab.ts
```

Reason:

-   This is a personal portfolio.
-   Content changes are relatively infrequent.
-   A CMS adds authentication, schemas, API calls, preview flows, image
    management, and operational complexity.
-   The portfolio should remain fast and simple.
-   A typed content layer can later be replaced by a CMS without
    changing presentation components if the data contracts are clean.

CMS becomes a later decision if there is a demonstrated need for
non-developer editing.

### 3. Do not install every animation library

Use a deliberate hierarchy:

``` text
CSS
  ↓
IntersectionObserver
  ↓
Motion for React
  ↓
GSAP + ScrollTrigger
  ↓
WebGL / R3F
```

Each layer must justify its existence.

Do not use GSAP, Motion, Lenis, SplitType, Three.js, and other libraries
simply because they are available.

### 4. SVG is the hero baseline

The hero system visualization begins as SVG.

Only introduce Canvas or React Three Fiber if the SVG version fails to
deliver the intended art direction.

### 5. No blocking preloader

The website must render meaningful content immediately.

The opening sequence is an enhancement, not a gate.

### 6. The portfolio is a product, not a résumé

The information architecture is being changed from:

``` text
hero → sections → footer
```

to a stronger narrative:

``` text
ORIENT
  ↓
POSITION
  ↓
PROVE
  ↓
EXPLAIN
  ↓
DEMONSTRATE DEPTH
  ↓
SHOW PERSONALITY
  ↓
CONVERT
```

Every section must answer a visitor question.

### 7. Homepage and project case studies are one system

The homepage should not attempt to explain every project.

It should create enough confidence and curiosity to make the visitor
open a project.

Project detail pages will provide the deeper proof.

------------------------------------------------------------------------

# 1. Product Thesis

The portfolio should communicate:

> **I build serious digital products where engineering, design, and
> intelligence meet.**

The website itself must prove that statement.

A visitor should leave understanding:

1.  Who Suyash is.
2.  What he builds.
3.  What kinds of problems he solves.
4.  How strong his engineering foundation is.
5.  What projects demonstrate those abilities.
6.  What makes his approach different.
7.  How to start a conversation.

## Desired emotional progression

``` text
INTEREST
   ↓
CLARITY
   ↓
CURIOSITY
   ↓
CREDIBILITY
   ↓
CONFIDENCE
   ↓
ACTION
```

## The site should feel

``` text
EDITORIAL
+
TECHNICAL
+
PRECISE
+
INTELLIGENT
+
EXPERIMENTAL
+
HUMAN
```

## It should not feel

-   Like a résumé PDF converted into HTML.
-   Like a generic developer template.
-   Like a SaaS marketing page.
-   Like a Three.js showcase with no substance.
-   Like an animation demo.
-   Like a wall of technology logos.
-   Like an agency website pretending to be a personal portfolio.
-   Like a clone of the reference websites.

------------------------------------------------------------------------

# 2. Reference-Site Learning Framework

The four reference sites:

1. https://grigoletti.ch/en/
2. https://huyml.co/
3. https://khanhnguyen.design/
4. https://madeinuxstudio.com/

The reference sites are inspiration sources, not implementation
templates.

Study them for:

-   pacing
-   whitespace
-   typography
-   editorial composition
-   visual hierarchy
-   image treatment
-   transitions
-   interaction restraint
-   navigation behavior
-   storytelling
-   art direction

Do not reproduce:

-   exact layouts
-   exact animations
-   distinctive compositions
-   copy
-   visual identities
-   branded interactions
-   proprietary assets

The final design must have its own visual language.

### Core Architectural Directive: Zero-Box Policy / Open Editorial Canvas
As analyzed directly from **grigoletti.ch** and **madeinuxstudio.com**:
- **Neither reference site utilizes trapped cards or dashboard-style boxes**.
- Everything breathes in **open editorial layout** directly on the unified paper canvas.
- Absolute ban on:
  - Mock widget boxes with header pills, inner grid boxes, and grey footer containers.
  - Box-inside-a-box layouts.
  - Floating grey cards that fragment the page into isolated islands.
- All separation must rely on generous whitespace and architectural 1px hairlines.

------------------------------------------------------------------------

# 3. Brand Narrative

The previous positioning is good but should become more specific.

## Primary positioning

> **Digital Engineer building products where engineering, design, and
> intelligence meet.**

## Supporting proposition

> I turn complex technical problems into fast, clear, and useful digital
> products.

## Proof pillars

``` text
PRODUCT ENGINEERING
AI & INTELLIGENT SYSTEMS
FULL-STACK ARCHITECTURE
INTERACTION & EXPERIENCE
PERFORMANCE
```

These pillars should appear throughout the site rather than as one
isolated "skills" section.

## Narrative principle

Do not repeatedly say:

> I am a full-stack developer.

Instead, demonstrate it:

``` text
PROJECT
→
PROBLEM
→
SYSTEM
→
DECISION
→
RESULT
```

This becomes especially important on case-study pages.

------------------------------------------------------------------------

# 4. Technology Architecture

## Core

``` text
Next.js 16.x
React via App Router
TypeScript strict
pnpm
Vercel
```

Use the current supported Next.js Active LTS version when the repository
is created rather than hardcoding an old version.

Next.js App Router uses Server Components by default, allowing
server-rendered content and smaller client-side JavaScript boundaries.

## TypeScript

Use:

``` json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitOverride": true
}
```

Also enforce:

-   no `any` unless explicitly justified
-   typed content models
-   typed component props
-   typed analytics events
-   typed navigation
-   typed animation configuration
-   typed API responses

------------------------------------------------------------------------

# 5. Styling Architecture

## Recommendation

Use **CSS Modules + global design tokens** as the primary styling
architecture.

Do not make Tailwind mandatory.

Why:

-   This is a highly art-directed site.
-   Large editorial layouts benefit from explicit CSS.
-   Motion and visual geometry become easier to reason about.
-   Design tokens remain centralized.
-   Markup stays readable.
-   The site avoids utility-class noise.

Tailwind may be introduced only if a concrete reason appears during
implementation.

## Structure

``` text
styles/
├── globals.css
├── tokens.css
├── typography.css
├── utilities.css
└── motion.css
```

Component-local styles:

``` text
components/
└── hero/
    ├── Hero.tsx
    └── Hero.module.css
```

------------------------------------------------------------------------

# 6. Design Token System

Define tokens before building sections.

## Color

Start restrained:

``` text
paper
ink
muted
line
accent
surface-dark
surface-light
```

Use one primary accent.

Do not create a large palette.

## Spacing

Use a fluid scale rather than arbitrary values.

## Typography

Use:

``` text
Display
Body
Mono / metadata
```

Prefer a distinctive display face paired with a highly readable
interface face.

Possible directions:

``` text
Display:
Instrument Serif
Fraunces
Syne
Space Grotesk

Interface:
Manrope
DM Sans
IBM Plex Sans
```

Do not select fonts only from a list. The final choice should be made
after testing:

-   large headlines
-   navigation
-   project titles
-   mobile wrapping
-   numerals
-   accessibility
-   file weight

## Typography principle

Typography should do more design work than decorative effects.

------------------------------------------------------------------------

# 7. Full Site Information Architecture

The homepage is the front door to the full product.

``` text
/
├── Hero
├── Positioning
├── Selected Work
├── Capabilities
├── Engineering
├── Experience
├── Lab
├── About
├── Final CTA
└── Footer

/work
/work/[slug]

/lab
/lab/[slug]

/about

/contact

/resume
```

Potential future routes:

``` text
/notes
/uses
/now
```

Do not create them until there is meaningful content.

------------------------------------------------------------------------

# 8. Homepage Narrative Architecture

Final sequence:

``` text
01 — ORIENTATION
Hero

02 — POSITION
What I believe / build

03 — PROOF
Selected work

04 — CAPABILITY
What I build

05 — DEPTH
Engineering system

06 — EXPERIENCE
Selected experience

07 — CURIOSITY
Lab

08 — PERSON
About

09 — CONVERSION
Contact

10 — CONTINUITY
Footer
```

This is stronger than treating every section as equally important.

------------------------------------------------------------------------

# 9. Navigation

## Desktop

``` text
SUYASH®

WORK    LAB    ABOUT    CONTACT

● AVAILABLE
```

Optional:

``` text
RESUME ↗
```

## Behavior

Initial state:

-   transparent
-   minimal
-   readable over hero

Scrolled state:

-   subtle background
-   border
-   backdrop treatment if needed
-   no excessive animation

Do not hide navigation aggressively on scroll.

## Mobile

Full-screen editorial menu.

Requirements:

-   focus trap
-   Escape
-   body scroll lock
-   visible close control
-   semantic navigation
-   keyboard support
-   reduced-motion state
-   direct route links

Use a small client component only for the interactive state.

------------------------------------------------------------------------

# 10. Hero --- Most Important Section

The hero is not just an introduction.

It is the **thesis of the portfolio**.

## Primary copy

``` text
DIGITAL ENGINEER

I BUILD
DIGITAL
SYSTEMS.
```

Secondary idea:

``` text
THAT FEEL SIMPLE.
```

Supporting statement:

> I build digital products across full-stack engineering, AI, SaaS, and
> modern web experiences.

CTA:

``` text
VIEW WORK →
START A CONVERSATION →
```

Availability:

``` text
● AVAILABLE FOR SELECTED PROJECTS
```

The availability state must be real and content-driven.

------------------------------------------------------------------------

# 11. Hero Visual System

Create an abstract system map.

Possible nodes:

``` text
CODE
AI
DATA
DESIGN
PRODUCT
SYSTEMS
```

Central concept:

``` text
PRODUCT
```

Connections represent relationships between disciplines.

## Interaction

Desktop:

-   subtle pointer response
-   node attraction
-   connection movement
-   restrained hover labels
-   scroll-linked reconfiguration

Mobile:

-   simplified SVG
-   reduced movement
-   no heavy pointer logic

Reduced motion:

-   static or gently animated final state

## Critical rule

The visualization is **supporting evidence**, not the message.

If the visitor remembers the visual but cannot tell what you do, the
hero failed.

------------------------------------------------------------------------

# 12. Hero Rendering Strategy

### Initial render

``` text
Semantic HTML
+
static SVG
+
CSS
```

### Enhancement

After interaction capability is known:

``` text
pointer response
+
GSAP timeline
```

### Optional future enhancement

``` text
R3F / Three.js
```

Only if the 3D version creates a meaningful improvement.

Never make WebGL the only hero implementation.

------------------------------------------------------------------------

# 13. Opening Sequence

No preloader.

Sequence:

``` text
Eyebrow
↓
Headline
↓
Supporting line
↓
CTA
↓
System activation
```

Target:

``` text
700–1100ms
```

The visitor must be able to:

-   click
-   scroll
-   navigate
-   read

during the sequence.

Reduced motion:

``` text
show final state immediately
```

------------------------------------------------------------------------

# 14. Positioning Section

Purpose:

Convert the visual impression into intellectual clarity.

Possible statement:

``` text
I BUILD PRODUCTS
WHERE ENGINEERING,
DESIGN AND
INTELLIGENCE MEET.
```

Supporting copy:

> From AI-powered platforms to scalable web applications, I turn complex
> technical problems into products that feel clear, fast, and intuitive.

Animation:

-   line reveal
-   restrained movement
-   emphasis on selected words

Do not animate every word.

------------------------------------------------------------------------

# 15. Selected Work

This is the primary proof section.

Do not use a generic card grid.

Use an editorial sequence.

Example:

``` text
01

NEXUSSEARCH
AI SEARCH / INTELLIGENCE

[ LARGE VISUAL ]

NEXT.JS · TYPESCRIPT · AI · POSTGRESQL

VIEW CASE STUDY →
```

Each project must have:

``` ts
type Project = {
  slug: string
  title: string
  category: string
  year: number
  summary: string
  description: string
  featured: boolean
  cover: ProjectImage
  technologies: string[]
  href: string
  role?: string
}
```

Only include `role` when accurate.

No fabricated outcomes.

------------------------------------------------------------------------

# 16. Project Case Study Architecture

This is a structural addition to the earlier plan.

A portfolio of this quality needs project pages that can prove
engineering depth.

Each `/work/[slug]` page should support:

``` text
Project Hero
↓
Context
↓
Problem
↓
Approach
↓
System / Architecture
↓
Key Decisions
↓
Interaction / UI
↓
Technical Implementation
↓
Challenges
↓
Outcome
↓
Learnings
↓
Next Project
```

Not every project needs every block.

The content model should be flexible.

## Case study rule

Do not write:

> Built using Next.js, React, Node.js...

as the primary story.

Explain:

> Why this architecture was selected.

This demonstrates engineering judgment.

------------------------------------------------------------------------

# 17. Project Media System

Each project should support:

``` text
hero image
gallery
video / motion preview
architecture diagram
screenshots
optional interactive demo
```

All media must have:

-   dimensions
-   alt text
-   loading strategy
-   focal point when needed
-   optimized format

No giant original images in the browser.

------------------------------------------------------------------------

# 18. Project Interaction

Desktop:

-   cursor label
-   image movement
-   subtle image scaling
-   title emphasis

Keyboard:

-   equivalent focus treatment
-   no hover-only information

Mobile:

-   normal tap behavior
-   no fake cursor
-   no pointer simulation

------------------------------------------------------------------------

# 19. Capabilities

Heading:

``` text
WHAT I BUILD
```

Four primary capabilities:

``` text
01 — DIGITAL PRODUCTS
02 — AI SYSTEMS
03 — FULL-STACK SYSTEMS
04 — E-COMMERCE
```

Each should answer:

``` text
What?
Why?
Where?
```

Example:

``` text
AI SYSTEMS

Search, retrieval, intelligent workflows,
LLM interfaces and automation.

Used when the product needs
reasoning, discovery or automation.
```

Do not make the section a skills checklist.

------------------------------------------------------------------------

# 20. Engineering Section

Purpose:

Demonstrate technical depth without becoming a résumé.

Group by system:

``` text
FRONTEND
React
Next.js
TypeScript
CSS

BACKEND
Node.js
APIs
PostgreSQL
Prisma

AI
LLM APIs
RAG
Vector Search
AI Agents

INFRASTRUCTURE
Docker
Cloud
CI/CD
GitHub
```

Only list technologies genuinely used.

## Better than proficiency bars

Use evidence:

``` text
NEXT.JS

USED IN
NexusSearch
Project X

ROLE
Application architecture
Rendering
Performance
```

This is much more credible than:

``` text
Next.js — 95%
```

------------------------------------------------------------------------

# 21. Experience

Do not reproduce a résumé.

Use selected proof.

``` text
2026
FULL-STACK / AI
Project / Company
Short accurate impact statement

2025
PRODUCT ENGINEERING
Project / Company
Short accurate impact statement
```

Never invent:

-   metrics
-   clients
-   job titles
-   technologies
-   achievements

If no quantitative evidence exists, use precise qualitative language.

------------------------------------------------------------------------

# 22. Lab

The Lab exists to demonstrate curiosity and experimental range.

Themes:

``` text
WEBGL
AI INTERFACES
MOTION
GENERATIVE UI
PHYSICS
CREATIVE CODE
```

The Lab must not compromise the homepage.

Each experiment gets:

``` text
title
concept
status
technology
performance expectation
fallback
```

Possible statuses:

``` text
EXPERIMENTAL
PROTOTYPE
ACTIVE
ARCHIVED
```

------------------------------------------------------------------------

# 23. About

Keep it short.

Structure:

``` text
ABOUT

Who I am

What I currently build

What I am exploring

How I think
```

Avoid a long autobiography.

The About page can contain the deeper story.

------------------------------------------------------------------------

# 24. Final CTA

Strong visual moment.

``` text
LET'S BUILD
SOMETHING
INTERESTING.
```

Supporting copy:

> Have a product, system, or ambitious idea in mind? Let's talk.

Actions:

``` text
START A CONVERSATION →
EMAIL ME →
```

Use:

-   strong color transition
-   oversized type
-   controlled geometry

Do not rely on a giant gradient.

------------------------------------------------------------------------

# 25. Footer

``` text
SUYASH®

DIGITAL ENGINEER
AI · FULL-STACK · PRODUCT

GITHUB
LINKEDIN
EMAIL

INDIA · 2026
```

Optional:

-   availability
-   local time
-   resume

Local time must remain decorative.

------------------------------------------------------------------------

# 26. Motion Architecture

Use three layers.

## Layer 1 --- CSS

Use for:

-   hover
-   focus
-   color
-   opacity
-   simple transforms
-   button states
-   underline transitions

## Layer 2 --- Motion for React

Use for:

-   menu
-   accordion
-   presence
-   modal
-   local layout transitions

## Layer 3 --- GSAP

Use for:

-   hero choreography
-   ScrollTrigger
-   project scene transitions
-   complex timeline relationships
-   large coordinated transformations

Do not mix Motion and GSAP on the same element unless explicitly
justified.

------------------------------------------------------------------------

# 27. Lenis Decision

Do not install Lenis initially.

First build with native scrolling.

Evaluate after the first complete visual prototype.

Add Lenis only if:

1.  native scrolling prevents the desired visual choreography,
2.  the experience measurably improves,
3.  accessibility remains correct,
4.  mobile behavior remains natural.

Native scrolling is the default.

------------------------------------------------------------------------

# 28. Split Text Decision

Do not install SplitType initially.

Use CSS line-based reveal techniques where possible.

If a specific hero/statement requires controlled word/line choreography:

-   evaluate lightweight DOM splitting
-   preserve semantic text
-   recalculate on resize
-   disable under reduced motion

------------------------------------------------------------------------

# 29. Cursor System

Desktop enhancement only.

Architecture:

``` text
one DOM element
+
one shared pointer listener
+
requestAnimationFrame
+
transform: translate3d()
```

Do not attach pointer listeners to every project.

Do not replace the cursor on:

-   touch devices
-   reduced motion
-   accessibility contexts

Cursor effects are decorative.

------------------------------------------------------------------------

# 30. Performance Architecture

The portfolio must be fast because performance is part of the
portfolio's credibility.

## Core rule

Server-render as much as possible.

Client components should exist only where required.

Examples:

``` text
Server:
Hero copy
Project data
Experience
About
Footer
SEO

Client:
Mobile menu
Hero interaction
Cursor
GSAP scenes
Accordions
Analytics event handlers
WebGL
```

Next.js Server Components can reduce client JavaScript by keeping data
fetching and rendering on the server and shipping interactive components
only where needed.

------------------------------------------------------------------------

# 31. Performance Budgets

Do not define one arbitrary universal JavaScript limit as a pass/fail
condition.

Instead define budgets by responsibility.

Track:

``` text
Initial client JS
Hero JS
Animation JS
WebGL JS
Image weight
Font weight
Total page transfer
Long tasks
CLS
LCP
INP
```

Goals:

``` text
LCP: strong Core Web Vital performance
INP: responsive interactions
CLS: near-zero
No blocking preloader
No long-running animation loops
No unnecessary hydration
```

Use Lighthouse and real performance profiling rather than optimizing
only synthetic scores.

------------------------------------------------------------------------

# 32. WebGL Strategy

Three.js is not part of the baseline bundle.

If required:

``` text
dynamic import
+
ssr: false where appropriate
+
fallback
+
capability detection
```

Decision tree:

``` text
Can SVG achieve the visual?
        ↓ yes
      SVG

        ↓ no

Can Canvas achieve it?
        ↓ yes
      Canvas

        ↓ no

Is actual 3D valuable?
        ↓ yes
      R3F / Three.js
```

Never:

``` text
Three.js because portfolio = impressive
```

------------------------------------------------------------------------

# 33. Reduced Motion

Reduced motion must be a first-class state.

When enabled:

-   disable cursor interpolation
-   disable smooth scrolling
-   skip complex entrance choreography
-   disable WebGL enhancement
-   remove large transforms
-   show final content immediately
-   preserve meaningful interaction
-   preserve navigation

Implement both:

``` css
prefers-reduced-motion
```

and JavaScript detection where needed.

Do not rely solely on a CSS global override because WebGL, GSAP
timelines, and pointer systems require explicit behavioral handling.

------------------------------------------------------------------------

# 34. Responsive Strategy

Do not treat mobile as desktop scaled down.

## Desktop

Full experience:

-   large typography
-   SVG system interaction
-   cursor
-   hover
-   rich project transitions
-   advanced visual choreography

## Tablet

Reduce:

-   visual density
-   movement distance
-   node count
-   typography scale

## Mobile

Use:

-   simplified hero
-   static/light SVG
-   native scrolling
-   tap interactions
-   accordion capabilities
-   normal cursor
-   simplified project transitions

Test:

``` text
320
375
390
430
768
1024
1280
1440+
```

------------------------------------------------------------------------

# 35. Accessibility

Required:

-   semantic HTML
-   skip link
-   heading hierarchy
-   keyboard navigation
-   visible focus
-   accessible menu
-   accessible accordion
-   descriptive alt text
-   contrast
-   reduced motion
-   200% zoom
-   no hover-only critical content
-   no content dependent on JavaScript for basic reading

Testing:

``` text
eslint-plugin-jsx-a11y
axe-core
@axe-core/playwright
Lighthouse
VoiceOver
NVDA
keyboard-only
```

------------------------------------------------------------------------

# 36. SEO Architecture

Use Next.js Metadata APIs.

Global:

``` text
title
description
canonical
Open Graph
Twitter/X
icons
robots
sitemap
```

Structured data:

``` text
Person
WebSite
```

Project pages:

``` text
CreativeWork / SoftwareApplication where appropriate
```

Only use schema types that accurately describe the content.

Do not add structured data merely for SEO theater.

------------------------------------------------------------------------

# 37. Content Architecture

Recommended:

``` text
content/
├── site.ts
├── projects.ts
├── experience.ts
├── capabilities.ts
└── lab.ts
```

Types:

``` text
Project
ProjectImage
Experience
Capability
LabExperiment
SocialLink
SiteConfig
```

The UI must never know where content comes from.

This creates a clean future path:

``` text
local typed content
        ↓
optional CMS
        ↓
same component contracts
```

------------------------------------------------------------------------

# 38. Contact Architecture

Do not rely only on:

``` text
mailto:
```

Provide a real contact form when the contact experience is implemented.

Architecture:

``` text
Client form
   ↓
Server Action or Route Handler
   ↓
Zod validation
   ↓
spam protection
   ↓
email provider
   ↓
success / failure state
```

Do not expose email provider secrets in the client.

Potential provider:

-   Resend
-   another transactional email service

Choose one only when implementing the contact feature.

------------------------------------------------------------------------

# 39. Analytics Architecture

Use privacy-conscious analytics.

Preferred initial choice:

``` text
Plausible
```

Track:

``` text
project_open
case_study_open
resume_click
github_click
linkedin_click
contact_open
contact_submit
lab_open
```

Do not track:

-   every scroll
-   every hover
-   pointer movement
-   unnecessary personal information

Analytics must never block rendering.

------------------------------------------------------------------------

# 40. Error and Resilience Strategy

The site should behave well when things fail.

Provide:

``` text
loading.tsx
error.tsx
not-found.tsx
```

For media:

-   fallback image
-   controlled aspect ratio
-   meaningful alt
-   no broken layout

For interactive scenes:

``` text
interactive unavailable
        ↓
static fallback
```

The content remains usable.

------------------------------------------------------------------------

# 41. Security Baseline

Even a portfolio needs sane security.

Implement:

-   security headers where appropriate
-   strict environment variable handling
-   no secrets in client bundles
-   server-side form validation
-   spam protection
-   safe external links
-   dependency auditing
-   updated framework patches
-   no unnecessary API endpoints

Contact forms are the primary public attack surface.

------------------------------------------------------------------------

# 42. Repository Architecture

Because this is a new repo, start clean.

``` text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── lab/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── resume/
│   │   └── page.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── intro/
│   ├── projects/
│   ├── capabilities/
│   ├── engineering/
│   ├── experience/
│   ├── lab/
│   ├── about/
│   ├── contact/
│   ├── footer/
│   ├── motion/
│   └── ui/
│
├── content/
│   ├── site.ts
│   ├── projects.ts
│   ├── experience.ts
│   ├── capabilities.ts
│   └── lab.ts
│
├── lib/
│   ├── analytics/
│   ├── email/
│   ├── seo/
│   ├── motion/
│   └── utils/
│
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   ├── typography.css
│   ├── utilities.css
│   └── motion.css
│
└── types/
    ├── content.ts
    ├── analytics.ts
    └── motion.ts

public/
├── images/
│   ├── projects/
│   ├── lab/
│   └── og/
├── fonts/
└── icons/

tests/
├── unit/
└── e2e/
```

------------------------------------------------------------------------

# 43. Component Architecture

Create meaningful components.

Core:

``` text
Container
Section
Eyebrow
Heading
Button
StatusIndicator
ProjectCard
ProjectMeta
Reveal
SectionLabel
TechTag
Accordion
```

Motion:

``` text
Reveal
SplitText
Cursor
PageTransition
```

Hero:

``` text
Hero
HeroVisual
HeroSystem
HeroActions
```

Project:

``` text
ProjectList
ProjectItem
ProjectMedia
ProjectMeta
```

Do not create components merely because a `<div>` exists.

------------------------------------------------------------------------

# 44. Dependency Policy

Before adding anything:

1.  Can CSS solve it?
2.  Can a browser API solve it?
3.  Can the existing stack solve it?
4.  Is it required for accessibility?
5.  Is it required for performance?
6.  Does it increase client JavaScript?
7.  Does it create hydration risk?
8.  Does it create a second abstraction for an existing problem?

## Baseline dependencies

Start with only:

``` text
next
react
typescript
```

Then add only justified packages.

Likely additions:

``` text
gsap
motion
```

Conditional:

``` text
zod
resend
plausible
react-three-fiber
three
@react-three/drei
```

Do not add:

``` text
Lenis
SplitType
PixiJS
Radix
CMS
date-fns
Turborepo
```

until a real requirement exists.

------------------------------------------------------------------------

# 45. Testing Strategy

Use:

``` text
TypeScript
ESLint
Vitest
React Testing Library
Playwright
axe-core
Lighthouse
```

## Unit tests

Focus on:

-   content transformations
-   navigation
-   accessible accordion
-   contact validation
-   analytics event construction
-   utility functions

Do not waste time snapshot-testing every visual wrapper.

## E2E tests

Critical paths:

``` text
homepage loads
navigation works
mobile menu works
project page opens
back/forward works
contact form validates
contact form submits
reduced motion works
404 works
```

------------------------------------------------------------------------

# 46. CI/CD

Every pull request should run:

``` text
typecheck
lint
unit tests
build
e2e smoke tests
accessibility smoke test
```

Production:

``` text
main
 ↓
CI
 ↓
Vercel preview
 ↓
visual QA
 ↓
production
```

Do not merge with:

-   TypeScript errors
-   lint errors
-   hydration errors
-   failed builds
-   accessibility regressions

------------------------------------------------------------------------

# 47. Development Phases --- Revised

Because the repository is brand new, remove the old "repository
audit/reuse" phase.

## Phase 0 --- Architecture Lock

Before writing UI:

-   initialize Next.js
-   configure TypeScript
-   configure lint
-   configure formatting
-   establish folder structure
-   establish aliases
-   establish design tokens
-   establish content contracts
-   establish performance budgets
-   establish accessibility baseline
-   establish CI

Deliverable:

``` text
Clean production-ready foundation
```

## Phase 1 --- Brand / Design System

Implement:

-   fonts
-   color
-   spacing
-   typography
-   buttons
-   container
-   section primitives
-   metadata
-   responsive breakpoints

Deliverable:

``` text
Visual system without page-specific content
```

## Phase 2 --- Static Homepage

Implement all sections without advanced animation.

Deliverable:

``` text
Complete responsive homepage
```

This phase is mandatory before motion.

## Phase 3 --- Hero System

Implement:

-   SVG
-   entry choreography
-   pointer response
-   reduced-motion fallback
-   mobile fallback

Deliverable:

``` text
Hero experience
```

## Phase 4 --- Project System

Implement:

-   project content model
-   project list
-   project media
-   project routes
-   case-study structure

Deliverable:

``` text
Reusable project platform
```

## Phase 5 --- Motion

Add:

1.  CSS micro-interactions
2.  reveals
3.  project interactions
4.  capability interaction
5.  hero choreography
6.  cursor
7.  page transitions

Measure after every major addition.

## Phase 6 --- Contact / Analytics

Implement:

-   form
-   validation
-   email
-   spam protection
-   analytics

## Phase 7 --- Optional Advanced Rendering

Only now evaluate:

``` text
Lenis
Canvas
R3F
Three.js
```

Each requires a written justification.

## Phase 8 --- Performance

Run:

-   production build
-   Lighthouse
-   Web Vitals
-   Chrome Performance
-   mobile throttling
-   Safari testing
-   bundle analysis

## Phase 9 --- Accessibility

Run:

-   axe
-   keyboard
-   screen reader
-   reduced motion
-   200% zoom
-   contrast

## Phase 10 --- Final QA

Test:

``` text
Chrome
Safari
Firefox
Edge

iPhone
Android
tablet
desktop
```

------------------------------------------------------------------------

# 48. Implementation Order

Final order:

``` text
01. Architecture lock
        ↓
02. Next.js foundation
        ↓
03. TypeScript + lint + CI
        ↓
04. Design tokens
        ↓
05. Typography
        ↓
06. Global layout
        ↓
07. Navigation
        ↓
08. Static homepage
        ↓
09. Hero SVG
        ↓
10. Selected work
        ↓
11. Project detail architecture
        ↓
12. Capabilities
        ↓
13. Engineering
        ↓
14. Experience
        ↓
15. Lab
        ↓
16. About
        ↓
17. CTA
        ↓
18. Footer
        ↓
19. Responsive QA
        ↓
20. CSS interactions
        ↓
21. Motion system
        ↓
22. Hero choreography
        ↓
23. Scroll choreography
        ↓
24. Cursor
        ↓
25. Page transitions
        ↓
26. Contact backend
        ↓
27. Analytics
        ↓
28. SEO
        ↓
29. Accessibility
        ↓
30. Performance
        ↓
31. Cross-browser QA
        ↓
32. Production verification
```

------------------------------------------------------------------------

# 49. Hard Development Guardrails

## Architecture

1.  This is a greenfield project.
2.  Do not create unnecessary abstractions.
3.  Server Components are the default.
4.  Client Components require a reason.
5.  Content is separated from presentation.
6.  Routes are intentionally designed before implementation.

## Design

7.  Do not clone the reference sites.
8.  Do not use generic portfolio templates.
9.  Do not let animation compensate for weak design.
10. Typography must carry significant visual weight.
11. Every section must have a narrative purpose.

## Animation

12. CSS before JavaScript.
13. Motion before GSAP for local interactions.
14. GSAP only for coordinated scenes.
15. No perpetual animation without purpose.
16. No animation required to understand content.
17. Reduced motion is designed, not patched.

## Performance

18. No blocking preloaders.
19. No unnecessary WebGL.
20. No giant client bundle.
21. No raw pointer React state updates.
22. No expensive scroll listeners.
23. No unoptimized project media.
24. No giant fonts.
25. No unnecessary hydration.

## Content

26. Never invent metrics.
27. Never invent clients.
28. Never invent roles.
29. Never invent technologies.
30. Never invent outcomes.
31. Use evidence-based case studies.

## Accessibility

32. Keyboard must work.
33. Screen readers must understand the content.
34. Hover must never be the only interaction.
35. Focus must always be visible.
36. 200% zoom must work.
37. Reduced motion must work.

------------------------------------------------------------------------

# 50. Definition of Done

## Product

-   [ ] Visitor understands positioning within seconds.
-   [ ] Selected work creates curiosity.
-   [ ] Engineering credibility is visible.
-   [ ] Personality is present.
-   [ ] CTA is obvious.
-   [ ] Homepage leads naturally to case studies.

## Design

-   [ ] Original visual identity
-   [ ] Strong typography
-   [ ] Intentional whitespace
-   [ ] Consistent design tokens
-   [ ] Responsive composition
-   [ ] No generic template feel

## Engineering

-   [ ] Next.js current supported version
-   [ ] Strict TypeScript
-   [ ] Server Components by default
-   [ ] Typed content models
-   [ ] Clean component boundaries
-   [ ] Production build passes
-   [ ] No hydration errors
-   [ ] No console errors

## Motion

-   [ ] Hero sequence
-   [ ] Hero system interaction
-   [ ] Scroll reveals
-   [ ] Project interaction
-   [ ] Capability interaction
-   [ ] Cursor enhancement
-   [ ] Page transition where justified
-   [ ] Reduced-motion fallback

## Accessibility

-   [ ] Keyboard navigation
-   [ ] Screen reader checks
-   [ ] Visible focus
-   [ ] Contrast
-   [ ] Semantic HTML
-   [ ] Reduced motion
-   [ ] 200% zoom
-   [ ] Accessible forms

## Performance

-   [ ] No blocking preloader
-   [ ] Stable layout
-   [ ] Optimized images
-   [ ] Optimized fonts
-   [ ] Controlled client JavaScript
-   [ ] Deferred expensive effects
-   [ ] WebGL optional and lazy
-   [ ] Performance tested on throttled hardware
-   [ ] Core Web Vitals checked

## SEO

-   [ ] Metadata
-   [ ] Canonical
-   [ ] Open Graph
-   [ ] Sitemap
-   [ ] Robots
-   [ ] Structured data
-   [ ] Project metadata
-   [ ] Favicon

## Reliability

-   [ ] Loading states
-   [ ] Error states
-   [ ] 404
-   [ ] Image fallback
-   [ ] Direct URL navigation
-   [ ] Browser back/forward
-   [ ] Slow network
-   [ ] JavaScript delayed/failure behavior

------------------------------------------------------------------------

# 51. Final Strategic Principle

The portfolio should not try to prove that Suyash knows every
technology.

It should prove something more valuable:

> **Suyash knows how to choose technology, design systems, make
> trade-offs, and turn complexity into a product that feels simple.**

That principle should govern the entire implementation.

The strongest version of this portfolio will therefore be:

``` text
LESS TECHNOLOGY THEATER
+
MORE ENGINEERING JUDGMENT

LESS ANIMATION
+
MORE INTENTIONAL MOTION

LESS INFORMATION
+
BETTER PROOF

LESS DEPENDENCIES
+
BETTER ARCHITECTURE

LESS TEMPLATE
+
MORE IDENTITY
```

The final experience should make the visitor think:

> **This person can build serious digital products --- and understands
> how to make them feel exceptional.**
