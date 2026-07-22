"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
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

export interface ILeaderboardHeaderProps {
  queue: QueueType;
  lane: LaneType;
  totalCount: number;
}

const LANES_CONFIG = [
  { id: "TOP", label: "Top Lane", Icon: TopIcon },
  { id: "JUNGLE", label: "Jungle", Icon: JungleIcon },
  { id: "MID", label: "Mid Lane", Icon: MidIcon },
  { id: "BOT", label: "Bot Lane", Icon: BotIcon },
  { id: "SUPPORT", label: "Support", Icon: SupportIcon },
] as const;

export default function LeaderboardHeader({
  lane,
  queue,
  totalCount,
}: ILeaderboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParams(values: Partial<{ queue: QueueType; lane: LaneType }>) {
    const params = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.replace(`${pathname}?${params.toString()}`);
  }

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
            onClick={() => updateParams({ queue: "ranked" })}
          >
            Ranqueada
          </Button>

          <Button
            className={clsx(
              "rounded-l-none font-bold",
              queue === "casual" && "bg-emerald-600",
              queue !== "casual" && "bg-emerald-900",
            )}
            onClick={() => updateParams({ queue: "casual" })}
          >
            Casual
          </Button>
        </div>
        <div className="flex gap-2">
          {LANES_CONFIG.map(({ id, label, Icon }) => (
            <AppTooltip key={id} text={label} side="bottom">
              <IconButton
                className={laneButtonClass(id)}
                onClick={() => updateParams({ lane: id })}
                aria-label={label}
              >
                <Icon className="h-8 w-8 text-emerald-200" />
              </IconButton>
            </AppTooltip>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-1">
        <span className="text-xl ml-1">{`${totalCount} desafios registrados.`}</span>
      </div>
    </div>
  );
}
