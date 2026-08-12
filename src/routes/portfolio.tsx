import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { useReveal } from "@/hooks/useReveal";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: `Portfolio — svatby, portréty, rodina | ${site.name}` },
      {
        name: "description",
        content:
          "Galerie fotografií. Svatební, portrétní, automobilové i akční focení. Klikněte na fotku pro zvětšení.",
      },
      { property: "og:title", content: `Portfolio | ${site.name}` },
      {
        property: "og:description",
        content: "Vybrané svatební, portrétní, rodinné a automobilové fotografie.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  useReveal();

  return (
    <div className="container-x py-14 sm:py-20">
      <p className="eyebrow">Portfolio</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Galerie</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Kliknutím na fotku ji zvětšíte, na mobilu mezi snímky přejíždíte prstem.
      </p>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((photo, i) => (
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
          photos={photos}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  );
}
