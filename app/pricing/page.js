import PricingPlans from "@/components/PricingPlans";

export const metadata = { title: "Pricing | MentorLagbe" };

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Pricing and Pro Plans</h1>
        <p className="mt-2 text-base-content/70">
          Start free. Upgrade once with Stripe to unlock Pro features.
        </p>
      </div>

      <PricingPlans />

      <p className="mt-10 text-center text-sm text-base-content/60">
        Payments are handled securely by Stripe. We never see your card details.
      </p>
    </main>
  );
}
