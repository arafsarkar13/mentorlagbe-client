import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import ApplicantsList from "@/components/dashboard/ApplicantsList";

export default async function ApplicantsPage() {
  const user = await requireRole("tutor");
  const data = await serverApiFetch("/api/tutor/applicants", user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Applicants</h1>
        <p className="mt-1 text-base-content/70">Accept or reject students who applied to your tuitions.</p>
      </div>
      <ApplicantsList applicants={data?.applicants || []} />
    </div>
  );
}
