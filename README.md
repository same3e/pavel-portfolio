# Pavel Portfolio

Editorial bilingual portfolio for Pavel Kostin, an independent web designer and developer based in Tbilisi. The site presents selected work, services, contact paths and case-study pages with restrained light/dark styling, project-focused motion and URL-based language routing.

## Stack

- Next.js App Router
- React
- TypeScript strict mode
- CSS in `src/app/globals.css`
- GSAP and `@gsap/react`
- `next/font/google` with Montserrat, Inter Tight and IBM Plex Mono

## Requirements

- Node.js compatible with the installed Next.js version
- npm
- Network access during production builds so `next/font/google` can fetch and self-host Google Fonts

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Routes and Languages

- English: `/`, `/projects/<slug>`
- Russian: `/ru`, `/ru/projects/<slug>`
- `/en` redirects to `/`
- Project slugs are not translated.
- Language is controlled only by the URL. Do not add language cookies or localStorage.

## Project Structure

- `src/app/layout.tsx` - global metadata, fonts, skip link and motion shell.
- `src/app/page.tsx` - English homepage route.
- `src/app/ru/page.tsx` - Russian homepage route.
- `src/app/projects/[slug]/page.tsx` - English project case route and metadata.
- `src/app/ru/projects/[slug]/page.tsx` - Russian project case route and metadata.
- `src/app/work/*/page.tsx` - legacy redirects to `/projects/*`.
- `src/components` - header, footer, selected work, project case, letter swap and route motion.
- `src/content/portfolio.ts` - localized portfolio copy, contact links, services and project data.
- `public/projects` - project preview assets.
- `public/videos/frames` - generated dark hero portrait frame sequence.

## Content Updates

Most copy and structured content lives in `src/content/portfolio.ts`.

Text fields are typed as `Record<"en" | "ru", string>` or nested localized objects. If a new visible string is added to the shared content model without both `en` and `ru`, TypeScript should fail the build.

To update contacts, edit the `contact` object. Keep external URLs clean, use `mailto:` for email rendering through the existing component, and preserve the WhatsApp prefilled message unless the business flow changes.

To add a project:

1. Add the preview asset under `public/projects/<project-id>/`.
2. Add a new `ProjectId`.
3. Add a localized item to `projectContent` in `src/content/portfolio.ts`.
4. Create no translated slug; both languages should use the same slug.
5. Confirm metadata, alt text and showcase captions include both `en` and `ru`.

## Screenshots

The project data model supports:

- `previewImage`
- `desktopImage`
- `mobileImage`
- `ogImage`

Current remaining asset TODOs:

- `public/projects/thai-nari/desktop.webp`
- `public/projects/thai-nari/mobile.webp`
- `public/projects/pavel-portfolio/desktop.webp`
- `public/projects/pavel-portfolio/mobile.webp`

Do not reuse a desktop crop as a mobile screenshot. If a real mobile screenshot is missing, leave `mobileImage` undefined so the mobile preview block stays hidden.

## Hero Frame Sequence

The homepage portrait scrub renders a generated WebP frame sequence to canvas instead of swapping image sources or seeking MP4 files at runtime:

- `public/videos/frames/frame-000.webp` through `frame-110.webp`

The sequence should contain 111 frames with matching dimensions and stable positioning. `frame-055.webp` is used as the center poster frame.

Example regeneration command:

```bash
ffmpeg -y -ss 0.4 -i public/videos/portrait-dark.mp4 -an -vf "fps=24,scale=960:960:flags=lanczos" -c:v libwebp -start_number 0 -compression_level 6 -q:v 76 public/videos/frames/frame-%03d.webp
```

## Vercel Deployment

The site is deployable as a standard Next.js project on Vercel. Keep `site.productionUrl` in `src/content/portfolio.ts` aligned with the production deployment because metadata, sitemap, robots and canonical URLs use it as the base.

## Fonts

The site uses free Google Fonts through `next/font/google`:

- Montserrat for large display moments and headings.
- Inter Tight for body and interface text.
- IBM Plex Mono for metadata and technical labels.

These fonts are loaded through `next/font/google` and self-hosted by Next.js in production. No proprietary font files are committed.
