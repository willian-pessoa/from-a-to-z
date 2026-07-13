import Button from "@/src/components/Button";
import clsx from "clsx";
import * as React from "react";

export interface IChallengerProgressBarProps {
  totalChampions: number;
  completed: number;
}

export default function ChallengerProgressBar({
  totalChampions,
  completed,
}: IChallengerProgressBarProps) {
  const progress = Math.round((completed / totalChampions) * 100);

  return (
    <div className="relative h-11 overflow-hidden rounded-lg border border-emerald-600 bg-emerald-900">
      <div
        className={clsx(
          "absolute inset-y-0 left-0 rounded-lg bg-linear-to-r from-emerald-700 to-emerald-500 transition-all duration-500",
        )}
        style={{ width: `${progress}%` }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold drop-shadow-md">
          {completed}/{totalChampions} Campeões ({progress}%)
        </span>
      </div>
    </div>
  );
}
