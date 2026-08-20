export type Project = {
  /** Unique, URL-safe identifier. */
  slug: string;
  title: string;
  /** Short one-line caption shown under the image in the grid. */
  caption: string;
  /** Optional longer description for a detail view. */
  description?: string;
  year: string;
  tags?: string[];
  image: string;
  imageAlt: string;
  /** Intrinsic size of the source image, for layout stability. */
  width: number;
  height: number;
};

// Replace the entries below with your own work. Drop images in
// `public/images/` and point `image` at `/images/your-file.jpg`.
export const projects: Project[] = [
  {
    slug: "field-notes",
    title: "Field Notes",
    caption: "A visual survey of coastal light, shot over one winter.",
    year: "2025",
    tags: ["Photography"],
    image: "/images/project-1.svg",
    imageAlt: "Placeholder artwork for Field Notes",
    width: 1200,
    height: 900,
  },
  {
    slug: "signal",
    title: "Signal",
    caption: "Brand identity and packaging system for an audio startup.",
    year: "2025",
    tags: ["Branding", "Packaging"],
    image: "/images/project-2.svg",
    imageAlt: "Placeholder artwork for Signal",
    width: 1200,
    height: 900,
  },
  {
    slug: "undertow",
    title: "Undertow",
    caption: "Generative motion study exploring fluid dynamics in WebGL.",
    year: "2024",
    tags: ["Motion", "Code"],
    image: "/images/project-3.svg",
    imageAlt: "Placeholder artwork for Undertow",
    width: 1200,
    height: 900,
  },
  {
    slug: "paper-trail",
    title: "Paper Trail",
    caption: "Editorial layout and type system for a quarterly print zine.",
    year: "2024",
    tags: ["Editorial", "Type"],
    image: "/images/project-4.svg",
    imageAlt: "Placeholder artwork for Paper Trail",
    width: 1200,
    height: 900,
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    caption: "Long-exposure night photography across three cities.",
    year: "2023",
    tags: ["Photography"],
    image: "/images/project-5.svg",
    imageAlt: "Placeholder artwork for Nocturne",
    width: 1200,
    height: 900,
  },
  {
    slug: "glasswork",
    title: "Glasswork",
    caption: "A component library and design system built for scale.",
    year: "2023",
    tags: ["Product", "Design System"],
    image: "/images/project-6.svg",
    imageAlt: "Placeholder artwork for Glasswork",
    width: 1200,
    height: 900,
  },
];
