"use server";

import { cookies } from "next/headers";
import { createSupabase } from "../services/supabase";

export async function logoutSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (!sessionId) {
    return;
  }

  const supabase = createSupabase();

  await supabase.from("user_sessions").delete().eq("id", sessionId);

  cookieStore.delete("session");
}
