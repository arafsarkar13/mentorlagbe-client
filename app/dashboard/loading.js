// Skeleton shown while any dashboard page loads
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-9 w-64"></div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-full"></div>
        ))}
      </div>
      <div className="skeleton h-64 w-full"></div>
    </div>
  );
}
