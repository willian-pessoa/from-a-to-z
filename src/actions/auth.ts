"use server";

import { createClient } from "@supabase/supabase-js";
import { RiotPlatformRegion } from "../types";

interface LinkPlayerResult {
  success: boolean;
  error?: string;
  user?: {
    puuid: string;
    riot_id: string;
    region: RiotPlatformRegion;
    avatar_url: string | null;
    challengerId: string | null;
  };
}

export async function linkPlayer(
  riotIdInput: string,
  region: string,
): Promise<LinkPlayerResult> {
  // Valida se o formato digitado contém a #
  if (!riotIdInput.includes("#")) {
    return {
      success: false,
      error: "Riot ID must include a hashtag (e.g., AURA Galactus#BR1)",
    };
  }

  const [gameName, tagLine] = riotIdInput.split("#");

  // Inicializa o Supabase usando a Service Role (chave mestra) para permitir o insert sem travar no RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  try {
    // Transforma o Nome#Tag em PUUID usando a API de Account da Riot
    // O subdomínio 'americas' é a rota correta para contas do servidor BR, NA, LAN e LAS.
    const riotUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${process.env.RIOT_API_KEY}`;

    const riotResponse = await fetch(riotUrl);

    if (!riotResponse.ok) {
      return {
        success: false,
        error: "Player not found on Riot servers. Check the spelling and tag.",
      };
    }

    const riotData = await riotResponse.json(); // Retorna: { puuid, gameName, tagLine }

    const officialPuuid = riotData.puuid;
    const fullRiotId = `${riotData.gameName}#${riotData.tagLine}`;

    // Verifica se o jogador já existe
    const { data: existingUser, error: userError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("puuid", officialPuuid)
      .maybeSingle();

    if (userError) {
      return {
        success: false,
        error: userError.message,
      };
    }

    // Se existe, verifica se já tem challenger ativo
    let challengerId: string | null = null;

    if (existingUser) {
      const { data: activeChallenge, error: challengeError } = await supabase
        .from("desafios")
        .select("id")
        .eq("usuario_puuid", officialPuuid)
        .eq("is_finished", false)
        .maybeSingle();

      if (challengeError) {
        return {
          success: false,
          error: challengeError.message,
        };
      }

      if (activeChallenge) {
        challengerId = activeChallenge.id;
      }
    }

    // Salva (ou atualiza) os dados obtidos diretamente na sua tabela 'usuarios'
    const { data: user, error: dbError } = await supabase
      .from("usuarios") // Mantido o nome exato da sua tabela no Supabase
      .upsert(
        {
          puuid: officialPuuid,
          riot_id: fullRiotId,
          region: region,
          avatar_url: null,
        },
        { onConflict: "puuid" },
      )
      .select()
      .single();

    if (dbError) return { success: false, error: dbError.message };

    return {
      success: true,
      user: {
        puuid: user.puuid,
        riot_id: user.riot_id,
        region: user.region,
        avatar_url: user.avatar_url,
        challengerId,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: "Internal server error while connecting to Riot Services.",
    };
  }
}
