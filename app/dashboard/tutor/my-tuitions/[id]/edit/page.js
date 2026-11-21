import { notFound } from "next/navigation";
import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import TuitionForm from "@/components/dashboard/TuitionForm";

export default async function EditTuitionPage({ params }) {
  const { id } = await params;
  const user = await requireRole("tutor");
  const data = await serverApiFetch(`/api/tutor/tuitions/${id}`, user);

  if (!data) {
    notFound();
  }

  // Convert the database record into plain values for the form
  const tuition = { ...data.tuition, _id: String(data.tuition._id) };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Tuition</h1>
        <p className="mt-1 text-base-content/70">
          If this tuition was rejected, saving it sends it back for approval.
        </p>
      </div>
      <TuitionForm tuition={tuition} />
    </div>
  );
}
