"use client";

import IconButton from "@/src/components/IconButton";
import { IconShare } from "@tabler/icons-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { AppTooltip } from "@/src/components/AppTooltip";
import { useTranslations } from "next-intl";
import { appToast } from "@/src/components/AppToaster/appToast";

interface ShareChallengeButtonProps {
  challengeId: string;
  challengeUserPuuid: string;
}

export default function ShareChallengeButton({
  challengeId,
  challengeUserPuuid,
}: ShareChallengeButtonProps) {
  const t = useTranslations("CHALLENGER.CHALLENGE_PAGE");

  const { user } = useAuth();

  async function handleShare() {
    const url = `${window.location.origin}/challenger/${challengeId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: t("SHARE_TITLE"),
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      appToast.success(t("LINK_COPIED"));
    } catch (error) {
      // navigator.share lança erro quando o usuário cancela,
      // então só mostra alerta para erros reais.
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        appToast.error(t("SHARE_ERROR"));
      }
    }
  }

  if (user?.puuid !== challengeUserPuuid) return null;

  return (
    <AppTooltip text={t("SHARE")}>
      <IconButton onClick={handleShare}>
        <IconShare size={20} />
      </IconButton>
    </AppTooltip>
  );
}
