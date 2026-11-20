import "./globals.css";
import { Toaster } from "react-hot-toast";
import SiteShell from "@/components/SiteShell";

export const metadata = {
  title: "MentorLagbe | Smart Tuition & Mentorship Platform",
  description:
    "Find verified tutors by subject, class level and mode, or post your own tuition batches.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mentor-dark">
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111a33",
              color: "#e8eef9",
              border: "1px solid rgba(255,255,255,0.14)",
            },
          }}
        />
      </body>
    </html>
  );
}
