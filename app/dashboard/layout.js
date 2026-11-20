import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Only plain values are passed to the client component
  const shellUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image || null,
    role: user.role,
    plan: user.plan || "free",
  };

  return <DashboardShell user={shellUser}>{children}</DashboardShell>;
}
