import LeaderboardHeader from "./components/LeaderboardHeader";
import LeaderboardPodium from "./components/LeaderboardPodium";
import LeaderboardTable from "./components/LeaderboardTable";

export default function Page() {
  return (
    <div className="p-2 flex flex-col gap-4 ">
      <LeaderboardHeader />
      <LeaderboardPodium />
      <LeaderboardTable />
    </div>
  );
}
