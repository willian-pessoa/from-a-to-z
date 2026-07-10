"use client";

import { useState } from "react";
import clsx from "clsx";

import Button from "@/src/components/Button";
import IconButton from "@/src/components/IconButton";
import { AppTooltip } from "@/src/components/AppTooltip";

import { TopIcon } from "@/src/assets/icons/TopIcon";
import { JungleIcon } from "@/src/assets/icons/JungleIcon";
import { MidIcon } from "@/src/assets/icons/MidIcon";
import { AdcIcon } from "@/src/assets/icons/AdcIcon";
import { SupportIcon } from "@/src/assets/icons/SupportIcon";
import { QueueType, LaneType } from "@/src/types";
import { IconInfoCircle } from "@tabler/icons-react";

export interface IModalCreateChallengerProps {
  onCreate?: (queue: QueueType, lane: LaneType) => void;
}

export default function ModalCreateChallenger({
  onCreate,
}: IModalCreateChallengerProps) {
  const [queue, setQueue] = useState<QueueType>("ranked");
  const [lane, setLane] = useState<LaneType>("jungle");

  const queueButtonClass = (value: QueueType) =>
    clsx(
      "font-bold",
      value === "ranked" ? "rounded-r-none" : "rounded-l-none",
      queue === value ? "bg-emerald-600" : "bg-emerald-900",
    );

  const laneButtonClass = (value: LaneType) =>
    clsx("border-none", lane === value ? "bg-emerald-600" : "bg-emerald-900");

  return (
    <div className="flex flex-col gap-8 px-2">
      <div>
        <p className="text-sm text-emerald-200">
          Escolha a fila e a rota no qual o desafio será jogado.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Fila</span>

          <AppTooltip text="Escolha se o desafio será realizado em partidas ranqueadas ou casuais.">
            <IconInfoCircle className="h-4 w-4 cursor-help text-emerald-300" />
          </AppTooltip>
        </div>

        <div className="flex">
          <Button
            className={queueButtonClass("ranked")}
            onClick={() => setQueue("ranked")}
          >
            Ranqueada
          </Button>

          <Button
            className={queueButtonClass("casual")}
            onClick={() => setQueue("casual")}
          >
            Casual
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Lane</span>

          <AppTooltip text="Selecione a rota que será considerada para o desafio. Apenas partidas nessa lane contarão para o progresso.">
            <IconInfoCircle className="h-4 w-4 cursor-help text-emerald-300" />
          </AppTooltip>
        </div>

        <div className="flex gap-2">
          <AppTooltip text="Top Lane">
            <IconButton
              className={laneButtonClass("top")}
              onClick={() => setLane("top")}
            >
              <TopIcon className="h-8 w-8 text-emerald-200" />
            </IconButton>
          </AppTooltip>

          <AppTooltip text="Jungle">
            <IconButton
              className={laneButtonClass("jungle")}
              onClick={() => setLane("jungle")}
            >
              <JungleIcon className="h-8 w-8 text-emerald-200" />
            </IconButton>
          </AppTooltip>

          <AppTooltip text="Mid Lane">
            <IconButton
              className={laneButtonClass("mid")}
              onClick={() => setLane("mid")}
            >
              <MidIcon className="h-8 w-8 text-emerald-200" />
            </IconButton>
          </AppTooltip>

          <AppTooltip text="AD Carry">
            <IconButton
              className={laneButtonClass("adc")}
              onClick={() => setLane("adc")}
            >
              <AdcIcon className="h-8 w-8 text-emerald-200" />
            </IconButton>
          </AppTooltip>

          <AppTooltip text="Support">
            <IconButton
              className={laneButtonClass("support")}
              onClick={() => setLane("support")}
            >
              <SupportIcon className="h-8 w-8 text-emerald-200" />
            </IconButton>
          </AppTooltip>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="text-lg" onClick={() => onCreate?.(queue, lane)}>
          Iniciar desafio
        </Button>
      </div>
    </div>
  );
}
