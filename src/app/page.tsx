import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectGrid } from "@/components/project-grid";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:px-8 sm:pt-28">
          <p className="font-mono text-sm text-accent">01 — Portfolio</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Designer &amp; developer making considered, detail-first work.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            I&apos;m Your Name — a short line about what you do, who you do
            it for, and what makes your work distinct. Replace this with
          your own introduction.
          </p>
        </section>

        <ProjectGrid />

        <section id="about" className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
            <h2 className="font-display text-2xl text-foreground sm:text-3xl">
              About
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              Write a few sentences about your background, how you work, and
              what you&apos;re looking for next. Keep it short — this section
              is a supplement to the work above, not a replacement for it.

              Freelance Software Engineer
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
