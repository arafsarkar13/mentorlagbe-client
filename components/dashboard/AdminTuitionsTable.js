"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { formatFee } from "@/lib/publicApi";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function AdminTuitionsTable({ tuitions }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState(null);

  async function setStatus(id, approvalStatus) {
    setBusyId(id);
    try {
      const data = await apiFetch(`/api/admin/tuitions/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ approvalStatus }),
      });
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
    setBusyId(null);
  }

  if (tuitions.length === 0) {
    return <div className="glass p-10 text-center">No tuition posts yet.</div>;
  }

  return (
    <div className="glass overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Tuition</th>
            <th>Tutor</th>
            <th>Fee</th>
            <th>Posted</th>
            <th>Approval</th>
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
              <td className="min-w-40">
                <p>{tuition.tutorName}</p>
                <p className="text-xs text-base-content/60">{tuition.tutorEmail}</p>
              </td>
              <td className="whitespace-nowrap">{formatFee(tuition.monthlyFee)}</td>
              <td className="whitespace-nowrap">
                {new Date(tuition.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </td>
              <td><StatusBadge status={tuition.approvalStatus} /></td>
              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStatus(tuition._id, "approved")}
                    disabled={busyId === tuition._id || tuition.approvalStatus === "approved"}
                    className="btn btn-success btn-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setStatus(tuition._id, "rejected")}
                    disabled={busyId === tuition._id || tuition.approvalStatus === "rejected"}
                    className="btn btn-error btn-outline btn-xs"
                  >
                    Reject
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
