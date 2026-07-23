export const MAX_MATCHES_PER_SYNC = 50;

// Mapeamento simples de filas do LoL (Queue IDs oficiais da Riot)
export const QUEUE_MAP: Record<string, number> = {
  RANKED: 420, // 420 = Solo/Duo, 440 = Flex
  CASUAL: 430, // 400 = Draft Pick, 430 = Blind Pick
};

// Mapeamwento rotas na aplicacao para o padrão que a Riot usa
export const LANE_MAP: Record<string, string> = {
  TOP: "TOP",
  JUNGLE: "JUNGLE",
  MID: "MIDDLE",
  BOT: "BOTTOM",
  SUPPORT: "UTILITY",
};
