export default function SkeletonList() {
  return (
    <div className="flex flex-col gap-4 pe-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-zinc-200" />
      ))}
    </div>
  );
}
