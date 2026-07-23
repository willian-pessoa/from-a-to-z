"use server";

import { createClient } from "@supabase/supabase-js";
import { ChallengeData } from "../types";
import { createSupabase } from "../services/supabase";

export async function getChallengeData(
  challengerId: string,
): Promise<ChallengeData | null> {
  const supabase = createSupabase();

  // 1. Busca o desafio
  const { data: challengerData, error: desafioError } = await supabase
    .from("desafios")
    .select(
      "id, lane, queue, current_champ, usuario_puuid, updated_at, time_spend, is_finished",
    )
    .eq("id", parseInt(challengerId, 10))
    .single();

  if (desafioError || !challengerData) return null;

  const { data: challengeUser, error: challengeUserError } = await supabase
    .from("usuarios")
    .select("riot_id")
    .eq("puuid", challengerData.usuario_puuid)
    .single();

  if (challengeUserError || !challengerData) return null;

  // 2. Busca os campeões
  const { data: progress, error: progressError } = await supabase
    .from("progresso_campeoes")
    .select(
      "campeao_id, nome_campeao, has_victory, loses, comentary, fun_note, time_spend",
    )
    .eq("desafio_id", challengerData.id)
    .order("nome_campeao", { ascending: true });

  if (progressError || !progress) return null;

  const returnData: ChallengeData = {
    challengerData: {
      ...challengerData,
      usuario_riotId: challengeUser.riot_id,
    },
    progress,
  };

  return returnData;
}
