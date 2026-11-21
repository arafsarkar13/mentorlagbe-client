import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import MyTuitionsList from "@/components/dashboard/MyTuitionsList";

export default async function MyTuitionsPage() {
  const user = await requireRole("tutor");
  const data = await serverApiFetch("/api/tutor/tuitions", user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Tuitions</h1>
        <p className="mt-1 text-base-content/70">
          Only approved and active tuitions are visible to students.
        </p>
      </div>
      <MyTuitionsList tuitions={data?.tuitions || []} />
    </div>
  );
}
