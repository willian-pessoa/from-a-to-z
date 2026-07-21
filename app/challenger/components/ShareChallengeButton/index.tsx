"use client";

import IconButton from "@/src/components/IconButton";
import { IconShare } from "@tabler/icons-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { AppTooltip } from "@/src/components/AppTooltip";

interface ShareChallengeButtonProps {
  challengeId: string;
  challengeUserPuuid: string;
}

export default function ShareChallengeButton({
  challengeId,
  challengeUserPuuid,
}: ShareChallengeButtonProps) {
  const { user } = useAuth();

  async function handleShare() {
    const url = `${window.location.origin}/challenger/${challengeId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Confira meu desafio A-Z!",
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      window.alert("Link copiado para a área de transferência!");
    } catch (error) {
      // navigator.share lança erro quando o usuário cancela,
      // então só mostra alerta para erros reais.
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        window.alert("Não foi possível compartilhar o desafio.");
      }
    }
  }

  if (user?.puuid !== challengeUserPuuid) return null;

  return (
    <AppTooltip text="Compartilhar">
      <IconButton onClick={handleShare}>
        <IconShare size={20} />
      </IconButton>
    </AppTooltip>
  );
}
