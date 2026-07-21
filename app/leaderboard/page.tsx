import HeaderConfig from "@/src/layout/HeaderConfig";
import LeaderboardHeader from "./components/LeaderboardHeader";
import LeaderboardPodium from "./components/LeaderboardPodium";
import LeaderboardTable from "./components/LeaderboardTable";
import { getLeaderboard } from "@/src/data/getLeaderboard";

interface PageProps {
  searchParams: Promise<{
    queue?: "ranked" | "casual";
    lane?: "TOP" | "JUNGLE" | "MID" | "BOT" | "SUPPORT";
    page?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const queue = params.queue ?? "ranked";
  const lane = params.lane ?? "JUNGLE";
  const page = params.page ?? 1;

  const { leaderboard, totalCount } = await getLeaderboard(queue, lane, +page);

  return (
    <div className="p-2 flex flex-col gap-4">
      <HeaderConfig title="Ranking" />

      <LeaderboardHeader
        queue={queue}
        lane={lane}
        playersFinished={0}
        playersDoing={1}
      />

      <LeaderboardPodium
        firstPlace={leaderboard[0] ?? null}
        secondPlace={leaderboard[1] ?? null}
        thirdPlace={leaderboard[2] ?? null}
      />
      <LeaderboardTable leaderboard={leaderboard} totalCount={totalCount} />
    </div>
  );
}
