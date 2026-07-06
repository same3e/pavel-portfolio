# Reference-Faithful Homepage Redesign Spec

## Goal

Redesign Pavel Kostin's portfolio homepage around the supplied dark futuristic portfolio reference while preserving the existing project, content, asset, and motion foundations where they are still useful.

The target result is a polished production portfolio, not a replacement app. The visual direction should feel close to the reference: dark technical atmosphere, glass panels, thin HUD lines, blue accents, compact mono labels, project-focused presentation, and strong conversion CTAs.

## Confirmed Decisions

- Use approach 1: a reference-faithful homepage rebuild.
- Keep two locales. English remains the default locale, Russian remains available and must be rewritten/polished alongside English.
- Use a single dark theme. Remove the current light-theme user surface and theme toggle during implementation.
- Keep the current interactive hero portrait architecture and behavior: Pavel's existing voxel/3D portrait remains the main hero object and keeps turning/scrubbing with cursor movement.
- Keep the brand as text: `Pavel Kostin`. Do not create a new monogram logo.
- Do not add blog pages or blog navigation.
- Do not add testimonials, ratings, fake review counts, fabricated metrics, invented business results, or fake portfolio projects.
- Use only the two real projects currently in the portfolio: Thai Nari and Pavel Portfolio.
- Thai Nari remains clearly labeled as a concept project.
- Use 21st.dev MCP as a source of UI/motion direction for HUD cards, glass panels, process visuals, hover states, and reveal polish. Do not let generated components override the reference or the existing project constraints.
- Preserve the user's requested selected-work animation: the work section pins on desktop and projects change like cards in a deck as the user scrolls; reverse scroll reverses the project state.
- Use GSAP ScrollTrigger for that pinned selected-work behavior.
- Add a desktop-only pixel/dot cursor trail: a short trail of small light dots follows the cursor, fades out when movement stops, does not replace the system cursor, and is disabled on touch/mobile and `prefers-reduced-motion: reduce`.

## Homepage Structure

### Header

The header should match the reference's minimal dark tech navigation:

- left: `Pavel Kostin` brand with a small role label such as `Web Designer & Developer`;
- center/right: section links for Work, Services, About, Process, Contact;
- right edge: availability status with a small green dot;
- mobile: accessible menu with the same links and locale controls.

The header should remain translucent and readable on all sections. Because the site becomes dark-only, header contrast should be tuned for dark backgrounds rather than carrying both light and dark variants.

### Hero

Desktop composition:

- left column:
  - small metadata line: `Independent / Remote`;
  - headline close to the reference: `Websites that turn attention into enquiries & sales.`;
  - Russian version should be compact and natural, not literal if it causes awkward wrapping;
  - subtitle: conversion-focused websites, booking flows, and lightweight integrations for service businesses/startups;
  - primary CTA to WhatsApp;
  - secondary link to selected work.
- right column:
  - existing interactive portrait component;
  - technical HUD details around it: thin arcs, grid fragments, small labels, status markers, and service verbs like design/develop/integrate/optimise;
  - no fake identity/version claims that imply external validation.
- below hero content:
  - glass advantage strip replacing the reference's stats/testimonials;
  - honest non-numeric advantages: fast launch, reasonable budget, direct contact, post-launch support.

Mobile composition:

- hero must fit within the first mobile viewport as much as practical;
- headline, subtitle, CTAs, and portrait must not overlap;
- HUD details should be reduced or hidden if they crowd the portrait;
- advantage strip becomes a compact two-column or vertical list.

### Selected Work

Desktop selected work becomes a pinned project showcase:

- section intro on the left/top: selected work statement and small CTA;
- pinned viewport while the two real projects scroll through;
- project cards behave like a deck:
  - current project card is prominent;
  - incoming project moves in with depth/offset;
  - outgoing project moves out consistently;
  - reverse scroll reverses the same state;
  - rapid scroll must not leave cards in a mixed state.
- left/main card contains the real project preview image and project title;
- right card stack contains honest contextual details: category, type, role, short description, and case link;
- regular click uses the existing route transition where appropriate;
- modifier clicks and middle clicks preserve native browser behavior.

Mobile selected work:

- no pinned ScrollTrigger behavior;
- render real project cards in a readable vertical flow;
- each project card keeps image, title, type, summary, and case CTA.

### Services

Services remain honest static content, not fake controls. The visual treatment can follow the reference:

- compact service list with icons/technical labels;
- dark glass/card background;
- desktop hover may add subtle border/accent movement only on fine pointer devices;
- no accordion/tab/button behavior unless the item is a real link.

