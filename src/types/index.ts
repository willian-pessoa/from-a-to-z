export type QueueType = "ranked" | "casual";
export type LaneType = "top" | "jungle" | "mid" | "bot" | "support";

export interface ChampionData {
  name: string;
  loses: number;
  funNote: number;
  commentary: string;
  completed: boolean;
}
