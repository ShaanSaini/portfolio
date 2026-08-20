import type { Project } from "@/lib/projects";

/**
 * Seed content for the admin dashboard's "Load sample projects" button —
 * points at the placeholder SVGs in public/images so there's something to
 * look at before you've uploaded real work. Only ever written to the store
 * when it's empty; delete these from /admin once you've added your own.
 */
export const SAMPLE_PROJECTS: Project[] = [
  {
    slug: "field-notes",
    title: "Field Notes",
    caption: "A visual survey of coastal light, shot over one winter.",
    year: "2025",
    tags: ["Photography"],
    image: "/images/project-1.svg",
    imageAlt: "Placeholder artwork for Field Notes",
  },
  {
    slug: "signal",
    title: "Signal",
    caption: "Brand identity and packaging system for an audio startup.",
    year: "2025",
    tags: ["Branding", "Packaging"],
    image: "/images/project-2.svg",
    imageAlt: "Placeholder artwork for Signal",
  },
  {
    slug: "undertow",
    title: "Undertow",
    caption: "Generative motion study exploring fluid dynamics in WebGL.",
    year: "2024",
    tags: ["Motion", "Code"],
    image: "/images/project-3.svg",
    imageAlt: "Placeholder artwork for Undertow",
  },
  {
    slug: "paper-trail",
    title: "Paper Trail",
    caption: "Editorial layout and type system for a quarterly print zine.",
    year: "2024",
    tags: ["Editorial", "Type"],
    image: "/images/project-4.svg",
    imageAlt: "Placeholder artwork for Paper Trail",
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    caption: "Long-exposure night photography across three cities.",
    year: "2023",
    tags: ["Photography"],
    image: "/images/project-5.svg",
    imageAlt: "Placeholder artwork for Nocturne",
  },
  {
    slug: "glasswork",
    title: "Glasswork",
    caption: "A component library and design system built for scale.",
    year: "2023",
    tags: ["Product", "Design System"],
    image: "/images/project-6.svg",
    imageAlt: "Placeholder artwork for Glasswork",
  },
];
