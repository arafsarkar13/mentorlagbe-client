import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";

export default async function DashboardIndex() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  redirect(`/dashboard/${user.role}`);
}
