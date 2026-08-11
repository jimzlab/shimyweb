import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useToast } from "@/components/Toaster";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/lib/site";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reference")({
  head: () => ({
    meta: [
      { title: `Reference a recenze klientů | ${site.name}` },
      {
        name: "description",
        content:
          "Hodnocení a zkušenosti klientů s fotografem Ondrou (SimekPhoto). Napište vlastní recenzi a ohodnoťte focení.",
      },
      { property: "og:title", content: `Reference a recenze | ${site.name}` },
      { property: "og:description", content: "Klientská hodnocení a recenze s možností přidat vlastní." },
      { property: "og:url", content: "/reference" },
    ],
    links: [{ rel: "canonical", href: "/reference" }],
  }),
  component: ReviewsPage,
});

type Review = {
  id?: string;
  author: string;
  category: string;
  rating: number; // 1 - 5
  text: string;
  date?: string;
};

function ReviewsPage() {
  const { toast } = useToast();
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Portrét");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useReveal([reviewList.length, showForm, loading]);

  // Load reviews strictly from Supabase DB
  async function fetchSupabaseReviews() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const loaded: Review[] = data.map((r: any) => ({
          id: r.id,
          author: r.name,
          category: r.category || "Focení",
          rating: Number(r.rating) || 5,
          text: r.comment,
          date: new Date(r.created_at || Date.now()).toLocaleDateString("cs-CZ"),
        }));
        setReviewList(loaded);
      } else if (error) {
        console.warn("Supabase fetch error:", error);
      }
    } catch (e) {
      console.warn("Supabase connection error:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSupabaseReviews();
  }, []);

  // Submit Review Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Vyplňte prosím své jméno",
        description: "Jméno nebo přezdívka je povinná.",
        variant: "error",
      });
      return;
    }

    if (comment.trim().length < 5) {
      toast({
        title: "Napište prosím hodnocení",
        description: "Recenze by měla mít alespoň pár slov.",
        variant: "error",
      });
      return;
    }

    setSubmitting(true);

    const newReview = {
      name: name.trim(),
      category: category.trim(),
      rating: rating,
      comment: comment.trim(),
    };

    try {
      const { error } = await supabase.from("reviews").insert([newReview]);

      if (error) {
        console.error("Supabase insert error:", error);
        toast({
          title: "Chyba při ukládání recenze",
          description: error.message,
          variant: "error",
        });
      } else {
        toast({
          title: "Recenze byla úspěšně přidána!",
          description: "Děkuji za tvoje hodnocení a zpětnou vazbu.",
        });
        setName("");
        setComment("");
        setShowForm(false);
        // Refresh live from Supabase
        await fetchSupabaseReviews();
      }
    } catch (err: any) {
      console.error("Insert failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate average rating
  const avgRating =
    reviewList.length > 0
      ? (reviewList.reduce((acc, curr) => acc + curr.rating, 0) / reviewList.length).toFixed(1)
      : "5.0";

  return (
    <div className="container-x py-14 sm:py-20">
      {/* Header & Overview */}
      <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Reference & Zkušenosti</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Co říkají klienti</h1>
          <p className="mt-3 text-muted-foreground">
            Byl/a jsi u mě na focení? Budu moc rád za tvoji upřímnou recenzi!
          </p>
        </div>

        {/* Rating badge & Add Button */}
        <div className="flex flex-col sm:items-end gap-3">
          <div className="flex items-center gap-2 rounded-sm border border-border/80 bg-card/60 px-4 py-2">
            <span className="text-xl font-display text-primary">★ {avgRating}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              ({reviewList.length} hodnocení)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            {showForm ? "Zavřít formulář" : "+ Napsat recenzi"}
          </button>
        </div>
      </div>

      {/* Add Review Form Drawer / Box */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="reveal mt-8 rounded-sm border border-primary/50 bg-card p-6 sm:p-8"
        >
          <h2 className="text-2xl font-display">Přidat vlastní hodnocení</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ohodnoť focení hvězdičkami a napiš krátkou zkušenost.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Star Rating Picker */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Hodnocení (hvězdičky):
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    aria-label={`${star} hvězdiček`}
                  >
                    <span
                      className={
                        star <= (hoverRating || rating) ? "text-primary" : "text-muted-foreground/30"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                  {hoverRating || rating} / 5
                </span>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="text-sm font-medium text-foreground block mb-2">
                Typ focení:
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full min-h-11 rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
              >
                <option value="Svatba">Svatba</option>
                <option value="Autosraz">Autosraz / Akce</option>
                <option value="Portrét">Portrét</option>
                <option value="Firemní akce">Firemní akce / Koncert</option>
                <option value="Produkt">Produkt</option>
                <option value="Krajina / Jiné">Krajina / Jiné</option>
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="reviewer-name" className="text-sm font-medium text-foreground block mb-2">
                Tvoje jméno / Přezdívka *
              </label>
              <input
                id="reviewer-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="např. Jan Novák"
                className="w-full min-h-11 rounded-sm border border-input bg-card px-4 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="reviewer-comment" className="text-sm font-medium text-foreground block mb-2">
              Slovní hodnocení *
            </label>
            <textarea
              id="reviewer-comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Jak ses při focení cítil/a a jak jsi spokojen/a s výsledkem?"
              className="w-full rounded-sm border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="min-h-11 rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Ukládám…" : "Odeslat recenzi"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="min-h-11 rounded-sm border border-border px-5 text-sm text-muted-foreground hover:text-foreground"
            >
              Zrušit
            </button>
          </div>
        </form>
      ) : null}

      {/* Loading state */}
      {loading ? (
        <div className="mt-12 text-center py-12 text-muted-foreground">
          Načítám recenze z databáze…
        </div>
      ) : reviewList.length === 0 ? (
        /* Empty State */
        <div className="reveal mt-12 rounded-sm border border-border/80 bg-card/40 p-10 text-center">
          <p className="font-display text-3xl text-primary">★ ★ ★ ★ ★</p>
          <h3 className="mt-3 text-xl font-medium">Zatím zde nejsou žádné recenze</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Byl/a jsi u mě na focení? Buď první a napiš své hodnocení!
          </p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 text-sm font-medium text-primary-foreground"
          >
            + Přidat první recenzi
          </button>
        </div>
      ) : (
        /* Reviews Grid */
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {reviewList.map((r, i) => (
            <blockquote
              key={`${r.author}-${r.id || i}`}
              className="reveal flex flex-col justify-between rounded-sm border border-border bg-card/40 p-7 transition-colors hover:border-primary/40"
              style={{ transitionDelay: `${(i % 6) * 80}ms` }}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  {/* Rating Stars */}
                  <div className="flex text-primary text-lg" aria-label={`Hodnocení ${r.rating} z 5`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx} className={idx < r.rating ? "text-primary" : "text-muted-foreground/30"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground rounded-full border border-border/60 px-2.5 py-0.5">
                    {r.category}
                  </span>
                </div>

                <p className="mt-4 text-base leading-relaxed text-foreground">„{r.text}“</p>
              </div>

              <footer className="mt-6 border-t border-border/40 pt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground text-sm">{r.author}</span>
                {r.date ? <span>{r.date}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <div className="reveal mt-16 rounded-sm border border-primary/40 bg-card p-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-display">Chceš mít taky skvělé fotky?</h2>
        <p className="mt-2 text-muted-foreground">Ozvi se mi a domluvíme termín i podrobnosti.</p>
        <a
          href={site.phoneHref}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-8 text-base font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          Zavolat: {site.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
