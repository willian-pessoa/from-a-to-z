"use client";

import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import Button from "@/src/components/Button";
import ModalCreateChallenger from "./components/ModalCreateChallenger";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import ModalLinkAccount from "./components/ModalLinkAccount";
import AppLoader from "@/src/components/AppLoader";

import { useAuth } from "@/src/contexts/AuthContext";

interface UserState {
  puuid: string;
  riot_id: string;
  region: string;
  challengerId: string | null;
}

export default function Page() {
  const { user, isLoading } = useAuth();

  const router = useRouter();

  // Redirecionamento seguro acionado quando o estado do usuário mudar e já tiver desafio
  useEffect(() => {
    if (user?.challengerId) {
      router.push(`/challenger/${user.challengerId}`);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center h-full items-center">
        <AppLoader />
      </div>
    );
  }

  if (user?.puuid && user.riot_id && user.region) {
    return (
      <div className="flex flex-col justify-center items-center h-full gap-8 p-2 text-center">
        <span className="text-lg">
          Você não está participando de nenhum desafio de A a Z atualmente,
          clique no botão abaixo para iniciar um novo desafio!
        </span>
        <AppDialog
          trigger={
            <Button className="text-lg py-2 px-4">Iniciar Desafio</Button>
          }
          title="Registrar desafio A a Z"
          closeOnOutsideClick={false}
        >
          <ModalCreateChallenger />
        </AppDialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-full gap-8 p-2 text-center">
      <span className="text-lg">
        Para participar do desafio de A a Z é necessário antes vincular uma
        conta.
      </span>
      <ModalLinkAccount />
    </div>
  );
}
