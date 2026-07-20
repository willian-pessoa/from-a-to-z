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
    <div className="flex flex-1 items-end justify-center gap-8">
      <LeaderboardPodiumCard
        position={2}
        name={secondPlace?.playerName ?? ""}
      />

      <LeaderboardPodiumCard position={1} name={firstPlace?.playerName ?? ""} />

      <LeaderboardPodiumCard position={3} name={thirdPlace?.playerName ?? ""} />
    </div>
  );
}
