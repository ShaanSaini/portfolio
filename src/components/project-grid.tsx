import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export async function ProjectGrid() {
  const projects = await getProjects();

  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          Selected Work
        </h2>
        {projects.length > 0 && (
          <span className="font-mono text-xs text-muted">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border px-6 py-16 text-center">
          <p className="text-sm text-muted">
            No projects yet.{" "}
            <Link href="/admin" className="text-accent hover:underline">
              Add your first one from the admin dashboard
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
