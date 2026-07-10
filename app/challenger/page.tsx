import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import Button from "@/src/components/Button";
import ModalCreateChallenger from "./components/ModalCreateChallenger";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-8 p-2 text-center">
      <span className="text-lg">
        Você não está participando de nenhum desafio de A a Z atualmente, clique
        no botão abaixo para iniciar um novo desafio!
      </span>
      <AppDialog
        trigger={<Button className="text-lg py-2 px-4">Iniciar Desafio</Button>}
        title="Registrar desafio A a Z"
        closeOnOutsideClick={false}
      >
        <ModalCreateChallenger />
      </AppDialog>
    </div>
  );
}
