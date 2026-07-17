"use client";

import { useState } from "react";
import clsx from "clsx";

import Button from "@/src/components/Button";
import IconButton from "@/src/components/IconButton";
import { AppTooltip } from "@/src/components/AppTooltip";

import { TopIcon } from "@/src/assets/icons/TopIcon";
import { JungleIcon } from "@/src/assets/icons/JungleIcon";
import { MidIcon } from "@/src/assets/icons/MidIcon";
import { BotIcon } from "@/src/assets/icons/BotIcon";
import { SupportIcon } from "@/src/assets/icons/SupportIcon";
import { QueueType, LaneType } from "@/src/types";
import { IconInfoCircle } from "@tabler/icons-react";
import { useAuth } from "@/src/contexts/AuthContext";

import { createChallenge } from "@/src/actions/challenger";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import { useRouter } from "next/navigation";

export interface IModalCreateChallengerProps {}

const LANES_CONFIG = [
  { id: "TOP", label: "Top Lane", Icon: TopIcon },
  { id: "JUNGLE", label: "Jungle", Icon: JungleIcon },
  { id: "MID", label: "Mid Lane", Icon: MidIcon },
  { id: "BOT", label: "Bot Lane", Icon: BotIcon },
  { id: "SUPPORT", label: "Support", Icon: SupportIcon },
] as const;

export default function ModalCreateChallenger({}: IModalCreateChallengerProps) {
  const { updateChallengerId } = useAuth();
  const router = useRouter();

  const [queue, setQueue] = useState<QueueType>("ranked");
  const [lane, setLane] = useState<LaneType>("JUNGLE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queueButtonClass = (value: QueueType) =>
    clsx(
      "font-bold",
      value === "ranked" ? "rounded-r-none" : "rounded-l-none",
      queue === value ? "bg-emerald-600" : "bg-emerald-900",
    );

  const laneButtonClass = (value: LaneType) =>
    clsx("border-none", lane === value ? "bg-emerald-600" : "bg-emerald-900");

  const handleCreateChallenger = async () => {
    setLoading(true);
    setError("");

    const result = await createChallenge({
      lane,
      queue,
    });

    if (result.success && result.challengeId) {
      updateChallengerId(String(result.challengeId));

      router.push(`/challenger/${result.challengeId}`);
    } else {
      setError(result.error || "Ocorreu um erro ao iniciar o desafio.");
      setLoading(false);
    }
  };

  return (
    <AppDialog
      trigger={<Button className="text-lg py-2 px-4">Iniciar Desafio</Button>}
      title="Registrar desafio A a Z"
      closeOnOutsideClick={false}
    >
      <div className="flex flex-col gap-8 px-2">
        <div>
          <p className="text-sm text-emerald-200">
            Escolha a fila e a rota no qual o desafio será jogado.
          </p>
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Fila</span>

            <AppTooltip text="Escolha se o desafio será realizado em partidas ranqueadas (Solo/Duo) ou casuais (Blind Pick).">
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

        <div className="flex justify-end">
          <Button
            className="text-lg"
            onClick={handleCreateChallenger}
            disabled={loading}
          >
            {loading ? "Iniciando desafio..." : "Iniciar desafio"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
