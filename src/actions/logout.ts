"use server";

import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function logoutSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  await supabase.from("user_sessions").delete().eq("id", sessionId);

  cookieStore.delete("session");
}
