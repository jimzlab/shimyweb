import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-x flex min-h-16 items-center justify-between gap-4 py-2">
        <Link to="/" className="flex flex-col leading-tight" aria-label="Domovská stránka SimekPhoto">
          <span className="font-display text-xl tracking-wide sm:text-2xl">{site.name}</span>
          <span className="text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
            Fotograf · {site.city}
          </span>
        </Link>

        <nav aria-label="Hlavní navigace" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-3 text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="flex min-h-11 items-center gap-2 rounded-sm bg-primary px-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:px-4"
          >
            <span aria-hidden="true">☎</span>
            <span className="hidden sm:inline">{site.phoneDisplay}</span>
            <span className="sm:hidden">Zavolat</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-sm border border-border lg:hidden"
          >
            <span
              aria-hidden="true"
              className="h-px w-5 bg-foreground transition-transform"
              style={open ? { transform: "translateY(3px) rotate(45deg)" } : undefined}
            />
            <span
              aria-hidden="true"
              className="h-px w-5 bg-foreground transition-transform"
              style={open ? { transform: "translateY(-3px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobilní navigace"
          className="border-t border-border/60 bg-background lg:hidden"
        >
          <ul className="container-x flex flex-col py-2">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex min-h-12 items-center border-b border-border/40 text-base text-muted-foreground"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4 text-sm text-muted-foreground">
              Nejlépe se dovoláte: {site.hours}
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
