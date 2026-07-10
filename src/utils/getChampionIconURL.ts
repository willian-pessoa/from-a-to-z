const DDRAGON_VERSION = "16.13.1";

export function getChampionIconURL(championId: string) {
  return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${championId}.png`;
}
