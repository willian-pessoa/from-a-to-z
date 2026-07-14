import { TOP_CHAMPIONS_DATA } from "../topChampions";
import { JUNGLE_CHAMPIONS_DATA } from "../jungleChampions";
import { MID_CHAMPIONS_DATA } from "../midChampions";
import { BOT_CHAMPIONS_DATA } from "../botChampions";
import { SUPPORT_CHAMPIONS_DATA } from "../supportChampion";
import { LaneType } from "@/src/types";

const CHAMPIONS_BY_LANE: Record<LaneType, typeof TOP_CHAMPIONS_DATA> = {
  TOP: TOP_CHAMPIONS_DATA,
  JUNGLE: JUNGLE_CHAMPIONS_DATA,
  MID: MID_CHAMPIONS_DATA,
  BOT: BOT_CHAMPIONS_DATA,
  SUPPORT: SUPPORT_CHAMPIONS_DATA,
};

export function championBelongsToLane(
  lane: LaneType,
  championId: string,
): boolean {
  return CHAMPIONS_BY_LANE[lane].some(
    (champion) => champion.nameId === championId,
  );
}
