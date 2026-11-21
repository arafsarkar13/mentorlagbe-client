"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import StatusBadge from "@/components/dashboard/StatusBadge";

export default function ApplicantsList({ applicants }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState(null);

  async function updateStatus(id, status) {
    setBusyId(id);
    try {
      await apiFetch(`/api/tutor/applicants/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast.success(`Application ${status}`);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
    setBusyId(null);
  }

  if (applicants.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <p className="text-lg font-semibold">No applications yet</p>
        <p className="mt-1 text-sm text-base-content/70">Students who apply to your tuitions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="glass overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Phone</th>
            <th>Preferred Schedule</th>
            <th>Note</th>
            <th>Tuition</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant._id}>
              <td className="min-w-44">
                <p className="font-semibold">{applicant.studentName}</p>
                <p className="text-xs text-base-content/60">{applicant.studentEmail}</p>
              </td>
              <td className="whitespace-nowrap">{applicant.studentPhone}</td>
              <td className="min-w-40">{applicant.preferredSchedule}</td>
              <td className="min-w-48 max-w-xs text-sm text-base-content/80">{applicant.studentNote || "-"}</td>
              <td className="min-w-48">{applicant.tuitionTitle}</td>
              <td><StatusBadge status={applicant.status} /></td>
              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(applicant._id, "accepted")}
                    disabled={busyId === applicant._id || applicant.status === "accepted"}
                    className="btn btn-success btn-xs"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(applicant._id, "rejected")}
                    disabled={busyId === applicant._id || applicant.status === "rejected"}
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
