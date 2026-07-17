import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

interface ValidateSessionResult {
  session: {
    user_puuid: string;
    expires_at: string;
  };
  supabase: SupabaseClient;
}

export async function validateSession(): Promise<ValidateSessionResult | null> {
  const sessionId = (await cookies()).get("session")?.value;

  if (!sessionId) {
    return null;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { data: session } = await supabase
    .from("user_sessions")
    .select("user_puuid, expires_at")
    .eq("id", sessionId)
    .maybeSingle();

  if (!session) {
    return null;
  }

  if (new Date(session.expires_at).getTime() < Date.now()) {
    await supabase.from("user_sessions").delete().eq("id", sessionId);

    (await cookies()).delete("session");

    return null;
  }

  return {
    session,
    supabase,
  };
}
