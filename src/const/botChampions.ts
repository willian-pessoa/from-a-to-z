import { createChampion } from "./utils/createChampion";
import { createChampionData } from "./utils/createChampionData";

const BOT_CHAMPIONS = [
  createChampion("aphelios", "Aphelios", "Aphelios"),
  createChampion("ashe", "Ashe", "Ashe"),
  createChampion("caitlyn", "Caitlyn", "Caitlyn"),
  createChampion("corki", "Corki", "Corki"),
  createChampion("draven", "Draven", "Draven"),
  createChampion("ezreal", "Ezreal", "Ezreal"),
  createChampion("jhin", "Jhin", "Jhin"),
  createChampion("jinx", "Jinx", "Jinx"),
  createChampion("kaisa", "KaiSa", "Kai'Sa"),
  createChampion("kalista", "Kalista", "Kalista"),
  createChampion("kogmaw", "KogMaw", "Kog'Maw"),
  createChampion("lucian", "Lucian", "Lucian"),
  createChampion("missfortune", "MissFortune", "Miss Fortune"),
  createChampion("nilah", "Nilah", "Nilah"),
  createChampion("samira", "Samira", "Samira"),
  createChampion("senna", "Senna", "Senna"),
  createChampion("sivir", "Sivir", "Sivir"),
  createChampion("smolder", "Smolder", "Smolder"),
  createChampion("tristana", "Tristana", "Tristana"),
  createChampion("twitch", "Twitch", "Twitch"),
  createChampion("varus", "Varus", "Varus"),
  createChampion("vayne", "Vayne", "Vayne"),
  createChampion("xayah", "Xayah", "Xayah"),
  createChampion("yasuo", "Yasuo", "Yasuo"),
  createChampion("zeri", "Zeri", "Zeri"),
  createChampion("ziggs", "Ziggs", "Ziggs"),
];

export const BOT_CHAMPIONS_DATA = createChampionData(BOT_CHAMPIONS);
