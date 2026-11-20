"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// The dashboard has its own sidebar and top bar, so the public navbar/footer are hidden there.
export default function SiteShell({ children }) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
