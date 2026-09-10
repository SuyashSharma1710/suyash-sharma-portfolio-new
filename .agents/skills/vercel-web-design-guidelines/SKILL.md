---
name: vercel-web-design-guidelines
description: Review UI/UX and styling code for Web Interface Guidelines compliance, accessibility (WCAG), focus states, form usability, responsive design, contrast, and typography standards.
---

# Vercel Web Design Guidelines

Authoritative Web Interface Guidelines for professional UI/UX, typography, responsiveness, and accessibility compliance.

## When to Apply
- Reviewing UI components, layouts, and interactive elements
- Auditing accessibility (WCAG 2.1 AA) and keyboard navigation
- Designing typography hierarchies, spacing scales, and color tokens
- Implementing responsive breakpoints and touch targets
- Auditing reduced-motion support and interactive states

## Core Guidelines

### 1. Accessibility & Semantic Structure
- **Semantic Elements**: Use appropriate HTML5 landmark tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>`).
- **Heading Hierarchy**: Maintain a logical `<h1>` to `<h6>` hierarchy without skipping levels. Only one `<h1>` per page.
- **Keyboard Operability**: Every interactive element must be reachable and operable via keyboard (`Tab`, `Enter`, `Space`, arrow keys).
- **Focus Indicators**: Never disable `outline: none` without providing a distinct, visible `:focus-visible` replacement.
- **Contrast**: Maintain a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text / UI components against backgrounds.

### 2. Responsive & Touch Usability
- **Mobile First & Fluid Scales**: Design for viewports from 320px up to 1440px+ without horizontal overflow or clipped text.
- **Touch Target Sizes**: Minimum interactive touch target of 44x44px for mobile/touch screens.
- **No Hover-Only Content**: Ensure critical information and actions do not require pointer hover to discover or interact with.

### 3. Motion & Reduced Motion
- **Respect User Preferences**: Always provide a clean, readable fallback under `@media (prefers-reduced-motion: reduce)`.
- **Purposeful Motion**: Motion should guide attention, provide state feedback, or clarify transitions, never serve as continuous decorative distraction.

### 4. Typography & Layout Discipline
- **Tokenized Spacing & Fonts**: Use consistent design tokens for font size, line-height, letter-spacing, and layout margins.
- **Controlled Measure**: Keep body line lengths between 45 and 75 characters for comfortable reading.
