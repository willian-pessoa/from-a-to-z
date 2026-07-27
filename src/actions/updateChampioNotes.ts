"use server";

import { revalidatePath } from "next/cache";
import { validateSession } from "../data/validateSession";

interface IUpdateChampionNotesParams {
  challengeId: number;
  championNameId: string;
  funNote: number;
  commentary: string;
}

export async function updateChampionNotes({
  challengeId,
  championNameId,
  funNote,
  commentary,
}: IUpdateChampionNotesParams) {
  const auth = await validateSession();

  if (!auth) {
    return {
      success: false,
      error: "SSESSION_INVALID",
    };
  }

  const { supabase } = auth;

  try {
    // Atualiza apenas as notas e comentários do campeão específico dentro daquele desafio
    const { error } = await supabase
      .from("progresso_campeoes")
      .update({
        fun_note: funNote === 0 ? null : funNote,
        comentary: commentary,
        updated_at: new Date().toISOString(),
      })
      .eq("desafio_id", challengeId)
      .eq("campeao_id", championNameId);

    if (error) {
      console.error("Erro Supabase ao salvar notas:", error);
      return {
        success: false,
        error: "DATABASE_ERROR",
      };
    }

    // Limpa o cache para que a página renderize os novos textos/notas na hora
    revalidatePath(`/challenger/${challengeId}`);

    return { success: true };
  } catch (error) {
    return { success: false, error: "SERVER_ERROR" };
  }
}
