import { RiotPlatformRegion, RiotRegionRouting } from "../types";

const ROUTING_BY_REGION: Record<RiotPlatformRegion, RiotRegionRouting> = {
  NA1: "AMERICAS",
  BR1: "AMERICAS",
  LA1: "AMERICAS",
  LA2: "AMERICAS",

  KR: "ASIA",
  JP1: "ASIA",

  EUN1: "EUROPE",
  EUW1: "EUROPE",
  ME1: "EUROPE",
  TR1: "EUROPE",
  RU: "EUROPE",

  OC1: "SEA",
  SG2: "SEA",
  TW2: "SEA",
  VN2: "SEA",
  TH2: "SEA",
  PH2: "SEA",
};

export function getRoutingRegion(
  region: RiotPlatformRegion,
): RiotRegionRouting {
  return ROUTING_BY_REGION[region];
}
