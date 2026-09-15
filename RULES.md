# RULES.md — Suyash Developer Portfolio

> **STATUS: MANDATORY**
>
> This file is the governing implementation contract for the portfolio.
> The implementation agent MUST follow this file and the Master Plan.
> When a requested implementation conflicts with either, STOP and ask for clarification.
> Do not invent requirements, features, pages, libraries, interactions, copy, data, metrics, or architecture.

---

# 0. MANDATORY PRE-CHANGE CHECK

This rule applies before **every** implementation, modification, installation, deletion, refactor, configuration change, or architectural decision.

The agent **MUST NOT** immediately start making changes.

Before changing anything, perform this sequence:

```text
REQUEST
↓
READ RULES.md
↓
READ MASTER PLAN
↓
IDENTIFY THE EXACT TASK
↓
CHECK AVAILABLE SKILLS
↓
IF A RELEVANT SKILL EXISTS → READ / USE IT
↓
CHECK PROJECT CONSTRAINTS
↓
CHECK EXISTING IMPLEMENTATION
↓
CHECK DEPENDENCIES
↓
CHECK PERFORMANCE / ACCESSIBILITY / SECURITY IMPACT
↓
IMPLEMENT
↓
VERIFY
```

---

## Step 1 — Identify the task

Determine exactly what is being requested.

Do not expand the request.

Separate:

```text
REQUIRED
OPTIONAL
ASSUMED
```

Only implement REQUIRED items unless optional items are explicitly approved.

---

## Step 2 — Check available skills

Before implementation, inspect the available agent skills/tools for a skill relevant to the requested work.

Examples:

```text
Next.js change          → Next.js skill
React component         → React best-practices skill
UI/design change        → Web Design Guidelines skill
GSAP animation          → GSAP React skill
GSAP ScrollTrigger      → GSAP ScrollTrigger skill
Accessibility work      → accessibility/design-guidelines skill
Testing                 → relevant testing skill
Performance             → relevant performance skill
Vercel/deployment       → relevant Vercel skill
```

### Mandatory rule

If a relevant, approved skill exists:

**USE THE SKILL.**

Do not ignore an applicable skill and implement from memory when the skill is available.

The skill provides implementation guidance.

It does **NOT** override:

```text
User instructions
↓
RULES.md
↓
Master Plan
```

---

## Step 3 — Check all project constraints

Before making the change, verify the change against:

**Scope** — Does the change introduce functionality that was not requested?

**Architecture** — Does it follow the approved architecture?

**Dependencies** — Does it require a new package?

If yes:

- Why is it required?
- Is an existing dependency sufficient?
- Can the browser/CSS/React/Next.js solve it?
- Is there an approved skill for it?
- What is the bundle/runtime cost?

Do not install a package simply because it is convenient.

**Performance** — Check:

- client JavaScript
- bundle size
- hydration
- rendering
- network requests
- image/font loading
- main-thread work
- animation cost
- mobile performance

**Accessibility** — Check:

- keyboard
- focus
- semantic HTML
- screen readers
- contrast
- reduced motion
- touch interaction

**Security** — Check:

- secrets
- environment variables
- user input
- server/client boundaries
- external requests
- public endpoints

**Responsive behavior** — Check:

- mobile
- tablet
- desktop
- touch
- pointer
- reduced motion

**Narrative/design consistency** — The change must remain consistent with the approved portfolio narrative and visual system.

Do not introduce a visually impressive feature that weakens the narrative.

---

## Step 4 — Check existing implementation

Before creating something new, search the repository.

Ask:

- Does this already exist?
- Can an existing component be reused?
- Is there already an approved abstraction?
- Will this create duplicate functionality?

Do not create duplicate components or utilities without justification.

---

## Step 5 — Check the Master Plan

Identify the specific Master Plan requirement that authorizes the work.

If you cannot identify one, determine whether the user explicitly requested it.

If neither is true:

```text
DO NOT IMPLEMENT.
```

Instead report:

```text
This is not currently defined in the project contract.
I recommend adding it to the plan before implementation.
```

