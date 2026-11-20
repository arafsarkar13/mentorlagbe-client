"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

export default function ApplyBox({ tuitionId }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ phone: "", preferredSchedule: "", studentNote: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // For students: find out if they already applied to this tuition
  useEffect(() => {
    if (user?.role !== "student") return;
    apiFetch(`/api/applications/check/${tuitionId}`)
      .then((data) => setAlreadyApplied(data.applied))
      .catch(() => {});
  }, [user?.role, tuitionId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (form.phone.trim().length < 7) newErrors.phone = "Enter a valid phone number";
    if (!form.preferredSchedule.trim()) newErrors.preferredSchedule = "Preferred schedule is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await apiFetch("/api/applications", {
        method: "POST",
        body: JSON.stringify({ tuitionId, ...form }),
      });
      toast.success("Application submitted successfully");
      setAlreadyApplied(true);
      setShowForm(false);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }

  if (isPending) {
    return <div className="skeleton h-12 w-full"></div>;
  }

  // Not signed in
  if (!user) {
    return (
      <div className="mt-5">
        <Link href="/sign-in" className="btn btn-primary w-full">Sign in to Apply</Link>
        <p className="mt-3 text-xs text-base-content/60">Only students can apply for tuitions.</p>
      </div>
    );
  }

  // Tutors and admins cannot apply
  if (user.role !== "student") {
    return (
      <div className="mt-5">
        <button className="btn btn-primary w-full" disabled>Apply Now</button>
        <p className="mt-3 text-xs text-warning">
          Only students can apply for tuitions. You are signed in as a {user.role}.
        </p>
      </div>
    );
  }

  // Student who already applied
  if (alreadyApplied) {
    return (
      <div className="mt-5">
        <button className="btn btn-success w-full" disabled>Application Sent ✓</button>
        <Link href="/dashboard/student/my-applications" className="mt-3 block text-center text-sm text-primary hover:underline">
          View my applications
        </Link>
      </div>
    );
  }

  // Student: show the button, then the form
  return (
    <div className="mt-5">
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn btn-primary w-full">Apply Now</button>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm">Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" className="input input-bordered w-full" />
            {errors.phone && <span className="mt-1 block text-sm text-error">{errors.phone}</span>}
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Preferred Schedule</span>
            <input name="preferredSchedule" value={form.preferredSchedule} onChange={handleChange} placeholder="e.g. Sat, Mon, Wed - 6 PM" className="input input-bordered w-full" />
            {errors.preferredSchedule && <span className="mt-1 block text-sm text-error">{errors.preferredSchedule}</span>}
          </label>
          <label className="block">
            <span className="mb-1 block text-sm">Learning Note (optional)</span>
            <textarea name="studentNote" value={form.studentNote} onChange={handleChange} rows={3} placeholder="What do you want to improve?" className="textarea textarea-bordered w-full"></textarea>
          </label>
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-primary flex-1">
              {loading ? <span className="loading loading-spinner"></span> : "Submit Application"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
