import { getChampionIconURL } from "@/src/utils/getChampionIconURL";
import clsx from "clsx";
import Image from "next/image";

import { IconCheck } from "@tabler/icons-react";

interface ChampionGridCardProps {
  name: string;
  loses: number;
  funNote: number;
  commentary: string;
  completed: boolean;
}

export default function ChampionGridCard({
  name,
  loses,
  completed,
  funNote,
  commentary,
}: ChampionGridCardProps) {
  const getBorderColor = () => {
    if (completed) return "border-lime-400";
    if (loses && loses > 0) return "border-red-500";
    return "border-transparent"; // ou simplesmente omitir a borda
  };

  return (
    <div
      className={clsx(
        "relative aspect-square overflow-hidden shadow-md rounded-lg border-3 transition hover:scale-110",
        getBorderColor(),
      )}
    >
      <Image
        src={getChampionIconURL(name)}
        alt={name}
        fill
        className={completed ? "object-cover" : "object-cover grayscale"}
      />

      {loses && (
        <div
          className={clsx(
            "absolute left-1 top-1 rounded-lg p-1 text-center text-xs text-lime-50 font-bold h-6 w-6",
            completed ? "bg-red-800" : "bg-red-500",
          )}
        >
          {loses}
        </div>
      )}

      {completed && (
        <>
          {funNote && (
            <div className="absolute bottom-1 left-1 rounded-lg p-1 bg-amber-400 text-center text-xs text-lime-950 font-bold h-6 w-6">
              {funNote}
            </div>
          )}

          <div className="absolute right-1 top-1 rounded-lg bg-lime-500 px-1 flex items-center justify-center h-6 w-6">
            <IconCheck size={14} stroke={4} />
          </div>
        </>
      )}
    </div>
  );
}