---

## Step 6 — Implementation

Only after completing the checks above may implementation begin.

Use the simplest approved solution.

Prefer:

```text
existing code
→ browser API
→ CSS
→ React
→ Next.js
→ approved library
→ additional dependency
```

Do not jump directly to a library.

---

## Step 7 — Verification

After every meaningful change, verify the relevant constraints.

At minimum:

```text
typecheck
lint
build
runtime behavior
console errors
```

When applicable also verify:

- accessibility
- responsive behavior
- reduced motion
- performance
- SEO
- security
- animation cleanup

---

## Skill Authority Rule

Skills are implementation guidance, not project requirements.

For example:

```text
RULES.md:   Use GSAP only for complex coordinated animation.
GSAP skill: Explains how to implement GSAP safely in React.
Result:     Use the GSAP skill to implement the approved GSAP animation.
```

Never interpret a skill as permission to introduce a feature.

A skill can explain: **HOW**

The Master Plan and RULES.md determine: **WHAT**

### No skill → No problem

If no relevant skill exists:

Do not invent one.

Use established project conventions and official documentation when necessary.

However, before introducing a new dependency or architectural approach, evaluate whether it requires explicit approval.

---

## Conflict Resolution

If these sources disagree:

```text
User's explicit current instruction
↓
RULES.md
↓
Master Plan
↓
Approved skill guidance
↓
Existing project convention
↓
Agent judgment
```

The higher item wins.

Never use a skill to justify violating the project rules.

---

## Mandatory Pre-Flight Check

Before every non-trivial change, internally confirm:

- [ ] I understand exactly what was requested.
- [ ] I read the relevant RULES.md constraints.
- [ ] I checked the Master Plan.
- [ ] I searched for an applicable skill.
- [ ] I used the applicable skill if one exists.
- [ ] I checked whether the functionality already exists.
- [ ] I checked whether a new dependency is actually necessary.
- [ ] I checked performance impact.
- [ ] I checked accessibility impact.
- [ ] I checked responsive behavior.
- [ ] I checked security implications where applicable.
- [ ] I am not inventing content or requirements.
- [ ] I am not expanding scope.
- [ ] I know which project requirement authorizes this change.

If any required check fails:

**STOP BEFORE IMPLEMENTATION.**

## 1. SOURCE OF TRUTH

The following documents define the project:

1. `MASTER_PLAN.md` / the approved **Suyash Developer Portfolio — Master Homepage & Platform Execution Plan v2**
2. This `RULES.md`

### Priority

When making implementation decisions:

```text
Explicit user instruction
        ↓
Approved Master Plan
        ↓
RULES.md
        ↓
Existing project code/configuration
        ↓
Developer judgment
```

Developer judgment is the **lowest-priority source**.

If something is not specified, do not silently invent it.

---

# 2. ZERO-INVENTION POLICY

The agent MUST NOT invent:

- personal information
- job titles
- companies
- clients
- project names
- project outcomes
- performance metrics
- revenue numbers
- user counts
- technologies
- responsibilities
- awards
- testimonials
- testimonials from fictional people
- dates
- experience
- certifications
- education
- social links
- contact details
- availability status
- case-study results
- technical architecture claims
- product capabilities

If information is missing:

```text
DO NOT FABRICATE
DO NOT GUESS
DO NOT PLACE FAKE CONTENT
DO NOT USE PLAUSIBLE PLACEHOLDERS AS FACT
```

Instead use an explicitly marked content placeholder or stop and request the required information.

Examples of acceptable placeholders:

```text
[PROJECT DESCRIPTION REQUIRED]
[CASE STUDY OUTCOME REQUIRED]
[CONTACT EMAIL REQUIRED]
```

Never use fake-looking values such as:

```text
+91 98765 43210
hello@example.com
$2.4M revenue
50,000 users
```

unless explicitly supplied.

---

# 3. DO NOT EXPAND SCOPE

The agent MUST NOT add features simply because they are common in portfolios.

Do not independently add:

