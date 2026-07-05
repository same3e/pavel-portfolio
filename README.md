# Pavel Portfolio

Editorial portfolio for Pavel Kostin, an independent web designer and developer based in Tbilisi. The site presents selected work, services, contact paths and case-study pages with a restrained dark theme and project-focused motion.

## Stack

- Next.js App Router
- React
- TypeScript
- CSS in `src/app/globals.css`
- `next/font/google` with Onest, Inter Tight and IBM Plex Mono

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

## Project Structure

- `src/app/layout.tsx` - global metadata, fonts and shell.
- `src/app/page.tsx` - homepage sections.
- `src/app/work/*/page.tsx` - project route metadata and case pages.
- `src/components` - header, footer, selected work, project case and route motion.
- `src/content/portfolio.ts` - portfolio copy, contact links, services and project data.
- `public/projects` - project preview assets.
- `public/videos/frames` - generated dark hero portrait frame sequence.

## Content Updates

Most copy and structured content lives in `src/content/portfolio.ts`.

To update contacts, edit the `contact` object. Keep external URLs clean, use `mailto:` for email rendering through the existing component, and preserve the WhatsApp prefilled message unless the business flow changes.

To add a project:

1. Add the preview asset under `public/projects/<project-id>/`.
2. Add a new item to `projects` in `src/content/portfolio.ts`.
3. Create a matching route under `src/app/work/<project-id>/page.tsx`.
4. Add project-specific metadata using the project's `seoTitle` and `seoDescription`.

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

The site is deployable as a standard Next.js project on Vercel. Keep `site.productionUrl` in `src/content/portfolio.ts` aligned with the production deployment because metadata, sitemap and robots use it as the canonical base.

## Fonts

The site uses free Google Fonts through `next/font/google`:

- Onest for large display moments.
- Inter Tight for body and interface text.
- IBM Plex Mono for metadata and technical labels.

No proprietary font files are committed.
