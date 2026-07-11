import { getChampionIconURL } from "@/src/utils/getChampionIconURL";
import clsx from "clsx";
import Image from "next/image";

import { IconCheck, IconEdit } from "@tabler/icons-react";
import IconButton from "@/src/components/IconButton";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import ModalChampionNotes from "../ModalChampionNotes";
import { useState } from "react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        src={getChampionIconURL(name)}
        alt={name}
        fill
        className={completed ? "object-cover" : "object-cover grayscale"}
      />

      {!!loses && (
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
          {!!funNote && (
            <div className="absolute bottom-1 left-1 flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400 text-xs font-bold text-lime-950">
              {funNote}
            </div>
          )}

          <div className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-lg bg-lime-500">
            <IconCheck size={14} stroke={4} />
          </div>

          <AppDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            title={`Anotações sobre o campeão ${name}`}
            closeOnOutsideClick={false}
            trigger={
              <IconButton
                className={clsx(
                  "absolute right-1 bottom-1 transition-opacity",
                  isDialogOpen
                    ? "opacity-0 pointer-events-none"
                    : "opacity-0 group-hover:opacity-100",
                )}
              >
                <IconEdit />
              </IconButton>
            }
          >
            <ModalChampionNotes />
          </AppDialog>
        </>
      )}
    </div>
  );
}