- blog
- notes
- testimonials
- guestbook
- newsletter
- dark mode
- command palette
- music
- loading screen
- preloader
- custom scrollbar
- custom cursor on mobile
- AI chatbot
- Easter eggs
- authentication
- dashboard
- admin panel
- CMS
- search
- comments
- likes
- unnecessary APIs
- unnecessary database
- unnecessary backend services

unless explicitly approved.

Potential future routes such as `/notes`, `/uses`, and `/now` are **not part of v1** unless separately approved.

---

# 4. ROUTE CONTRACT

Approved primary routes:

```text
/
 /work
 /work/[slug]
 /lab
 /lab/[slug]
 /about
 /contact
 /resume
```

Do not create additional production routes without approval.

Required system routes may be created when appropriate:

```text
/error
/not-found
/loading
/robots
/sitemap
```

These are infrastructure, not product-scope expansion.

---

# 5. HOMEPAGE CONTRACT

The homepage follows this exact narrative order:

```text
01 — ORIENTATION
Hero

02 — POSITION
Positioning

03 — PROOF
Selected Work

04 — CAPABILITY
Capabilities

05 — DEPTH
Engineering

06 — EXPERIENCE
Experience

07 — CURIOSITY
Lab

08 — PERSON
About

09 — CONVERSION
Final CTA

10 — CONTINUITY
Footer
```

Do not reorder sections without approval.

Do not insert unrelated sections between them.

Do not remove sections without approval.

---

# 6. HERO CONTRACT

The hero is the primary visual and narrative statement.

It MUST contain the approved concepts:

- digital-engineer positioning
- concise primary headline
- supporting statement
- work CTA
- conversation CTA
- availability state
- abstract system visualization

The visual system MUST NOT overpower the message.

The hero visualization is:

```text
SVG FIRST
↓
Canvas IF JUSTIFIED
↓
R3F / THREE.JS ONLY IF JUSTIFIED
```

Do not introduce 3D merely to make the site look impressive.

---

# 7. CONTENT CONTRACT

Content must be separated from presentation.

Expected content areas:

```text
content/
├── site.ts
├── projects.ts
├── experience.ts
├── capabilities.ts
└── lab.ts
```

The UI must consume typed content models.

Do not hardcode project facts throughout components.

Do not make components responsible for content storage.

---

# 8. PROJECT CONTRACT

Projects must support the approved conceptual model:

```text
slug
title
category
year
summary
description
featured
cover
technologies
href
role (optional)
```

Only use fields when actual information exists.

Case studies should support, where applicable:

```text
Context
Problem
Approach
Architecture
Key Decisions
UI / Interaction
Technical Implementation
Challenges
Outcome
Learnings
```

Not every project needs every block.

Do not fabricate missing case-study sections.

---

# 9. NARRATIVE RULE

The portfolio is NOT a technology inventory.

Do not turn the site into:

```text
React
Next.js
Node
Python
AWS
Docker
...
```

without context.

Technology should be connected to:

```text
Problem
→
Decision
→
Implementation
→
Result
```

The site must communicate engineering judgment.

---

# 10. DESIGN RULES

The design must be:

```text
EDITORIAL
TECHNICAL
PRECISE
INTELLIGENT
EXPERIMENTAL
HUMAN
```

Avoid:

- generic developer templates
- SaaS-style template layouts
- excessive gradients
- excessive glassmorphism
- neon cyberpunk styling unless explicitly approved
- excessive cards
- arbitrary rounded containers everywhere
- decorative icons without meaning
- visual noise
- excessive section dividers
- excessive badges
- skill proficiency bars
- generic stock imagery

---

# 10.1 ZERO-BOX POLICY / OPEN EDITORIAL CANVAS (MANDATORY)

Inspired by the Swiss architectural aesthetic of **grigoletti.ch** and **madeinuxstudio.com**:

The portfolio MUST NEVER trap content inside rounded card containers, grey widget boxes, or SaaS-style dashboard panels.

