import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { useReveal } from "@/hooks/useReveal";
import { photos, heroWedding, portrait1, family1, product1 } from "@/lib/photos";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Fotograf ${site.city} & Moravskoslezský kraj` },
      {
        name: "description",
        content:
          "Fotograf z Frýdku-Místku. Portréty, akce, auta i čistá atmosféra po celém Moravskoslezském kraji. Rezervace na +420 777 123 456.",
      },
      { property: "og:title", content: `${site.name} — Fotograf ${site.city}` },
      {
        property: "og:description",
        content: "Fotograf pro portréty, akce, auta a atmosféru. Frýdek-Místek, Ostrava a okolí.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          additionalType: "https://schema.org/Photographer",
          name: site.name,
          description: "Portrétní, akční a automobilová fotografie v Moravskoslezském kraji",
          telephone: site.phoneDisplay,
          email: site.email,
          address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "Moravskoslezský kraj", addressCountry: "CZ" },
          openingHours: ["Mo-Fr 09:00-19:00", "Sa 10:00-16:00"],
          sameAs: [site.instagram, site.facebook],
        }),
      },
    ],
  }),
  component: Home,
});

const featured = [
  { src: heroWedding, alt: "Svatební pár při zlaté hodině", label: "Svatby", w: 1920, h: 1280 },
  { src: portrait1, alt: "Portrét v teplém okenním světle", label: "Portréty", w: 1024, h: 1280 },
  { src: family1, alt: "Rodina v podzimním parku", label: "Rodina", w: 1280, h: 960 },
  { src: product1, alt: "Produktová fotografie flakonu", label: "Produkty", w: 1024, h: 1024 },
];

function Home() {
  useReveal();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section
        className="relative isolate flex min-h-[88svh] items-end overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.14 0.01 60) 0%, oklch(0.20 0.012 55) 40%, oklch(0.17 0.008 60) 70%, oklch(0.12 0.006 65) 100%)",
        }}
      >
        {/* Subtle warm accent glow */}
        <div
          aria-hidden="true"
          className="absolute -z-10"
          style={{
            top: "10%",
            right: "-5%",
            width: "50%",
            height: "60%",
            background: "radial-gradient(ellipse, oklch(0.822 0.104 63.5 / 0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="container-x pb-14 sm:pb-20">
          <p className="eyebrow">
            {site.role} · {site.city}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
            Zachycuji okamžiky, příběhy a atmosféru skrze objektiv.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Ahoj, jsem Ondra. Věnuji se portrétům, akcím, autům i atmosféře míst. Tvořím fotky s duší a nápadem.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.phoneHref}
              className="flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-base font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Zavolejte a rezervujte termín · {site.phoneDisplay}
            </a>
            <Link
              to="/portfolio"
              className="flex min-h-12 items-center justify-center rounded-sm border border-border px-6 text-base transition-colors hover:border-primary hover:text-primary"
            >
              Prohlédnout portfolio
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Nejlépe se dovoláte: {site.hours}</p>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="reveal grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Vybrané práce</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Čtyři světy, jeden pohled</h2>
          </div>
          <p className="text-muted-foreground">
            Každá zakázka začíná rozhovorem o tom, co chcete cítit, když se na fotky za deset let
            podíváte. Zbytek je práce se světlem, časem a trpělivostí.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setLightbox(i)}
              className="reveal group relative block overflow-hidden rounded-sm text-left"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-sm tracking-[0.18em] uppercase">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/portfolio"
            className="inline-flex min-h-12 items-center text-primary underline-offset-8 hover:underline"
          >
            Celá galerie →
          </Link>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/40 py-20">
        <div className="container-x grid gap-8 sm:grid-cols-3">
          {[
            { k: "23 let", v: "mladý a svěží pohled s důrazem na detail" },
            { k: "100 %", v: "zápal pro věc & osobní, uvolněný přístup" },
            { k: "48 h", v: "rychlé odevzdání prvních náhledů po focení" },
          ].map((s, i) => (
            <div key={s.k} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="font-display text-4xl text-primary">{s.k}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20 text-center sm:py-28">
        <div className="reveal mx-auto max-w-2xl">
          <p className="eyebrow">Rezervace termínu</p>
          <h2 className="mt-3 text-3xl sm:text-5xl">Termíny se plní rychle. Stačí zavolat.</h2>
          <p className="mt-4 text-muted-foreground">
            Během pěti minut po telefonu zjistíme, jestli si sedneme a jestli mám váš termín volný.
          </p>
          <a
            href={site.phoneHref}
            className="mt-8 inline-flex min-h-12 items-center rounded-sm bg-primary px-8 text-lg font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            {site.phoneDisplay}
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Radši píšete? <Link to="/kontakt" className="text-primary">Kontaktní formulář</Link>
          </p>
        </div>
      </section>

      {lightbox !== null ? (
        <Lightbox
          photos={photos}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
