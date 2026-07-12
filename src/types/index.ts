export type QueueType = "ranked" | "casual";
export type LaneType = "top" | "jungle" | "mid" | "bot" | "support";

export interface Champion {
  id: string;
  nameId: string;
  name: string;
}

export interface ChampionData extends Champion {
  loses: number;
  funNote: number;
  commentary: string;
  completed: boolean;
}