### Strict Prohibitions:
1. **NO Trapped Boxes / Dashboard Widgets**: Never wrap UI components, diagrams, or content blocks in rounded grey cards with top header bars and bottom grey footer containers (e.g. mock dashboard widgets).
2. **NO Box-Inside-A-Box**: Never place a boxed graphic inside a boxed card.
3. **NO Arbitrary Card Wrappers**: Avoid wrapping content in floating pill cards with heavy borders and thick backgrounds.

### Mandatory Open Canvas Principles:
1. **Open Canvas Placement**: All typography, SVG diagrams, media, and data must breathe directly on the unified page canvas (`var(--color-paper)`).
2. **Architectural Separation via Hairlines & Whitespace**: Sections, columns, and data points must be organized using generous whitespace and crisp, single 1px hairlines (`border-top: 1px solid var(--color-line)`, column dividers) modeled on high-end Swiss print and editorial broadsheets.
3. **Open Specification Ledgers**: Metadata and telemetry must be rendered as open editorial ledgers or clean borderless tables directly on the canvas, never as isolated floating cards.

---

# 10.2 NO NUMBERED SECTION PREFIXES (MANDATORY)

The portfolio MUST NEVER use numbered section prefixes (e.g., `01 /`, `02 /`, `03 /`, `07 /`, `08 /`, `09 /`, `01 —`, `02 ·`) in UI section headers, subheadings, eyebrows, or page headers.

### Strict Prohibitions:
1. **NO Numbered Prefixes**: Never prepend headings, eyebrows, or header indicators with arbitrary index numbers like `09 / DIRECT INQUIRIES`, `03 / PROJECT ARCHIVE`, `07 / LABORATORY & EXPERIMENTS`, or `01 / HERO`.
2. **Use Clean Semantic Labels**: Use clean, descriptive labels directly without numbers (e.g., `DIRECT INQUIRIES`, `PROJECT ARCHIVE`, `LABORATORY & EXPERIMENTS`, `BACKGROUND & PHILOSOPHY`).
3. **No Artificial Enumeration**: Do not number site sections in public UI copy. Editorial typography must rely on semantic clarity, whitespace, and typographic contrast rather than artificial sequential counting tags.

---

The reference websites are inspiration only.

NEVER clone:

- layouts
- animations
- copy
- distinctive compositions
- visual identities
- proprietary assets

---

# 11. TYPOGRAPHY RULE

Typography is a primary design tool.

Use the approved token structure:

```text
Display
Body
Mono / Metadata
```

Do not introduce arbitrary font sizes throughout the application.

Use the design token system.

Do not change fonts simply because another font is fashionable.

Any font change must be treated as a design decision.

---

# 12. COLOR RULE

Use a restrained palette.

Baseline:

```text
paper
ink
muted
line
accent
surface-dark
surface-light
```

Use one primary accent unless explicitly approved otherwise.

Do not introduce a rainbow palette.

Do not use gradients as a substitute for art direction.

---

# 13. RESPONSIVE RULE

Desktop and mobile are different compositions.

Desktop may use:

- hover
- cursor enhancement
- pointer interaction
- richer choreography

Mobile should use:

- tap interaction
- simplified visual system
- native scrolling
- reduced visual density
- no custom cursor
- no hover-dependent information

Never simply shrink the desktop layout.

Required test widths:

```text
320
375
390
430
768
1024
1280
1440+
```

---

# 14. ANIMATION HIERARCHY

Follow this order:

```text
CSS
↓
IntersectionObserver
↓
Motion
↓
GSAP
↓
WebGL
```

Use the simplest mechanism that satisfies the requirement.

## CSS

Use for:

- hover
- focus
- color transitions
- simple transforms
- button states
- underlines

## IntersectionObserver

Use for simple viewport-triggered reveals.

## Motion

Use for local React interaction:

- menus
- presence
- local transitions
- accordions

## GSAP

Use only for:

- hero choreography
- coordinated scroll scenes
- complex timeline relationships
- sophisticated project transitions

## WebGL

Use only when the visual requirement genuinely needs it.

---

# 15. NO ANIMATION THEATER

Never add animation just because an area looks empty.

Every animation must have a purpose:

