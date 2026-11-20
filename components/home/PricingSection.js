import PricingPlans from "@/components/PricingPlans";

export default function PricingSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Simple Pricing</h2>
        <p className="mt-2 text-base-content/70">Start free. Upgrade to Pro when you need more.</p>
      </div>
      <PricingPlans />
    </section>
  );
}
