import { createClient } from "@supabase/supabase-js";

export function createSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  return supabase;
}
