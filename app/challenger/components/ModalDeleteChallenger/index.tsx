"use client";

import Button from "@/src/components/Button";

import { useAuth } from "@/src/contexts/AuthContext";

import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import { useRouter } from "next/navigation";

import { deleteChallenge } from "@/src/actions/deleteChallenge";
import { useState } from "react";

export interface IModalDeleteChallengerProps {
  challengeId: string;
  challengeUserPuuid: string;
}

export default function ModalDeleteChallenger({
  challengeId,
  challengeUserPuuid,
}: IModalDeleteChallengerProps) {
  const { user, updateChallengerId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteChallenge = async () => {
    setIsLoading(true);

    const result = await deleteChallenge(challengeId);

    if (!result.success) {
      alert(result.error);
      return;
    }

    if (challengeId === user?.challengerId) {
      updateChallengerId(null);
    }

    router.push(`/challenger`);
  };

  if (user?.puuid !== challengeUserPuuid) return null;

  return (
    <div className="flex justify-end">
      <AppDialog
        trigger={
          <Button className="bg-red-600 border-red-500 hover:bg-red-700">
            Deletar Desafio
          </Button>
        }
        title="Deletar Desafio?"
        closeOnOutsideClick={false}
      >
        <div className="flex flex-col gap-8 px-2">
          <div className="space-y-3">
            <p className="text-sm text-emerald-200">
              Tem certeza que deseja deletar este desafio?
            </p>

            <p className="text-sm text-red-300">
              Esta ação é <strong>irreversível</strong>. Todo o progresso do
              desafio, incluindo campeões concluídos, derrotas, avaliações,
              comentários e tempo registrado, será removido permanentemente.
            </p>
          </div>
          <Button
            onClick={handleDeleteChallenge}
            disabled={isLoading}
            className="bg-red-600 border-red-500 text-center items-center justify-center hover:bg-red-700"
          >
            {isLoading ? "Deletando... " : "Confirmar"}
          </Button>
        </div>
      </AppDialog>
    </div>
  );
}
