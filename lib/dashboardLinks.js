// Sidebar links for each role. New dashboard pages are added here.
export const dashboardLinks = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: "▦" },
    { label: "My Applications", href: "/dashboard/student/my-applications", icon: "☰" },
    { label: "Update Profile", href: "/dashboard/profile", icon: "✎" },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", icon: "▦" },
    { label: "Post a Tuition", href: "/dashboard/tutor/post-tuition", icon: "＋" },
    { label: "My Tuitions", href: "/dashboard/tutor/my-tuitions", icon: "☰" },
    { label: "Applicants", href: "/dashboard/tutor/applicants", icon: "☺" },
    { label: "Update Profile", href: "/dashboard/profile", icon: "✎" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: "▦" },
    { label: "Users", href: "/dashboard/admin/users", icon: "☺" },
    { label: "Tuitions", href: "/dashboard/admin/tuitions", icon: "☰" },
    { label: "Transactions", href: "/dashboard/admin/transactions", icon: "$" },
    { label: "Update Profile", href: "/dashboard/profile", icon: "✎" },
  ],
};
