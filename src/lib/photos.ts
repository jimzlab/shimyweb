import { getPublicPhotoUrl } from "@/lib/supabase";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const heroWedding = getPublicPhotoUrl("psik.jpg");
export const wedding2 = getPublicPhotoUrl("rodina.jpg");
export const portrait1 = getPublicPhotoUrl("vesmir.jpg");
export const family1 = getPublicPhotoUrl("bmw.jpg");
export const product1 = getPublicPhotoUrl("cesta.jpg");
export const aboutPhotographer = getPublicPhotoUrl("ondra-profilovka.jpg");

export const photos: Photo[] = [
  {
    src: heroWedding,
    alt: "Svoboda v blátě",
    width: 1920,
    height: 1280,
  },
  {
    src: wedding2,
    alt: "Radost v jednom objetí",
    width: 1280,
    height: 960,
  },
  {
    src: portrait1,
    alt: "Cesta vesmírem",
    width: 1920,
    height: 1280,
  },
  {
    src: family1,
    alt: "Lesní terapie",
    width: 1280,
    height: 960,
  },
  {
    src: product1,
    alt: "Cesta za poznáním",
    width: 1024,
    height: 1024,
  },
];
