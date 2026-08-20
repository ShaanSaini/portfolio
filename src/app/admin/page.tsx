import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin-auth";
import { getProjects, isBlobConfigured } from "@/lib/projects";
import { UploadForm } from "./upload-form";
import { deleteProjectAction, logoutAction, seedProjectsAction } from "./actions";

export default async function AdminPage() {
  if (!(await isAdminSession())) {
    redirect("/admin/login");
  }

  const blobConfigured = isBlobConfigured();
  const projects = blobConfigured ? await getProjects() : [];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-muted">Admin</p>
          <h1 className="mt-1 font-display text-2xl text-foreground">
            Manage portfolio
          </h1>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Log out
          </button>
        </form>
      </div>

      {!blobConfigured && (
        <p className="mt-6 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground">
          No Blob store connected — <code className="font-mono text-xs">BLOB_READ_WRITE_TOKEN</code>{" "}
          is not set. Uploading and saving is disabled until it is. See the
          &ldquo;Set up Vercel Blob&rdquo; section in the README.
        </p>
      )}

      <section className="mt-10 rounded-lg border border-border p-6">
        <h2 className="font-display text-lg text-foreground">
          Add a project
        </h2>
        <UploadForm disabled={!blobConfigured} />
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-foreground">
            Current projects
            <span className="ml-2 font-mono text-xs text-muted">
              {projects.length}
            </span>
          </h2>
          {projects.length === 0 && blobConfigured && (
            <form action={seedProjectsAction}>
              <button
                type="submit"
                className="font-mono text-xs text-accent hover:underline"
              >
                Load sample projects
              </button>
            </form>
          )}
        </div>

        {projects.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Nothing here yet. Add your first project above.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">
                    {project.title}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {project.caption}
                  </p>
                </div>
                <form action={deleteProjectAction.bind(null, project.slug)}>
                  <button
                    type="submit"
                    className="shrink-0 font-mono text-xs text-muted transition-colors hover:text-red-400"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
