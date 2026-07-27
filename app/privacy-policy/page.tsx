"use client";

import HeaderConfig from "@/src/layout/HeaderConfig";
import { useTranslations } from "next-intl";

interface PageProps {}

export default function Page({}: PageProps) {
  const t = useTranslations("PRIVACY_POLICY");

  return (
    <div className="p-2 flex flex-col gap-2">
      <HeaderConfig title={t("TITLE")} />

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("INTRO_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("INTRO_DESCRIPTION")}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("DATA_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("DATA_DESCRIPTION")}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("RIOT_API_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("RIOT_API_DESCRIPTION")}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("USAGE_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("USAGE_DESCRIPTION")}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("SECURITY_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("SECURITY_DESCRIPTION")}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("DELETE_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("DELETE_DESCRIPTION")}
        </div>
      </div>

      <div className="flex flex-col mt-4 ml-4 gap-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          {t("CONTACT_TITLE")}
        </label>

        <div className="border-l-2 border-emerald-700 text-left px-2 ml-4">
          {t("CONTACT_DESCRIPTION")}
        </div>
      </div>

      <div className="mb-24 sm:mb-8"></div>
    </div>
  );
}