```text
Guide
Reveal
Connect
Orient
Emphasize
Transition
```

Reject:

- perpetual decorative motion
- excessive parallax
- random floating elements
- animation on every scroll
- giant text distortion without narrative purpose
- excessive spring effects
- animations that delay reading

---

# 16. REDUCED MOTION IS A REAL DESIGN STATE

When:

```css
prefers-reduced-motion: reduce;
```

is active:

- skip entrance choreography
- disable cursor interpolation
- disable complex transforms
- disable smooth scrolling
- disable unnecessary WebGL
- show stable final states
- preserve functionality
- preserve content
- preserve navigation

Do not implement reduced motion as an afterthought.

---

# 17. SCROLL RULES

Native scrolling is the default.

Do NOT install Lenis initially.

Only add a smooth-scroll library after explicit review demonstrates:

1. native scrolling cannot achieve a required interaction,
2. the library materially improves the experience,
3. accessibility remains intact,
4. mobile behavior remains appropriate.

---

# 18. WEBGL RULES

Three.js / React Three Fiber is NOT a default dependency.

Decision:

```text
SVG sufficient?
→ use SVG.

SVG insufficient?
→ evaluate Canvas.

Canvas insufficient and genuine 3D is valuable?
→ evaluate R3F / Three.js.
```

If WebGL is used:

- lazy load it
- isolate it in a client component
- provide a static fallback
- avoid loading it for reduced-motion users where unnecessary
- avoid making it essential to understanding content

---

# 19. CLIENT COMPONENT RULE

Server Components are the default.

Before adding:

```tsx
"use client";
```

ask:

> Does this component require browser state, event handlers, animation, WebGL, or another client-only capability?

If no:

**keep it server-rendered.**

Do not convert entire pages to Client Components for convenience.

---

# 20. DEPENDENCY RULE

Before installing a package, answer:

```text
1. Can CSS solve it?
2. Can a browser API solve it?
3. Can the current stack solve it?
4. Is it actually required?
5. What is the bundle cost?
6. Does it create hydration complexity?
7. Does it overlap with an existing dependency?
```

Do not install a package merely because it is popular.

### Explicitly NOT baseline dependencies

Do not add without approval:

```text
Lenis
SplitType
PixiJS
Turborepo
Sanity
Contentful
Payload
Radix
date-fns
```

Three.js/R3F is conditional.

---

# 21. STYLING RULE

The approved direction is:

```text
CSS Modules
+
global design tokens
```

Do not introduce multiple competing styling systems.

Do not mix:

```text
Tailwind
CSS Modules
styled-components
emotion
inline style systems
```

without explicit architectural approval.

---

# 22. PERFORMANCE RULES

Performance is part of the product.

Required principles:

- server-render content wherever possible
- minimize client JavaScript
- lazy load heavy effects
- optimize images
- optimize fonts
- reserve image dimensions
- avoid layout shift
- avoid long-running main-thread loops
- avoid expensive scroll handlers
- use `requestAnimationFrame` for pointer animation where necessary
- do not block page rendering with a preloader

Track:

```text
LCP
INP
CLS
initial JS
image weight
font weight
WebGL weight
long tasks
```

Do not optimize only for Lighthouse screenshots.

---

# 23. IMAGE RULES

Every image must have:

- appropriate dimensions
- responsive sizing
- correct loading strategy
- meaningful alt text where content-bearing
- optimization
- controlled aspect ratio

Do not ship original multi-megabyte images unnecessarily.

Decorative images should use appropriate accessibility semantics.

---

# 24. ACCESSIBILITY RULES

Every interaction must work without a mouse.

Required:

- semantic HTML
- heading hierarchy
- skip link
- visible focus
- keyboard navigation
- accessible navigation
- accessible mobile menu
- accessible accordions
- accessible forms
- sufficient contrast
- reduced motion
- 200% zoom support
- no hover-only essential content

Do not sacrifice accessibility for visual effects.

---

# 25. MOBILE MENU RULES

The mobile menu must:

