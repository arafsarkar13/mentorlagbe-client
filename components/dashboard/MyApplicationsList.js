"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { formatFee } from "@/lib/publicApi";

const statusBadge = {
  pending: "badge-warning",
  accepted: "badge-success",
  rejected: "badge-error",
};

export default function MyApplicationsList({ applications }) {
  const router = useRouter();
  const [cancellingId, setCancellingId] = useState(null);

  async function handleCancel(id) {
    if (!window.confirm("Cancel this application?")) return;

    setCancellingId(id);
    try {
      await apiFetch(`/api/applications/${id}`, { method: "DELETE" });
      toast.success("Application cancelled");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
    setCancellingId(null);
  }

  if (applications.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <p className="text-lg font-semibold">You have not applied to any tuition yet</p>
        <Link href="/tuitions" className="btn btn-primary mt-4">Browse Tuitions</Link>
      </div>
    );
  }

  return (
    <div className="glass overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Tuition</th>
            <th>Tutor</th>
            <th>Monthly Fee</th>
            <th>Applied</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application._id}>
              <td className="min-w-48 font-semibold">{application.tuitionTitle}</td>
              <td className="min-w-40">
                <p>{application.tutorName}</p>
                <p className="text-xs text-base-content/60">{application.tutorEmail}</p>
              </td>
              <td>{formatFee(application.monthlyFee)}</td>
              <td className="whitespace-nowrap">
                {new Date(application.appliedAt).toLocaleDateString("en-GB", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </td>
              <td>
                <span className={`badge px-3 capitalize ${statusBadge[application.status]}`}>
                  {application.status}
                </span>
              </td>
              <td>
                {application.status === "pending" ? (
                  <button
                    onClick={() => handleCancel(application._id)}
                    disabled={cancellingId === application._id}
                    className="btn btn-error btn-outline btn-xs"
                  >
                    {cancellingId === application._id ? "Cancelling..." : "Cancel"}
                  </button>
                ) : (
                  <span className="text-xs text-base-content/50">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
