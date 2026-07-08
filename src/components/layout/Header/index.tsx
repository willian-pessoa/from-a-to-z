"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IconMenu2,
  IconLogout,
  IconWorld,
  IconLogin,
} from "@tabler/icons-react";

import IconButton from "../../IconButton";
import AppDropdownMenu from "../../AppDropdownMenu";
import { AppTooltip } from "../../AppTooltip";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const isLoged = true;

  const pathname = usePathname();

  const titleMap: Record<string, string> = {
    "/challenger": "Desafio",
    "/leaderboard": "Ranking",
  };

  const title = titleMap[pathname] ?? "";

  const player = "AURA Galactus";

  return (
    <header className="border-b border-emerald-700 flex justify-between">
      <div className="flex p-2 items-center gap-3">
        <AppDropdownMenu
          trigger={
            <IconButton>
              <IconMenu2 stroke={2} />
            </IconButton>
          }
          items={[
            {
              label: "Ranking",
              children: <Link href="/leaderboard">Ranking</Link>,
            },
            {
              label: "Desafio",
              children: <Link href="/challenger">Desafio</Link>,
            },
          ]}
        />
        <span className="text-xl font-bold">{title}</span>
      </div>
      <div className="flex p-2 items-center gap-2">
        <span className="">{player}</span>
        <AppTooltip text="Entrar">
          <IconButton>
            {isLoged ? <IconLogout stroke={2} /> : <IconLogin stroke={2} />}
          </IconButton>
        </AppTooltip>
        <AppTooltip text="Linguagem">
          <IconButton>
            <IconWorld stroke={2} />
          </IconButton>
        </AppTooltip>
      </div>
    </header>
  );
}
