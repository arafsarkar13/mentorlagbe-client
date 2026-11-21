import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import { formatUSD } from "@/lib/publicApi";
import StatCard from "@/components/dashboard/StatCard";

export default async function AdminOverviewPage() {
  const user = await requireRole("admin");
  const stats = await serverApiFetch("/api/admin/stats", user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Platform Overview</h1>
        <p className="mt-1 text-base-content/70">A live summary of MentorLagbe.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Users" value={stats?.totalUsers ?? 0} />
        <StatCard label="Total Tutors" value={stats?.totalTutors ?? 0} />
        <StatCard label="Pending Tuitions" value={stats?.pendingTuitions ?? 0} hint="Waiting for review" />
        <StatCard label="Approved Tuitions" value={stats?.approvedTuitions ?? 0} hint="Visible to students" />
        <StatCard label="Total Stripe Revenue" value={formatUSD(stats?.totalRevenue ?? 0)} />
      </div>
    </div>
  );
}
