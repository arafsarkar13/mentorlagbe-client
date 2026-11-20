import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <div>
        <span className="badge badge-primary badge-outline mb-5">
          Smart Tuition & Mentorship Platform
        </span>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Find Your Ideal Tutor or Mentorship Batch{" "}
          <span className="text-primary">Today</span>
        </h1>
        <p className="mt-5 max-w-lg text-base-content/75">
          Search verified tutors by subject, class level and mode. Apply in one
          click and track your application in real time.
        </p>

        <form action="/tuitions" className="mt-8 flex max-w-lg gap-2">
          <input
            name="search"
            placeholder="Search by title or subject..."
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/tuitions" className="btn btn-primary">Browse Tuitions</Link>
          <Link href="/sign-up" className="btn btn-outline">Become a Tutor</Link>
        </div>
      </div>

      {/* Illustration made of glass cards */}
      <div className="relative mx-auto h-80 w-full max-w-md">
        <div className="absolute left-0 top-4 w-64 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
          <p className="text-xs text-primary">Mathematics · Class 11-12</p>
          <p className="mt-1 font-semibold">HSC Higher Math Batch</p>
          <p className="mt-3 text-lg font-bold">৳4,500<span className="text-xs font-normal opacity-60"> / month</span></p>
        </div>
        <div className="absolute right-0 top-28 w-60 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">R</div>
            <div>
              <p className="text-sm font-semibold">Rahim Uddin</p>
              <p className="text-xs text-primary">Verified Pro Tutor</p>
            </div>
          </div>
          <p className="mt-3 text-xs opacity-70">6 years of teaching experience</p>
        </div>
        <div className="absolute bottom-0 left-10 w-56 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
          <p className="text-xs opacity-70">Application status</p>
          <p className="mt-1 font-semibold">Accepted ✓</p>
          <progress className="progress progress-primary mt-3 w-full" value="100" max="100"></progress>
        </div>
      </div>
    </section>
  );
}
