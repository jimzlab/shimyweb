import { useEffect } from "react";

/** Adds `reveal-visible` to every `.reveal` element as it scrolls into view. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px", threshold: 0.01 },
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If element is already in or near viewport, make it visible immediately
      if (rect.top < window.innerHeight + 100 && rect.bottom > -100) {
        el.classList.add("reveal-visible");
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, deps);
}
