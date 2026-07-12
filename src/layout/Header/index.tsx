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

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const { user, logout } = useAuth(); // 👈 Puxa as infos do contexto em memória
  const isLoged = !!user;

  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/challenger": "Desafio",
    "/leaderboard": "Ranking",
  };

  const title = titleMap[pathname] ?? "";

  const playerDisplay = user ? user.riot_id.split("#")[0] : "";

  const DROPDOW_ITEMS = useMemo(() => {
    const challengerURL = user?.challengerId
      ? `/challenger/${user.challengerId}`
      : "/challenger";

    return [
      {
        label: "Ranking",
        children: <Link href="/leaderboard">Ranking</Link>,
      },
      {
        label: "Desafio",
        children: <Link href={challengerURL}>Desafio</Link>,
      },
    ];
  }, []);

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
        <span className="">{playerDisplay}</span>
        {isLoged && (
          <AppTooltip text="Sair">
            <IconButton onClick={logout}>
              <IconLogout stroke={2} />
            </IconButton>
          </AppTooltip>
        )}
        <AppTooltip text="Linguagem">
          <IconButton>
            <IconWorld stroke={2} />
          </IconButton>
        </AppTooltip>
      </div>
    </header>
  );
}
