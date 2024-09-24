export default function Page({
  searchParams: { q },
}: {
  searchParams: { q: string };
}) {
  return (
    <div>
      <div>Search: {q}</div>
    </div>
  );
}
