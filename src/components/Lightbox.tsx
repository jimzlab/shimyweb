import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/photos";

export function Lightbox({
  photos,
  index,
  onClose,
  onIndexChange,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  const [dir, setDir] = useState(0);
  const photo = photos[index];

  const next = () => {
    setDir(1);
    onIndexChange((index + 1) % photos.length);
  };
  const prev = () => {
    setDir(-1);
    onIndexChange((index - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  });

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Zvětšená fotografie"
      className="fixed inset-0 z-[90] flex flex-col bg-background/97 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavřít galerii"
          className="flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ×
          </span>
        </button>
      </div>

      <div
        className="flex flex-1 items-center justify-center overflow-hidden px-2 pb-4 sm:px-6"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStart.current;
          const end = e.changedTouches[0]?.clientX;
          if (start == null || end == null) return;
          if (Math.abs(end - start) > 45) (end < start ? next : prev)();
          touchStart.current = null;
        }}
      >
        <img
          key={`${photo.src}-${index}`}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[78vh] w-auto max-w-full object-contain select-none"
          style={{
            animation: `${dir === 0 ? "toast-in" : "toast-in"} 0.35s cubic-bezier(0.22,1,0.36,1)`,
            boxShadow: "var(--shadow-elegant)",
          }}
        />
      </div>

      <div
        className="flex items-center justify-center gap-4 px-4 pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={prev}
          aria-label="Předchozí fotografie"
          className="flex size-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true">←</span>
        </button>
        <p className="max-w-md text-center text-sm text-muted-foreground">{photo.alt}</p>
        <button
          type="button"
          onClick={next}
          aria-label="Další fotografie"
          className="flex size-12 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
