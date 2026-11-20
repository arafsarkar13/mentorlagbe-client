import { requireRole } from "@/lib/session";

export default async function AdminOverviewPage() {
  const user = await requireRole("admin");

  return (
    <div className="glass p-8">
      <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-2 text-base-content/70">
        Your admin dashboard pages are being added in the next update.
      </p>
    </div>
  );
}
