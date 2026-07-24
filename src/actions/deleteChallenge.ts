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
      error: "DELETE_ERROR_ACTION.INVALID_CHALLENGE",
    };
  }

  const auth = await validateSession();

  if (!auth) {
    return {
      success: false,
      error: "DELETE_ERROR_ACTION.INVALID_SESSION",
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
      error: "DELETE_ERROR_ACTION.SERVER_ERROR",
    };
  }
}
