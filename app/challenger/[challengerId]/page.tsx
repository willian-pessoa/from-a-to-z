import { notFound } from "next/navigation";
import { getChallengeData } from "@/src/data/getChallengeData";

import ChallengerBanner from "../components/ChallengerBanner";
import ChallengerChampionsGrid from "../components/ChallengerChampionsGrid";
import ChallengerProgressBar from "../components/ChallengerProgressBar";
import { LaneType } from "@/src/types";
import HeaderConfig from "@/src/layout/HeaderConfig";
import { capitalize } from "@/src/utils/capitalize";

export default async function ChallengerPage({
  params,
}: {
  params: Promise<{ challengerId: string }>;
}) {
  const { challengerId } = await params;

  const data = await getChallengeData(challengerId);

  if (!data) {
    notFound();
  }

  const { challengerData, progresso } = data;

  // Cálculos das métricas (Feitos no servidor apenas quando o cache é gerado)
  const totalChampions = progresso.length;
  const completedChampions = progresso.filter((c) => c.has_victory).length;
  const totalLosses = progresso.reduce((acc, curr) => acc + curr.loses, 0);
  const totalGames = completedChampions + totalLosses;
  const winRate =
    totalGames > 0 ? Math.round((completedChampions / totalGames) * 100) : 0;

  const currentChampObj = progresso.find(
    (c) => c.campeao_id === challengerData.current_champ,
  );
  const currentChampionName = currentChampObj
    ? currentChampObj.nome_campeao
    : "Finalizado!";

  const formattedChampionsData = progresso.map((c) => ({
    id: String(c.campeao_id),
    nameId: c.campeao_id,
    name: c.nome_campeao,
    loses: c.loses,
    funNote: c.fun_note || 0,
    commentary: c.comentary || "",
    completed: c.has_victory,
  }));

  return (
    <div className="p-3 flex flex-col gap-3">
      <HeaderConfig
        title={`${capitalize(challengerData.lane)} A-Z (${capitalize(challengerData.queue)})`}
      />
      <ChallengerBanner
        challengerLane={challengerData.lane.toLowerCase() as LaneType}
        currentChampionNameId={challengerData.current_champ}
        currentChampionName={currentChampionName}
        totalGames={totalGames}
        winRate={winRate}
      />
      <ChallengerProgressBar
        completed={completedChampions}
        totalChampions={totalChampions}
      />
      <ChallengerChampionsGrid championsData={formattedChampionsData} />
    </div>
  );
}
