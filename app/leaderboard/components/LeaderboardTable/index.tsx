import clsx from "clsx";

export interface LeaderboardPlayer {
  position: number;
  player: string;
  games: number;
  winRate: number;
}

export default function LeaderboardTable() {
  const players: LeaderboardPlayer[] = [
    {
      position: 1,
      player: "AURA Galactus#GALA",
      games: 46,
      winRate: 100,
    },
    {
      position: 2,
      player: "AURA Galactus#GALA",
      games: 48,
      winRate: 98,
    },
    {
      position: 3,
      player: "AURA Galactus#GALA",
      games: 49,
      winRate: 96,
    },
    {
      position: 4,
      player: "AURA Galactus#GALA",
      games: 52,
      winRate: 94,
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg bg-emerald-900 shadow-2xl mx-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-emerald-600 text-left">
            <th className="w-16 px-6 py-4">#</th>
            <th className="px-6 py-4">Jogador</th>
            <th className="w-48 px-6 py-4 text-center">Total de Partidas</th>
            <th className="w-40 px-6 py-4 text-center">Aproveitamento</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player, idx) => (
            <tr
              key={player.position}
              className={clsx(
                "border-b border-emerald-700 last:border-none",
                idx % 2 === 0 && "bg-emerald-700",
                idx % 2 === 1 && "bg-emerald-900",
              )}
            >
              <td className="px-6 py-4">{player.position}</td>

              <td className="px-6 py-4 font-medium">{player.player}</td>

              <td className="px-6 py-4 text-center">{player.games}</td>

              <td className="px-6 py-4 text-center">{player.winRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
