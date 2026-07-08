export default async function ChallengerPage({
  params,
}: {
  params: Promise<{ challengerId: string }>;
}) {
  const { challengerId } = await params;
  return (
    <div>
      <h1>{challengerId}</h1>
    </div>
  );
}
