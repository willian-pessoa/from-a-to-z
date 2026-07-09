"use client";

import { useState } from "react";

import Button from "@/src/components/Button";
import clsx from "clsx";

import { JungleIcon } from "@/src/assets/icons/JungleIcon";
import { AdcIcon } from "@/src/assets/icons/AdcIcon";
import { TopIcon } from "@/src/assets/icons/TopIcon";
import { MidIcon } from "@/src/assets/icons/MidIcon";
import { SupportIcon } from "@/src/assets/icons/SupportIcon";
import IconButton from "@/src/components/IconButton";

type QueueType = "ranked" | "casual";
type LaneType = "top" | "jungle" | "mid" | "adc" | "support";

export interface ILeaderboardHeaderProps {}

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
          <IconButton
            className={laneButtonClass("top")}
            onClick={() => setLane("top")}
          >
            <TopIcon className="h-8 w-8 text-emerald-200" />
          </IconButton>

          <IconButton
            className={laneButtonClass("jungle")}
            onClick={() => setLane("jungle")}
          >
            <JungleIcon className="h-8 w-8 text-emerald-200" />
          </IconButton>

          <IconButton
            className={laneButtonClass("mid")}
            onClick={() => setLane("mid")}
          >
            <MidIcon className="h-8 w-8 text-emerald-200" />
          </IconButton>

          <IconButton
            className={laneButtonClass("support")}
            onClick={() => setLane("support")}
          >
            <SupportIcon className="h-8 w-8 text-emerald-200" />
          </IconButton>

          <IconButton
            className={laneButtonClass("adc")}
            onClick={() => setLane("adc")}
          >
            <AdcIcon className="h-8 w-8 text-emerald-200" />
          </IconButton>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <span className="text-3xl font-bold p-1">{playersFinished}</span>
        <span className="text-xl">Jogadores completaram o desafio</span>
      </div>
    </div>
  );
}
