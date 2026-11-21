"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { resizeImage } from "@/lib/image";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB original file


export default function ProfileForm({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
    bio: user.bio || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user.image || "");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (form.phone && form.phone.trim().length < 7) newErrors.phone = "Enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      let imageUrl = user.image || "";

      // 1. Upload the new picture (through our server, which uses ImgBB)
      if (file) {
        const base64 = await resizeImage(file);
        const data = await apiFetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ image: base64 }),
        });
        imageUrl = data.url;
      }

      // 2. Save the profile with BetterAuth
      const { error } = await authClient.updateUser({
        name: form.name.trim(),
        phone: form.phone.trim(),
        bio: form.bio.trim(),
        image: imageUrl,
      });
      if (error) throw new Error(error.message || "Could not update profile");

      toast.success("Profile updated successfully");
      setFile(null);
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Could not update profile");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass max-w-2xl space-y-5 p-6 sm:p-8">
      <div className="flex items-center gap-5">
        <div className="avatar avatar-placeholder">
          {preview ? (
            <div className="w-20 rounded-full">
              <img src={preview} alt="Profile preview" />
            </div>
          ) : (
            <div className="w-20 rounded-full bg-primary text-2xl text-primary-content">
              <span>{form.name.charAt(0).toUpperCase() || "?"}</span>
            </div>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleFile} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
          <p className="mt-1 text-xs text-base-content/60">JPG or PNG, up to 5 MB (resized automatically).</p>
        </div>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm">Full Name</span>
        <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" />
        {errors.name && <span className="mt-1 block text-sm text-error">{errors.name}</span>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm">Email (cannot be changed)</span>
        <input value={user.email} disabled className="input input-bordered w-full opacity-60" />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm">Phone</span>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="01XXXXXXXXX" className="input input-bordered w-full" />
        {errors.phone && <span className="mt-1 block text-sm text-error">{errors.phone}</span>}
      </label>

      <label className="block">
        <span className="mb-1 block text-sm">Bio</span>
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} placeholder="Tell others a little about yourself" className="textarea textarea-bordered w-full"></textarea>
      </label>

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? <span className="loading loading-spinner"></span> : "Save Changes"}
      </button>
    </form>
  );
}
