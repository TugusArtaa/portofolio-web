import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminSidebar, { SidebarProvider } from "@/components/admin/AdminSidebar";
import AdminMainContent from "@/components/admin/AdminMainContent";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
        <div className="flex">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content */}
          <AdminMainContent session={session}>{children}</AdminMainContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
