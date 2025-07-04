"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import GridBackground from "@/components/ui/grid-background";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">{children}</div>
    );
  }

  return (
    <>
      {/* Grid Background - Fixed but behind everything */}
      <GridBackground />

      {/* Content */}
      <div className="relative z-10">
        <Navbar className="" />
        <main className="px-4">{children}</main>
        <Footer />
      </div>
    </>
  );
}
