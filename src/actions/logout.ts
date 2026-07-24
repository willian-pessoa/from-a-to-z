"use server";

import { cookies } from "next/headers";
import { createSupabase } from "../services/supabase";

interface ILogoutSessionResult {
  success: boolean;
  error?: string;
}

export async function logoutSession(): Promise<ILogoutSessionResult> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
      return { success: false, error: "Sessão não encontrada." };
    }

    const supabase = createSupabase();

    const { error } = await supabase
      .from("user_sessions")
      .delete()
      .eq("id", sessionId);

    if (error) {
      return { success: false, error: error.message };
    }

    cookieStore.delete("session");

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Erro ao encerrar sessão.",
    };
  }
}
