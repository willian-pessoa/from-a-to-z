"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IconMenu2,
  IconLogout,
  IconWorld,
  IconLogin,
} from "@tabler/icons-react";

import IconButton from "../../components/IconButton";
import AppDropdownMenu from "../../components/AppDropdownMenu";

import { AppTooltip } from "../../components/AppTooltip";

import { useAuth } from "@/src/contexts/AuthContext";
import { useMemo } from "react";
import { useHeader } from "@/src/contexts/HeaderContext";
import LanguageMenu from "../LanguageMenu";
import { useTranslations } from "next-intl";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const t = useTranslations("COMMON");

  const { user, logout } = useAuth();
  const { title } = useHeader();

  const isLoged = !!user;

  const playerDisplay = user ? user.riot_id.split("#")[0] : "";

  const DROPDOW_ITEMS = useMemo(() => {
    const challengerURL = user?.challengerId
      ? `/challenger/${user.challengerId}`
      : "/challenger";

    const menuItems = [
      {
        label: t("RANKING"),
        children: <Link href="/leaderboard">{t("RANKING")}</Link>,
      },
      {
        label: t("CHALLENGE"),
        children: <Link href={challengerURL}>{t("CHALLENGE")}</Link>,
      },
    ];

    if (isLoged) {
      menuItems.push({
        label: t("HISTORY"),
        children: <Link href="/history">{t("HISTORY")}</Link>,
      });
    }

    return menuItems;
  }, [user?.challengerId, t]);

  return (
    <header className="border-b border-emerald-700 flex justify-between">
      <div className="flex p-2 items-center gap-3">
        <AppDropdownMenu
          trigger={
            <IconButton>
              <IconMenu2 stroke={2} />
            </IconButton>
          }
          items={DROPDOW_ITEMS}
        />
        <span className="text-xl font-bold">{title}</span>
      </div>
      <div className="flex p-2 items-center gap-2">
        {playerDisplay && (
          <span className="hidden sm:inline border border-emerald-700 rounded-lg px-4 py-2">
            {playerDisplay}
          </span>
        )}
        {isLoged && (
          <AppTooltip text={t("LOGOUT")}>
            <IconButton onClick={logout}>
              <IconLogout stroke={2} />
            </IconButton>
          </AppTooltip>
        )}
        <LanguageMenu />
      </div>
    </header>
  );
}
