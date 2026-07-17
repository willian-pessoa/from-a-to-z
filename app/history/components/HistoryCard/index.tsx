import { IconCircleCheck, IconProgressCheck } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";

export interface IHistoryCardProps {
  isFinished: boolean;
  challengerId: string;
}

export default function HistoryCard({
  isFinished,
  challengerId,
}: IHistoryCardProps) {
  return (
    <Link
      href={`/challenger/${challengerId}`}
      className={clsx(
        "relative w-70 h-35 border-2 rounded-lg bg-emerald-900",
        isFinished ? "border-emerald-600" : "border-yellow-300",
      )}
    >
      <div className="absolute top-2 left-2">
        <span className="font-bold text-xl">Jungle</span>
      </div>
      <div className="absolute top-2 right-2">
        <span className="font-bold text-xl">Ranqueada</span>
      </div>
      <div className="absolute bottom-2 left-2">
        <div className="font-light text-sm flex gap-2 text-emerald-200">
          <span>Inicio:</span>
          <span>11/06/2026</span>
        </div>
        {isFinished && (
          <div className="font-light text-sm flex gap-2  text-emerald-200">
            <span>Fim:</span>
            <span>{"11/06/2026"}</span>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "absolute bottom-2 right-2",
          isFinished ? "text-lime-400" : "text-yellow-300",
        )}
      >
        {isFinished ? <IconCircleCheck /> : <IconProgressCheck />}
      </div>
    </Link>
  );
}
