"use client";

import { useState } from "react";
import clsx from "clsx";

import Button from "@/src/components/Button";
import IconButton from "@/src/components/IconButton";
import { AppTooltip } from "@/src/components/AppTooltip";

import { TopIcon } from "@/src/assets/icons/TopIcon";
import { JungleIcon } from "@/src/assets/icons/JungleIcon";
import { MidIcon } from "@/src/assets/icons/MidIcon";
import { BotIcon } from "@/src/assets/icons/BotIcon";
import { SupportIcon } from "@/src/assets/icons/SupportIcon";
import { QueueType, LaneType } from "@/src/types";
import { IconInfoCircle } from "@tabler/icons-react";
import { useAuth } from "@/src/contexts/AuthContext";

import { createChallenge } from "@/src/actions/challenger";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import { useRouter } from "next/navigation";

import { appToast } from "@/src/components/AppToaster/appToast";
import { useTranslations } from "next-intl";

export interface IModalCreateChallengerProps {}

export default function ModalCreateChallenger({}: IModalCreateChallengerProps) {
  const t = useTranslations("CHALLENGER.MODAL_CREATE_CHALLENGER");

  const { updateChallengerId } = useAuth();
  const router = useRouter();

  const [queue, setQueue] = useState<QueueType>("ranked");
  const [lane, setLane] = useState<LaneType>("JUNGLE");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queueButtonClass = (value: QueueType) =>
    clsx(
      "font-bold",
      value === "ranked" ? "rounded-r-none" : "rounded-l-none",
      queue === value ? "bg-emerald-600" : "bg-emerald-900",
    );

  const laneButtonClass = (value: LaneType) =>
    clsx("border-none", lane === value ? "bg-emerald-600" : "bg-emerald-900");

  const handleCreateChallenger = async () => {
    setLoading(true);
    setError("");

    const result = await createChallenge({
      lane,
      queue,
    });

    if (result.success && result.challengeId) {
      appToast.success(t("CREATE_SUCCESS"));
      updateChallengerId(String(result.challengeId));
      router.push(`/challenger/${result.challengeId}`);
    } else {
      setError(t(result.error || "SERVER_ERROR"));
      setLoading(false);
    }
  };

  const LANES_CONFIG = [
    { id: "TOP", label: t("TOP_LANE"), Icon: TopIcon },
    { id: "JUNGLE", label: t("JUNGLE"), Icon: JungleIcon },
    { id: "MID", label: t("MID_LANE"), Icon: MidIcon },
    { id: "BOT", label: t("BOT_LANE"), Icon: BotIcon },
    { id: "SUPPORT", label: t("SUPPORT"), Icon: SupportIcon },
  ];

  return (
    <AppDialog
      trigger={<Button className="text-lg py-2 px-4">{t("TRIGGER")}</Button>}
      title={t("TITLE")}
      closeOnOutsideClick={false}
    >
      <div className="flex flex-col gap-8 px-2">
        <div>
          <p className="text-sm text-emerald-200">{t("DESCRIPTION")}</p>
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t("QUEUE_LABEL")}</span>

            <AppTooltip text={t("QUEUE_TOOLTIP")}>
              <IconInfoCircle className="h-4 w-4 cursor-help text-emerald-300" />
            </AppTooltip>
          </div>

          <div className="flex">
            <Button
              className={queueButtonClass("ranked")}
              onClick={() => setQueue("ranked")}
            >
              {t("RANKED")}
            </Button>

            <Button
              className={queueButtonClass("casual")}
              onClick={() => setQueue("casual")}
            >
              {t("CASUAL")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{t("LANE_LABEL")}</span>

            <AppTooltip text={t("LANE_TOOLTIP")}>
              <IconInfoCircle className="h-4 w-4 cursor-help text-emerald-300" />
            </AppTooltip>
          </div>

          <div className="flex gap-2">
            {LANES_CONFIG.map(({ id, label, Icon }) => (
              <AppTooltip key={id} text={label} side="bottom">
                <IconButton
                  className={laneButtonClass(id as LaneType)}
                  onClick={() => setLane(id as LaneType)}
                  aria-label={label}
                >
                  <Icon className="h-8 w-8 text-emerald-200" />
                </IconButton>
              </AppTooltip>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="text-lg"
            onClick={handleCreateChallenger}
            disabled={loading}
          >
            {loading ? t("STARTING_BUTTON") : t("START_BUTTON")}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
