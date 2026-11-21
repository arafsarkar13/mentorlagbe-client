"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const groups = [
  {
    title: "For Tutors",
    role: "tutor",
    plans: [
      { name: "Free Tutor", price: "$0", features: ["Post up to 2 tuitions", "Manage student applications", "Basic tutor profile"], pro: false },
      { name: "Pro Tutor", price: "$15", features: ["Unlimited tuition posts", "Verified tutor badge", "Manage student applications"], pro: true },
    ],
  },
  {
    title: "For Students",
    role: "student",
    plans: [
      { name: "Free Student", price: "$0", features: ["Browse all tuitions", "Apply to tuitions", "Track application status"], pro: false },
      { name: "Pro Student", price: "$10", features: ["Priority booking", "Browse all tuitions", "Track application status"], pro: true },
    ],
  },
];

// The button at the bottom of each plan card. What it shows depends on who is signed in.
function PlanButton({ plan, role }) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const data = await apiFetch("/api/payments/checkout", { method: "POST" });
      window.location.href = data.url; // go to Stripe's secure payment page
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  if (isPending) return <div className="skeleton h-12 w-full"></div>;

  // Free plan cards
  if (!plan.pro) {
    return user ? (
      <Link href="/dashboard" className="btn btn-outline w-full">Go to Dashboard</Link>
    ) : (
      <Link href="/sign-up" className="btn btn-outline w-full">Get Started</Link>
    );
  }

  // Pro plan cards
  if (!user) {
    return <Link href="/sign-in" className="btn btn-primary w-full">Subscribe with Stripe</Link>;
  }
  if (user.role === "admin") {
    return <button className="btn btn-primary w-full" disabled>Not needed for admins</button>;
  }
  if (user.role !== role) {
    return <button className="btn btn-primary w-full" disabled>Only for {role}s</button>;
  }
  if (user.plan === "pro") {
    return <button className="btn btn-success w-full" disabled>Your Current Plan ✓</button>;
  }
  return (
    <button onClick={handleSubscribe} disabled={loading} className="btn btn-primary w-full">
      {loading ? <span className="loading loading-spinner"></span> : "Subscribe with Stripe"}
    </button>
  );
}

export default function PricingPlans() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-4 text-xl font-semibold">{group.title}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {group.plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass flex h-full flex-col p-6 ${plan.pro ? "border-primary/60" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{plan.name}</h4>
                  {plan.pro && <span className="badge badge-primary px-3">Pro</span>}
                </div>
                <p className="mt-3 text-4xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-base-content/60"> / one time</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-base-content/80">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <PlanButton plan={plan} role={group.role} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
