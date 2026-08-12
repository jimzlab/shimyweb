import { getPublicPhotoUrl } from "@/lib/supabase";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

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
    width: 1920,
    height: 1280,
  },
  {
    src: wedding2,
    alt: "Detail výměny snubních prstenů při obřadu",
    width: 1280,
    height: 960,
  },
  {
    src: portrait1,
    alt: "Portrét v přirozeném světle",
    width: 1024,
    height: 1280,
  },
  {
    src: family1,
    alt: "Autosraz a akční fotografie",
    width: 1280,
    height: 960,
  },
  {
    src: product1,
    alt: "Produktová fotografie s citem pro detail",
    width: 1024,
    height: 1024,
  },
];
