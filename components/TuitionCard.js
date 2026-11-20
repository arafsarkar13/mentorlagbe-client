import Link from "next/link";
import { formatFee } from "@/lib/publicApi";

export default function TuitionCard({ tuition }) {
  return (
    <article className="glass flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:border-primary/50">
      <img
        src={tuition.bannerImage}
        alt={tuition.title}
        className="aspect-video w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-primary badge-outline px-3">{tuition.subject}</span>
          <span className="badge badge-ghost px-3">{tuition.classLevel}</span>
          <span className={`badge px-3 ${tuition.mode === "Online" ? "badge-info" : "badge-warning"}`}>
            {tuition.mode}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] text-lg font-semibold">
          {tuition.title}
        </h3>
        <p className="mt-1 text-sm text-base-content/70">by {tuition.tutorName}</p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-xl font-bold text-primary">
            {formatFee(tuition.monthlyFee)}
            <span className="text-sm font-normal text-base-content/60"> / month</span>
          </p>
          <Link href={`/tuitions/${tuition._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
