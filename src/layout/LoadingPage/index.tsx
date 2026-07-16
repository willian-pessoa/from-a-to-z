import AppLoader from "@/src/components/AppLoader";

export default function LoadingPage() {
  return (
    <div className="h-full overflow-hidden bg-linear-to-b from-emerald-950 via-emerald-900 to-emerald-950">
      {/* Brilho de fundo */}
      <div className="bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_70%)]" />

      {/* Moldura */}
      <div className="rounded-2xl border border-emerald-700/30" />

      {/* Conteúdo */}
      <div className="relative flex h-full flex-col items-center justify-center">
        <div className="mb-10 h-px w-64 bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />

        <AppLoader size="lg" text="Carregando..." className="py-0" />

        <div className="mt-10 h-px w-64 bg-linear-to-r from-transparent via-emerald-500/60 to-transparent" />
      </div>
    </div>
  );
}
