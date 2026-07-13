export type QueueType = "ranked" | "casual";
export type LaneType = "TOP" | "JUNGLE" | "MID" | "BOT" | "SUPPORT";

export type RiotPlatformRegion =
  | "NA1"
  | "BR1"
  | "LA2" // LAN
  | "LA1" // LAS
  | "KR"
  | "JP1"
  | "EUN1"
  | "EUW1"
  | "ME1"
  | "TR1"
  | "RU"
  | "OC1"
  | "SG2"
  | "TW2"
  | "TH2"
  | "VN2"
  | "PH2";

export type RiotRegionRouting = "AMERICAS" | "ASIA" | "EUROPE" | "SEA";

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

export interface ChallengerData {
  id: number;
  lane: LaneType;
  queue: string;
  current_champ: string | null;
  updated_at: string;
  usuario_puuid: string;
}

export interface ChampionProgress {
  campeao_id: string;
  nome_campeao: string;
  has_victory: boolean;
  loses: number;
  comentary: string | null;
  fun_note: number | null;
  time_spend: number | null;
}

export interface ChallengeData {
  challengerData: ChallengerData;
  progress: ChampionProgress[];
}
