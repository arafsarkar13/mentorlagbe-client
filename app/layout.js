import "./globals.css";

export const metadata = {
  title: "MentorLagbe | Smart Tuition & Mentorship Platform",
  description:
    "Find verified tutors by subject, class level and mode, or post your own tuition batches.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mentor-dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
