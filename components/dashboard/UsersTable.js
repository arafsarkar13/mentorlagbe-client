"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

const roleBadge = { student: "badge-info", tutor: "badge-primary", admin: "badge-warning" };

export default function UsersTable({ users, currentEmail }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState(null);

  async function changeRole(user, role) {
    if (!window.confirm(`Change ${user.name} to ${role}?`)) {
      router.refresh(); // puts the dropdown back to the old value
      return;
    }
    setBusyId(user._id);
    try {
      const data = await apiFetch(`/api/admin/users/${user._id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setBusyId(null);
    router.refresh();
  }

  return (
    <div className="glass overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Joined</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="min-w-56">
                <div className="flex items-center gap-3">
                  <div className="avatar avatar-placeholder">
                    {user.image ? (
                      <div className="w-10 rounded-full"><img src={user.image} alt="" /></div>
                    ) : (
                      <div className="w-10 rounded-full bg-primary text-primary-content">
                        <span>{user.name?.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-base-content/60">{user.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <span className={`badge px-3 uppercase ${user.plan === "pro" ? "badge-primary" : "badge-ghost"}`}>
                  {user.plan || "free"}
                </span>
              </td>
              <td className="whitespace-nowrap">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                  : "-"}
              </td>
              <td>
                {user.email === currentEmail ? (
                  <span className={`badge px-3 capitalize ${roleBadge[user.role]}`}>{user.role} (you)</span>
                ) : (
                  <select
                    value={user.role}
                    disabled={busyId === user._id}
                    onChange={(e) => changeRole(user, e.target.value)}
                    className="select select-bordered select-sm capitalize"
                  >
                    <option value="student">student</option>
                    <option value="tutor">tutor</option>
                    <option value="admin">admin</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
