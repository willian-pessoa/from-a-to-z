"use server";

import { createClient } from "@supabase/supabase-js";
import { LaneType, QueueType } from "../types";

export interface LeaderboardItem {
  position: number;
  challengeId: number;
  playerName: string;
  totalMatches: number;
  victories: number;
  losses: number;
  winRate: number;
  totalTimeSeconds: number;
  isFinished: boolean;
  completedChampionsCount: number;
}

export async function getLeaderboard(
  queue: QueueType,
  lane: LaneType,
): Promise<LeaderboardItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const { data: challenges, error } = await supabase
      .from("desafios")
      .select(
        `
        id,
        is_finished,
        time_spend,
        usuarios (
          riot_id
        ),
        progresso_campeoes (
          has_victory,
          loses
        )
      `,
      )
      .eq("queue", queue.toUpperCase())
      .eq("lane", lane.toUpperCase());

    if (error || !challenges) {
      console.error("Erro ao buscar dados da Leaderboard:", error);
      return [];
    }

    const formattedLeaderboard = challenges.map(
      (challenge: any): Omit<LeaderboardItem, "position"> => {
        const progressList = challenge.progresso_campeoes || [];

        let totalVictories = 0;
        let totalLosses = 0;

        progressList.forEach((item: any) => {
          if (item.has_victory) totalVictories += 1;
          totalLosses += item.loses || 0;
        });

        const totalMatches = totalVictories + totalLosses;

        const winRate =
          totalMatches > 0
            ? Number(((totalVictories / totalMatches) * 100).toFixed(1))
            : 0;

        const user = challenge.usuarios;
        const playerName = user?.riot_id
          ? user.riot_id.split("#")[0]
          : "Invocador";

        return {
          challengeId: challenge.id,
          playerName,
          totalMatches,
          victories: totalVictories,
          losses: totalLosses,
          winRate,
          totalTimeSeconds: challenge.time_spend,
          isFinished: challenge.is_finished,
          completedChampionsCount: totalVictories,
        };
      },
    );

    // Ordenação do Ranking
    formattedLeaderboard.sort((a, b) => {
      if (a.isFinished !== b.isFinished) {
        return a.isFinished ? -1 : 1;
      }
      if (a.completedChampionsCount !== b.completedChampionsCount) {
        return b.completedChampionsCount - a.completedChampionsCount;
      }
      if (a.totalTimeSeconds !== b.totalTimeSeconds) {
        return a.totalTimeSeconds - b.totalTimeSeconds;
      }
      return b.winRate - a.winRate;
    });

    return formattedLeaderboard.map((item, index) => ({
      ...item,
      position: index + 1,
    }));
  } catch (error) {
    console.error("Erro interno no Leaderboard:", error);
    return [];
  }
}
