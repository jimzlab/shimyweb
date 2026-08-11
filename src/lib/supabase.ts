import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? process.env.SUPABASE_URL : "") ||
  "https://cdiukzwegxxjatitktjm.supabase.co";

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  (typeof process !== "undefined" ? process.env.SUPABASE_PUBLISHABLE_KEY : "") ||
  "sb_publishable_HWPHK2NDS7eeb0HgqfHWoA_9uh8SSWk";

export const supabase = createClient(supabaseUrl, supabaseKey);

export function getPublicPhotoUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return data.publicUrl;
}
