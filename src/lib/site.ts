export const site = {
  name: "SimekPhoto",
  author: "Ondra Šimek",
  role: "Fotograf — portréty, akce, auta & atmosféra",
  city: "Frýdek-Místek",
  region: "Moravskoslezský kraj & celá ČR ",
  phoneDisplay: "+420 732 630 286",
  phoneHref: "tel:+420732630286",
  email: "info@simekphoto.cz",
  domain: "simekphoto.cz",
  hours: "So 9:00–19:00 · Ne 9:00–19:00",
  instagram: "https://www.instagram.com/shimyfocus",
  facebook: "https://facebook.com",
};

export const nav = [
  { to: "/", label: "Domů" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/o-mne", label: "O mně" },
  { to: "/sluzby", label: "Služby a ceník" },
  { to: "/reference", label: "Reference" },
  { to: "/kontakt", label: "Kontakt" },
] as const;
