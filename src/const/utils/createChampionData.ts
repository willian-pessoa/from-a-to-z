import { Champion, ChampionData } from "@/src/types";

export function createChampionData(champions: Champion[]): ChampionData[] {
  return champions.map((champion) => ({
    ...champion,
    loses: 0,
    funNote: 0,
    commentary: "",
    completed: false,
  }));
}
