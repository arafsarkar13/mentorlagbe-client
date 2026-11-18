"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email address";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: form.email.trim(),
      password: form.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

    toast.success("Welcome back!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-4 py-10">
      <form onSubmit={handleSubmit} noValidate className="glass w-full space-y-4 p-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-base-content/70">Sign in to continue to MentorLagbe.</p>
        </div>

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input input-bordered w-full" />
          {errors.email && <span className="mt-1 block text-sm text-error">{errors.email}</span>}
        </label>

        <label className="form-control w-full">
          <span className="mb-1 block text-sm">Password</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Your password" className="input input-bordered w-full" />
          {errors.password && <span className="mt-1 block text-sm text-error">{errors.password}</span>}
        </label>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
        </button>

        <p className="text-center text-sm text-base-content/70">
          New here? <Link href="/sign-up" className="text-primary hover:underline">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
