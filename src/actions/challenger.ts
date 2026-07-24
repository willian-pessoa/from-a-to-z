"use server";

import { validateSession } from "../data/validateSession";

import { JUNGLE_CHAMPIONS_DATA } from "../const/jungleChampions";
import { MID_CHAMPIONS_DATA } from "../const/midChampions";
import { BOT_CHAMPIONS_DATA } from "../const/botChampions";
import { SUPPORT_CHAMPIONS_DATA } from "../const/supportChampion";
import { TOP_CHAMPIONS_DATA } from "../const/topChampions";
import { ChampionData, LaneType, QueueType } from "../types";

const SEASON = 2026;

const MAP_LANE_CHAMPIONS: Record<LaneType, ChampionData[]> = {
  JUNGLE: JUNGLE_CHAMPIONS_DATA,
  TOP: TOP_CHAMPIONS_DATA,
  MID: MID_CHAMPIONS_DATA,
  BOT: BOT_CHAMPIONS_DATA,
  SUPPORT: SUPPORT_CHAMPIONS_DATA,
};

interface CreateChallengeInput {
  lane: LaneType;
  queue: QueueType;
}

export async function createChallenge({ lane, queue }: CreateChallengeInput) {
  const auth = await validateSession();

  if (!auth) {
    return {
      success: false,
      error: "SESSION_INVALID",
    };
  }

  const { session, supabase } = auth;

  try {
    const allowedChampions = MAP_LANE_CHAMPIONS[lane];

    const { data: newChallenge, error: challengeError } = await supabase
      .from("desafios")
      .insert({
        usuario_puuid: session.user_puuid,
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
          error: "ACTIVE_CHALLENGE_EXISTS",
        };
      }

      return {
        success: false,
        error: challengeError.message,
      };
    }

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
      await supabase.from("desafios").delete().eq("id", newChallenge.id);

      return {
        success: false,
        error: "POPULATE_PROGRESS_ERROR",
      };
    }

    return {
      success: true,
      challengeId: newChallenge.id,
    };
  } catch {
    return {
      success: false,
      error: "SERVER_ERROR",
    };
  }
}
