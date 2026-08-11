# Photographer's Showcase

Zadání pro web developera – Portfolio web pro fotografa

1. Kontext a cíl projektu

Vytvoř profesionální webovou prezentaci pro fotografa na volné noze. Cílem webu je:

Prezentovat portfolio a styl fotografa tak, aby zaujal potenciální klienty

Generovat nové zakázky (poptávky/rezervace focení)

Působit důvěryhodně a moderně – web je "vizitka" fotografa

Cílová skupina: lidé hledající fotografa na svatby, portréty, rodinné focení, produktovou/event fotografii (upřesnit dle specializace fotografa).

2. Klíčový nefunkční požadavek – RESPONZIVITA

Web musí být plně responzivní a vypadat bezchybně na všech zařízeních:

Mobilní telefony (min. šířka ~320px)

Tablety

Notebooky a stolní PC (včetně velkých monitorů, 1920px+)

Požadavky:

Mobile-first přístup při návrhu CSS

Fotografie se musí správně škálovat a nikdy neztrácet kvalitu ani poměr stran

Navigace na mobilu jako hamburger menu, na desktopu plné menu

Testování na běžných breakpointech (320px, 375px, 768px, 1024px, 1440px, 1920px)

Žádný horizontální scroll na žádném zařízení

Touch-friendly ovládání na mobilu (dostatečně velké klikací plochy, min. 44x44px)

3. Struktura webu (doporučené sekce/stránky)

Úvodní stránka (Home) – hero sekce s výraznou fotografií/slideshow, krátký úvod, výrazné CTA tlačítko "Zavolejte a rezervujte termín" s telefonním číslem

Portfolio/Galerie – rozdělené do kategorií (např. svatby, portréty, rodina, produkty) s možností filtrování

O mně – představení fotografa, jeho styl, fotografie fotografa samotného

Služby a ceník – přehled nabízených balíčků/služeb (i orientační ceny nebo "cena na vyžádání")

Reference/recenze klientů

Kontakt – telefonní číslo jako primární kontakt pro rezervaci (klikatelné na mobilu), doplňkově kontaktní formulář a e-mail pro obecné dotazy, sociální sítě, případně mapa

(Volitelně) Blog – pro SEO a sdílení posledních focení

4. Funkční požadavky

Rezervace telefonicky (hlavní způsob objednání): telefonní číslo musí být viditelné na první pohled na každé stránce (např. v hlavičce/menu a v hero sekci)

Na mobilu musí být číslo klikatelné (tel: odkaz), aby po kliknutí rovnou spustilo vytáčení

Na desktopu zobrazit číslo čitelně (uživatel si ho zapíše nebo zavolá z jiného zařízení)

Vhodné doplnit i o zobrazení otevírací doby / kdy je nejlepší volat

Galerie fotek: lightbox náhled po kliknutí (zvětšení fotky přes celou obrazovku), swipe ovládání na mobilu

Optimalizace obrázků: lazy loading, moderní formáty (WebP/AVIF), responzivní srcset pro různé velikosti dle zařízení

Kontaktní formulář: validace polí, ochrana proti spamu (např. honeypot nebo captcha), odeslání na e-mail

Vlastní (custom) notifikace/toasty: po odeslání formuláře nebo jiné akci se místo výchozího alert() prohlížeče zobrazí stylizovaná notifikace (v barvě webu, s jemnou animací zasunutí a automatickým zmizením) — potvrzení odeslání zprávy, chybové stavy formuláře apod.

Rychlost načítání: cíl skóre Google PageSpeed 90+ i na mobilu

SEO základ: správné meta tagy, alt texty u obrázků, sémantické HTML, strukturovaná data (LocalBusiness/Photographer schema)

Sociální sítě: odkazy/ikony na Instagram, Facebook apod.

Přístupnost (a11y): kontrast textu, alt texty, ovladatelnost klávesnicí

5. Design požadavky

Čistý, minimalistický design – fotografie musí být hlavní hvězdou, ne grafika webu

Dostatek "vzduchu" (white space) kolem fotek

Elegantní typografie (např. kombinace serif pro nadpisy + sans-serif pro text, nebo dle vkusu fotografa)

Konzistentní barevná paleta odpovídající stylu fotografa — hlavní akcentní barva: #F7B274 (použít na tlačítka, odkazy, zvýraznění, ikony), doplněná tmavým/neutrálním pozadím pro kontrast

Vlastní (custom) styl scrollbaru odpovídající barevné paletě webu — nepoužívat výchozí prohlížečový scrollbar (styl přes ::-webkit-scrollbar + fallback scrollbar-color pro Firefox)

Plynulé, jemné animace/přechody (fade-in při scrollování), nic rušivého ani pomalého

6. Technické doporučení

Frontend: moderní framework dle preference vývojáře (např. Next.js / React, nebo statický web s HTML+CSS+JS pro jednoduchost a rychlost)

CMS nebo jednoduchá administrace pro fotografa, aby si sám mohl nahrávat nové fotky bez zásahu vývojáře (např. headless CMS, nebo alespoň jednoduché rozhraní)

Hosting s dobrým výkonem pro obrázky (CDN výhodou)

HTTPS povinně

7. Výstup od vývojáře

Plně funkční, responzivní web dle výše uvedené struktury

Otestováno na reálných mobilních zařízeních i desktopu (ne jen v dev tools)

Rychlost načítání optimalizovaná pro fotografie ve vysokém rozlišení

Návod, jak fotograf sám přidá/upraví fotky a texty (pokud bude mít administraci)

Pozn.: Doplň konkrétní specializaci fotografa (svatby / portréty / produkty apod.), barevné preference a případný rozpočet/deadline před odesláním developerovi – zvýší to přesnost nabídky.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e9629f0d-a9c9-4c5d-93cd-4a4e235e126d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
"# shimyweb" 
