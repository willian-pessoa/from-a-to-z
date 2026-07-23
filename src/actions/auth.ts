"use server";

import { randomUUID } from "crypto";
import { cookies } from "next/headers";

import { createClient } from "@supabase/supabase-js";
import { RiotPlatformRegion } from "../types";
import { getRoutingRegion } from "../utils/getRountingRegion";
import {
  getRandomVerificationIcon,
  SummonerIcon,
} from "./utils/getRandomVerificationIcon";
import { createSupabase } from "../services/supabase";

interface LinkPlayerResult {
  success: boolean;
  error?: string;
  reset?: boolean;
  showWaitingTimer?: boolean;
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
      error: "Riot ID deve incluir a hashtag (exemplo: AURA Galactus#BR1)",
    };
  }

  const [gameName, tagLine] = riotIdInput.split("#");

  // Inicializa o Supabase usando a Service Role (chave mestra) para permitir o insert sem travar no RLS
  const supabase = createSupabase();

  try {
    const routingRegion = getRoutingRegion(region).toLowerCase();
    const baseRiotURL = `https://${routingRegion}.api.riotgames.com`;

    // Transforma o Nome#Tag em PUUID usando a API de Account da Riot
    const riotUrl = `${baseRiotURL}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${process.env.RIOT_API_KEY}`;

    const riotResponse = await fetch(riotUrl);

    if (!riotResponse.ok) {
      return {
        success: false,
        error:
          "Jogador não encontro no servidor da Riot. Verifique se digitou corretamente junto da tag.",
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
        error: "Usuário não encontrado",
      };
    }

    if (
      !existingUser.login_challenge_icon ||
      !existingUser.login_challenge_expires_at
    ) {
      return {
        success: false,
        error: "Nenhuma verificação ativa.",
      };
    }

    if (
      new Date(existingUser.login_challenge_expires_at).getTime() < Date.now()
    ) {
      return {
        success: false,
        reset: true,
        error: "A verificação expirou, clique em resetar e tente novamente.",
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
        error: "Não foi possivel verificar o icone de perfil atual.",
      };
    }

    const summonerData = await summonerResponse.json();

    if (+summonerData.profileIconId !== +existingUser.login_challenge_icon) {
      return {
        success: false,
        showWaitingTimer: true,
        error:
          "O icone atual não corresponde com o icone de verificação, se você já fez a modificação aguarde alguns segundos e tente novamente, o servidor da riot pode levar um tempo para retornar a modificação.",
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

    // INICIAR SESSAO NO BANCO
    const sessionId = randomUUID();
    const sessionExpiresAt = new Date(
      Date.now() + 6 * 30 * 24 * 60 * 60 * 1000,
    );

    const { error: sessionError } = await supabase
      .from("user_sessions")
      .insert({
        id: sessionId,
        user_puuid: userPuuid,
        expires_at: sessionExpiresAt,
      });

    if (sessionError) {
      return {
        success: false,
        error: sessionError.message,
      };
    }

    // CONFIGURAR COOKIE
    const cookieStore = await cookies();

    cookieStore.set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: sessionExpiresAt,
    });

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
