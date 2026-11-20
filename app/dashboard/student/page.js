import Link from "next/link";
import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import StatCard from "@/components/dashboard/StatCard";

export default async function StudentOverviewPage() {
  const user = await requireRole("student");
  const data = await serverApiFetch("/api/applications/my", user);
  const applications = data?.applications || [];

  const accepted = applications.filter((a) => a.status === "accepted").length;
  const pending = applications.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-base-content/70">Here is a summary of your tuition applications.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Applied Tuitions" value={applications.length} />
        <StatCard label="Accepted Applications" value={accepted} />
        <StatCard label="Pending Applications" value={pending} />
        <StatCard
          label="Current Plan"
          value={(user.plan || "free").toUpperCase()}
          hint={user.plan === "pro" ? "Priority booking enabled" : "Upgrade for priority booking"}
        />
      </div>

      <div className="glass flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-xl font-semibold">Looking for a new tutor?</h2>
          <p className="text-sm text-base-content/70">Browse approved tuitions and apply in a minute.</p>
        </div>
        <Link href="/tuitions" className="btn btn-primary">Browse Tuitions</Link>
      </div>
    </div>
  );
}
