import { getChampionIconURL } from "@/src/utils/getChampionIconURL";
import clsx from "clsx";
import Image from "next/image";

import { IconCheck, IconInfoSmall } from "@tabler/icons-react";
import ModalChampionNotes from "../ModalChampionNotes";
import { useAuth } from "@/src/contexts/AuthContext";
import { AppTooltip } from "@/src/components/AppTooltip";

interface ChampionGridCardProps {
  nameId: string;
  name: string;
  loses: number;
  funNote: number;
  commentary: string;
  completed: boolean;
  challengerId: number;
  userChallengerPuuid: string;
  cardSize: number;
}

const sizeCut = 100;

export default function ChampionGridCard({
  nameId,
  name,
  loses,
  completed,
  funNote,
  commentary,
  challengerId,
  userChallengerPuuid,
  cardSize,
}: ChampionGridCardProps) {
  const { user } = useAuth();

  const getBorderColor = () => {
    if (completed) return "border-lime-400";
    if (loses > 0) return "border-red-500";
    return "border-transparent";
  };

  return (
    <div
      className={clsx(
        "group relative aspect-square overflow-hidden rounded-lg border-3 shadow-md transition hover:scale-110",
        getBorderColor(),
      )}
    >
      <Image
        src={getChampionIconURL(nameId)}
        alt={name}
        fill
        sizes="150px"
        className={completed ? "object-cover" : "object-cover grayscale"}
      />

      {!!loses && cardSize > sizeCut && (
        <div
          className={clsx(
            "absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold text-lime-50",
            completed ? "bg-red-800" : "bg-red-500",
          )}
        >
          {loses}
        </div>
      )}

      {completed && (
        <>
          {!!funNote && cardSize > sizeCut && (
            <div className="absolute bottom-1 left-1 flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400 text-xs font-bold text-lime-950">
              {funNote}
            </div>
          )}

          {!!commentary && cardSize > sizeCut && (
            <AppTooltip text={commentary}>
              <div className="absolute bottom-1 left-7.5 flex h-6 w-6 items-center justify-center rounded-lg bg-slate-200 text-xs font-bold text-lime-950">
                <IconInfoSmall />
              </div>
            </AppTooltip>
          )}

          {cardSize > sizeCut && (
            <div className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-lg bg-lime-500">
              <IconCheck size={14} stroke={4} />
            </div>
          )}

          {user?.puuid === userChallengerPuuid && (
            <ModalChampionNotes
              challengeId={challengerId}
              championNameId={nameId}
              championName={name}
              funNote={funNote}
              commentary={commentary}
            />
          )}
        </>
      )}
    </div>
  );
}
