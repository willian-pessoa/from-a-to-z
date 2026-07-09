import * as React from "react";

import Image from "next/image";

export interface ILeaderboardPodiumProps {}

export default function LeaderboardPodium(props: ILeaderboardPodiumProps) {
  const firstPlace = { name: "AURA Galactus", games: 46 };
  const secondPlace = { name: "AURA Galactus", games: 48 };
  const thirdPlace = { name: "AURA Galactus", games: 49 };

  return (
    <div className="flex gap-8 flex-1 items-end justify-center">
      <div className="flex flex-col flex-1 items-center h-75 max-w-65 justify-between px-4 py-6 rounded-lg border bg-emerald-800 border-emerald-600 shadow-2xl">
        <Image
          src="/elo/GmEmblem.png"
          alt={secondPlace.name}
          width={128}
          height={128}
          className="object-cover"
        />
        <span className="font-bold text-xl">{secondPlace.name}</span>
        <span className="text-sm">
          completou em {secondPlace.games} partidas
        </span>
      </div>
      <div className="flex flex-col items-center h-90 flex-1 max-w-70  justify-between px-4 py-6 rounded-lg border bg-emerald-800 border-emerald-600 shadow-2xl">
        <Image
          src="/elo/ChallengerEmblem.png"
          alt={firstPlace.name}
          width={128}
          height={128}
          className="object-cover"
        />
        <span className="font-bold text-xl">{firstPlace.name}</span>
        <span className="text-sm">
          completou em {firstPlace.games} partidas
        </span>
      </div>
      <div className="flex flex-col items-center h-60 flex-1 max-w-65  justify-between px-4 py-6 rounded-lg border bg-emerald-800 border-emerald-600 shadow-2xl">
        <Image
          src="/elo/MasterEmblem.png"
          alt={thirdPlace.name}
          width={128}
          height={128}
          className="object-cover"
        />
        <span className="font-bold text-xl">{thirdPlace.name}</span>
        <span className="text-sm">
          completou em {thirdPlace.games} partidas
        </span>
      </div>
    </div>
  );
}
