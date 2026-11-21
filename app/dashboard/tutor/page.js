import Link from "next/link";
import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import StatCard from "@/components/dashboard/StatCard";

export default async function TutorOverviewPage() {
  const user = await requireRole("tutor");
  const stats = await serverApiFetch("/api/tutor/stats", user);

  const isPro = stats?.plan === "pro";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-base-content/70">Here is how your tuitions are doing.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tuitions Posted" value={stats?.totalPosted ?? 0} />
        <StatCard label="Active / Approved Tuitions" value={stats?.approvedActive ?? 0} />
        <StatCard label="Total Applicants Received" value={stats?.totalApplicants ?? 0} />
        <StatCard
          label="Current Plan"
          value={(stats?.plan || "free").toUpperCase()}
          hint={isPro ? "Unlimited posts and verified badge" : `Free plan: ${stats?.totalPosted ?? 0} of ${stats?.freeLimit ?? 2} posts used`}
        />
      </div>

      <div className="glass flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="text-xl font-semibold">Ready to reach more students?</h2>
          <p className="text-sm text-base-content/70">New tuitions are reviewed by an admin before they go public.</p>
        </div>
        <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary">Post a Tuition</Link>
      </div>
    </div>
  );
}
