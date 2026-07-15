"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

interface DeleteChallengeResult {
  success: boolean;
  error?: string;
}

export async function deleteChallenge(
  challengeId: string,
  userPuuid: string | null,
): Promise<DeleteChallengeResult> {
  if (!challengeId || !userPuuid) {
    return {
      success: false,
      error: "Não foi possivel processar a remoção do desafio.",
    };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { error } = await supabase
      .from("desafios")
      .delete()
      .eq("id", challengeId)
      .eq("usuario_puuid", userPuuid);

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath(`/challenger/${challengeId}`);

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "Internal server error while deleting challenge.",
    };
  }
}
