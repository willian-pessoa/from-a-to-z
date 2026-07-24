"use client";

import Button from "@/src/components/Button";

import { useAuth } from "@/src/contexts/AuthContext";

import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import { useRouter } from "next/navigation";

import { deleteChallenge } from "@/src/actions/deleteChallenge";
import { useState } from "react";
import { appToast } from "@/src/components/AppToaster/appToast";
import { useTranslations } from "next-intl";

export interface IModalDeleteChallengerProps {
  challengeId: string;
  challengeUserPuuid: string;
}

export default function ModalDeleteChallenger({
  challengeId,
  challengeUserPuuid,
}: IModalDeleteChallengerProps) {
  const t = useTranslations("CHALLENGER.CHALLENGE_PAGE");

  const { user, updateChallengerId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteChallenge = async () => {
    setIsLoading(true);

    const result = await deleteChallenge(challengeId);

    if (!result.success) {
      appToast.error(t(result.error ?? "DELETE_ERROR"));
      return;
    }

    if (challengeId === user?.challengerId) {
      updateChallengerId(null);
    }

    router.push(`/challenger`);
    appToast.success(t("DELETE_SUCCESS"));
  };

  if (user?.puuid !== challengeUserPuuid) return null;

  return (
    <div className="flex justify-end">
      <AppDialog
        trigger={
          <Button className="bg-red-600 border-red-500 hover:bg-red-700">
            {t("DELETE_CHALLENGE_BUTTON")}
          </Button>
        }
        title={t("DELETE_CHALLENGE_TITLE")}
        closeOnOutsideClick={false}
      >
        <div className="flex flex-col gap-8 px-2">
          <div className="space-y-3">
            <p className="text-sm text-emerald-200">
              {t("DELETE_CONFIRMATION")}
            </p>

            <p className="text-sm text-red-300">{t("DELETE_WARNING")}</p>
          </div>
          <Button
            onClick={handleDeleteChallenge}
            disabled={isLoading}
            className="bg-red-600 border-red-500 text-center items-center justify-center hover:bg-red-700"
          >
            {isLoading ? t("DELETING_BUTTON") : t("DELETE_BUTTON")}
          </Button>
        </div>
      </AppDialog>
    </div>
  );
}
