import { get, put } from "@vercel/blob";

export type Project = {
  /** Unique, URL-safe identifier, also used as the React key. */
  slug: string;
  title: string;
  /** Short one-line caption shown under the image in the grid. */
  caption: string;
  year: string;
  tags?: string[];
  /** Public URL of the image (Vercel Blob URL, or a /public path for seed data). */
  image: string;
  imageAlt: string;
};

const PROJECTS_PATHNAME = "data/projects.json";

/**
 * Whether a Blob store is connected. Use to show setup guidance in /admin.
 * Vercel connects a store to a project one of two ways: a classic
 * BLOB_READ_WRITE_TOKEN, or (the current default) BLOB_STORE_ID paired
 * with a short-lived OIDC token that Vercel injects automatically at
 * runtime — the SDK picks whichever is present on its own, so either env
 * var being set means uploads/saves will work.
 */
export function isBlobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID,
  );
}

/**
 * Reads the project list from Vercel Blob. Returns an empty array if the
 * store hasn't been configured yet or nothing has been saved yet —
 * callers should treat both as "no projects yet" rather than an error.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const result = await get(PROJECTS_PATHNAME, {
      access: "public",
      // Always read the latest write — this file changes rarely but
      // correctness (seeing your own edit immediately) matters more
      // than shaving a request off the CDN.
      useCache: false,
    });
    if (!result || result.statusCode !== 200) return [];
    const text = await new Response(result.stream).text();
    const parsed: unknown = JSON.parse(text);
    return Array.isArray(parsed) ? (parsed as Project[]) : [];
  } catch (error) {
    console.warn("[projects] Falling back to an empty list:", error);
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await put(PROJECTS_PATHNAME, JSON.stringify(projects, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Turns a title into a unique, URL-safe slug. */
export function slugify(title: string, existing: Project[]): string {
  const base =
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "project";

  const taken = new Set(existing.map((p) => p.slug));
  if (!taken.has(base)) return base;

  let suffix = 2;
  while (taken.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}
