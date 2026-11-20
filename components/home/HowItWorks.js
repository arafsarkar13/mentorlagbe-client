const steps = [
  { number: "1", title: "Create an account", text: "Sign up as a student or a tutor in less than a minute." },
  { number: "2", title: "Post or search", text: "Tutors post tuition batches. Students search and filter approved tuitions." },
  { number: "3", title: "Apply and manage", text: "Students apply with their schedule. Tutors accept or reject applications." },
  { number: "4", title: "Start learning", text: "Accepted students connect with the tutor and begin their sessions." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">How MentorLagbe Works</h2>
        <p className="mt-2 text-base-content/70">Four simple steps for students and tutors.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="glass h-full p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content">
              {step.number}
            </div>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
