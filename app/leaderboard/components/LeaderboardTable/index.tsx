"use client";

import { useTranslations } from "next-intl";

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
  const t = useTranslations("LEADERBOARD.TABLE");

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-hidden rounded-lg bg-emerald-900 shadow-2xl sm:mx-8 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-emerald-600 text-left">
              <th className="w-16 px-4 py-4 text-center">{t("POSITION")}</th>

              <th className="min-w-40 px-4 py-4">{t("PLAYER")}</th>

              <th className="hidden w-40 px-4 py-4 text-center sm:table-cell">
                {t("COMPLETED_CHAMPIONS")}
              </th>

              <th className="w-48 px-4 py-4 text-center">
                {t("TOTAL_MATCHES")}
              </th>

              <th className="hidden w-40 px-4 py-4 text-center sm:table-cell">
                {t("WIN_RATE")}
              </th>

              <th className="hidden w-44 px-4 py-4 text-center sm:table-cell">
                {t("PLAY_TIME")}
              </th>

              <th className="w-10 px-4 py-4 text-center">{t("VIEW")}</th>
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
                <td className="px-4 py-4 text-center font-medium">
                  {player.position}
                </td>

                <td className="px-4 py-4 font-medium">{player.playerName}</td>

                <td className="hidden px-4 py-4 text-center sm:table-cell">
                  {player.completedChampionsCount}
                </td>

                <td className="px-4 py-4 text-center">{player.totalMatches}</td>

                <td className="hidden px-4 py-4 text-center sm:table-cell">
                  {player.winRate}%
                </td>

                <td className="hidden px-4 py-4 text-center sm:table-cell">
                  {formatTime(player.totalTimeSeconds)}
                </td>

                <td className="px-4 py-4 text-center">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/challenger/${player.challengeId}`}
                    aria-label={t("VIEW")}
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
