"use client";

import { useMemo, useState } from "react";
import { IconSearch, IconLayoutGrid } from "@tabler/icons-react";

import ChampionGridCard from "../ChampionGridCard";
import Button from "@/src/components/Button";

import AppTextInput from "@/src/components/AppTextInput";
import { ChallengerData, ChampionData } from "@/src/types";
import IconButton from "@/src/components/IconButton";
import AppDropdownRadio from "@/src/components/AppDropdownRadio";
import clsx from "clsx";

type Filter = "all" | "completed" | "incompleted";
type GridSize = "sm" | "md" | "lg" | "xl";

export interface IChallengerChampionsGridProps {
  championsData: ChampionData[];
  challengerData: ChallengerData;
}

const GRID_SIZES_ITEMS: { value: GridSize; label: string }[] = [
  { value: "sm", label: "Pequeno" },
  { value: "md", label: "Médio" },
  { value: "lg", label: "Grande" },
  { value: "xl", label: "Extra Grande" },
];

const GRID_SIZES = {
  sm: {
    label: "Pequeno",
    className: "grid-cols-[repeat(auto-fill,minmax(90px,1fr))]",
    cardWidth: 80,
  },
  md: {
    label: "Médio",
    className: "grid-cols-[repeat(auto-fill,minmax(105px,1fr))]",
    cardWidth: 100,
  },
  lg: {
    label: "Grande",
    className:
      "grid-cols-[repeat(auto-fill,minmax(90px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))]",
    cardWidth: 120,
  },
  xl: {
    label: "Extra Grande",
    className: "grid-cols-[repeat(auto-fill,minmax(150px,1fr))]",
    cardWidth: 145,
  },
};

const FILTER_ITEMS = [
  { value: "all", label: "Todos" },
  { value: "completed", label: "Concluídos" },
  { value: "incompleted", label: "Incompletos" },
] satisfies { value: Filter; label: string }[];

export default function ChallengerChampionsGrid({
  championsData,
  challengerData,
}: IChallengerChampionsGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [gridSize, setGridSize] = useState<GridSize>("lg");
  const [search, setSearch] = useState("");

  const filteredChampions = useMemo(() => {
    return championsData.filter((champion) => {
      const matchesSearch = champion.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && champion.completed) ||
        (filter === "incompleted" && !champion.completed);

      return matchesSearch && matchesFilter;
    });
  }, [championsData, filter, search]);

  return (
    <div className="rounded-lg border border-emerald-600 bg-emerald-900 p-3 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <AppTextInput
          id="champion-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          spellCheck="false"
          placeholder="Buscar campeão..."
          leftSection={<IconSearch size={18} />}
          className="w-50 sm:w-auto"
        />

        {/* Mobile */}
        <div className="flex sm:hidden gap-2">
          <AppDropdownRadio
            trigger={
              <Button className="flex-1">
                {FILTER_ITEMS.find((item) => item.value === filter)?.label}
              </Button>
            }
            value={filter}
            onValueChange={(value) => setFilter(value as Filter)}
            items={FILTER_ITEMS}
          />
        </div>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-2">
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

          <AppDropdownRadio
            trigger={
              <IconButton>
                <IconLayoutGrid />
              </IconButton>
            }
            value={gridSize}
            onValueChange={setGridSize}
            items={GRID_SIZES_ITEMS}
          />
        </div>
      </div>

      {filteredChampions.length === 0 && (
        <div className="flex items-center justify-center pt-4 pb-8">
          Nenhum Campeão Encontrado
        </div>
      )}
      <div className={clsx("grid gap-3", GRID_SIZES[gridSize].className)}>
        {filteredChampions.map((champion) => (
          <ChampionGridCard
            key={champion.name}
            challengerId={challengerData.id}
            userChallengerPuuid={challengerData.usuario_puuid}
            cardSize={GRID_SIZES[gridSize].cardWidth}
            {...champion}
          />
        ))}
      </div>
    </div>
  );
}
