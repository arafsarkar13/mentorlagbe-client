import Link from "next/link";
import TuitionCard from "@/components/TuitionCard";

export default function FeaturedTuitions({ tuitions }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Featured Tuitions</h2>
          <p className="mt-2 text-base-content/70">The newest approved tuition batches.</p>
        </div>
        <Link href="/tuitions" className="btn btn-outline btn-sm">View All</Link>
      </div>

      {tuitions.length === 0 ? (
        <p className="glass p-8 text-center text-base-content/70">
          No tuitions available right now. Please check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}
    </section>
  );
}
