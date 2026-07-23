"use server";

import { createSupabase } from "../services/supabase";
import { revalidatePath } from "next/cache";
import { ChallengerData, ChampionProgress, RiotPlatformRegion } from "../types";
import { getRoutingRegion } from "../utils/getRountingRegion";
import { championBelongsToLane } from "../const/utils/championBelongsToLane";
import { CHAMPION_KEY_TO_ID } from "../const/mapKeyChampionToNameId";

import {
  QUEUE_MAP,
  LANE_MAP,
  MAX_MATCHES_PER_SYNC,
} from "./const/syncRiotMatches";

export async function syncRiotMatches(
  challengeData: ChallengerData,
  championsProgress: ChampionProgress[],
  region: RiotPlatformRegion,
) {
  const supabase = createSupabase();

  const riotApiKey = process.env.RIOT_API_KEY;

  if (!riotApiKey) {
    return {
      success: false,
      error: "Chave de API da Riot não configurada no servidor.",
    };
  }

  try {
    const { updated_at, usuario_puuid, id, queue, lane } = challengeData;
    // Transformamos a data do último update em Timestamp Unix (segundos) porque a Riot pede esse padrão no filtro
    const startTimeUnix = Math.floor(new Date(updated_at).getTime() / 1000);
    const queueParam = QUEUE_MAP[queue];

    const routingRegion = getRoutingRegion(region).toLowerCase();
    const baseRiotURL = `https://${routingRegion}.api.riotgames.com`;

    let matchIds: string[] = [];

    // Buscar a lista de IDs das últimas partidas do jogador na Riot na ordem antiga para recente
    let startIndex = 0;

    while (true) {
      const matchIdsUrl = `${baseRiotURL}/lol/match/v5/matches/by-puuid/${usuario_puuid}/ids?startTime=${startTimeUnix}&count=${MAX_MATCHES_PER_SYNC}&queue=${queueParam}&start=${startIndex}`;

      const matchIdsResponse = await fetch(matchIdsUrl, {
        headers: { "X-Riot-Token": riotApiKey },
      });

      if (!matchIdsResponse.ok) {
        return {
          success: false,
          error: "Falha ao buscar histórico de partidas na Riot.",
        };
      }

      const currentMatchIds: string[] = await matchIdsResponse.json();

      if (currentMatchIds.length === 0) {
        break;
      }

      matchIds = currentMatchIds.reverse();

      if (currentMatchIds.length < MAX_MATCHES_PER_SYNC) {
        break;
      }

      startIndex += MAX_MATCHES_PER_SYNC;
    }

    // Se não jogou nenhuma partida desde a última atualização, reseta o time
    if (matchIds.length === 0) {
      await supabase
        .from("desafios")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", id);

      revalidatePath(`/challenger/${id}`);
      return { success: true };
    }

    // mapa para acumular o progresso dessa sincronização
    const new_champions_progress: Record<
      string,
      Partial<ChampionProgress>
    > = {};

    let newestMatchTimestamp: number | null = null;

    // Fazemos um loop sequencial simples para respeitar os limites de requisição por segundo (Rate Limit)
    for (const matchId of matchIds) {
      const matchDetailUrl = `${baseRiotURL}/lol/match/v5/matches/${matchId}`;
      const detailResponse = await fetch(matchDetailUrl, {
        headers: { "X-Riot-Token": riotApiKey },
      });

      if (!detailResponse.ok) continue; // Se falhar uma partida específica, pula pro próximo pra não quebrar a fila

      const matchData = await detailResponse.json();
      const info = matchData.info;

      // controle do ultimo jogo processado
      const matchEndTimestamp = info.gameEndTimestamp + 1000 * 60; // avança 1 segundo para evitar reprocessar
      if (!newestMatchTimestamp || matchEndTimestamp > newestMatchTimestamp) {
        newestMatchTimestamp = matchEndTimestamp;
      }

      // Verifica se a partida foi devidamente finalizada
      if (info.endOfGameResult !== "GameComplete" || info.gameDuration < 300)
        continue;

      // Filtro A: Verificar se a fila (Queue) é a correta (Ranked ou Casual)
      if (+info.queueId !== +queueParam) {
        continue; // Fila errada, ignora
      }

      // Encontrar o usuário dentro da lista de 10 participantes da partida
      const participant = info.participants.find(
        (p: any) => p.puuid === usuario_puuid,
      );

      if (!participant) continue;

      const championToCheck =
        CHAMPION_KEY_TO_ID[String(participant.championId)]; // key do campeao no mapeamento do data dragon

      // verifica se o campeoa ja foi computado anteriormente na lista de match atual
      if (
        new_champions_progress[championToCheck] &&
        new_champions_progress[championToCheck].has_victory
      )
        continue;

      // Filtro B: Verificar se o CAMPEÃO já foi usado no desafio
      const championsDone = championsProgress
        .filter((champion) => champion.has_victory)
        .map((champion) => champion.campeao_id);

      if (championsDone.includes(championToCheck)) {
        continue; // boneco ja concluido
      }

      if (!championBelongsToLane(lane, championToCheck)) {
        continue; // boneco não pertece ao desafio
      }

      // Filtro C: Verificar se ele jogou na LANE certa escolhida no desafio
      const expectedLane = LANE_MAP[lane];
      const actualLane =
        participant.teamPosition || participant.individualPosition;

      if (actualLane !== expectedLane) {
        continue; // Jogou na rota errada, não conta pro progresso!
      }

      // Inicia o campeoa no mapa referente ao loop
      if (!new_champions_progress[championToCheck]) {
        new_champions_progress[championToCheck] = {
          loses: 0,
          time_spend: 0,
          has_victory: false,
        };
      }

      const currentAccumulator = new_champions_progress[championToCheck];

      // Se passou por TODOS os filtros acima, a partida é válida e computada!
      // Computa os dados acumulados da partida atual
      if (participant.win) {
        currentAccumulator.has_victory = true;
        currentAccumulator.time_spend =
          (currentAccumulator.time_spend ?? 0) + +participant.timePlayed;
      } else {
        currentAccumulator.loses = (currentAccumulator.loses ?? 0) + 1;
        currentAccumulator.time_spend =
          (currentAccumulator.time_spend ?? 0) + +participant.timePlayed;
      }
    }

    // NOVOS PROGRESSOS
    const updatedChampionIds = Object.keys(new_champions_progress);

    // acumular o tempo para atualizar tempo de progresso no desafio
    let challengeTimeToAdd = 0;

    // Se encontramos partidas válidas para atualizar o banco
    if (updatedChampionIds.length > 0) {
      // Atualizar cada campeão modificado na tabela "progresso_campeoes"
      for (const champId of updatedChampionIds) {
        const dbChampion = championsProgress.find(
          (c) => c.campeao_id === champId,
        );
        const currentData = new_champions_progress[champId];

        const addedTime = currentData.time_spend || 0;

        challengeTimeToAdd += addedTime;

        // Soma o histórico antigo com o que acabou de ser calculado nas partidas novas
        const finalLoses = (dbChampion?.loses || 0) + (currentData.loses || 0);
        const finalTimeSpend = (dbChampion?.time_spend || 0) + addedTime;
        const finalHasVictory = currentData.has_victory || false;

        await supabase
          .from("progresso_campeoes")
          .update({
            has_victory: finalHasVictory,
            loses: finalLoses,
            time_spend: finalTimeSpend,
            updated_at: new Date().toISOString(),
          })
          .eq("desafio_id", id)
          .eq("campeao_id", champId);
      }
    }

    // Avançamos o marcador até a partida mais recente entre as antiga processada.
    // Caso contrário atualizamos o marcador para o momento atual.
    const databaseUpdatedTime =
      startIndex > 0 && newestMatchTimestamp
        ? new Date(newestMatchTimestamp).toISOString()
        : new Date().toISOString();

    // Tempo gasto no desafio
    const challengeTotalTime =
      (challengeData.time_spend || 0) + challengeTimeToAdd;

    // Atualizar o estado global do desafio (current_champ e o cooldown updated_at)
    // Buscamos a lista atualizada de quem ainda não tem vitória para definir quem será o próximo na ordem alfabética
    const { data: remainingChamps } = await supabase
      .from("progresso_campeoes")
      .select("campeao_id, nome_campeao")
      .eq("desafio_id", id)
      .eq("has_victory", false)
      .order("nome_campeao", { ascending: true });

    let isFinished = false;

    if (remainingChamps && remainingChamps.length > 0) {
      // Atualiza o desafio com o próximo campeão alfabético restante e renova o timer
      await supabase
        .from("desafios")
        .update({
          current_champ: remainingChamps[0].campeao_id,
          updated_at: databaseUpdatedTime,
          time_spend: challengeTotalTime,
        })
        .eq("id", id);
    } else {
      // Se a lista retornou vazia, todos os 62 campeões foram concluídos!
      await supabase
        .from("desafios")
        .update({
          current_champ: null,
          is_finished: true,
          finished_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          time_spend: challengeTotalTime,
        })
        .eq("id", id);

      isFinished = true;
    }

    // Explodir o cache estático do Next para a tela renderizar o novo estado instantaneamente
    revalidatePath(`/challenger/${id}`);

    return { success: true, isFinished };
  } catch (error) {
    console.error("Erro na sincronização da Riot:", error);
    return { success: false, error: "Erro interno ao processar partidas." };
  }
}
