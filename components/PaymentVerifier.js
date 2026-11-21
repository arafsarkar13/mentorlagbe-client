"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

// Asks the server to confirm the payment with Stripe, then refreshes the user's plan
export default function PaymentVerifier({ sessionId }) {
  const router = useRouter();
  const { refetch } = authClient.useSession();
  const started = useRef(false);
  const [state, setState] = useState("checking"); // checking | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (started.current) return; // run only once
    started.current = true;

    if (!sessionId) {
      setState("error");
      setMessage("No payment was found.");
      return;
    }

    apiFetch(`/api/payments/verify?session_id=${encodeURIComponent(sessionId)}`)
      .then((data) => {
        setState("success");
        setMessage(data.planName);
        toast.success("Payment successful! You are now a Pro member");
        refetch();
        router.refresh();
      })
      .catch((error) => {
        setState("error");
        setMessage(error.message);
        toast.error(error.message);
      });
  }, [sessionId, refetch, router]);

  if (state === "checking") {
    return (
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">Confirming your payment with Stripe...</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="text-center">
        <p className="text-5xl text-error">!</p>
        <h1 className="mt-3 text-2xl font-bold">We could not confirm your payment</h1>
        <p className="mt-2 text-base-content/70">{message}</p>
        <p className="mt-1 text-sm text-base-content/60">
          If money was taken from your account, your plan will update automatically within a minute.
        </p>
        <Link href="/dashboard" className="btn btn-primary mt-6">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-6xl text-primary">✓</p>
      <h1 className="mt-3 text-3xl font-bold">Payment Successful</h1>
      <p className="mt-2 text-base-content/70">
        Thank you! Your <span className="font-semibold text-primary">{message}</span> is now active.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        <Link href="/tuitions" className="btn btn-outline">Browse Tuitions</Link>
      </div>
    </div>
  );
}
