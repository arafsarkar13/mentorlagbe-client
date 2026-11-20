"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { dashboardLinks } from "@/lib/dashboardLinks";

const roleBadge = { student: "badge-info", tutor: "badge-primary", admin: "badge-warning" };

export default function DashboardShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false); // sidebar open/collapsed

  // Open by default on large screens, closed on phones and tablets
  useEffect(() => {
    if (window.innerWidth >= 1024) setOpen(true);
  }, []);
  const links = dashboardLinks[user.role] || [];

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen">
      {/* Dark backdrop for the mobile menu */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`glass fixed inset-y-3 left-3 z-40 flex flex-col overflow-hidden bg-base-200/80 transition-all duration-300 ${
          open ? "w-64 translate-x-0" : "-translate-x-[120%] lg:w-20 lg:translate-x-0"
        }`}
      >
        <Link href="/" className="flex h-16 items-center px-5 text-2xl font-bold">
          {open ? (
            <span>Mentor<span className="text-primary">Lagbe</span></span>
          ) : (
            <span className="text-primary">M</span>
          )}
        </Link>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => window.innerWidth < 1024 && setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                pathname === link.href
                  ? "bg-primary text-primary-content font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="w-5 text-center text-base">{link.icon}</span>
              {open && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-white/10">
            <span className="w-5 text-center text-base">⌂</span>
            {open && <span>Back to Website</span>}
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className={`transition-all duration-300 ${open ? "lg:ml-72" : "lg:ml-28"}`}>
        {/* Top bar */}
        <header className="glass sticky top-3 z-20 mx-3 mt-3 flex items-center justify-between px-4 py-3 lg:ml-0">
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-ghost btn-square btn-sm"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end gap-1 sm:flex">
              <p className="text-sm font-semibold leading-tight">{user.name}</p>
              <div className="flex gap-1">
                <span className={`badge badge-sm px-2 capitalize ${roleBadge[user.role] || "badge-ghost"}`}>
                  {user.role}
                </span>
                <span className="badge badge-sm badge-outline px-2 uppercase">{user.plan || "free"}</span>
              </div>
            </div>
            <div className="avatar avatar-placeholder">
              {user.image ? (
                <div className="w-10 rounded-full">
                  <img src={user.image} alt={user.name} />
                </div>
              ) : (
                <div className="w-10 rounded-full bg-primary text-primary-content">
                  <span>{user.name?.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
            <button onClick={handleSignOut} className="btn btn-outline btn-sm">Sign Out</button>
          </div>
        </header>

        <main className="p-3 pb-10 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
