"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4">
      <div className="glass w-full p-10 text-center">
        <p className="text-6xl font-bold text-error">Oops</p>
        <h1 className="mt-3 text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-base-content/70">
          An unexpected error happened. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => reset()} className="btn btn-outline">Try Again</button>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
