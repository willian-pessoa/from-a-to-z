"use client";

import { useState } from "react";
import clsx from "clsx";

import Button from "@/src/components/Button";

import { updateChampionNotes } from "@/src/actions/updateChampioNotes";
import { AppDialog } from "@/src/components/AppDialog/AppDialog";
import IconButton from "@/src/components/IconButton";
import { IconEdit } from "@tabler/icons-react";

export interface IModalChampionNotesProps {
  challengeId: number;
  championNameId: string;
  championName: string;
  funNote: number;
  commentary: string;
}

export default function ModalChampionNotes({
  challengeId,
  championNameId,
  championName,
  funNote,
  commentary,
}: IModalChampionNotesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [localFunNote, setLocalFunNote] = useState(funNote);
  const [localCommentary, setLocalCommentary] = useState(commentary);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeFunNote = (note: number) => {
    setLocalFunNote(note);
    // Tem mudanças se a nota nova for diferente da prop original OU se o comentário atual for diferente da prop original
    setHasChanges(note !== funNote || localCommentary !== commentary);
  };

  const handleChangeLocalCommentary = (text: string) => {
    setLocalCommentary(text);
    // Tem mudanças se a nota atual for diferente da prop original OU se o texto novo for diferente da prop original
    setHasChanges(localFunNote !== funNote || text !== commentary);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const result = await updateChampionNotes({
        challengeId,
        championNameId,
        funNote: localFunNote,
        commentary: localCommentary,
      });

      if (result.success) {
        setHasChanges(false);
        setIsDialogOpen(false);
      } else {
        alert(result.error || "Erro ao salvar notas.");
      }
    } catch (error) {
      alert("Erro interno ao salvar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      title={`Anotações sobre o campeão ${championName}`}
      closeOnOutsideClick={false}
      trigger={
        <IconButton
          className={clsx(
            "absolute right-1 bottom-1 transition-opacity",
            isDialogOpen
              ? "opacity-0 pointer-events-none"
              : "opacity-0 group-hover:opacity-100",
          )}
        >
          <IconEdit />
        </IconButton>
      }
    >
      <div className="flex flex-col gap-8 px-2">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-emerald-200">
            Qual foi o seu nível de diversão jogando com o campeão numa escala
            de 1 a 5?
          </p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((note) => (
              <Button
                key={note}
                disabled={isLoading}
                className={clsx(
                  "h-10 w-10 justify-center p-0 font-bold border",
                  localFunNote === note
                    ? "bg-emerald-600 border-emerald-400 text-white"
                    : "bg-emerald-900 border-emerald-700 text-emerald-300 hover:bg-emerald-800",
                )}
                onClick={() => handleChangeFunNote(note)}
              >
                {note}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-emerald-200">
            Conte mais sobre o que achou de jogar com o campeão.
          </p>

          <textarea
            value={localCommentary}
            disabled={isLoading}
            onChange={(e) => handleChangeLocalCommentary(e.target.value)}
            maxLength={256}
            rows={5}
            placeholder="Ex.: Clear muito saudável, gank forte, mas o late game deixou a desejar..."
            className="resize-none rounded-lg border border-emerald-600 bg-emerald-950 p-3 text-white outline-none transition-colors focus:border-emerald-400 disabled:opacity-50"
          />

          <span className="self-end text-xs text-emerald-300">
            {localCommentary.length}/256
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={!hasChanges || isLoading}
            onClick={handleSaveChanges}
            className={clsx(
              hasChanges && !isLoading
                ? "cursor-pointer bg-emerald-600 hover:bg-emerald-500"
                : "cursor-not-allowed opacity-50 bg-emerald-800",
            )}
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </AppDialog>
  );
}
