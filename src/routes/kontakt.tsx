import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from "lucide-react";
import { useToast } from "@/components/Toaster";
import { useReveal } from "@/hooks/useReveal";
import { site } from "@/lib/site";

function generateMathChallenge() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b}`, answer: a + b };
}

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: `Kontakt a rezervace termínu | ${site.name}` },
      {
        name: "description",
        content:
          `Rezervujte focení telefonicky na ${site.phoneDisplay}, nebo napište přes kontaktní formulář. Frýdek-Místek a Moravskoslezský kraj.`,
      },
      { property: "og:title", content: `Kontakt | ${site.name}` },
      { property: "og:description", content: "Telefon, e-mail a formulář pro poptávku focení." },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Contact,
});

type Errors = { name?: string; email?: string; message?: string; captcha?: string };

function Contact() {
  useReveal();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [challenge, setChallenge] = useState(generateMathChallenge);

  const newChallenge = () => {
    setChallenge(generateMathChallenge());
    setCaptchaInput("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honeypot = String(data.get("company") ?? "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Uveďte prosím své jméno.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Zadejte platný e-mail.";
    if (message.length < 10) next.message = "Napište prosím alespoň pár slov o focení.";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      toast({
        title: "Formulář není vyplněný správně",
        description: "Zkontrolujte prosím zvýrazněná pole.",
        variant: "error",
      });
      return;
    }
    if (honeypot) {
      toast({ title: "Zpráva odeslána", description: "Děkuji, ozvu se co nejdříve." });
      form.reset();
      return;
    }

    if (parseInt(captchaInput, 10) !== challenge.answer) {
      next.captcha = "Špatná odpověď. Zkuste to znovu.";
      setErrors({ ...next });
      newChallenge();
      toast({
        title: "Ověření proti spamu",
        description: "Vyřešte prosím správně příklad.",
        variant: "error",
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "baea0276-eb7b-4e36-9b5a-e47e94a43860",
          subject: `Nová poptávka z webu SimekPhoto od ${name}`,
          from_name: "SimekPhoto Web",
          name,
          email,
          message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        form.reset();
        setCaptchaInput("");
        newChallenge();
        toast({
          title: "Zpráva odeslána ✓",
          description: "Ozvu se do 24 hodin. Spěchá to? Zavolejte na " + site.phoneDisplay + ".",
        });
      } else {
        toast({
          title: "Chyba při odesílání",
          description: "Zkuste to prosím znovu nebo zavolejte.",
          variant: "error",
        });
      }
    } catch {
      toast({
        title: "Chyba sítě",
        description: "Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.",
        variant: "error",
      });
    } finally {
      setSending(false);
    }
  };

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-sm border bg-card/60 px-4 py-3 text-base outline-none transition-colors focus:border-primary";

  return (
    <div className="container-x py-14 sm:py-20">
      <p className="eyebrow">Kontakt</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Rezervace termínu</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="reveal">
          <div className="rounded-sm border border-primary/40 bg-card p-7">
            <p className="eyebrow flex items-center gap-1.5">
              <Phone className="size-3.5" />
              <span>Nejrychlejší cesta</span>
            </p>
            <a
              href={site.phoneHref}
              className="mt-3 flex min-h-12 items-center gap-3 font-display text-3xl text-primary sm:text-4xl hover:underline"
            >
              <Phone className="size-8 shrink-0 text-primary" />
              <span>{site.phoneDisplay}</span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground">Kdy volat: {site.hours}</p>
          </div>

          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="eyebrow flex items-center gap-1.5">
                <Mail className="size-3.5" />
                <span>E-mail</span>
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 shrink-0 text-primary" />
                  <span>{site.email}</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                <span>Kde fotím</span>
              </dt>
              <dd className="mt-2 text-muted-foreground">
                {site.city}, {site.region}.
              </dd>
              {/* Embedded Google Map */}
              <div className="mt-3 overflow-hidden rounded-sm border border-border/80 bg-card">
                <iframe
                  title="Mapa působnosti — Frýdek-Místek"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82725.68853874317!2d18.293674682050073!3d49.68266205791789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713f0190a618d3d%3A0x400af0f6614e590!2sFr%C3%BDdek-M%C3%ADstek!5e0!3m2!1scs!2scz!4v1700000000000!5m2!1scs!2scz"
                  width="100%"
                  height="200"
                  style={{ border: 0, filter: "grayscale(1) invert(92%) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full opacity-90 transition-opacity hover:opacity-100"
                />
              </div>
            </div>
            <div>
              <dt className="eyebrow">Sociální sítě</dt>
              <dd className="mt-2 flex gap-3">
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
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} noValidate className="reveal">
          <h2 className="text-2xl">Obecný dotaz nebo poptávka</h2>

          <div className="mt-6">
            <label htmlFor="name" className="text-sm text-muted-foreground">
              Jméno
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${fieldClass} ${errors.name ? "border-destructive" : "border-input"}`}
            />
            {errors.name ? (
              <p id="name-error" className="mt-2 text-sm text-destructive">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="text-sm text-muted-foreground">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${fieldClass} ${errors.email ? "border-destructive" : "border-input"}`}
            />
            {errors.email ? (
              <p id="email-error" className="mt-2 text-sm text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="text-sm text-muted-foreground">
              Zpráva — typ focení, termín, místo
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${fieldClass} ${errors.message ? "border-destructive" : "border-input"}`}
            />
            {errors.message ? (
              <p id="message-error" className="mt-2 text-sm text-destructive">
                {errors.message}
              </p>
            ) : null}
          </div>

          {/* Honeypot proti spamu */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Firma</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Anti-spam: matematický příklad */}
          <div className="mt-5">
            <label htmlFor="captcha" className="text-sm text-muted-foreground">
              Ověření: Kolik je <span className="font-medium text-primary">{challenge.question}</span> ?
            </label>
            <input
              id="captcha"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              aria-invalid={!!errors.captcha}
              aria-describedby={errors.captcha ? "captcha-error" : undefined}
              className={`${fieldClass} ${errors.captcha ? "border-destructive" : "border-input"}`}
              placeholder="Napište výsledek"
            />
            {errors.captcha ? (
              <p id="captcha-error" className="mt-2 text-sm text-destructive">
                {errors.captcha}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
          >
            <Send className="size-4 shrink-0" />
            <span>{sending ? "Odesílám…" : "Odeslat zprávu"}</span>
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            Odpovídám do 24 hodin. Pro rezervaci termínu je rychlejší telefon.
          </p>
        </form>
      </div>
    </div>
  );
}
