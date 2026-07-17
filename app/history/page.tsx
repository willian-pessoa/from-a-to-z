import { notFound } from "next/navigation";
import HistoryCard from "./components/HistoryCard";
import HeaderConfig from "@/src/layout/HeaderConfig";

export default async function HistoryPage() {
  const historyData = await getChallengeHistory();

  if (!historyData) {
    notFound();
  }

  return (
    <div>
      <div className="flex flex-col mt-4 ml-4">
        <label className="font-bold text-lg border-b-2 border-emerald-600 w-fit">
          Temporada 2026
        </label>
        <div className="flex flex-wrap items-center gap-6 p-4 text-center">
          <HeaderConfig title="Histórico de Desafios" />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
        </div>
      </div>
      <div>
        <label>Temporada 2025</label>
        <div className="flex flex-wrap items-center gap-6 p-4 text-center">
          <HeaderConfig title="Histórico de Desafios" />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={true} challengerId={"13"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
          <HistoryCard isFinished={false} challengerId={"12"} />
        </div>
      </div>
    </div>
  );
}
