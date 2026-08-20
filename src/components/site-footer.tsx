const socials = [
  { label: "Email", href: "mailto:you@example.com" },
  { label: "GitHub", href: "https://github.com/yourhandle" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl text-foreground">
            Let&apos;s work together.
          </p>
          <p className="mt-1 text-sm text-muted">
            Open to freelance and full-time opportunities.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-muted transition-colors hover:text-foreground"
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-5xl px-6 py-4 font-mono text-xs text-muted sm:px-8">
          © {year} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
