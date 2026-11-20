import Link from "next/link";

const groups = [
  {
    title: "For Tutors",
    plans: [
      { name: "Free Tutor", price: "$0", features: ["Post up to 2 tuitions", "Manage student applications", "Basic tutor profile"], pro: false },
      { name: "Pro Tutor", price: "$15", features: ["Unlimited tuition posts", "Verified tutor badge", "Manage student applications"], pro: true },
    ],
  },
  {
    title: "For Students",
    plans: [
      { name: "Free Student", price: "$0", features: ["Browse all tuitions", "Apply to tuitions", "Track application status"], pro: false },
      { name: "Pro Student", price: "$10", features: ["Priority booking", "Browse all tuitions", "Track application status"], pro: true },
    ],
  },
];

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
                  {plan.pro && <span className="badge badge-primary">Pro</span>}
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
                  {plan.pro ? (
                    <Link href="/pricing" className="btn btn-primary w-full">
                      Subscribe with Stripe
                    </Link>
                  ) : (
                    <Link href="/sign-up" className="btn btn-outline w-full">
                      Get Started
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
