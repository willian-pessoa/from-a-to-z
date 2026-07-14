"use client";

import { useState } from "react";
import Button from "@/src/components/Button";
import { syncRiotMatches } from "@/src/actions/syncRiotMatches";
import { useRouter } from "next/navigation";
import { ChallengerData, ChampionProgress } from "@/src/types";
import { useAuth } from "@/src/contexts/AuthContext";

interface UpdateChallengerButtonProps {
  challengerData: ChallengerData;
  championsProgress: ChampionProgress[];
}

export default function UpdateChallengerButton({
  challengerData,
  championsProgress,
}: UpdateChallengerButtonProps) {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleUpdate() {
    setIsLoading(true);
    try {
      const result = await syncRiotMatches(
        challengerData,
        championsProgress,
        user?.region ?? "BR1",
      );

      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Erro ao atualizar progresso.");
      }
    } catch (error) {
      alert("Erro interno ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="bg-fuchsia-600 border-fuchsia-800 hover:bg-fuchsia-700 text-white font-semibold shadow-md disabled:opacity-50"
      onClick={handleUpdate}
      disabled={isLoading}
    >
      {isLoading ? "Aguarde, buscando partidas..." : "Atualizar Progresso"}
    </Button>
  );
}
