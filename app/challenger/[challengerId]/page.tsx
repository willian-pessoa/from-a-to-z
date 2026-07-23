import { notFound } from "next/navigation";
import { getChallengeData } from "@/src/data/getChallengeData";

import ChallengerBanner from "../components/ChallengerBanner";
import ChallengerChampionsGrid from "../components/ChallengerChampionsGrid";
import ChallengerProgressBar from "../components/ChallengerProgressBar";
import { LaneType } from "@/src/types";
import HeaderConfig from "@/src/layout/HeaderConfig";
import { capitalize } from "@/src/utils/capitalize";
import UpdateChallengerButton from "../components/UpdateChallengerButton";
import ModalDeleteChallenger from "../components/ModalDeleteChallenger";
import ShareChallengeButton from "../components/ShareChallengeButton";

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

  const { challengerData, progress } = data;

  // Cálculos das métricas (Feitos no servidor apenas quando o cache é gerado)
  const totalChampions = progress.length;
  const completedChampions = progress.filter((c) => c.has_victory).length;
  const totalLosses = progress.reduce((acc, curr) => acc + curr.loses, 0);
  const totalGames = completedChampions + totalLosses;
  const winRate =
    totalGames > 0 ? Math.round((completedChampions / totalGames) * 100) : 0;

  const currentChampObj = progress.find(
    (c) => c.campeao_id === challengerData.current_champ,
  );
  const currentChampionName = currentChampObj
    ? currentChampObj.nome_campeao
    : "Finalizado!";

  const formattedChampionsData = progress.map((c) => ({
    id: String(c.campeao_id),
    nameId: c.campeao_id,
    name: c.nome_campeao,
    loses: c.loses,
    funNote: c.fun_note || 0,
    commentary: c.comentary || "",
    completed: c.has_victory,
  }));

  // --- CÁLCULO DO COOLDOWN DE 15 MINUTOS (No Servidor) ---
  const updatedAt = new Date(challengerData.updated_at).getTime();
  const now = Date.now();
  const diffMs = now - updatedAt;

  const fifteenMinutesMs = 15 * 60 * 1000;
  const limitTimeExceeded = diffMs >= fifteenMinutesMs;

  // Header Confing
  const playerChallenger = challengerData.usuario_riotId.split("#")[0];
  const titleHeaderConfig = `${capitalize(challengerData.lane)} A-Z (${capitalize(challengerData.queue)}) - ${playerChallenger}`;

  return (
    <div className="p-3 flex flex-col gap-3">
      {limitTimeExceeded && (
        <div className="flex justify-end">
          <UpdateChallengerButton
            challengerData={challengerData}
            championsProgress={progress}
          />
        </div>
      )}
      <HeaderConfig title={titleHeaderConfig} />
      <ChallengerBanner
        challengerLane={challengerData.lane}
        currentChampionNameId={challengerData.current_champ ?? ""}
        currentChampionName={currentChampionName}
        totalGames={totalGames}
        winRate={winRate}
        isFinished={challengerData.is_finished}
      />
      <ChallengerProgressBar
        completed={completedChampions}
        totalChampions={totalChampions}
      />
      <ChallengerChampionsGrid
        championsData={formattedChampionsData}
        challengerData={challengerData}
      />
      <div className="flex justify-end items-center gap-2 sm:mb-0 mb-16">
        <ModalDeleteChallenger
          challengeId={challengerId}
          challengeUserPuuid={challengerData.usuario_puuid}
        />
        <ShareChallengeButton
          challengeId={challengerId}
          challengeUserPuuid={challengerData.usuario_puuid}
        />
      </div>
    </div>
  );
}
