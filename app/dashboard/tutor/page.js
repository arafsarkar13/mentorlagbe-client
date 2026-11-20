import { requireRole } from "@/lib/session";

export default async function TutorOverviewPage() {
  const user = await requireRole("tutor");

  return (
    <div className="glass p-8">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-2 text-base-content/70">
        Your tutor dashboard pages are being added in the next update.
      </p>
    </div>
  );
}
