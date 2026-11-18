"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Sign up failed");
      return;
    }

    toast.success("Account created! Welcome to MentorLagbe");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-10">
      <form onSubmit={handleSubmit} noValidate className="glass w-full space-y-4 p-8">
        <div>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-base-content/70">Join MentorLagbe as a student or a tutor.</p>
        </div>

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Full Name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input input-bordered w-full" />
          {errors.name && <span className="mt-1 block text-sm text-error">{errors.name}</span>}
        </label>

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input input-bordered w-full" />
          {errors.email && <span className="mt-1 block text-sm text-error">{errors.email}</span>}
        </label>

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Password</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" className="input input-bordered w-full" />
          {errors.password && <span className="mt-1 block text-sm text-error">{errors.password}</span>}
        </label>

        <div>
          <span className="mb-2 block text-sm">I want to join as</span>
          <div className="grid grid-cols-2 gap-3">
            {["student", "tutor"].map((role) => (
              <label
                key={role}
                className={`cursor-pointer rounded-xl border p-3 text-center capitalize transition ${
                  form.role === role ? "border-primary bg-primary/15 text-primary" : "border-white/15 hover:border-white/40"
                }`}
              >
                <input type="radio" name="role" value={role} checked={form.role === role} onChange={handleChange} className="hidden" />
                {role}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
        </button>

        <p className="text-center text-sm text-base-content/70">
          Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign In</Link>
        </p>
      </form>
    </main>
  );
}
