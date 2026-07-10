export function getChampionSplashURL(championId: string, skin = 0) {
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skin}.jpg`;
}
