import LeaderboardPodiumCard from "./LeaderboardPodiumCard";

export default function LeaderboardPodium() {
  const firstPlace = { name: "AURA Galactus", games: 46 };
  const secondPlace = { name: "AURA Galactus", games: 48 };
  const thirdPlace = { name: "AURA Galactus", games: 49 };

  return (
    <div className="flex flex-1 items-end justify-center gap-8">
      <LeaderboardPodiumCard position={2} {...secondPlace} />

      <LeaderboardPodiumCard position={1} {...firstPlace} />

      <LeaderboardPodiumCard position={3} {...thirdPlace} />
    </div>
  );
}
