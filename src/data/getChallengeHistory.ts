"use server";

import { ChallengerData, LaneType } from "../types";
import { validateSession } from "./validateSession";

export interface ChallengeHistoryData {
  season: number;
  id: number;
  lane: LaneType;
  queue: string;
  usuario_puuid: string;
  is_finished: boolean;
  started_at: string;
  finished_at: string;
}

export interface GetChallengesHistory {
  success?: boolean;
  error?: string;
  data?: ChallengeHistoryData[];
}

export async function getChallengesHistory(): Promise<GetChallengesHistory | null> {
  const auth = await validateSession();

  if (!auth) {
    return {
      success: false,
      error: "Sessão inválida.",
    };
  }

  const { session, supabase } = auth;

  // Busca os desafios
  const { data: challengesHistory, error: dbError } = await supabase
    .from("desafios")
    .select(
      "id, lane, queue, usuario_puuid, is_finished, started_at, finished_at, season",
    )
    .eq("usuario_puuid", session.user_puuid)
    .order("season");

  if (dbError || !challengesHistory) return null;

  return {
    success: true,
    data: challengesHistory,
  };
}
