// Reusable card for dashboard numbers
export default function StatCard({ label, value, hint }) {
  return (
    <div className="glass h-full p-5">
      <p className="text-sm text-base-content/70">{label}</p>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
      {hint && <p className="mt-1 text-xs text-base-content/60">{hint}</p>}
    </div>
  );
}
