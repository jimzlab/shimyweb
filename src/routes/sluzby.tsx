import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, Sparkles, Send } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/lib/site";

export const Route = createFileRoute("/sluzby")({
  head: () => ({
    meta: [
      { title: `Služby a ceník | ${site.name}` },
      {
        name: "description",
        content:
          "Ceník fotografických služeb SimekPhoto. Svatební fotografie, firemní akce, autosrazy, koncerty, portréty i produkty. Frýdek-Místek a Moravskoslezský kraj.",
      },
      { property: "og:title", content: `Služby a ceník | ${site.name}` },
      { property: "og:description", content: "Přehledný ceník focení — svatby, akce, autosrazy, portréty." },
      { property: "og:url", content: "/sluzby" },
    ],
    links: [{ rel: "canonical", href: "/sluzby" }],
  }),
  component: Services,
});

const mainServices = [
  "Svatby",
  "Firemní akce",
  "Autosrazy & Koncerty",
  "Portréty",
  "Krajina & Atmosféra",
  "Produktové focení",
];

const packages = [
  {
    name: "Svatební fotografie — Obřad + Portréty",
    price: "4 000 – 6 000 Kč",
    subtitle: "Doba trvání: 2 – 3 hodiny",
    items: [
      "Focení obřadu, gratulací a rodinných skupinových fotek",
      "Párové portrétní focení novomanželů v exteriéru",
      "Všechny vybrané a ručně retušované fotografie",
      "Online galerie ke stažení a sdílení pro rodinu a přátele",
      "Rychlé odevzdání prvních náhledů",
    ],
    highlight: true,
  },
  {
    name: "Firemní akce, srazy & koncerty",
    price: "800 – 1 800 Kč",
    subtitle: "Hodinová sazba (dle náročnosti)",
    items: [
      "Reportážní focení firemních večírků, konferencí a teambuildingů",
      "Autosrazy, tuning srazy a automobilové akce",
      "Koncerty, festivaly a kultura",
      "Zachycení atmosféry, dynamiky a spontánních momentů",
      "Dodání fotografií v plném rozlišení pro web i sociální sítě",
    ],
  },
  {
    name: "Portréty & Individuální focení",
    price: "800 – 1 800 Kč",
    subtitle: "Hodinová sazba / Focení v exteriéru",
    items: [
      "Osobní, lifestyle i kreatvní portréty",
      "Příjemné focení bez stresu a nucených pozic",
      "Výběr zajímavých lokací a práce s přirozeným světlem",
      "Kompletně retušované výsledné snímky",
    ],
  },
  {
    name: "Produktová fotografie",
    price: "800 – 1 800 Kč",
    subtitle: "Hodinová sazba nebo cena dle počtu produktů",
    items: [
      "Fotografie produktů pro e-shopy, katalogy a sociální sítě",
      "Důraz na čistotu, detail a reálné podání barvy a materiálu",
      "Licence pro komerční využití v ceně",
    ],
  },
];

function Services() {
  useReveal();

  return (
    <div className="container-x py-14 sm:py-20">
      <div className="reveal max-w-3xl">
        <p className="eyebrow">Služby a ceník</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Ceník & Zaměření</h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Focení přizpůsobuji vždy tvým představám. Ceny jsou orientační a cestování v rámci Frýdku-Místku
          a Moravskoslezského kraje je na domluvě.
        </p>

        {/* Categories tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {mainServices.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/80 bg-card/60 px-4 py-1.5 text-xs uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {packages.map((p, i) => (
          <article
            key={p.name}
            className={`reveal flex flex-col justify-between rounded-sm border p-6 sm:p-8 transition-colors ${
              p.highlight ? "border-primary bg-card" : "border-border bg-card/40 hover:border-primary/40"
            }`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div>
              {p.highlight ? (
                <span className="eyebrow inline-flex items-center gap-1.5 mb-3 rounded-full bg-primary/10 px-3 py-1 text-primary">
                  <Sparkles className="size-3.5" />
                  <span>Oblíbený balíček</span>
                </span>
              ) : null}
              
              <h2 className="text-2xl font-display">{p.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{p.subtitle}</p>
              
              <div className="mt-4 border-y border-border/60 py-4">
                <p className="font-display text-3xl font-light text-primary">{p.price}</p>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={site.phoneHref}
                className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-sm px-5 text-sm font-medium transition-all ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border hover:border-primary hover:text-primary"
                }`}
              >
                <Phone className="size-4 shrink-0" />
                <span>Poptat termín · {site.phoneDisplay}</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Custom request section */}
      <div className="mt-16 reveal rounded-sm border border-border bg-card/60 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="text-2xl font-display">Máš speciální projekt nebo jinou představu?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Každá akce i nápad je jiný. Napiš mi nebo zavolej a sestavíme nabídku přesně podle tvých potřeb.
          </p>
        </div>
        <Link
          to="/kontakt"
          className="mt-6 sm:mt-0 shrink-0 inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Send className="size-4 shrink-0" />
          <span>Napsat přes formulář</span>
        </Link>
      </div>
    </div>
  );
}
