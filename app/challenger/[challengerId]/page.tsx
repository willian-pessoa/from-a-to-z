import ChallengerBanner from "../components/ChallengerBanner";
import ChallengerChampionsGrid from "../components/ChallengerChampionsGrid";
import ChallengerProgressBar from "../components/ChallengerProgressBar";

export default async function ChallengerPage({
  params,
}: {
  params: Promise<{ challengerId: string }>;
}) {
  const { challengerId } = await params;

  return (
    <div className="p-3 flex flex-col gap-3">
      <ChallengerBanner
        challengerLane="jungle"
        currentChampion="Ambessa"
        totalGames={0}
        winRate={0}
      />
      <ChallengerProgressBar completed={20} totalChampions={47} />
      <ChallengerChampionsGrid />
    </div>
  );
}
