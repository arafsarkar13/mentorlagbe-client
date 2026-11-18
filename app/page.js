const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Asks the Express server if it is alive, so we can see the connection works.
async function getServerStatus() {
  try {
    const res = await fetch(`${API_URL}/health`, { cache: "no-store" });
    return res.ok;
  } catch (error) {
    return false;
  }
}

export default async function Home() {
  const serverOnline = await getServerStatus();

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl items-center px-4">
      <section className="glass w-full p-8 md:p-12">
        <h1 className="text-4xl font-bold md:text-5xl">MentorLagbe</h1>
        <p className="mt-4 max-w-xl text-base-content/80">
          Find a verified tutor by subject, class level and mode, or post your
          own tuition batch. The full platform is being built; this page
          confirms the project is live.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span
            className={`badge badge-lg badge-outline ${
              serverOnline ? "badge-success" : "badge-error"
            }`}
          >
            {serverOnline ? "Server online" : "Server offline"}
          </span>
          <a href="/tuitions" className="btn btn-primary">Browse Tuitions</a>
        </div>
      </section>
    </main>
  );
}
