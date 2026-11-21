"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import { resizeImage } from "@/lib/image";
import { SUBJECTS, CLASS_LEVELS, defaultBanner } from "@/lib/constants";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB original file

// tuition = the tuition being edited (leave empty to create a new one)
export default function TuitionForm({ tuition }) {
  const router = useRouter();
  const isEdit = Boolean(tuition);

  const [form, setForm] = useState({
    title: tuition?.title || "",
    subject: tuition?.subject || SUBJECTS[0],
    classLevel: tuition?.classLevel || CLASS_LEVELS[0],
    mode: tuition?.mode || "Online",
    location: tuition?.location || "",
    monthlyFee: tuition?.monthlyFee || "",
    daysPerWeek: tuition?.daysPerWeek || 3,
    description: tuition?.description || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(tuition?.bannerImage || "");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (selected.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be smaller than 5 MB");
      return;
    }
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function validate() {
    const e = {};
    if (form.title.trim().length < 5) e.title = "Title must be at least 5 characters";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.monthlyFee || Number(form.monthlyFee) <= 0) e.monthlyFee = "Enter a monthly fee greater than 0";
    if (form.description.trim().length < 20) e.description = "Description must be at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      // 1. Banner: upload a new file, keep the old one, or use the subject's default banner
      let bannerImage = tuition?.bannerImage || defaultBanner(form.subject);
      if (file) {
        const base64 = await resizeImage(file, 1200);
        const data = await apiFetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ image: base64 }),
        });
        bannerImage = data.url;
      }

      // 2. Save the tuition
      const body = JSON.stringify({ ...form, bannerImage });
      if (isEdit) {
        await apiFetch(`/api/tutor/tuitions/${tuition._id}`, { method: "PUT", body });
        toast.success("Tuition updated successfully");
      } else {
        await apiFetch("/api/tutor/tuitions", { method: "POST", body });
        toast.success("Tuition submitted for admin approval");
      }
      router.push("/dashboard/tutor/my-tuitions");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      if (error.message.includes("Free plan limit")) setLimitReached(true);
    }
    setSaving(false);
  }

  const field = "input input-bordered w-full";

  return (
    <form onSubmit={handleSubmit} noValidate className="glass max-w-3xl space-y-5 p-6 sm:p-8">
      {limitReached && (
        <div className="rounded-xl border border-warning/50 bg-warning/10 p-4 text-sm">
          You have used all free posts.{" "}
          <Link href="/pricing" className="font-semibold text-primary underline">Upgrade to Pro</Link>{" "}
          for unlimited tuition posts.
        </div>
      )}

      <label className="block">
        <span className="mb-1 block text-sm">Title</span>
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. HSC Higher Math Crash Batch" className={field} />
        {errors.title && <span className="mt-1 block text-sm text-error">{errors.title}</span>}
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm">Subject</span>
          <select name="subject" value={form.subject} onChange={handleChange} className="select select-bordered w-full">
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Class Level</span>
          <select name="classLevel" value={form.classLevel} onChange={handleChange} className="select select-bordered w-full">
            {CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Mode</span>
          <select name="mode" value={form.mode} onChange={handleChange} className="select select-bordered w-full">
            <option>Online</option>
            <option>Offline</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Location</span>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Zoom, or an area like Dhanmondi, Dhaka" className={field} />
          {errors.location && <span className="mt-1 block text-sm text-error">{errors.location}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Monthly Fee (৳)</span>
          <input name="monthlyFee" type="number" min="1" value={form.monthlyFee} onChange={handleChange} placeholder="3000" className={field} />
          {errors.monthlyFee && <span className="mt-1 block text-sm text-error">{errors.monthlyFee}</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm">Days per Week</span>
          <select name="daysPerWeek" value={form.daysPerWeek} onChange={handleChange} className="select select-bordered w-full">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm">Description</span>
        <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="What will students learn? How are classes run?" className="textarea textarea-bordered w-full"></textarea>
        {errors.description && <span className="mt-1 block text-sm text-error">{errors.description}</span>}
      </label>

      <div>
        <span className="mb-2 block text-sm">Banner Image</span>
        <div className="flex flex-wrap items-center gap-5">
          <img
            src={preview || defaultBanner(form.subject)}
            alt="Banner preview"
            className="aspect-video w-48 rounded-xl border border-white/15 object-cover"
          />
          <div>
            <input type="file" accept="image/*" onChange={handleFile} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
            <p className="mt-1 text-xs text-base-content/60">
              Optional. Without a picture, the {form.subject} banner is used.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? <span className="loading loading-spinner"></span> : isEdit ? "Save Changes" : "Submit for Approval"}
        </button>
        <Link href="/dashboard/tutor/my-tuitions" className="btn btn-ghost">Cancel</Link>
      </div>
    </form>
  );
}
