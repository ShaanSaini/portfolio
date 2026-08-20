# Portfolio

A simple image + caption portfolio site.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Space Grotesk / Inter / JetBrains Mono · deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All portfolio entries live in one file: `src/data/projects.ts`. Each entry is a plain object — no CMS, no database:

```ts
{
  slug: "field-notes",
  title: "Field Notes",
  caption: "A visual survey of coastal light, shot over one winter.",
  year: "2025",
  tags: ["Photography"],
  image: "/images/field-notes.jpg",
  imageAlt: "…",
  width: 1200,
  height: 900,
}
```

To add a project:

1. Drop the image file in `public/images/`.
2. Add an entry to the `projects` array in `src/data/projects.ts` pointing `image` at it, with the real `width`/`height` of the file (needed to prevent layout shift).
3. Commit and push — Vercel redeploys automatically.

The six sample entries currently point at generated placeholder SVGs — replace them with your own photos/artwork.

Site identity (name, intro copy, about text, contact links) lives directly in:

- `src/app/page.tsx` — hero + about copy
- `src/components/site-header.tsx` — site name
- `src/components/site-footer.tsx` — contact links, copyright

## Brand tokens

Color and font tokens are defined once in `src/app/globals.css` (dark-mode-first) and fonts are loaded via `next/font/google` in `src/app/layout.tsx`. Change a token there and it updates everywhere.

## Deploy

Push to a GitHub repo and [import it on Vercel](https://vercel.com/new) — zero config needed. No database or extra backend service is required for this site.
