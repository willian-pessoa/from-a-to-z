import { AppSelectOption } from "@/src/components/AppSelect";

export const RIOT_REGIONS: readonly AppSelectOption[] = [
  { value: "BR1", label: "Brazil" },
  { value: "LA1", label: "Latin America North" },
  { value: "LA2", label: "Latin America South" },
  { value: "NA1", label: "North America" },
  { value: "EUW1", label: "Europe West" },
  { value: "EUN1", label: "Europe Nordic & East" },
  { value: "KR", label: "Korea" },
  { value: "JP1", label: "Japan" },
  { value: "OC1", label: "Oceania" },
  { value: "TR1", label: "Turkey" },
  { value: "RU", label: "Russia" },
  { value: "PH2", label: "Philippines" },
  { value: "SG2", label: "Singapore" },
  { value: "TH2", label: "Thailand" },
  { value: "TW2", label: "Taiwan" },
  { value: "VN2", label: "Vietnam" },
] as const;
