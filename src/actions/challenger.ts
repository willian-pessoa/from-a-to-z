"use server";

import { createClient } from "@supabase/supabase-js";

import { JUNGLE_CHAMPIONS_DATA } from "../const/jungleChampions";
import { MID_CHAMPIONS_DATA } from "../const/midChampions";
import { BOT_CHAMPIONS_DATA } from "../const/botChampions";
import { SUPPORT_CHAMPIONS_DATA } from "../const/supportChampion";
import { TOP_CHAMPIONS_DATA } from "../const/topChampions";
import { ChampionData, LaneType, QueueType } from "../types";

const SEASON = 2026;

const MAP_LANE_CHAMPIONS: Record<LaneType, ChampionData[]> = {
  jungle: JUNGLE_CHAMPIONS_DATA,
  top: TOP_CHAMPIONS_DATA,
  mid: MID_CHAMPIONS_DATA,
  bot: BOT_CHAMPIONS_DATA,
  support: SUPPORT_CHAMPIONS_DATA,
};

interface CreateChallengeInput {
  puuid: string;
  lane: LaneType;
  queue: QueueType;
}

export async function createChallenge({
  puuid,
  lane,
  queue,
}: CreateChallengeInput) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const allowedChampions = MAP_LANE_CHAMPIONS[lane];

    const { data: newChallenge, error: challengeError } = await supabase
      .from("desafios")
      .insert({
        usuario_puuid: puuid,
        lane: lane.toUpperCase(),
        queue: queue.toUpperCase(),
        is_finished: false,
        current_champ: allowedChampions[0].nameId,
        started_at: new Date().toISOString(),
        season: SEASON,
      })
      .select()
      .single();

    if (challengeError) {
      if (challengeError.code === "23505") {
        return {
          success: false,
          error: "Você já possui um desafio ativo nesta ou em outra rota!",
        };
      }
      return { success: false, error: challengeError.message };
    }

    // 5. Bulk insert contendo APENAS a sua lista seleta para aquela lane
    const recordsToInsert = allowedChampions.map((champ) => ({
      desafio_id: newChallenge.id,
      campeao_id: champ.nameId,
      nome_campeao: champ.name,
      has_victory: false,
      loses: 0,
      time_spend: 0,
    }));

    const { error: progressError } = await supabase
      .from("progresso_campeoes")
      .insert(recordsToInsert);

    if (progressError) {
      // Rollback
      await supabase.from("desafios").delete().eq("id", newChallenge.id);
      return {
        success: false,
        error: "Falha ao popular o progresso filtrado por lane.",
      };
    }

    return { success: true, challengeId: newChallenge.id };
  } catch (error) {
    return {
      success: false,
      error: "Erro interno no servidor ao processar campeões por rota.",
    };
  }
}
