"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Tuitions", href: "/tuitions" },
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/#how-it-works" },
];

const roleBadge = {
  student: "badge-info",
  tutor: "badge-primary",
  admin: "badge-warning",
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("Signed out successfully");
    router.push("/");
    router.refresh();
  }

  const links = navLinks.map((link) => (
    <li key={link.href}>
      <Link
        href={link.href}
        className={pathname === link.href ? "text-primary font-semibold" : ""}
      >
        {link.label}
      </Link>
    </li>
  ));

  return (
    <header className="glass sticky top-3 z-50 mx-3 mt-3 md:mx-auto md:max-w-6xl">
      <div className="navbar px-4">
        {/* Mobile menu + logo */}
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu dropdown-content glass mt-3 w-56 bg-base-200 p-2 shadow">
              {links}
              {!user && !isPending && (
                <li className="sm:hidden"><Link href="/sign-in">Sign In</Link></li>
              )}
            </ul>
          </div>
          <Link href="/" className="whitespace-nowrap text-2xl font-bold">
            Mentor<span className="text-primary">Lagbe</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{links}</ul>
        </div>

        {/* Right side */}
        <div className="navbar-end gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="flex items-center gap-3 rounded-full p-1 hover:bg-white/10">
                <div className="hidden flex-col items-end gap-1 sm:flex">
                  <p className="text-sm font-semibold leading-tight">{user.name}</p>
                  <span className={`badge badge-sm px-2 capitalize ${roleBadge[user.role] || "badge-ghost"}`}>
                    {user.role}
                  </span>
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
              </button>
              <ul tabIndex={0} className="menu dropdown-content glass mt-3 w-52 bg-base-200 p-2 shadow">
                <li className="menu-title sm:hidden">{user.name} ({user.role})</li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/profile">Update Profile</Link></li>
                <li><button onClick={handleSignOut}>Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-ghost btn-sm hidden sm:inline-flex">Sign In</Link>
              <Link href="/sign-up" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
