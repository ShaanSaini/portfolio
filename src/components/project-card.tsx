import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-background-elevated">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={project.width}
          height={project.height}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-lg text-foreground">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-muted">
          {project.year}
        </span>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        {project.caption}
      </p>
      {project.tags && project.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border-strong px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
