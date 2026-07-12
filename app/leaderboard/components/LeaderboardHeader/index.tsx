"use client";

import { useState } from "react";

import Button from "@/src/components/Button";
import clsx from "clsx";

import { JungleIcon } from "@/src/assets/icons/JungleIcon";
import { BotIcon } from "@/src/assets/icons/BotIcon";
import { TopIcon } from "@/src/assets/icons/TopIcon";
import { MidIcon } from "@/src/assets/icons/MidIcon";
import { SupportIcon } from "@/src/assets/icons/SupportIcon";
import IconButton from "@/src/components/IconButton";
import { QueueType, LaneType } from "@/src/types";
import { AppTooltip } from "@/src/components/AppTooltip";

export interface ILeaderboardHeaderProps {}

const LANES_CONFIG = [
  { id: "top", label: "Top Lane", Icon: TopIcon },
  { id: "jungle", label: "Jungle", Icon: JungleIcon },
  { id: "mid", label: "Mid Lane", Icon: MidIcon },
  { id: "bot", label: "Bot Lane", Icon: BotIcon },
  { id: "support", label: "Support", Icon: SupportIcon },
] as const;

export default function LeaderboardHeader(props: ILeaderboardHeaderProps) {
  const [queue, setQueue] = useState<QueueType>("ranked");
  const [lane, setLane] = useState<LaneType>("jungle");

  const playersFinished = 167;

  const laneButtonClass = (value: LaneType) =>
    clsx("border-none", lane === value ? "bg-emerald-600" : "bg-emerald-900");

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Button
            className={clsx(
              "rounded-r-none font-bold",
              queue === "ranked" && "bg-emerald-600",
              queue !== "ranked" && "bg-emerald-900",
            )}
            onClick={() => setQueue("ranked")}
          >
            Ranqueada
          </Button>

          <Button
            className={clsx(
              "rounded-l-none font-bold",
              queue === "casual" && "bg-emerald-600",
              queue !== "casual" && "bg-emerald-900",
            )}
            onClick={() => setQueue("casual")}
          >
            Casual
          </Button>
        </div>
        <div className="flex gap-2">
          {LANES_CONFIG.map(({ id, label, Icon }) => (
            <AppTooltip key={id} text={label} side="bottom">
              <IconButton
                className={laneButtonClass(id as LaneType)}
                onClick={() => setLane(id as LaneType)}
                aria-label={label}
              >
                <Icon className="h-8 w-8 text-emerald-200" />
              </IconButton>
            </AppTooltip>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <span className="text-3xl font-bold p-1">{playersFinished}</span>
        <span className="text-xl">Jogadores completaram o desafio</span>
      </div>
    </div>
  );
}
