import { notFound } from "next/navigation";
import HistoryCard from "./components/HistoryCard";
import HeaderConfig from "@/src/layout/HeaderConfig";
import {
  ChallengeHistoryData,
  getChallengesHistory,
} from "@/src/data/getChallengeHistory";

export default async function HistoryPage() {
  const historyData = await getChallengesHistory();

  if (!historyData) {
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
      <HeaderConfig title="Histórico de Desafios" />

      {seasons.length === 0 && (
        <div className="flex justify-center mt-8 items-center">
          Nenhum Desafio Registrado
        </div>
      )}

      {seasons.map((season) => (
        <div key={season} className="flex flex-col mt-4 ml-4">
          <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
            Temporada {season}
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
