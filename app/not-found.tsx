import Link from "next/link";
import Button from "@/src/components/Button";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full bg-emerald-950">
      <div className="flex max-w-xl flex-col items-center gap-6 rounded-xl border border-emerald-800 bg-emerald-900/40 p-10 text-center shadow-xl">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-800/30">
          <span className="text-4xl font-bold text-emerald-300">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-emerald-50">
            Página não encontrada
          </h1>

          <p className="text-sm leading-relaxed text-emerald-200">
            Parece que você tentou acessar uma página que não existe ou foi
            removida. Volte para a página inicial clicando no botão abaixo.
          </p>
        </div>

        <Link href="/">
          <Button className="px-6 py-2 text-lg">Voltar ao início</Button>
        </Link>
      </div>
    </div>
  );
}
