import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import AdminTuitionsTable from "@/components/dashboard/AdminTuitionsTable";

export default async function AdminTuitionsPage() {
  const user = await requireRole("admin");
  const data = await serverApiFetch("/api/admin/tuitions", user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tuition Approval</h1>
        <p className="mt-1 text-base-content/70">Approve or reject tuition posts submitted by tutors.</p>
      </div>
      <AdminTuitionsTable tuitions={data?.tuitions || []} />
    </div>
  );
}
