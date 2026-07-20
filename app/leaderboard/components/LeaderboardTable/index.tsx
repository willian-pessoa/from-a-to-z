import { LeaderboardItem } from "@/src/data/getLeaderboard";
import { formatTime } from "@/src/utils/formatTime";
import clsx from "clsx";

interface ILeaderboarTableProps {
  leaderboard: LeaderboardItem[];
}

export default function LeaderboardTable({
  leaderboard,
}: ILeaderboarTableProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-emerald-900 shadow-2xl mx-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-emerald-600 text-left">
            <th className="w-16 px-6 py-4">#</th>
            <th className="px-6 py-4">Jogador</th>
            <th className="w-48 px-6 py-4 text-center">Campeões Concluidos</th>
            <th className="w-48 px-6 py-4 text-center">Total de Partidas</th>
            <th className="w-40 px-6 py-4 text-center">Aproveitamento</th>
            <th className="w-44 px-6 py-4 text-center">Tempo de Jogo</th>
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
              <td className="px-6 py-4">{player.position}</td>

              <td className="px-6 py-4 font-medium">{player.playerName}</td>

              <td className="px-6 py-4 font-medium">
                {player.completedChampionsCount}
              </td>

              <td className="px-6 py-4 text-center">{player.totalMatches}</td>

              <td className="px-6 py-4 text-center">{player.winRate}%</td>

              <td className="px-6 py-4 text-center">
                {formatTime(player.totalTimeSeconds)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