Service content should stay close to the approved current service set:

- Web Design;
- Development;
- Launch & Integrations;
- Lightweight Automations.

### Process

Add a new process section inspired by the reference:

- 5 steps on a thin timeline or connected path;
- steps:
  1. Discover;
  2. Strategy;
  3. Design;
  4. Develop;
  5. Launch & Optimise.
- Each step gets a short, honest explanation.
- On mobile, the process becomes a vertical timeline/list with stable spacing and readable text.

### About / Approach

Replace testimonial-style content with a truthful About/Approach section:

- use the existing portrait/identity material if suitable;
- explain Pavel's independent designer/developer positioning;
- focus on direct communication, clear scope, fast implementation, and practical post-launch support;
- include skill tags such as design, development, integrations, SEO, analytics only if the copy does not imply unsupported client outcomes.

No client quotes, star ratings, review avatars, or achievement claims.

### Contact And Footer

Final CTA should resemble the reference's wide glass panel:

- concise invitation to discuss a website;
- WhatsApp remains the primary action;
- preserve Email, Instagram, Telegram, and WhatsApp in contact links;
- keep external link safety attributes;
- keep the Telegram TODO comment in content;
- footer includes navigation, services, contact, and current year;
- no `Back home` link on the homepage.

## Motion System

Use the existing GSAP foundation and letter-swap component where it remains appropriate.

Motion requirements:

- page entry and section reveals are decorative and must not block interaction;
- hero HUD details may have subtle line/label reveals;
- cards may use hover lift and border glow on desktop fine-pointer devices;
- pinned selected work uses GSAP ScrollTrigger;
- cursor trail uses `requestAnimationFrame` or GSAP ticker with minimal DOM/canvas overhead;
- cursor trail disappears after the cursor stops moving for roughly 300-600ms;
- reduced motion disables ScrollTrigger scrubbing/pinning and cursor trail, while keeping content usable;
- mobile/touch devices do not receive hover-only or cursor effects.

## Accessibility

The redesign must preserve and improve accessibility:

- skip link remains the first interactive element;
- main content keeps `id="main-content"`;
- header/menu remain keyboard accessible;
- mobile menu traps focus when open and restores focus on close;
- no hidden menu links remain focusable;
- semantic headings remain ordered;
- project cards remain links with useful accessible names;
- decorative HUD elements are hidden from assistive technology;
- letter-swap visual rows remain `aria-hidden`;
- the cursor trail is decorative and inaccessible to screen readers;
- all interactive controls meet practical 44px touch targets on mobile.

## Content And Locale Requirements

English remains the default. Russian must be rewritten to sound natural and fit the layout.

Content constraints:

- no unsupported conversion percentages;
- no client counts;
- no review counts;
- no fabricated testimonials;
- no fake achievements;
- no fake screenshots;
- no new Telegram username;
- Thai Nari remains `Concept Project`;
- Pavel Portfolio remains a personal project.

## Implementation Boundaries

Expected implementation areas:

- `src/content/portfolio.ts` for copy, navigation, advantages, process content, and localized project text;
- `src/components/HomePage.tsx` for homepage section composition;
- `src/components/SiteChrome.tsx` for dark-only header/footer/menu adjustments;
- `src/components/HeroPortrait.tsx` only for integration/styling hooks around the current portrait behavior;
- `src/components/SelectedWork.tsx` or a new focused selected-work component for the pinned ScrollTrigger behavior;
- a new focused cursor-trail component if needed;
- `src/app/globals.css` for the new visual system, responsive layout, dark-only tokens, and cleanup;
- existing metadata routes if homepage copy/OG text changes.

Before implementation, the repository must be inspected according to `AGENTS.md`, including the listed root files, app files, components, work pages, and project assets.

## Verification Requirements

Default verification after implementation:

- `git diff --check`;
- `npm run build`;
- `npm run lint`;
- visual check at desktop `1440px`;
- visual check at mobile `390px`.

Because the redesign touches navigation, accessibility, metadata/content, responsive layout, and motion, extra targeted checks are acceptable if one of the required checks fails or if the pinned/cursor behavior needs browser verification.

## Open Risks

- The pinned project section is more complex than the current hover preview and must gracefully degrade on mobile and reduced motion.
- The dark-only decision intentionally removes the light-theme user surface, which conflicts with older repo requirements that preserved both themes. This is now a user-approved design decision and should be reflected consistently in code.
- 21st.dev generated output is inspiration only unless a specific component is reviewed and intentionally adapted.
