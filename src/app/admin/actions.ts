"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  isAdminSession,
  verifyPassword,
} from "@/lib/admin-auth";
import { getProjects, saveProjects, slugify } from "@/lib/projects";
import { SAMPLE_PROJECTS } from "@/lib/sample-projects";

export type LoginState = { error?: string };

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    return { error: "Incorrect password." };
  }

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

async function requireAdmin(): Promise<void> {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }
}

/**
 * Saves a project after the client has already uploaded the image to Blob
 * (see upload-form.tsx) and knows its public URL.
 */
export async function addProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();
  const year = String(formData.get("year") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const imageAlt = String(formData.get("imageAlt") ?? "").trim() || title;

  if (!title || !caption || !imageUrl) {
    throw new Error("Title, caption, and image are required.");
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : undefined;

  const projects = await getProjects();
  const slug = slugify(title, projects);

  projects.unshift({
    slug,
    title,
    caption,
    year: year || String(new Date().getFullYear()),
    tags,
    image: imageUrl,
    imageAlt,
  });

  await saveProjects(projects);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProjectAction(slug: string): Promise<void> {
  await requireAdmin();

  const projects = await getProjects();
  await saveProjects(projects.filter((project) => project.slug !== slug));

  revalidatePath("/");
  revalidatePath("/admin");
}

/** Populates the store with placeholder content — only runs while empty. */
export async function seedProjectsAction(): Promise<void> {
  await requireAdmin();

  const projects = await getProjects();
  if (projects.length > 0) return;

  await saveProjects(SAMPLE_PROJECTS);
  revalidatePath("/");
  revalidatePath("/admin");
}
