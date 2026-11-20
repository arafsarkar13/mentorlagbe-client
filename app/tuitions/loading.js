// Skeleton cards shown while tuitions are loading
export default function TuitionsLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="skeleton h-10 w-64"></div>
      <div className="skeleton mt-6 h-32 w-full"></div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass overflow-hidden">
            <div className="skeleton aspect-video w-full rounded-none"></div>
            <div className="space-y-3 p-5">
              <div className="skeleton h-4 w-1/2"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-4 w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
