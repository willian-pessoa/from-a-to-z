"use client";

import { useState } from "react";
import { linkPlayer } from "@/src/actions/auth";
import AppTextInput from "@/src/components/AppTextInput";
import Button from "@/src/components/Button";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";

import { useAuth } from "@/src/contexts/AuthContext";
import AppSelect from "@/src/components/AppSelect";
import { RIOT_REGIONS } from "./const/riotRegionsOptions";

export default function ModalLinkAccount() {
  // Estados do fluxo de autenticação e UI
  const { login } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados dos inputs (Passo 1)
  const [riotId, setRiotId] = useState("");
  const [region, setRegion] = useState("BR1");

  async function handleLinkAccount(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await linkPlayer(riotId, region);

    if (result.success && result.user) {
      login(result.user);

      setIsDialogOpen(false);
    } else {
      setError(result.error || "Failed to verify account.");
    }
    setLoading(false);
  }

  return (
    <AppDialog
      trigger={<Button className="text-lg py-2 px-4">Vincular Conta</Button>}
      title="Verificar Riot ID"
      open={isDialogOpen}
      onOpenChange={(open) => setIsDialogOpen(open)}
      closeOnOutsideClick={false}
    >
      <form
        onSubmit={handleLinkAccount}
        className="flex flex-col gap-8 text-left p-2"
      >
        <p className="text-emerald-200 text-sm">
          Antes de participar de um desafio, precisamos localizar seu perfil
          oficial por meio da API da Riot Games.
        </p>

        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-2 rounded">
            {error}
          </div>
        )}

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
          <label className="font-semibold">Region</label>
          <AppSelect
            className="bg-emerald-800 cursor-pointer"
            value={region}
            onValueChange={setRegion}
            options={RIOT_REGIONS}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Buscando..." : "Verificar Conta"}
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}
