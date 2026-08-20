import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";

export function ProjectGrid() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          Selected Work
        </h2>
        <span className="font-mono text-xs text-muted">
          {String(projects.length).padStart(2, "0")} projects
        </span>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
