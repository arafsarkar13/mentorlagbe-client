import Link from "next/link";
import TuitionCard from "@/components/TuitionCard";
import { getPublic } from "@/lib/publicApi";

export const metadata = { title: "Browse Tuitions | MentorLagbe" };

// Build a link that keeps the current search and filters
function pageLink(params, page) {
  const query = new URLSearchParams();
  ["search", "subject", "classLevel", "mode"].forEach((key) => {
    if (params[key]) query.set(key, params[key]);
  });
  query.set("page", page);
  return `/tuitions?${query.toString()}`;
}

export default async function BrowseTuitionsPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(parseInt(params.page) || 1, 1);

  // The server does the searching and filtering (not the browser)
  const query = new URLSearchParams({ page, limit: 9 });
  ["search", "subject", "classLevel", "mode"].forEach((key) => {
    if (params[key]) query.set(key, params[key]);
  });

  const [data, filters] = await Promise.all([
    getPublic(`/api/tuitions?${query.toString()}`),
    getPublic("/api/tuitions/filters"),
  ]);

  const tuitions = data?.tuitions || [];
  const totalPages = data?.totalPages || 1;
  const subjects = filters?.subjects || [];
  const classLevels = filters?.classLevels || [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Browse Tuitions</h1>
      <p className="mt-2 text-base-content/70">
        {data ? `${data.total} tuition${data.total === 1 ? "" : "s"} found` : "Could not load tuitions"}
      </p>

      {/* Search + filters (a normal GET form, so the URL can be shared and reloaded) */}
      <form action="/tuitions" className="glass mt-6 grid gap-3 p-5 md:grid-cols-5">
        <input
          name="search"
          defaultValue={params.search || ""}
          placeholder="Search title or subject"
          className="input input-bordered w-full md:col-span-2"
        />
        <select name="subject" defaultValue={params.subject || ""} className="select select-bordered w-full">
          <option value="">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        <select name="classLevel" defaultValue={params.classLevel || ""} className="select select-bordered w-full">
          <option value="">All Class Levels</option>
          {classLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <select name="mode" defaultValue={params.mode || ""} className="select select-bordered w-full">
          <option value="">Online & Offline</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
        <div className="flex gap-3 md:col-span-5">
          <button type="submit" className="btn btn-primary">Apply Filters</button>
          <Link href="/tuitions" className="btn btn-ghost">Reset</Link>
        </div>
      </form>

      {tuitions.length === 0 ? (
        <div className="glass mt-8 p-10 text-center">
          <p className="text-lg font-semibold">No tuitions match your search</p>
          <p className="mt-1 text-sm text-base-content/70">Try different keywords or reset the filters.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <div className="join">
            {page > 1 ? (
              <Link href={pageLink(params, page - 1)} className="btn join-item">Previous</Link>
            ) : (
              <button className="btn join-item" disabled>Previous</button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <Link
                key={number}
                href={pageLink(params, number)}
                className={`btn join-item ${number === page ? "btn-primary" : ""}`}
              >
                {number}
              </Link>
            ))}
            {page < totalPages ? (
              <Link href={pageLink(params, page + 1)} className="btn join-item">Next</Link>
            ) : (
              <button className="btn join-item" disabled>Next</button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
