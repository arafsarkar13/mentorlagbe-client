import { notFound } from "next/navigation";
import { getPublic, formatFee } from "@/lib/publicApi";
import ApplyBox from "@/components/ApplyBox";

export const metadata = { title: "Tuition Details | MentorLagbe" };

export default async function TuitionDetailsPage({ params }) {
  const { id } = await params;
  const data = await getPublic(`/api/tuitions/${id}`);

  if (!data) {
    notFound();
  }

  const { tuition, tutor } = data;
  const postedOn = new Date(tuition.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const info = [
    { label: "Subject", value: tuition.subject },
    { label: "Class Level", value: tuition.classLevel },
    { label: "Mode", value: tuition.mode },
    { label: "Location", value: tuition.location },
    { label: "Schedule", value: `${tuition.daysPerWeek} days / week` },
    { label: "Posted", value: postedOn },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: tuition information */}
        <div className="lg:col-span-2">
          <img
            src={tuition.bannerImage}
            alt={tuition.title}
            className="glass aspect-video w-full object-cover"
          />
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">{tuition.title}</h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {info.map((item) => (
              <div key={item.label} className="glass p-4">
                <p className="text-xs text-base-content/60">{item.label}</p>
                <p className="mt-1 font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-semibold">About this tuition</h2>
          <p className="mt-2 leading-relaxed text-base-content/80">{tuition.description}</p>
        </div>

        {/* Right: fee, tutor and apply */}
        <aside className="space-y-6">
          <div className="glass p-6">
            <p className="text-sm text-base-content/60">Monthly Fee</p>
            <p className="text-4xl font-bold text-primary">{formatFee(tuition.monthlyFee)}</p>
            <ApplyBox tuitionId={String(tuition._id)} />
          </div>

          <div className="glass p-6">
            <h3 className="font-semibold">About the Tutor</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-content">
                {tuition.tutorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{tuition.tutorName}</p>
                {tutor?.plan === "pro" && (
                  <span className="badge badge-primary badge-sm">Verified Pro Tutor</span>
                )}
              </div>
            </div>
            {tutor?.bio && (
              <p className="mt-4 text-sm text-base-content/75">{tutor.bio}</p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
