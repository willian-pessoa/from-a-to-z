"use server";

import { revalidatePath } from "next/cache";

import { validateSession } from "../data/validateSession";

interface DeleteChallengeResult {
  success: boolean;
  error?: string;
}

export async function deleteChallenge(
  challengeId: string,
): Promise<DeleteChallengeResult> {
  if (!challengeId) {
    return {
      success: false,
      error: "Não foi possivel processar a remoção do desafio.",
    };
  }

  const auth = await validateSession();

  if (!auth) {
    return {
      success: false,
      error: "Sessão inválida.",
    };
  }

  const { session, supabase } = auth;

  try {
    const { error } = await supabase
      .from("desafios")
      .delete()
      .eq("id", challengeId)
      .eq("usuario_puuid", session.user_puuid);

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
