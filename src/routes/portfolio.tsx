import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { useReveal } from "@/hooks/useReveal";
import { categories, photos, type Category } from "@/lib/photos";
import { site } from "@/lib/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: `Portfolio — svatby, portréty, rodina | ${site.name}` },
      {
        name: "description",
        content:
          "Galerie fotografií rozdělená do kategorií: svatby, portréty, rodinné a produktové focení. Klikněte na fotku pro zvětšení.",
      },
      { property: "og:title", content: `Portfolio | ${site.name}` },
      {
        property: "og:description",
        content: "Vybrané svatební, portrétní, rodinné a produktové fotografie.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [filter, setFilter] = useState<Category | "vse">("vse");
  const [lightbox, setLightbox] = useState<number | null>(null);
  useReveal([filter]);

  const visible = filter === "vse" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="container-x py-14 sm:py-20">
      <p className="eyebrow">Portfolio</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Galerie</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Vyberte kategorii. Kliknutím fotku zvětšíte, na mobilu mezi snímky přejíždíte prstem.
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtr kategorií">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setFilter(c.id);
              setLightbox(null);
            }}
            aria-pressed={filter === c.id}
            className={`min-h-11 rounded-full border px-5 text-sm tracking-wide transition-colors ${
              filter === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((photo, i) => (
          <button
            key={`${photo.src}-${i}`}
            type="button"
            onClick={() => setLightbox(i)}
            className="reveal group block w-full overflow-hidden rounded-sm break-inside-avoid"
            aria-label={`Zvětšit fotografii: ${photo.alt}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {lightbox !== null ? (
        <Lightbox
          photos={visible}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  );
}
