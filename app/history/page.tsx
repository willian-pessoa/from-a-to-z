import { notFound } from "next/navigation";
import HistoryCard from "./components/HistoryCard";
import HeaderConfig from "@/src/layout/HeaderConfig";
import {
  ChallengeHistoryData,
  getChallengesHistory,
} from "@/src/data/getChallengeHistory";
import { getTranslations } from "next-intl/server";

export default async function HistoryPage() {
  const t = await getTranslations();

  const historyData = await getChallengesHistory();

  if (!historyData?.success) {
    notFound();
  }

  const normalizedData: Record<number, ChallengeHistoryData[]> = {};

  historyData.data?.forEach((challenge) => {
    if (!normalizedData[challenge.season]) {
      normalizedData[challenge.season] = [];
    }

    normalizedData[challenge.season].push(challenge);
  });

  const seasons = Object.keys(normalizedData)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <HeaderConfig title={t("HISTORY.TITLE")} />

      {seasons.length === 0 && (
        <div className="flex justify-center mt-8 items-center">
          {t("HISTORY.NO_CHALLENGES")}
        </div>
      )}

      {seasons.map((season) => (
        <div key={season} className="flex flex-col mt-4 ml-4">
          <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
            {t("HISTORY.SEASON", { season })}
          </label>

          <div className="flex flex-wrap items-center gap-6 p-4 text-center">
            {normalizedData[season].map((challenge) => (
              <HistoryCard key={challenge.id} challengeData={challenge} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
