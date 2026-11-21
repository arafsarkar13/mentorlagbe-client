"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { formatFee } from "@/lib/publicApi";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function MyTuitionsList({ tuitions }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState(null);

  async function handleToggle(id) {
    setBusyId(id);
    try {
      const data = await apiFetch(`/api/tutor/tuitions/${id}/toggle`, { method: "PATCH" });
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
    setBusyId(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this tuition and all of its applications?")) return;
    setBusyId(id);
    try {
      await apiFetch(`/api/tutor/tuitions/${id}`, { method: "DELETE" });
      toast.success("Tuition deleted");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
    setBusyId(null);
  }

  if (tuitions.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <p className="text-lg font-semibold">You have not posted any tuition yet</p>
        <Link href="/dashboard/tutor/post-tuition" className="btn btn-primary mt-4">Post a Tuition</Link>
      </div>
    );
  }

  return (
    <div className="glass overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Tuition</th>
            <th>Fee</th>
            <th>Approval</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map((tuition) => (
            <tr key={tuition._id}>
              <td className="min-w-64">
                <div className="flex items-center gap-3">
                  <img src={tuition.bannerImage} alt="" className="aspect-video w-20 rounded-lg object-cover" />
                  <div>
                    <p className="font-semibold">{tuition.title}</p>
                    <p className="text-xs text-base-content/60">{tuition.subject} · {tuition.classLevel} · {tuition.mode}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap">{formatFee(tuition.monthlyFee)}</td>
              <td><StatusBadge status={tuition.approvalStatus} /></td>
              <td>
                <span className={`badge px-3 ${tuition.isActive ? "badge-info" : "badge-ghost"}`}>
                  {tuition.isActive ? "Active" : "Closed"}
                </span>
              </td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/dashboard/tutor/my-tuitions/${tuition._id}/edit`} className="btn btn-outline btn-xs">Edit</Link>
                  <button onClick={() => handleToggle(tuition._id)} disabled={busyId === tuition._id} className="btn btn-outline btn-xs">
                    {tuition.isActive ? "Close" : "Reopen"}
                  </button>
                  <button onClick={() => handleDelete(tuition._id)} disabled={busyId === tuition._id} className="btn btn-error btn-outline btn-xs">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