- trap focus appropriately
- support Escape
- lock background scrolling while open
- restore focus on close
- provide a visible close control
- use semantic navigation
- work without animation
- work under reduced motion

---

# 26. CURSOR RULES

Custom cursor is:

```text
desktop enhancement only
```

Never use it on:

- touch devices
- mobile
- reduced-motion users

Implementation should use:

```text
one DOM element
+
shared pointer listener
+
requestAnimationFrame
+
transform
```

Do not store high-frequency pointer coordinates in React state.

---

# 27. CONTACT RULES

When implemented, contact should use:

```text
form
→
server-side validation
→
spam protection
→
email provider
```

Never expose secrets client-side.

Never trust client validation alone.

Do not invent an email address.

---

# 28. ANALYTICS RULES

Analytics must be:

- privacy-conscious
- non-blocking
- minimal
- purposeful

Approved event concepts:

```text
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

- pointer movement
- every hover
- unnecessary scroll events
- unnecessary personal data

---

# 29. SEO RULES

Implement:

- metadata
- canonical URLs
- Open Graph
- sitemap
- robots
- appropriate structured data

Do not add structured data that does not accurately describe the page.

Do not keyword-stuff copy.

---

# 30. SECURITY RULES

Never:

- expose API secrets
- trust browser-submitted data
- hardcode private keys
- create unnecessary public APIs
- store unnecessary personal data

Use server-side validation for public forms.

---

# 31. ERROR / FALLBACK RULES

The site must remain usable if enhanced features fail.

Required:

```text
loading state
error state
404
media fallback
WebGL fallback
```

If WebGL fails:

```text
static visual
```

If animation fails:

```text
content remains readable
```

Never make visual enhancement a single point of failure.

---

# 32. TESTING RULES

Required quality checks:

```text
typecheck
lint
unit tests
E2E smoke tests
accessibility checks
production build
Lighthouse
browser QA
```

Do not create tests solely for coverage numbers.

Test important behavior.

---

# 33. CODE QUALITY RULES

Prefer:

```text
simple
typed
readable
composable
predictable
```

Avoid:

```text
clever
over-engineered
deeply abstracted
duplicated
magic
```

Do not create abstractions before repetition or complexity justifies them.

---

# 34. CONTENT PLACEHOLDER RULE

If real content is unavailable, use explicit placeholders:

```text
[ADD PROJECT SUMMARY]
[ADD PROJECT OUTCOME]
[ADD EXPERIENCE]
```

Never make placeholders look like real achievements.

Do not use Lorem Ipsum for important content.

---

# 35. NO FAKE DATA RULE

The agent must never generate fake:

```text
metrics
client logos
testimonials
project results
company names
job history
social proof
awards
statistics
```

This rule has no exceptions unless the user explicitly requests fictional/demo content.

---

# 36. REFERENCE SITE RULE

The four reference websites:

1. https://grigoletti.ch/en/
2. https://huyml.co/
3. https://khanhnguyen.design/
4. https://madeinuxstudio.com/

These four reference websites may inform:

- pacing
- typography
- whitespace
- visual hierarchy
- editorial composition
- motion restraint
- interaction quality

They must NOT become implementation templates.

If an implementation begins to resemble a reference too closely:

**stop and redesign the composition.**

---

# 37. CHANGE CONTROL

Before making a structural change, ask:

```text
Is this explicitly required?
Is this in the Master Plan?
Is this necessary to implement an approved requirement?
Does this fix a real technical problem?
```

If all answers are NO:

**do not implement it.**

For a potentially beneficial but unapproved idea:

```text
DO NOT silently implement.
DOCUMENT THE IDEA.
REQUEST APPROVAL.
```

---

# 38. DECISION LOG

When a technical decision is ambiguous, record:

```text
Decision
Reason
Alternatives considered
Why rejected
Performance impact
Accessibility impact
```

This prevents architectural drift.

---

# 39. IMPLEMENTATION SEQUENCE

Follow this order unless the user explicitly changes it:

```text
01 Architecture
02 Next.js foundation
03 TypeScript + lint + CI
04 Design tokens
05 Typography
06 Global layout
07 Navigation
08 Static homepage
09 Hero SVG
10 Selected work
11 Project detail architecture
12 Capabilities
13 Engineering
14 Experience
15 Lab
16 About
17 CTA
18 Footer
19 Responsive QA
20 CSS interactions
21 Motion system
22 Hero choreography
23 Scroll choreography
24 Cursor
25 Page transitions
26 Contact backend
27 Analytics
28 SEO
29 Accessibility
30 Performance
31 Cross-browser QA
32 Production verification
```

Do not jump directly to advanced animation before the static experience is correct.

---

# 40. DEFINITION OF DONE

The project is not complete because:

```text
the page looks cool
```

It is complete when:

### Product

- [ ] positioning is immediately understandable
- [ ] selected work is compelling
- [ ] engineering depth is credible
- [ ] personality exists
- [ ] CTA is clear
- [ ] homepage naturally leads to case studies

### Design

- [ ] original visual identity
- [ ] strong typography
- [ ] intentional whitespace
- [ ] consistent tokens
- [ ] responsive composition
- [ ] no generic-template appearance

### Engineering

- [ ] strict TypeScript
- [ ] Server Components by default
- [ ] typed content
- [ ] clean boundaries
- [ ] production build passes
- [ ] no hydration errors
- [ ] no console errors

### Motion

- [ ] purposeful hero choreography
- [ ] useful scroll reveals
- [ ] project interactions
- [ ] capability interactions where justified
- [ ] cursor enhancement if approved/implemented
- [ ] reduced-motion behavior

### Accessibility

- [ ] keyboard navigation
- [ ] screen-reader checks
- [ ] visible focus
- [ ] contrast
- [ ] semantic HTML
- [ ] reduced motion
- [ ] 200% zoom
- [ ] accessible forms

### Performance

- [ ] no blocking preloader
- [ ] stable layout
- [ ] optimized images
- [ ] optimized fonts
- [ ] controlled client JavaScript
- [ ] deferred heavy effects
- [ ] WebGL optional/lazy
- [ ] mobile performance tested
- [ ] Core Web Vitals checked

### SEO

- [ ] metadata
- [ ] canonical
- [ ] Open Graph
- [ ] sitemap
- [ ] robots
- [ ] accurate structured data

### Reliability

- [ ] loading states
- [ ] errors
- [ ] 404
- [ ] media fallback
- [ ] direct URL navigation
- [ ] back/forward navigation
- [ ] slow-network behavior
- [ ] enhanced-feature failure fallback

---

# 41. FINAL AGENT DIRECTIVE

Before every implementation decision, ask:

> **"Where is this requirement defined?"**

Acceptable answers:

```text
User explicitly requested it.
Master Plan defines it.
RULES.md defines it.
It is technically necessary to implement an approved requirement.
```

Unacceptable answers:

```text
It is common on portfolio sites.
It looks cool.
I thought it would be better.
Other Awwwards sites do it.
The library supports it.
AI portfolios usually have it.
I assumed the user would want it.
```

If there is no valid source:

**DO NOT IMPLEMENT IT.**

If a better idea emerges:

```text
STOP
→
DOCUMENT
→
EXPLAIN
→
REQUEST APPROVAL
→
IMPLEMENT ONLY AFTER APPROVAL
```

The objective is not maximum features.

The objective is:

> **Build exactly the approved portfolio, with exceptional execution, without architectural, narrative, visual, technical, or scope drift.**

---

## FINAL PRINCIPLE

```text
FOLLOW THE PLAN.
FOLLOW THE RULES.
DO NOT INVENT.
DO NOT EXPAND SCOPE.
DO NOT FABRICATE CONTENT.
DO NOT ADD LIBRARIES WITHOUT JUSTIFICATION.
DO NOT SACRIFICE PERFORMANCE FOR EFFECTS.
DO NOT SACRIFICE ACCESSIBILITY FOR DESIGN.
DO NOT SACRIFICE NARRATIVE FOR TECHNOLOGY.

WHEN UNCERTAIN:
STOP AND ASK.
```
