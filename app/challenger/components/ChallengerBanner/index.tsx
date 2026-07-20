import Image from "next/image";
import { IconExternalLink } from "@tabler/icons-react";

import Button from "@/src/components/Button";
import { getChampionSplashURL } from "@/src/utils/getChampioSplashURL";
import { LaneType } from "@/src/types";

const VICTORIOUS_SPLASH_BY_LANE: Record<LaneType, string> = {
  TOP: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_9.jpg",
  JUNGLE:
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sejuani_36.jpg",
  MID: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Orianna_8.jpg",
  BOT: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_25.jpg",
  SUPPORT:
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sona_56.jpg",
};

export interface IChallengerBannerProps {
  currentChampionName: string;
  currentChampionNameId: string;
  totalGames: number;
  winRate: number;
  challengerLane: LaneType;
  isFinished: boolean;
}

export default function ChallengerBanner({
  currentChampionName = "",
  currentChampionNameId = "",
  totalGames = 0,
  winRate = 0,
  challengerLane = "JUNGLE",
  isFinished = false,
}: IChallengerBannerProps) {
  const splash = getChampionSplashURL(currentChampionNameId);
  const lolalytics = `https://lolalytics.com/lol/${currentChampionName.toLowerCase()}/build/?lane=${challengerLane.toLowerCase()}`;
  const finishSplash = VICTORIOUS_SPLASH_BY_LANE[challengerLane];

  return (
    <section className="rounded-lg  bg-emerald-900 p-2 shadow-2xl">
      <div className="grid grid-cols-[1fr_170px_170px] gap-4">
        <div className="relative h-64 overflow-hidden rounded-lg border border-emerald-600">
          <Image
            src={isFinished ? finishSplash : splash}
            alt={currentChampionName}
            fill
            className="object-cover object-[center_10%]"
            sizes="720px"
            priority
          />

          {!isFinished && (
            <div className="absolute left-2 top-2 cursor-default rounded-md bg-emerald-700 border border-emerald-600 px-3 py-1">
              {`Campeão Atual: ${currentChampionName}`}
            </div>
          )}

          {!isFinished && (
            <a
              href={lolalytics}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2"
            >
              <Button className="gap-2 bg-emerald-700 border border-emerald-600">
                lolalytics
                <IconExternalLink size={18} />
              </Button>
            </a>
          )}
        </div>

        <div className="flex h-64 flex-col justify-between rounded-lg border border-emerald-600 bg-emerald-700 p-2">
          <span>Total de Jogos</span>

          <span className="self-end text-5xl font-bold">
            {totalGames.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="flex h-64 flex-col justify-between rounded-lg border border-emerald-600 bg-emerald-700 p-2">
          <span>Win Rate</span>

          <span className="self-end text-5xl font-bold">
            {winRate.toString().padStart(2, "0")}%
          </span>
        </div>
      </div>
    </section>
  );
}
