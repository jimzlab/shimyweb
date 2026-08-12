import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Send, CheckCircle2, Sparkles, Camera, HeartHandshake, Flame } from "lucide-react";
import { aboutPhotographer as aboutImg } from "@/lib/photos";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/lib/site";

export const Route = createFileRoute("/o-mne")({
  head: () => ({
    meta: [
      { title: `O mně — ${site.name} | Fotograf ${site.city}` },
      {
        name: "description",
        content:
          "Je mi 23 let a zachycuji okamžiky, příběhy a atmosféru skrze objektiv. Portréty, akce, auta i čisté emoce.",
      },
      { property: "og:title", content: `O mně — ${site.name}` },
      { property: "og:description", content: "Mladý a svěží pohled na fotografii. Portréty, akce, auta a atmosféra." },
      { property: "og:url", content: "/o-mne" },
    ],
    links: [{ rel: "canonical", href: "/o-mne" }],
  }),
  component: About,
});

const whyMe = [
  {
    icon: Sparkles,
    title: "Mladý a svěží pohled",
    description: "Sleduji moderní trendy a rád experimentuji s kompozicí i výslednou úpravou.",
  },
  {
    icon: HeartHandshake,
    title: "Osobní přístup",
    description: "Záleží mi na tom, abys se před objektivem cítil/a přirozeně, v pohodě a uvolněně.",
  },
  {
    icon: Flame,
    title: "Zápal pro věc",
    description: "Focení mě nesmírně baví – do každého zmáčknutí spouště dávám maximum a na fotkách je to vidět.",
  },
];

const specialties = [
  "Portrétní fotografie s duší",
  "Reportáže akcí a událostí",
  "Automobilová fotografie",
  "Čistá atmosféra & přirozené světlo",
];

function About() {
  useReveal();

  return (
    <div className="container-x py-14 sm:py-20">
      {/* Hero Header */}
      <div className="reveal max-w-3xl">
        <p className="eyebrow flex items-center gap-1.5">
          <Camera className="size-3.5" />
          <span>O mně · Fotograf</span>
        </p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">Ahoj, jsem Ondra.</h1>
        <p className="mt-4 text-xl text-primary font-display sm:text-2xl">
          Zachycuji okamžiky, příběhy a atmosféru skrze objektiv.
        </p>
      </div>

      {/* Main Grid: Photo + Story */}
      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <div className="reveal relative">
          <img
            src={aboutImg}
            alt="Fotograf Ondra při práci"
            width={1024}
            height={1280}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full rounded-sm object-cover"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-sm border border-border/80 bg-background/90 backdrop-blur-md px-4 py-2 text-xs tracking-wider uppercase text-foreground">
            <Sparkles className="size-3.5 text-primary shrink-0" />
            <span>23 let · Vášeň pro detail</span>
          </div>
        </div>

        <div className="reveal space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display">Můj příběh & přístup</h2>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Je mi 23 let a fotografování pro mě už dávno není jen obyčejným koníčkem. Byla to láska
              k detailu a chuť zachytit neopakovatelné momenty, co mě přivedlo k tomu vzít fotoaparát
              do ruky naplno.
            </p>
            <p>
              Baví mě objevovat nové úhly pohledu, pracovat s přirozeným světlem a tvořit fotky,
              které mají duši. Ať už jde o portréty, akce, auta nebo čistou atmosféru daného místa,
              do každého zmáčknutí spouště dávám maximum své energie a nápaditosti.
            </p>
            <p>
              Aktuálně posouvám své focení z kategorie „záliba“ na profesionální úroveň. Hledám nové
              výzvy, zajímavé projekty a lidi, kterým mohu pomoci uchovat jejich vzpomínky nebo
              zviditelnit jejich nápad.
            </p>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" />
              <span>Co nejraději fotím:</span>
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {specialties.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <Phone className="size-4 shrink-0" />
              <span>Zavolat: {site.phoneDisplay}</span>
            </a>
            <Link
              to="/kontakt"
              className="flex min-h-12 items-center justify-center gap-2 rounded-sm border border-border px-6 transition-colors hover:border-primary hover:text-primary"
            >
              <Send className="size-4 shrink-0" />
              <span>Napiš mi zprávu</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Work With Me Section */}
      <div className="mt-20 sm:mt-28 border-t border-border/60 pt-16">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Spolupráce</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Proč spolupracovat právě se mnou?</h2>
          <p className="mt-3 text-muted-foreground">
            Každý projekt je pro mě příležitost vytvořit něco výjimečného. Zde je to, na čem si zakládám:
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {whyMe.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal group rounded-sm border border-border/80 bg-card/40 p-6 transition-all hover:border-primary/50 hover:bg-card/70"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex size-12 items-center justify-center rounded-sm border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Icon className="size-6 shrink-0" />
                </div>
                <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
