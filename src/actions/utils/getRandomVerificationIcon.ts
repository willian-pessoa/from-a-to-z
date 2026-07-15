export interface SummonerIcon {
  id: number;
  name: string;
}

export const VERIFICATION_ICONS: SummonerIcon[] = [
  { id: 0, name: "Blue Minion Bruiser Icon" },
  { id: 1, name: "Blue Minion Hammer Time Icon" },
  { id: 2, name: "Blue Cannon Minion Icon" },
  { id: 3, name: "Blue Minion Caster Icon" },
  { id: 4, name: "Blue Mountain Icon" },
  { id: 5, name: "Blue Super Minion Icon" },
  { id: 6, name: "Ole Paw Icon" },
  { id: 7, name: "Debonair Rose Icon" },
  { id: 8, name: "Ancient Golem Icon" },
  { id: 9, name: "Daggers Icon" },
  { id: 10, name: "Winged Sword Icon" },
  { id: 11, name: "Lizard Elder Icon" },
  { id: 12, name: "Fully Stacked Mejai's Icon" },
  { id: 13, name: "Red Cannon Minion Icon" },
  { id: 14, name: "Red Siege Minion Icon" },
  { id: 15, name: "Red Bruiser Minion Icon" },
  { id: 16, name: "Red Caster Minion Icon" },
  { id: 17, name: "Red Super Minion Icon" },
  { id: 18, name: "Mix Mix Icon" },
  { id: 19, name: "Targon Icon" },
  { id: 20, name: "Shurima Icon" },
  { id: 21, name: "Tree of Life Icon" },
  { id: 22, name: "Revive Icon" },
  { id: 23, name: "Lil' Sprout Icon" },
  { id: 24, name: "Spike Shield Icon" },
  { id: 25, name: "Level One Critter Icon" },
  { id: 26, name: "Level Two Critter Icon" },
  { id: 27, name: "Wraith Icon" },
  { id: 28, name: "Tibbers Icon" },
];

export function getRandomVerificationIcon(): SummonerIcon {
  const index = Math.floor(Math.random() * VERIFICATION_ICONS.length);

  return VERIFICATION_ICONS[index];
}
