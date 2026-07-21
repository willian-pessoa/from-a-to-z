"use server";

import { createClient } from "@supabase/supabase-js";
import { LaneType, QueueType } from "../types";

export interface LeaderboardItem {
  position: number;
  challengeId: number;
  playerName: string;
  totalMatches: number;
  completedChampionsCount: number;
  totalLosses: number;
  totalTimeSeconds: number;
  isFinished: boolean;
  winRate: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardItem[];
  totalCount: number;
}

export async function getLeaderboard(
  queue: QueueType,
  lane: LaneType,
  page: number = 1,
  pageSize: number = 20,
): Promise<LeaderboardResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  try {
    const { data, count, error } = await supabase
      .from("leaderboard_view")
      .select("*", { count: "exact" })
      .eq("queue", queue.toUpperCase())
      .eq("lane", lane.toUpperCase())
      .range(from, to);

    if (error || !data) {
      console.error("Erro ao buscar leaderboard view:", error);
      return { leaderboard: [], totalCount: 0 };
    }

    const leaderboard = data.map((item: any, index: number) => {
      const playerName = item.riot_id
        ? item.riot_id.split("#")[0]
        : "Invocador";

      const winRate =
        item.total_matches > 0
          ? Number(
              ((item.completed_champions / item.total_matches) * 100).toFixed(
                1,
              ),
            )
          : 0;

      return {
        position: from + index + 1,
        challengeId: item.challenge_id,
        playerName,
        totalMatches: item.total_matches,
        completedChampionsCount: item.completed_champions,
        totalLosses: item.total_losses,
        totalTimeSeconds: item.time_spend,
        isFinished: item.is_finished,
        winRate,
      };
    });

    return {
      leaderboard,
      totalCount: count ?? 0,
    };
  } catch (error) {
    console.error("Erro interno no getLeaderboard:", error);
    return { leaderboard: [], totalCount: 0 };
  }
}
