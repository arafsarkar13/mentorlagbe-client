import { requireRole } from "@/lib/session";
import TuitionForm from "@/components/dashboard/TuitionForm";

export default async function PostTuitionPage() {
  await requireRole("tutor");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Post a Tuition</h1>
        <p className="mt-1 text-base-content/70">
          Free plan tutors can post up to 2 tuitions. Pro tutors can post unlimited tuitions.
        </p>
      </div>
      <TuitionForm />
    </div>
  );
}
