import { LeaderboardItem } from "@/src/data/getLeaderboard";
import LeaderboardPodiumCard from "./LeaderboardPodiumCard";

interface ILeaderboardPodiumProps {
  firstPlace: LeaderboardItem | null;
  secondPlace: LeaderboardItem | null;
  thirdPlace: LeaderboardItem | null;
}

export default function LeaderboardPodium({
  firstPlace,
  secondPlace,
  thirdPlace,
}: ILeaderboardPodiumProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-1 items-center sm:items-end justify-center gap-4 md:gap-6">
      <div className="order-2 sm:order-1 w-full sm:w-auto">
        <LeaderboardPodiumCard
          position={2}
          name={secondPlace?.playerName ?? ""}
        />
      </div>

      <div className="order-1 sm:order-2 w-full sm:w-auto">
        <LeaderboardPodiumCard
          position={1}
          name={firstPlace?.playerName ?? ""}
        />
      </div>

      <div className="order-3 sm:order-3 w-full sm:w-auto">
        <LeaderboardPodiumCard
          position={3}
          name={thirdPlace?.playerName ?? ""}
        />
      </div>
    </div>
  );
}
