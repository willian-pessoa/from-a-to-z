"use client";
import Image from "next/image";

import { useState } from "react";
import { findRiotAccount, linkPlayer } from "@/src/actions/auth";
import AppTextInput from "@/src/components/AppTextInput";
import Button from "@/src/components/Button";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";

import { useAuth } from "@/src/contexts/AuthContext";
import AppSelect from "@/src/components/AppSelect";
import { RIOT_REGIONS } from "./const/riotRegionsOptions";
import { RiotPlatformRegion } from "@/src/types";
import { SummonerIcon } from "@/src/actions/utils/getRandomVerificationIcon";
import DisplayTimer from "@/src/components/DisplayTimer";
import { appToast } from "@/src/components/AppToaster/appToast";
import { useTranslations } from "next-intl";

type LinkingState = "search" | "check";

export default function ModalLinkAccount() {
  const t = useTranslations("CHALLENGER.MODAL_LINK_ACCOUNT");

  // Estados do fluxo de autenticação e UI
  const { login } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);
  const [showWaitingTimer, setShowWaitingTimer] = useState(false);
  const [linkingState, setLinkingState] = useState<LinkingState>("search");
  const [iconVerification, setIconVerification] = useState<SummonerIcon | null>(
    { id: 1, name: "teste" },
  );

  // Estados dos inputs (Passo 1)
  const [riotId, setRiotId] = useState("");
  const [userPuuid, setUserPuuid] = useState("");
  const [region, setRegion] = useState("BR1");

  async function handleFindRiotAccoutn() {
    setLoading(true);
    setError("");

    const result = await findRiotAccount(riotId, region as RiotPlatformRegion);

    if (result.success && result.verification) {
      setIconVerification(result.verification.icon);
      setUserPuuid(result.verification.puuid);
      setLinkingState("check");
    } else {
      setError(t(result.error || "FIND_ACCOUNT_ERROR"));
    }

    setLoading(false);
  }

  async function handleLinkAccount() {
    setLoading(true);
    setError("");

    const result = await linkPlayer(userPuuid, region as RiotPlatformRegion);

    if (result.success && result.user) {
      login(result.user);

      setLinkingState("search");
      setIsDialogOpen(false);
      appToast.success(t("LINK_SUCCESS"));
    } else {
      setError(t(result.error || "VERIFY_ACCOUNT_ERROR"));
      if (result.reset) {
        setReset(true);
      }

      if (result.showWaitingTimer) {
        setShowWaitingTimer(true);
      }
    }
    setLoading(false);
  }

  const handleReset = () => {
    setLinkingState("search");
    setIconVerification(null);
    setUserPuuid("");
    setReset(false);
    setError("");
  };

  return (
    <AppDialog
      trigger={<Button className="text-lg py-2 px-4">{t("TRIGGER")}</Button>}
      title={t("TITLE")}
      open={isDialogOpen}
      onOpenChange={(open) => setIsDialogOpen(open)}
      closeOnOutsideClick={false}
    >
      <div className="flex flex-col gap-8 text-left p-2">
        {error ? (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
            {error}
          </div>
        ) : (
          <p className="text-emerald-200 text-sm">{t("DESCRIPTION")}</p>
        )}

        {linkingState === "search" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">{t("RIOT_ID_LABEL")}</label>
              <AppTextInput
                id="riot-id"
                required
                placeholder={t("RIOT_ID_PLACEHOLDER")}
                value={riotId}
                onChange={(e) => setRiotId(e.target.value)}
                className="bg-emerald-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">{t("REGION_LABEL")}</label>
              <AppSelect
                className="bg-emerald-800 cursor-pointer"
                value={region}
                onValueChange={setRegion}
                options={RIOT_REGIONS}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleFindRiotAccoutn} disabled={loading}>
                {loading ? t("SEARCHING_BUTTON") : t("SEARCH_BUTTON")}
              </Button>
            </div>
          </div>
        )}

        {linkingState === "check" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">{t("VERIFY_ICON_LABEL")}</label>
              <p className="text-emerald-200 text-sm text-justify">
                {t("VERIFY_DESCRIPTION")}
              </p>
              {iconVerification && (
                <div className="flex flex-col items-center justify-center mt-2">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/16.13.1/img/profileicon/${iconVerification.id}.png`}
                    alt={t("VERIFICATION_ICON_ALT")}
                    width={96}
                    height={96}
                    className="rounded-lg border-2 border-emerald-400"
                  />
                  <span className="text-emerald-200">
                    {iconVerification.name}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              {showWaitingTimer && (
                <DisplayTimer
                  time={60}
                  onFinish={() => setShowWaitingTimer(false)}
                  config={{
                    iconClassName: "text-red-500",
                    timerClassName: "text-red-500",
                  }}
                />
              )}
              {reset ? (
                <Button
                  className="bg-red-600 border-red-500 text-center items-center justify-center hover:bg-red-700"
                  onClick={handleReset}
                >
                  {t("RESET_BUTTON")}
                </Button>
              ) : (
                <Button onClick={handleLinkAccount} disabled={loading}>
                  {loading ? t("VERIFYING_BUTTON") : t("VERIFY_BUTTON")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppDialog>
  );
}
