// Sidebar links for each role. New dashboard pages are added here.
export const dashboardLinks = {
  student: [
    { label: "Overview", href: "/dashboard/student", icon: "▦" },
    { label: "My Applications", href: "/dashboard/student/my-applications", icon: "☰" },
    { label: "Update Profile", href: "/dashboard/profile", icon: "✎" },
  ],
  tutor: [
    { label: "Overview", href: "/dashboard/tutor", icon: "▦" },
    { label: "Update Profile", href: "/dashboard/profile", icon: "✎" },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: "▦" },
    { label: "Update Profile", href: "/dashboard/profile", icon: "✎" },
  ],
};
