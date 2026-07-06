# AGENTS.md

## Purpose

This repository contains Pavel Kostin's portfolio website.

Your job is to improve the existing project and bring it to a polished, production-ready state without replacing the current visual direction.

The current design language must remain recognizable:

- editorial grid;
- large pixel-display typography;
- restrained light and dark themes;
- minimal interface;
- project-focused presentation;
- subtle motion;
- strong emphasis on clarity and conversion.

Do not rewrite the project from scratch unless the current architecture makes a specific requirement impossible. Prefer targeted refactoring.

---

# 1. Source of truth

Before changing any code, inspect the complete repository.

You must read at minimum:

- `package.json`
- `package-lock.json`
- `next.config.*`
- `eslint.config.*`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/SiteChrome.tsx`
- `src/components/MotionShell.tsx`
- `src/components/SelectedWork.tsx`
- `src/components/ProjectCase.tsx`
- `src/content/portfolio.ts`
- all files in `src/app/work/**`
- all project assets in `public/projects/**`

Do not make assumptions about files you have not inspected.

---

# 2. Execution contract

The following rules are mandatory.

1. Do not stop after planning.
2. Do not implement only the easiest requirements.
3. Continue until every non-asset requirement is implemented and verified.
4. Do not silently simplify a requirement.
5. Do not replace requested behavior with a visually similar shortcut.
6. Do not claim that something is complete unless it has been verified.
7. Do not invent contacts, client work, metrics, screenshots, testimonials, projects, URLs, experience or business results.
8. Do not present concept work as paid client work.
9. Do not create fake screenshots and call them real project screenshots.
10. Do not introduce paid or unlicensed fonts.
11. Do not add dependencies that are not needed.
12. Do not use destructive Git commands.
13. Do not force-push.
14. Do not remove working features unless this document explicitly requires removal.
15. Keep TypeScript strict.
16. Preserve accessibility.
17. Preserve light and dark themes.
18. Preserve responsive behavior.
19. Keep the project deployable on Vercel.
20. Do not finish while lint or production build fails.

If a requirement is impossible because a real asset is missing, implement the correct code path, leave a clear asset TODO, and report it as `BLOCKED BY ASSET`.

---

# 3. Required workflow

Do not run a large verification matrix by default.

Work in this order:

1. inspect the files directly related to the requested change;
2. implement the visible/product requirement first;
3. remove dead code created by the change;
4. run exactly the three required checks from section 22 unless the user asks for deeper QA.

Do not create or maintain a large checklist unless explicitly requested.

Before reporting completion, inspect the changed files and summarize the diff.

---

# 4. Typography

The current project must not rely on unstable system fonts such as:

- Arial Narrow;
- MS Serif;
- Times New Roman as a fake pixel font;
- Cascadia Mono;
- Consolas as the only mono font.

Use `next/font`.

Required fonts:

- `Montserrat` for display typography;
- `Inter Tight` for body and interface text;
- `IBM Plex Mono` for metadata and technical labels.

These fonts must be loaded through `next/font/google` so Next.js self-hosts them in the production build.

Create and use CSS variables:

```css
--font-display
--font-body
--font-mono
```

Use `Montserrat` for:

- hero title;
- large section headings;
- project names;
- case-study titles;
- route transition labels;
- other large display moments.

Use `Inter Tight` for:

- paragraphs;
- service descriptions;
- buttons;
- case-study body copy;
- general interface copy.

Use `IBM Plex Mono` for:

- navigation metadata;
- status labels;
- project metadata;
- small captions;
- technical labels.

Remove:

- `font-smooth`;
- `font-smooth: never`;
- `-webkit-font-smoothing: none`;
- attempts to simulate a pixel font using system serif fonts;
- obsolete fallback stacks.

Large display text must not clip ascenders or descenders.

Recommended display line-height:

```css
line-height: 0.88 to 0.94;
```

Add small bottom padding to masked lines when necessary.

No horizontal overflow is allowed at:

- 320px;
- 375px;
- 390px;
- 768px;
- 1024px;
- 1440px;
- 1920px.

---

# 5. Remove the fake loader

Completely remove the artificial loader experience.

Delete:

- percentage progress;
- `Loading`;
- `Skip`;
- artificial `setInterval`;
- the 2320ms delay;
- `introProgress`;
- `introVisible`;
- `introResolved`;
- intro dialog markup;
- obsolete intro loader styles;
- obsolete loader keyframes.

The website must become usable immediately.

A lightweight page-entry animation of up to 600ms is allowed.

It must respect:

```css
@media (prefers-reduced-motion: reduce)
```

Do not block scrolling or interaction during a decorative entry animation.

---

# 6. Header and mobile navigation

## Sticky header

The sticky header must remain minimal but readable over every section.

Add:

- translucent background based on the current theme;
- `backdrop-filter`;
- `-webkit-backdrop-filter`;
- subtle bottom border;
- sufficient contrast in both themes.

Do not make it visually heavy.

## Mobile menu

The mobile menu must be fully accessible.

Requirements:

- closed menu must not appear in the Tab order;
- closed menu must not be exposed to screen readers;
- do not rely only on opacity and pointer-events;
- use conditional rendering, `inert`, or `visibility` with correct focus handling;
- opening the menu moves focus inside it;
- `Tab` and `Shift+Tab` remain inside the open menu;
- `Escape` closes it;
- closing restores focus to the Menu button;
- body scrolling is locked while open;
- selecting a navigation link closes it;
- `aria-expanded` is accurate;
- `aria-controls` points to the correct element;
- the Close button remains visible in both themes;
- the theme toggle remains visible in both themes;
- hidden links must never remain keyboard-focusable.

Do not add a large dependency solely for a focus trap.

The theme toggle must be at least 44×44px.

---

# 7. Services section

Services must be static content, not fake interactive controls.

Remove:

- `activeService`;
- service state;
- service click handlers;
- service focus handlers used for activation;
- `is-active`;
- service buttons;
- arrows that imply navigation;
- pointer cursor;
- link behavior;
- accordion behavior;
- tabs behavior.

Each service must be rendered as:

```tsx
<article className="service-row">
  <span>01</span>
  <h3>Web Design</h3>
  <p>...</p>
</article>
```

Required services:

## 01 — Web Design

```text
Clear visual systems and interfaces shaped around the business and its audience.
```

## 02 — Development

```text
Responsive, accessible and production-ready website development.
```

## 03 — Launch & Integrations

```text
Forms, domains, deployment, analytics and lightweight business integrations.
```

## 04 — Lightweight Automations

```text
Booking flows, notifications, API integrations and simple tools that reduce repetitive tasks.
```

Do not use `Automation & CRM` until there is a real CRM case in the portfolio.

Desktop hover may include:

- small title movement;
- accent-colored number;
- accent line;
- subtle change in neighboring opacity.

Hover-only effects must be wrapped in:

```css
@media (hover: hover) and (pointer: fine)
```

Touch devices must not retain fake hover states.

---

# 8. Positioning and copy

Use the following hero copy:

```text
I build websites
that turn interest
into enquiries.
```

Accessible label:

```text
I build websites that turn interest into enquiries.
```

Subtitle:

```text
Conversion-focused websites, booking flows and lightweight integrations for service businesses.
```

About copy:

```text
Independent web designer and developer based in Tbilisi, creating clear websites, booking flows and lightweight digital tools for service businesses.
```

Do not make unsupported claims about:

- conversion rates;
- client revenue;
- number of clients;
- full CRM expertise;
- paid work;
- business outcomes.

Thai Nari must remain clearly labeled:

```text
Concept Project
```

---

# 9. Contact actions

WhatsApp must be the primary CTA.

Use the current WhatsApp number already present in the repository.

Prefilled message:

```text
Hello Pavel, I would like to discuss a website for my business.
```

Hero action:

- primary: `START A PROJECT` → WhatsApp;

Contact section:

- primary underlined CTA → WhatsApp;
- preserve Email, Instagram, Telegram and WhatsApp in the contact list.

Use the clean Instagram URL:

```text
https://www.instagram.com/pavel.websites/
```

Remove tracking parameters such as:

- `igsh`;
- `utm_source`;
- QR parameters.

External links must use:

```tsx
target="_blank"
rel="noopener noreferrer"
```

Email must remain `mailto:`.

Do not invent a new Telegram username.

Add a code comment near the current Telegram URL:

```text
TODO: replace with a professional Telegram username.
```

Long email addresses and URLs must wrap safely on mobile.

---

# 10. GSAP letter-swap system

Add a polished reusable character-by-character letter-swap animation to short textual controls.

This animation must use GSAP.

Install and pin stable versions of:

- `gsap`;
- `@gsap/react`.

Do not use CDN scripts.

Do not add ScrollTrigger.

## Component

Create:

```text
src/components/LetterSwapText.tsx
```

The component must accept at least:

- `label`;
- optional `className`.

Recommended semantic structure:

```tsx
<span className="letter-swap">
  <span className="sr-only">{label}</span>

  <span className="letter-swap-visual" aria-hidden="true">
    <span className="letter-swap-row letter-swap-row-current">
      character spans
    </span>

    <span className="letter-swap-row letter-swap-row-next">
      character spans
    </span>
  </span>
</span>
```

The visual rows must be hidden from assistive technology.

The accessible label must appear exactly once in the accessibility tree.

Do not nest anchors inside anchors.

Do not nest buttons inside buttons.

The clickable parent must remain a semantic:

- `<a>`;
- Next.js `<Link>`;
- `<button>`.

Only the visual label should use `LetterSwapText`.

## Motion behavior

On pointer hover or keyboard focus:

- current characters move upward out of the mask;
- incoming characters move upward from below;
- movement is staggered left to right;
- no random characters;
- no scrambling;
- no unrelated symbol substitution;
- no layout shift.

Suggested values:

```text
duration: 0.35–0.45s
stagger: 0.015–0.025s
outgoing yPercent: 0 → -120
incoming yPercent: 120 → 0
ease: power3.out
```

On pointer leave or blur:

- reverse the same timeline;
- do not create a new timeline on every hover;
- rapid hover in/out must remain smooth;
- repeated focus/blur must not leave characters misplaced.

Create each timeline once per mounted component.

Use:

- `useGSAP()`;
- or `gsap.context()` with proper cleanup.

Do not query the entire document from each component.

Do not attach duplicate listeners.

Do not update React state on every animation frame.

## Required controls

Apply the reusable letter-swap label to:

- brand/home link;
- desktop navigation links;
- mobile navigation links;
- Menu / Close button;
- hero CTA buttons;
- contact CTA button;
- Explore the case link;
- project-case CTA buttons;
- Next project label;
- contact links;
- footer links;
- Back home;
- any other short textual navigation or CTA control.

Do not apply it to:

- long paragraphs;
- headings;
- static services;
- long email addresses;
- project-card titles;
- theme-toggle icon;
- form inputs;
- non-interactive content.

Keep the current large project-title hover behavior unless it is broken.

## Reduced motion

When reduced motion is enabled:

- render one visible label;
- do not run GSAP letter movement;
- do not flash the second row;
- preserve functionality.

Use `gsap.matchMedia()` or a reliable equivalent.

## Touch

Pointer hover animation must only run where hover and fine pointer are available.

Keyboard focus animation must still work when a keyboard is used.

Touch controls must activate on the first tap.

## Styling

The wrapper must:

- preserve the original control width;
- preserve control height;
- inherit font;
- inherit color;
- inherit letter spacing;
- inherit text transform;
- prevent wrapping;
- prevent layout shift;
- hide overflow;
- work in the navbar;
- work in buttons;
- work in both themes.

Character spans may use:

```css
display: inline-block;
will-change: transform;
```

Do not apply permanent `will-change` to large page sections.

Remove the old duplicate-label CSS animation based on:

- `data-label`;
- `::after`;
- competing button text transitions.

Only one hover animation system may control each label.

---

# 11. Selected Work behavior

Preserve the existing project preview interaction.

Fix normal browser link behavior.

Do not call `preventDefault()` for:

- Ctrl + click;
- Cmd + click;
- Shift + click;
- Alt + click;
- middle mouse button.

Modifier clicks must preserve new-tab behavior.

Regular left click may use the custom route transition.

Do not use `aria-live` on a large preview area that changes during hover.

If an announcement is necessary, use one short visually hidden status element.

---

# 12. Route transition

Preserve the route transition but make it robust.

Requirements:

- repeated rapid clicks cannot start overlapping transitions;
- store timeout IDs in refs;
- clear timers on unmount;
- reduced-motion users navigate immediately;
- modifier clicks remain native;
- overlay always resets;
- include a fallback timeout;
- transition resets after pathname changes;
- no permanent full-screen overlay;
- no stale project title after navigation.

---

# 13. Project case pages

Fix next-project logic.

Do not use:

```ts
projects.find((item) => item.id !== project.id)
```

Use cyclic order:

```ts
const currentIndex = projects.findIndex((item) => item.id === project.id);
const nextProject = projects[(currentIndex + 1) % projects.length];
```

External live-project links must use:

```tsx
target="_blank"
rel="noopener noreferrer"
```

---

# 14. Project images

The data model should support:

```ts
previewImage
desktopImage?
mobileImage?
ogImage?
```

ProjectCase behavior:

- show `desktopImage` when present;
- show `mobileImage` when present;
- do not crop a desktop image and label it “Mobile interface”;
- hide the mobile preview block when `mobileImage` is missing;
- use correct `sizes`;
- use useful alt text;
- decorative duplicates must use empty alt.

Do not generate fake screenshots.

Expected future asset paths:

```text
public/projects/thai-nari/desktop.webp
public/projects/thai-nari/mobile.webp
public/projects/pavel-portfolio/desktop.webp
public/projects/pavel-portfolio/mobile.webp
```

If the files do not exist:

- implement the data structure;
- keep the current real available asset;
- hide unsupported previews;
- add clear TODO comments;
- document the required assets in README;
- report `BLOCKED BY ASSET`.

---

# 15. Accessibility

Add a skip link as the first interactive element:

```text
Skip to content
```

It must become visible on focus.

The main content must use:

```tsx
id="main-content"
```

Verify:

- keyboard navigation;
- focus visibility;
- heading order;
- semantic landmarks;
- alt text;
- contrast;
- hidden content;
- reduced motion;
- menu focus trap;
- minimum 44px controls where appropriate;
- no duplicated accessible names;
- no focusable content inside visually hidden closed panels.

The GSAP text effect must not alter the semantic label.

---

# 16. SEO and metadata

Update global metadata.

Required:

- `metadataBase`;
- title template;
- canonical URL;
- Open Graph metadata;
- Twitter `summary_large_image`;
- author;
- creator;
- icons;
- robots.

Use the production URL from project content as the base.

Create:

```text
src/app/robots.ts
src/app/sitemap.ts
src/app/not-found.tsx
src/app/icon.tsx
src/app/opengraph-image.tsx
```

The OG image must match the portfolio style and include:

```text
Pavel Kostin
Web Designer & Developer
Tbilisi / Worldwide
```

Project pages must have unique metadata.

Thai Nari:

```text
Title:
Thai Nari — SPA Website Case Study | Pavel Kostin

Description:
Design and development of a responsive website concept for a Thai wellness studio.
```

Pavel Portfolio:

```text
Title:
Pavel Portfolio — Web Design Case Study | Pavel Kostin

Description:
Design and development of an editorial personal portfolio for an independent web designer.
```

Each project page must have a canonical URL.

---

# 17. CSS cleanup

Clean `src/app/globals.css`.

Remove:

- duplicate `.work-case-link::after`;
- duplicate `.work-list-item::after`;
- conflicting declarations;
- unnecessary `!important`;
- deleted-loader styles;
- unused keyframes;
- obsolete classes;
- invalid properties;
- duplicate font-family declarations;
- service active-state CSS;
- old button label animation;
- obsolete `data-label` styles.

Organize CSS with clear comments:

```text
tokens and fonts
reset and base
accessibility
header and navigation
hero
selected work
static services
about
contact
footer
project case
letter swap
route motion
responsive
reduced motion
```

Do not change the visual design unnecessarily.

Hover effects that alter sibling opacity must be limited to:

```css
@media (hover: hover) and (pointer: fine)
```

---

# 18. Theme behavior

Preserve light and dark themes.

Verify:

- no flash of the wrong theme;
- header contrast;
- mobile menu contrast;
- contact section contrast;
- focus outline contrast;
- accent contrast;
- theme persistence in localStorage.

Theme toggle requirements:

- accurate `aria-label`;
- visible focus;
- clear icon;
- at least 44×44px.

---

# 19. Dependencies and tooling

Do not leave `"latest"` in `package.json`.

Run:

```bash
npm list --depth=0
```

Pin the installed stable versions of:

- Next.js;
- React;
- React DOM;
- TypeScript;
- ESLint;
- eslint-config-next;
- type packages;
- GSAP;
- `@gsap/react`.

If ESLint config directly imports:

- `@next/eslint-plugin-next`;
- `@typescript-eslint/parser`;

they must be direct dev dependencies.

Remove `@eslint/eslintrc` if unused.

Do not perform unnecessary major upgrades.

---

# 20. README

Create or update:

```text
README.md
```

It must contain:

- project overview;
- stack;
- requirements;
- installation;
- local development;
- lint and build commands;
- project structure;
- where content is stored;
- how to update contacts;
- how to add a project;
- how to add desktop/mobile screenshots;
- Vercel deployment notes;
- fonts used;
- free-font licensing notes;
- remaining asset TODOs.

Do not add proprietary font files.

---

# 21. Footer

On the homepage, `Back home` is unnecessary.

On case-study pages, it is allowed.

Verify:

- current year;
- responsive layout;
- safe wrapping of long text;
- letter-swap effect on short footer links;
- no horizontal overflow.

---

# 22. Required verification

Run only these three checks by default:

## Technical check

```bash
npm run build
```

This is the source of truth for TypeScript, Next.js production compilation and deploy safety.

## General check

```bash
npm run lint
```

This covers the broad code-quality pass.

## Visual check

Use browser tooling once on the changed experience:

- desktop: 1440px;
- mobile: 390px;
- both only if the change touches responsive layout or theme behavior.

Capture screenshots for the final response when visual work changed.

Run deeper checks only when:

- the user asks for them;
- the change touches navigation, accessibility, metadata or deployment;
- one of the three checks fails.

---

# 23. Acceptance criteria

The task is complete only when all of the following are true:

- Montserrat is loaded through `next/font/google`;
- Inter Tight is used for body text;
- IBM Plex Mono is used for metadata;
- old fake pixel font stacks are removed;
- fake loader is removed;
- mobile menu is keyboard-accessible;
- closed menu is absent from Tab order;
- sticky header remains readable;
- services are static `<article>` elements;
- services have no fake button behavior;
- service hover is desktop-only;
- hero copy uses `interest` → `enquiries`;
- WhatsApp is the primary CTA;
- Instagram URL is clean;
- GSAP and `@gsap/react` are installed and pinned;
- one reusable letter-swap component exists;
- the letter swap is applied to all required short controls;
- old duplicated CSS label animation is removed;
- hover/focus play the animation;
- leave/blur reverse the same timeline;
- reduced motion disables letter animation;
- touch controls activate on first tap;
- modifier clicks preserve native behavior;
- route transition cannot overlap;
- next-project order is cyclic;
- missing mobile screenshots are not faked;
- external links are safe;
- global metadata is complete;
- project pages have unique metadata;
- robots, sitemap, favicon, OG image and custom 404 exist;
- skip link exists;
- CSS duplicates are removed;
- dependencies are pinned;
- README exists;
- `git diff --check` passes;
- `npm run lint` passes;
- `npm run build` passes;
- visual direction remains recognizable.

---

# 24. Final report format

Keep the final response short.

Include:

1. what changed;
2. files touched;
3. technical check result;
4. general check result;
5. visual check result;
6. remaining blockers, if any.

Do not use vague claims such as:

- "should work";
- "mostly complete";
- "appears correct";
- "probably fixed".

Do not report completion while build or lint fails.
