# Portfolio

A simple image + caption portfolio site with a password-protected admin
dashboard for uploading new work.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Space Grotesk / Inter / JetBrains Mono · [Vercel Blob](https://vercel.com/docs/vercel-blob) for image + content storage · deployed on Vercel.

## Set up Vercel Blob

1. In the [Vercel dashboard](https://vercel.com/dashboard), open this project (or create it) → **Storage** → **Create Database** → **Blob**.
2. Pull the generated token down locally:
   ```bash
   npm i -g vercel   # if you don't have it
   vercel link        # first time only, links this folder to the Vercel project
   vercel env pull .env.local
   ```
   This writes `BLOB_READ_WRITE_TOKEN` into `.env.local`.
3. Add an admin password: open `.env.local` and set
   ```
   ADMIN_PASSWORD=something-only-you-know
   ```
   Then add the same `ADMIN_PASSWORD` value as an Environment Variable on the Vercel project (Settings → Environment Variables) so it also works in production.

See `.env.local.example` for the full list.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, and
[http://localhost:3000/admin](http://localhost:3000/admin) to log in and manage content.

## Managing content

There's no static data file to edit — everything is managed from **`/admin`**:

1. Go to `/admin`, sign in with `ADMIN_PASSWORD`.
2. Fill in the title, caption, year, and optional comma-separated tags, choose an image, and submit. The image uploads directly from your browser to Vercel Blob (no size limit imposed by the app), and the project metadata is saved alongside it in Blob storage as `data/projects.json`.
3. Delete a project from the same dashboard.
4. If the store is empty, an admin can click **"Load sample projects"** to seed the six placeholder entries as a starting point.

Changes appear on the homepage immediately — no redeploy needed.

Site identity (name, intro copy, about text, contact links) still lives directly in code, since it changes rarely:

- `src/app/page.tsx` — hero + about copy
- `src/components/site-header.tsx` — site name
- `src/components/site-footer.tsx` — contact links, copyright

## Brand tokens

Color and font tokens are defined once in `src/app/globals.css` (dark-mode-first) and fonts are loaded via `next/font/google` in `src/app/layout.tsx`. Change a token there and it updates everywhere.

## How the admin dashboard works

- `/admin` is a single shared login (`ADMIN_PASSWORD`), not per-user accounts — fine for a personal site, not intended for a team.
- The session is an `httpOnly` cookie set on successful login; every mutating action re-checks it server-side (see `src/lib/admin-auth.ts`, `src/app/admin/actions.ts`).
- `/admin` is excluded from search indexing via `src/app/robots.ts`.
- Uploads go straight from the browser to Blob storage using [Vercel Blob client uploads](https://vercel.com/docs/vercel-blob/using-blob-sdk#client-uploads) (`src/app/api/admin/blob-upload/route.ts` only issues a scoped, short-lived token — it never sees the file bytes).
- Project metadata (title/caption/year/tags/image URL) lives in a single `data/projects.json` blob, read by `src/lib/projects.ts`.

## Deploy

Push to a GitHub repo and [import it on Vercel](https://vercel.com/new). Make sure the Blob store is connected to the project (step 1 above) and `ADMIN_PASSWORD` is set in the project's Environment Variables — no other backend service is required.
