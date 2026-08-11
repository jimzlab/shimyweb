import { Link } from "@tanstack/react-router";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {site.role} · {site.city} a celá ČR
          </p>
          <a
            href={site.phoneHref}
            className="mt-5 inline-flex min-h-11 items-center text-lg text-primary"
          >
            {site.phoneDisplay}
          </a>
          <p className="text-sm text-muted-foreground">{site.hours}</p>
        </div>

        <nav aria-label="Navigace v zápatí">
          <p className="eyebrow">Stránky</p>
          <ul className="mt-4 space-y-1">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Kontakt</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {site.email}
          </a>
          <div className="mt-2 flex gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex size-11 items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-primary hover:text-primary"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="flex size-11 items-center justify-center rounded-full border border-border text-sm transition-colors hover:border-primary hover:text-primary"
              aria-label="Facebook"
            >
              FB
            </a>
          </div>
        </div>
      </div>
      <div className="container-x border-t border-border/40 py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. Všechna práva vyhrazena.
      </div>
    </footer>
  );
}
