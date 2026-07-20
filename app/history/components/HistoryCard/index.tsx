import { ChallengeHistoryData } from "@/src/data/getChallengeHistory";
import { capitalize } from "@/src/utils/capitalize";
import { formatDate } from "@/src/utils/formatDate";
import { IconCircleCheck, IconProgressCheck } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";

export interface IHistoryCardProps {
  challengeData: ChallengeHistoryData;
}

export default function HistoryCard({ challengeData }: IHistoryCardProps) {
  const { id, is_finished, lane, queue, started_at, finished_at } =
    challengeData;

  return (
    <Link
      href={`/challenger/${id}`}
      className={clsx(
        "relative w-70 h-35 border-2 rounded-lg bg-emerald-900 hover:bg-emerald-800",
        is_finished ? "border-emerald-600" : "border-yellow-300",
      )}
    >
      <div className="absolute top-2 left-2">
        <span className="font-bold text-xl">{capitalize(lane)}</span>
      </div>
      <div className="absolute top-2 right-2">
        <span className="font-bold text-xl">{capitalize(queue)}</span>
      </div>
      <div className="absolute bottom-2 left-2">
        <div className="font-light text-sm flex gap-2 text-emerald-200">
          <span>Inicio:</span>
          <span>{formatDate(started_at)}</span>
        </div>
        {is_finished && (
          <div className="font-light text-sm flex gap-2  text-emerald-200">
            <span>Fim:</span>
            <span>{formatDate(finished_at)}</span>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "absolute bottom-2 right-2",
          is_finished ? "text-lime-400" : "text-yellow-300",
        )}
      >
        {is_finished ? <IconCircleCheck /> : <IconProgressCheck />}
      </div>
    </Link>
  );
}
