import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import MyApplicationsList from "@/components/dashboard/MyApplicationsList";

export default async function MyApplicationsPage() {
  const user = await requireRole("student");
  const data = await serverApiFetch("/api/applications/my", user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="mt-1 text-base-content/70">Track the status of every tuition you applied for.</p>
      </div>
      <MyApplicationsList applications={data?.applications || []} />
    </div>
  );
}
