import { getPublicPhotoUrl } from "@/lib/supabase";

export type Category = "svatby" | "akce" | "portrety" | "krajina" | "produkty";

export type Photo = {
  src: string;
  alt: string;
  category: Category;
  width: number;
  height: number;
};

export const categories: { id: Category | "vse"; label: string }[] = [
  { id: "vse", label: "Vše" },
  { id: "svatby", label: "Svatby" },
  { id: "akce", label: "Firemní akce & Autosrazy" },
  { id: "portrety", label: "Portréty" },
  { id: "krajina", label: "Krajina" },
  { id: "produkty", label: "Produkty" },
];

export const heroWedding = getPublicPhotoUrl("hero-wedding.jpg");
export const wedding2 = getPublicPhotoUrl("wedding-2.jpg");
export const portrait1 = getPublicPhotoUrl("portrait-1.jpg");
export const family1 = getPublicPhotoUrl("family-1.jpg");
export const product1 = getPublicPhotoUrl("product-1.jpg");
export const aboutPhotographer = getPublicPhotoUrl("about-photographer.jpg");

export const photos: Photo[] = [
  {
    src: heroWedding,
    alt: "Nevěsta a ženich v objetí při zlaté hodině",
    category: "svatby",
    width: 1920,
    height: 1280,
  },
  {
    src: wedding2,
    alt: "Detail výměny snubních prstenů při obřadu",
    category: "svatby",
    width: 1280,
    height: 960,
  },
  {
    src: portrait1,
    alt: "Portrét v přirozeném světle",
    category: "portrety",
    width: 1024,
    height: 1280,
  },
  {
    src: family1,
    alt: "Autosraz a akční fotografie",
    category: "akce",
    width: 1280,
    height: 960,
  },
  {
    src: product1,
    alt: "Produktová fotografie s citem pro detail",
    category: "produkty",
    width: 1024,
    height: 1024,
  },
];
