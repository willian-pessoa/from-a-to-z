"use client";

import { LeaderboardItem } from "@/src/data/getLeaderboard";
import { formatTime } from "@/src/utils/formatTime";
import clsx from "clsx";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import LeaderboardTablePager from "../LeaderboardTablePager";

interface ILeaderboarTableProps {
  leaderboard: LeaderboardItem[];
  totalCount: number;
}

export default function LeaderboardTable({
  leaderboard,
  totalCount,
}: ILeaderboarTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-lg bg-emerald-900 shadow-2xl mx-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-emerald-600 text-left">
              <th className="w-16 px-4 py-4 text-center">#</th>
              <th className="px-4 py-4">Jogador</th>
              <th className="w-40 px-4 py-4 text-center">
                Campeões Concluidos
              </th>
              <th className="w-48 px-4 py-4 text-center">Total de Partidas</th>
              <th className="w-40 px-4 py-4 text-center">Aproveitamento</th>
              <th className="w-44 px-4 py-4 text-center">Tempo de Jogo</th>
              <th className="w-10 px-4 py-4 text-center">Ver</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((player) => (
              <tr
                key={player.position}
                className={clsx(
                  "border-b border-emerald-700 last:border-none",
                  player.position % 2 === 0 && "bg-emerald-700",
                  player.position % 2 === 1 && "bg-emerald-900",
                )}
              >
                <td className="px-4 py-4 font-medium text-center">
                  {player.position}
                </td>

                <td className="px-4 py-4 font-medium">{player.playerName}</td>

                <td className="px-4 py-4 text-center">
                  {player.completedChampionsCount}
                </td>

                <td className="px-4 py-4 text-center">{player.totalMatches}</td>

                <td className="px-4 py-4 text-center">{player.winRate}%</td>

                <td className="px-4 py-4 text-center">
                  {formatTime(player.totalTimeSeconds)}
                </td>
                <td className="px-4 py-4 text-center">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/challenger/${player.challengeId}`}
                  >
                    <IconEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LeaderboardTablePager totalCount={totalCount} />
    </div>
  );
}
