"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

import ChampionGridCard from "../ChampionGridCard";
import Button from "@/src/components/Button";
import { JUNGLE_CHAMPIONS_DATA } from "@/src/const/jungleChampions";
import AppTextInput from "@/src/components/AppTextInput";

type Filter = "all" | "completed" | "incompleted";

export interface IChallengerChampionsGridProps {}

export default function ChallengerChampionsGrid(
  props: IChallengerChampionsGridProps,
) {
  const [filter, setFilter] = useState<Filter>("all");

  const champions = JUNGLE_CHAMPIONS_DATA;

  return (
    <div className="rounded-lg border border-emerald-600 bg-emerald-900 p-3 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <AppTextInput
          id="champion-search"
          spellCheck="false"
          placeholder="Buscar campeão..."
          leftSection={<IconSearch size={18} />}
        />

        <div className="flex items-center gap-2">
          <Button
            className={filter === "all" ? "bg-emerald-600" : "bg-emerald-800"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>

          <Button
            className={
              filter === "completed" ? "bg-emerald-600" : "bg-emerald-800"
            }
            onClick={() => setFilter("completed")}
          >
            Concluídos
          </Button>

          <Button
            className={
              filter === "incompleted" ? "bg-emerald-600" : "bg-emerald-800"
            }
            onClick={() => setFilter("incompleted")}
          >
            Incompletos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
        {champions.map((champion) => (
          <ChampionGridCard key={champion.name} {...champion} />
        ))}
      </div>
    </div>
  );
}
