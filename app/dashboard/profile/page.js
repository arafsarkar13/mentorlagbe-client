import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Only plain values are passed to the client component
  const profileUser = {
    name: user.name,
    email: user.email,
    image: user.image || "",
    phone: user.phone || "",
    bio: user.bio || "",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Update Profile</h1>
        <p className="mt-1 text-base-content/70">Keep your details up to date.</p>
      </div>
      <ProfileForm user={profileUser} />
    </div>
  );
}
