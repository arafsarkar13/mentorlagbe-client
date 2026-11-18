import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <section className="glass p-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <p className="mt-2 text-base-content/70">
          You are signed in as <span className="badge badge-primary capitalize">{user.role}</span>.
          Your role dashboard will appear here in the next phases.
        </p>
      </section>
    </main>
  );
}
