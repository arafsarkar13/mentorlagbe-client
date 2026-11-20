import Link from "next/link";

const subjects = [
  { name: "Mathematics", icon: "∑", text: "From Class 6 to university calculus" },
  { name: "Physics", icon: "⚛", text: "Concepts and numericals made clear" },
  { name: "Programming", icon: "</>", text: "Python, web development and more" },
  { name: "IELTS", icon: "A+", text: "Band 7+ preparation with mock tests" },
];

export default function SubjectsAndStats({ stats }) {
  const counters = [
    { label: "Verified Tutors", value: stats.tutors },
    { label: "Students Joined", value: stats.students },
    { label: "Active Tuitions", value: stats.tuitions },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Top Subjects</h2>
        <p className="mt-2 text-base-content/70">Popular categories students search for every day.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject) => (
          <Link
            key={subject.name}
            href={`/tuitions?subject=${subject.name}`}
            className="glass block h-full p-6 transition hover:-translate-y-1 hover:border-primary/50"
          >
            <div className="text-3xl font-bold text-primary">{subject.icon}</div>
            <h3 className="mt-3 text-lg font-semibold">{subject.name}</h3>
            <p className="mt-1 text-sm text-base-content/70">{subject.text}</p>
          </Link>
        ))}
      </div>

      <div className="glass mt-10 grid gap-6 p-8 text-center sm:grid-cols-3">
        {counters.map((counter) => (
          <div key={counter.label}>
            <p className="text-4xl font-bold text-primary">{counter.value}+</p>
            <p className="mt-1 text-sm text-base-content/70">{counter.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
