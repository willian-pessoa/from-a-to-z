"use client";
import Image from "next/image";

import { useState } from "react";
import { findRiotAccount, linkPlayer } from "@/src/actions/auth";
import AppTextInput from "@/src/components/AppTextInput";
import Button from "@/src/components/Button";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";

import { useAuth } from "@/src/contexts/AuthContext";
import AppSelect from "@/src/components/AppSelect";
import { RIOT_REGIONS } from "./const/riotRegionsOptions";
import { RiotPlatformRegion } from "@/src/types";
import { SummonerIcon } from "@/src/actions/utils/getRandomVerificationIcon";

type LinkingState = "search" | "check";

export default function ModalLinkAccount() {
  // Estados do fluxo de autenticação e UI
  const { login } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);
  const [linkingState, setLinkingState] = useState<LinkingState>("search");
  const [iconVerification, setIconVerification] = useState<SummonerIcon | null>(
    { id: 1, name: "teste" },
  );

  // Estados dos inputs (Passo 1)
  const [riotId, setRiotId] = useState("");
  const [userPuuid, setUserPuuid] = useState("");
  const [region, setRegion] = useState("BR1");

  async function handleFindRiotAccoutn() {
    setLoading(true);
    setError("");

    const result = await findRiotAccount(riotId, region as RiotPlatformRegion);

    if (result.success && result.verification) {
      setIconVerification(result.verification.icon);
      setUserPuuid(result.verification.puuid);
      setLinkingState("check");
    } else {
      setError(result.error || "Failed to search account.");
    }

    setLoading(false);
  }

  async function handleLinkAccount() {
    setLoading(true);
    setError("");

    const result = await linkPlayer(userPuuid, region as RiotPlatformRegion);

    if (result.success && result.user) {
      login(result.user);

      setLinkingState("search");
      setIsDialogOpen(false);
    } else {
      setError(result.error || "Failed to verify account.");
      if (result.reset) {
        setReset(true);
      }
    }
    setLoading(false);
  }

  const handleReset = () => {
    setLinkingState("search");
    setIconVerification(null);
    setUserPuuid("");
    setReset(false);
    setError("");
  };

  return (
    <AppDialog
      trigger={<Button className="text-lg py-2 px-4">Vincular Conta</Button>}
      title="Verificar Riot ID"
      open={isDialogOpen}
      onOpenChange={(open) => setIsDialogOpen(open)}
      closeOnOutsideClick={false}
    >
      <div className="flex flex-col gap-8 text-left p-2">
        <p className="text-emerald-200 text-sm">
          Antes de participar de um desafio, precisamos localizar seu perfil
          oficial da Riot Games e fazer a verificação de titularidade da conta.
        </p>

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

        {linkingState === "search" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Seu Riot ID</label>
              <AppTextInput
                id="riot-id"
                required
                placeholder="e.g., SummonerName#BR1"
                value={riotId}
                onChange={(e) => setRiotId(e.target.value)}
                className="bg-emerald-800"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Região</label>
              <AppSelect
                className="bg-emerald-800 cursor-pointer"
                value={region}
                onValueChange={setRegion}
                options={RIOT_REGIONS}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleFindRiotAccoutn} disabled={loading}>
                {loading ? "Buscando..." : "Localizar Conta"}
              </Button>
            </div>
          </div>
        )}

        {linkingState === "check" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Verificar Icone</label>
              <p className="text-emerald-200 text-sm text-justify">
                Para confirmar que esta conta da Riot realmente pertence a você,
                altere temporariamente seu ícone de invocador para o ícone
                abaixo. Depois de realizar a alteração no cliente do League of
                Legends, clique em "Verificar Conta".
              </p>
              {iconVerification && (
                <div className="flex flex-col items-center justify-center mt-2">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/16.13.1/img/profileicon/${iconVerification.id}.png`}
                    alt={"icone de verificação"}
                    width={96}
                    height={96}
                    className="rounded-lg border-2 border-emerald-400"
                  />
                  <span className="text-emerald-200">
                    {iconVerification.name}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              {reset ? (
                <Button
                  className="bg-red-600 border-red-500 text-center items-center justify-center hover:bg-red-700"
                  onClick={handleReset}
                >
                  Reinicar
                </Button>
              ) : (
                <Button onClick={handleLinkAccount} disabled={loading}>
                  {loading ? "Verificando..." : "Verificar Conta"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppDialog>
  );
}
