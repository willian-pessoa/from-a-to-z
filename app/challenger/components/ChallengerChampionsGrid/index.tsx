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
import { useTranslations } from "next-intl";

type Filter = "all" | "completed" | "incompleted";
type GridSize = "sm" | "md" | "lg" | "xl";

export interface IChallengerChampionsGridProps {
  championsData: ChampionData[];
  challengerData: ChallengerData;
}

const GRID_SIZES = {
  sm: {
    label: "Pequeno",
    className: "grid-cols-[repeat(auto-fill,minmax(80px,1fr))]",
    cardWidth: 80,
  },
  md: {
    label: "Médio",
    className: "grid-cols-[repeat(auto-fill,minmax(95px,1fr))]",
    cardWidth: 95,
  },
  lg: {
    label: "Grande",
    className:
      "grid-cols-[repeat(auto-fill,minmax(90px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))]",
    cardWidth: 120,
  },
  xl: {
    label: "Extra Grande",
    className: "grid-cols-[repeat(auto-fill,minmax(145px,1fr))]",
    cardWidth: 145,
  },
};

export default function ChallengerChampionsGrid({
  championsData,
  challengerData,
}: IChallengerChampionsGridProps) {
  const t = useTranslations("CHALLENGER.CHALLENGE_PAGE");

  const [filter, setFilter] = useState<Filter>("all");
  const [gridSize, setGridSize] = useState<GridSize>("md");
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

  const GRID_SIZES_ITEMS = useMemo(() => {
    return [
      { value: "sm", label: t("GRID_SMALL") },
      { value: "md", label: t("GRID_MEDIUM") },
      { value: "lg", label: t("GRID_LARGE") },
      { value: "xl", label: t("GRID_EXTRA_LARGE") },
    ] satisfies { value: GridSize; label: string }[];
  }, [t]);

  const FILTER_ITEMS = useMemo(() => {
    return [
      { value: "all", label: t("FILTER_ALL") },
      { value: "completed", label: t("FILTER_COMPLETED") },
      { value: "incompleted", label: t("FILTER_INCOMPLETED") },
    ] satisfies { value: Filter; label: string }[];
  }, [t]);

  return (
    <div className="rounded-lg border border-emerald-600 bg-emerald-900 p-3 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <AppTextInput
          id="champion-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          spellCheck="false"
          placeholder={t("SEARCH_CHAMPION_PLACEHOLDER")}
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
          {FILTER_ITEMS.map((item) => {
            return (
              <Button
                key={item.value}
                className={
                  filter === item.value ? "bg-emerald-600" : "bg-emerald-800"
                }
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </Button>
            );
          })}

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
          {t("NO_CHAMPION_FOUND")}
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
