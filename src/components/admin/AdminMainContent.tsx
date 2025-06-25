"use client";

import { useSidebar } from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminMainContentProps {
  session: any;
  children: React.ReactNode;
}

export default function AdminMainContent({
  session,
  children,
}: AdminMainContentProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`flex-1 min-h-screen transition-[margin] duration-500 ease-in-out ${
        isCollapsed ? "lg:ml-16" : "lg:ml-64"
      }`}
      style={{
        transitionProperty: "margin-left",
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Header */}
      <AdminHeader session={session} />

      {/* Page Content */}
      <main className="pt-4">{children}</main>
    </div>
  );
}
