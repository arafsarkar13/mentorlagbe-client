import Link from "next/link";

export const metadata = { title: "Payment Cancelled | MentorLagbe" };

export default function PaymentCancelPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4">
      <div className="glass w-full p-10 text-center">
        <p className="text-5xl text-warning">✕</p>
        <h1 className="mt-3 text-3xl font-bold">Payment Cancelled</h1>
        <p className="mt-2 text-base-content/70">
          No money was taken. You can upgrade any time you are ready.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/pricing" className="btn btn-primary">Back to Pricing</Link>
          <Link href="/" className="btn btn-outline">Home</Link>
        </div>
      </div>
    </main>
  );
}
