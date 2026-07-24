"use client";

import { useState } from "react";
import Button from "@/src/components/Button";
import { syncRiotMatches } from "@/src/actions/syncRiotMatches";
import { useRouter } from "next/navigation";
import { ChallengerData, ChampionProgress } from "@/src/types";
import { useAuth } from "@/src/contexts/AuthContext";
import { appToast } from "@/src/components/AppToaster/appToast";
import { useTranslations } from "next-intl";

interface UpdateChallengerButtonProps {
  challengerData: ChallengerData;
  championsProgress: ChampionProgress[];
}

export default function UpdateChallengerButton({
  challengerData,
  championsProgress,
}: UpdateChallengerButtonProps) {
  const t = useTranslations("CHALLENGER.CHALLENGE_PAGE");

  const { user, updateChallengerId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    setIsLoading(true);
    try {
      const result = await syncRiotMatches(
        challengerData,
        championsProgress,
        user?.region ?? "BR1",
      );

      if (result.success) {
        // atualizar desafio do usuario conectado se for concluido
        if (result.isFinished && user?.puuid === challengerData.usuario_puuid) {
          updateChallengerId(null);
          appToast.success(t("CHALLENGE_FINISHED"));
        }

        router.refresh();

        appToast.success(t("SYNC_SUCCESS"));
      } else {
        appToast.error(t(result.error ?? "UPDATE_ERROR"));
      }
    } catch (error) {
      appToast.error(t("SERVER_CONNECTION_ERROR"));
    } finally {
      setIsLoading(false);
    }
  }

  if (challengerData.is_finished) return null;

  return (
    <Button
      className="bg-fuchsia-600 border-fuchsia-800 hover:bg-fuchsia-700 text-white font-semibold shadow-md disabled:opacity-50"
      onClick={handleUpdate}
      disabled={isLoading}
    >
      {isLoading ? t("UPDATING_PROGRESS") : t("UPDATE_PROGRESS")}
    </Button>
  );
}
