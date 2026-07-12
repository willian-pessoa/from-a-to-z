import { Champion } from "@/src/types";

export function createChampion(
  id: string,
  nameId: string,
  name: string,
): Champion {
  return {
    id,
    nameId,
    name,
  };
}
