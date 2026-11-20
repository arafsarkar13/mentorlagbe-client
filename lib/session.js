import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Returns the logged-in user (or null)
export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}

// Use at the top of a role page: sends visitors with the wrong role to their own dashboard
export async function requireRole(role) {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  if (user.role !== role) redirect("/dashboard");
  return user;
}
