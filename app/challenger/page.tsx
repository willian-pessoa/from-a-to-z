"use client";

import { useTranslations } from "next-intl";

import ModalCreateChallenger from "./components/ModalCreateChallenger";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import ModalLinkAccount from "./components/ModalLinkAccount";
import AppLoader from "@/src/components/AppLoader";

import { useAuth } from "@/src/contexts/AuthContext";

export default function Page() {
  const t = useTranslations("CHALLENGER");

  const { user, isLoading } = useAuth();

  const router = useRouter();

  // Redirecionamento seguro acionado quando o estado do usuário mudar e já tiver desafio
  useEffect(() => {
    if (user?.challengerId) {
      router.push(`/challenger/${user.challengerId}`);
    }
  }, [user, router]);

  if (isLoading || user?.challengerId) {
    return (
      <div className="flex justify-center h-full items-center">
        <AppLoader />
      </div>
    );
  }

  if (user?.puuid && user.riot_id && user.region && !user.challengerId) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-8 p-2 text-center">
        <span className="text-lg">{t("MISSING_CHALLENGER")}</span>
        <ModalCreateChallenger />
      </div>
    );
  }

  // Se o estado 'user' estiver vazio, exibe a interface de linkar conta
  return (
    <div className="flex flex-col justify-center items-center h-full gap-8 p-2 text-center">
      <span className="text-lg">{t("MISSING_ACCOUNT")}</span>

      <ModalLinkAccount />
    </div>
  );
}
