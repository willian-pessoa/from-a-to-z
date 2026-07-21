import { BOT_CHAMPIONS_DATA } from "@/src/const/botChampions";
import { JUNGLE_CHAMPIONS_DATA } from "@/src/const/jungleChampions";
import { MID_CHAMPIONS_DATA } from "@/src/const/midChampions";
import { SUPPORT_CHAMPIONS_DATA } from "@/src/const/supportChampion";
import { TOP_CHAMPIONS_DATA } from "@/src/const/topChampions";
import { LaneType, ChampionData } from "@/src/types";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL  e SUPABASE_SERVICE_ROLE_KEY precisam estar definidas.",
  );
}

const DEFAULT_COMMENTARY =
  "Eu achei esse campeao de uma forma ou de outra, um campeao que de fato foi criado para ser campeão";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const PLAYERS_AMOUNT = 200;

const MAP_LANE_CHAMPIONS: Record<LaneType, ChampionData[]> = {
  JUNGLE: JUNGLE_CHAMPIONS_DATA,
  TOP: TOP_CHAMPIONS_DATA,
  MID: MID_CHAMPIONS_DATA,
  BOT: BOT_CHAMPIONS_DATA,
  SUPPORT: SUPPORT_CHAMPIONS_DATA,
};

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBoolean(chance = 0.5) {
  return Math.random() < chance;
}

function randomLane() {
  const lanes: LaneType[] = ["BOT", "JUNGLE", "MID", "SUPPORT", "TOP"];

  return lanes[random(0, 4)];
}

function generatePlayerSkill() {
  const roll = random(1, 100);

  if (roll <= 10) {
    return random(95, 100); // jogadores absurdos
  }

  if (roll <= 40) {
    return random(80, 94); // bons jogadores
  }

  return random(60, 79); // maioria
}

async function main() {
  console.log("Limpando dados antigos...");

  await supabase.from("usuarios").delete().like("riot_id", "%#DEV");

  console.log("🌱 Criando dados de desenvolvimento...");

  for (let i = 1; i <= PLAYERS_AMOUNT; i++) {
    const puuid = randomUUID();
    const playerSkill = generatePlayerSkill();

    console.log(`Criando Player ${i} com skill de ${playerSkill}%`);

    const { error: userError } = await supabase.from("usuarios").insert({
      puuid,
      riot_id: `Player ${i}#DEV`,
      region: "BR1",
      avatar_url: null,
    });

    if (userError) {
      throw userError;
    }

    const challengeLane = randomLane();
    const allowedChampions = MAP_LANE_CHAMPIONS[challengeLane];

    const startedAt = new Date(Date.now() - random(10, 100) * 86400000);

    const { data: challenge, error: challengeError } = await supabase
      .from("desafios")
      .insert({
        usuario_puuid: puuid,
        lane: challengeLane,
        queue: "RANKED",
        is_finished: false,
        current_champ: allowedChampions[0].nameId,
        season: 2026,
        started_at: startedAt,
      })
      .select()
      .single();

    if (challengeError) {
      throw challengeError;
    }

    let totalTimeSpend = 0;
    let isFinished = true;
    let current_champ: string | null = null;

    const recordsToInsert = allowedChampions.map((champ) => {
      const has_victory = randomBoolean(playerSkill / 100);
      const time_spend = random(200, 8000 - playerSkill * 30);
      const loses = random(0, Math.floor((110 - playerSkill) / 10));
      const fun_note = randomBoolean(0.1) ? random(1, 5) : null;
      const comentary = randomBoolean(0.1) ? DEFAULT_COMMENTARY : null;

      totalTimeSpend += time_spend;

      if (!has_victory) {
        isFinished = false;

        if (!current_champ) {
          current_champ = champ.nameId;
        }
      }

      return {
        desafio_id: challenge.id,
        campeao_id: champ.nameId,
        nome_campeao: champ.name,
        has_victory,
        loses,
        time_spend,
        fun_note,
        comentary,
      };
    });

    const { error: progressError } = await supabase
      .from("progresso_campeoes")
      .insert(recordsToInsert);

    if (progressError) {
      await supabase.from("desafios").delete().eq("id", challenge.id);

      throw progressError;
    }

    const finishedAt = new Date(startedAt.getTime() + random(1, 10) * 86400000);

    const { error: challengeUpdateError } = await supabase
      .from("desafios")
      .update({
        is_finished: isFinished,
        finished_at: isFinished ? finishedAt : null,
        current_champ: isFinished ? null : current_champ,
        time_spend: totalTimeSpend,
      })
      .eq("id", challenge.id);

    if (challengeUpdateError) {
      throw challengeUpdateError;
    }

    console.log(`Player ${i} criado com sucesso !`);
  }

  console.log("✅ Seed concluído!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
