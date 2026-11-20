const reviews = [
  { name: "Arif Hossain", role: "HSC Student", text: "I found a Math tutor near my home in one evening. Applying and tracking the status was very easy." },
  { name: "Rahim Uddin", role: "Pro Tutor", text: "My batch filled up within two weeks. Managing applications from the dashboard saves me a lot of time." },
  { name: "Mim Akter", role: "Class 9 Student", text: "The spoken English course gave me real confidence. I love that every tutor is approved before listing." },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">What Our Community Says</h2>
        <p className="mt-2 text-base-content/70">Feedback from students and tutors.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.name} className="glass flex h-full flex-col p-6">
            <p className="text-2xl text-primary">★★★★★</p>
            <p className="mt-3 text-sm text-base-content/80">“{review.text}”</p>
            <div className="mt-auto flex items-center gap-3 pt-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{review.name}</p>
                <p className="text-xs text-base-content/60">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
