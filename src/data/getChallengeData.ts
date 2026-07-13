"use server";

import { createClient } from "@supabase/supabase-js";
import { ChallengeData } from "../types";

export async function getChallengeData(
  challengerId: string,
): Promise<ChallengeData | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // 1. Busca o desafio
  const { data: challengerData, error: desafioError } = await supabase
    .from("desafios")
    .select("id, lane, queue, current_champ, usuario_puuid, updated_at")
    .eq("id", parseInt(challengerId, 10))
    .single();

  if (desafioError || !challengerData) return null;

  // 2. Busca os campeões
  const { data: progress, error: progressError } = await supabase
    .from("progresso_campeoes")
    .select(
      "campeao_id, nome_campeao, has_victory, loses, comentary, fun_note, time_spend",
    )
    .eq("desafio_id", challengerData.id);

  if (progressError || !progress) return null;

  return { challengerData, progress };
}
