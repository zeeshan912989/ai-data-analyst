import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ghkjpuekrazcfkaoiilr.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_84APvnUWpb7cwUI9OhsYdA_3VyVzWpJ";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  console.warn("⚠️ Supabase env variables are missing! Set them in Vercel dashboard.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
