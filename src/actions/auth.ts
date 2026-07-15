"use server";

import { createClient } from "@supabase/supabase-js";
import { RiotPlatformRegion } from "../types";
import { getRoutingRegion } from "../utils/getRountingRegion";
import {
  getRandomVerificationIcon,
  SummonerIcon,
} from "./utils/getRandomVerificationIcon";

interface LinkPlayerResult {
  success: boolean;
  error?: string;
  reset?: boolean;
  user?: {
    puuid: string;
    riot_id: string;
    region: RiotPlatformRegion;
    avatar_url: string | null;
    challengerId: string | null;
  };
}

interface FindPlayerResult {
  success: boolean;
  error?: string;
  verification?: {
    puuid: string;
    riot_id: string;
    icon: SummonerIcon;
  };
}

export async function findRiotAccount(
  riotIdInput: string,
  region: RiotPlatformRegion,
): Promise<FindPlayerResult> {
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
    const routingRegion = getRoutingRegion(region).toLowerCase();
    const baseRiotURL = `https://${routingRegion}.api.riotgames.com`;

    // Transforma o Nome#Tag em PUUID usando a API de Account da Riot
    const riotUrl = `${baseRiotURL}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${process.env.RIOT_API_KEY}`;

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

    const randomVerificationIcon = getRandomVerificationIcon();
    const challengeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Salva (ou atualiza) os dados obtidos diretamente na tabela 'usuarios'
    const { data: user, error: dbError } = await supabase
      .from("usuarios")
      .upsert(
        {
          puuid: officialPuuid,
          riot_id: fullRiotId,
          region: region,
          avatar_url: null,
          login_challenge_icon: randomVerificationIcon.id,
          login_challenge_expires_at: challengeExpiresAt,
        },
        { onConflict: "puuid" },
      )
      .select()
      .single();

    if (dbError) return { success: false, error: dbError.message };

    return {
      success: true,
      verification: {
        puuid: officialPuuid,
        riot_id: fullRiotId,
        icon: randomVerificationIcon,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: "Internal server error while connecting to Riot Services.",
    };
  }
}

export async function linkPlayer(
  userPuuid: string,
  region: RiotPlatformRegion,
): Promise<LinkPlayerResult> {
  // Inicializa o Supabase usando a Service Role (chave mestra) para permitir o insert sem travar no RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  try {
    // Busca usuario no banco
    const { data: existingUser, error: userError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("puuid", userPuuid)
      .maybeSingle();

    // VALIDAÇÔES
    if (userError) {
      return {
        success: false,
        error: userError.message,
      };
    }

    if (!existingUser) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    if (
      !existingUser.login_challenge_icon ||
      !existingUser.login_challenge_expires_at
    ) {
      return {
        success: false,
        error: "No verification challenge is active.",
      };
    }

    if (
      new Date(existingUser.login_challenge_expires_at).getTime() < Date.now()
    ) {
      return {
        success: false,
        reset: true,
        error: "The verification challenge has expired. Please start again.",
      };
    }

    // BUSCAR ICONE DO USUARIO NA RIOT API
    const routingServer = region.toLowerCase();
    const baseRiotURL = `https://${routingServer}.api.riotgames.com`;

    const summonerUrl =
      `${baseRiotURL}/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(userPuuid)}` +
      `?api_key=${process.env.RIOT_API_KEY}`;

    const summonerResponse = await fetch(summonerUrl);

    if (!summonerResponse.ok) {
      return {
        success: false,
        error: "Unable to verify the current profile icon.",
      };
    }

    const summonerData = await summonerResponse.json();

    if (+summonerData.profileIconId !== +existingUser.login_challenge_icon) {
      return {
        success: false,
        error:
          "The selected profile icon does not match the requested verification icon, if you has changed waiting a few seconds and try again.",
      };
    }

    // Se existe, verifica se já tem challenger ativo
    let challengerId: string | null = null;

    if (existingUser) {
      const { data: activeChallenge, error: challengeError } = await supabase
        .from("desafios")
        .select("id")
        .eq("usuario_puuid", userPuuid)
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
      .from("usuarios")
      .update({
        login_challenge_icon: null,
        login_challenge_expires_at: null,
      })
      .eq("puuid", userPuuid)
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
