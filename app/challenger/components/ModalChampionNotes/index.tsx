"use client";

import { useState } from "react";
import clsx from "clsx";

import Button from "@/src/components/Button";

export interface IModalChampionNotesProps {
  onSave?: (funNote: number, commentary: string) => void;
}

export default function ModalChampionNotes({
  onSave,
}: IModalChampionNotesProps) {
  const [funNote, setFunNote] = useState(0);
  const [commentary, setCommentary] = useState("");

  return (
    <div className="flex flex-col gap-8 px-2">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-emerald-200">
          Qual foi o nível de diversão numa escala de 1 a 5?
        </p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((note) => (
            <Button
              key={note}
              className={clsx(
                "h-10 w-10 justify-center p-0 font-bold",
                funNote === note ? "bg-emerald-600" : "bg-emerald-800",
              )}
              onClick={() => setFunNote(note)}
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
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
          maxLength={256}
          rows={5}
          placeholder="Ex.: Clear muito saudável, gank forte, mas o late game deixou a desejar..."
          className="resize-none rounded-lg border border-emerald-600 bg-emerald-900 p-3 outline-none transition-colors focus:border-emerald-400"
        />

        <span className="self-end text-xs text-emerald-300">
          {commentary.length}/256
        </span>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={funNote === 0}
          onClick={() => onSave?.(funNote, commentary)}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
