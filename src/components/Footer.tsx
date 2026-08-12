import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <span>{site.role} · {site.city} a celá ČR</span>
          </p>
          <a
            href={site.phoneHref}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-lg text-primary hover:underline"
          >
            <Phone className="size-4 shrink-0" />
            <span>{site.phoneDisplay}</span>
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
            className="mt-4 flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Mail className="size-4 shrink-0 text-primary" />
            <span>{site.email}</span>
          </a>
          <div className="mt-3 flex gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="size-5" />
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
