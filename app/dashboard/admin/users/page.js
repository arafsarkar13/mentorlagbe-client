import { requireRole } from "@/lib/session";
import { serverApiFetch } from "@/lib/serverApi";
import UsersTable from "@/components/dashboard/UsersTable";

export default async function AdminUsersPage() {
  const user = await requireRole("admin");
  const data = await serverApiFetch("/api/admin/users", user);

  // _id may be an ObjectId, so we turn it into plain text for the client component
  const users = (data?.users || []).map((u) => ({ ...u, _id: String(u._id) }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="mt-1 text-base-content/70">{users.length} registered users. Change a role from the dropdown.</p>
      </div>
      <UsersTable users={users} currentEmail={user.email} />
    </div>
  );
}
