"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

import ChampionGridCard from "../ChampionGridCard";
import Button from "@/src/components/Button";

import AppTextInput from "@/src/components/AppTextInput";
import { ChallengerData, ChampionData } from "@/src/types";
import { useAuth } from "@/src/contexts/AuthContext";

type Filter = "all" | "completed" | "incompleted";

export interface IChallengerChampionsGridProps {
  championsData: ChampionData[];
  challengerData: ChallengerData;
}

export default function ChallengerChampionsGrid({
  championsData,
  challengerData,
}: IChallengerChampionsGridProps) {
  const [filter, setFilter] = useState<Filter>("all");

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
        {championsData.map((champion) => (
          <ChampionGridCard
            key={champion.name}
            challengerId={challengerData.id}
            userChallengerPuuid={challengerData.usuario_puuid}
            {...champion}
          />
        ))}
      </div>
    </div>
  );
}
