# Pavel Portfolio Refactor Checklist

Baseline before implementation:

- [x] VERIFIED - `npm install` passed before edits.
- [x] VERIFIED - `npm run lint` passed before edits.
- [x] VERIFIED - `npm run build` passed before edits.
- [x] VERIFIED - Required repository files, `src/app/work/**`, and `public/projects/**` were inspected.

## AGENTS.md Major Sections

- [x] VERIFIED - Purpose and visual direction preserved as the governing constraint.
- [x] VERIFIED - Source of truth files inspected.
- [ ] NOT COMPLETED - Execution contract: production build and GSAP requirements remain incomplete.
- [x] VERIFIED - Required workflow followed and checklist maintained.
- [ ] NOT COMPLETED - Typography: `next/font/google` implementation exists, but local build cannot verify fonts because Google Fonts fetch fails.
- [x] VERIFIED - Remove the fake loader.
- [x] VERIFIED - Header and mobile navigation.
- [x] VERIFIED - Services section.
- [x] VERIFIED - Positioning and copy.
- [x] VERIFIED - Contact actions.
- [ ] NOT COMPLETED - GSAP letter-swap system: `npm install gsap @gsap/react` failed because registry DNS resolution failed.
- [x] VERIFIED - Selected Work behavior.
- [x] VERIFIED - Route transition.
- [x] VERIFIED - Project case pages.
- [!] BLOCKED BY ASSET - Project images: required real desktop/mobile `.webp` screenshots are missing.
- [x] VERIFIED - Accessibility.
- [x] VERIFIED - SEO and metadata.
- [x] VERIFIED - CSS cleanup.
- [x] VERIFIED - Theme behavior.
- [ ] NOT COMPLETED - Dependencies and tooling: versions are pinned except GSAP and `@gsap/react`, which could not be installed.
- [x] VERIFIED - README.
- [x] VERIFIED - Footer.
- [ ] NOT COMPLETED - Required verification: `npm run build` fails on Google Fonts network fetch.
- [ ] NOT COMPLETED - Acceptance criteria: blocked by GSAP install and production build.
- [x] VERIFIED - Final report format prepared.

## Verification Evidence

- [x] VERIFIED - `git diff --check` exit 0.
- [x] VERIFIED - `npm run lint` exit 0.
- [ ] NOT COMPLETED - `npm run build` exit 1: failed to fetch `Pixelify Sans`, `Inter Tight`, and `IBM Plex Mono` from Google Fonts.
- [x] VERIFIED - `rg "introProgress|introVisible|introResolved|activeService" src` returned no matches.
- [x] VERIFIED - `rg "MS Serif|Arial Narrow|Cascadia Mono|font-smooth" src` returned no matches.
- [x] VERIFIED - `rg '"latest"' package.json` returned no matches.
- [x] VERIFIED - `rg "data-label" src` returned no matches.
- [x] VERIFIED - Playwright responsive QA passed at 320, 375, 390, 768, 1024, 1440, and 1920 in both themes.
- [x] VERIFIED - Playwright keyboard QA verified mobile menu open focus, Tab, Shift+Tab, Escape, focus restoration, and body scroll lock.
