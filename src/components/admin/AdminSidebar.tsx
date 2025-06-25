"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";

// Create context for sidebar state
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    totalTechStack: 0,
    isLoading: true,
  });

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch("/api/project"),
          fetch("/api/skills"),
        ]);

        const projects = await projectsRes.json();
        const skills = await skillsRes.json();

        // Calculate total unique tech stack from all projects
        const allTechStacks = projects.flatMap(
          (project: any) => project.techStack || []
        );
        const uniqueTechStacks = [...new Set(allTechStacks)];

        setStats({
          projects: projects.length || 0,
          skills: skills.length || 0,
          totalTechStack: uniqueTechStacks.length || 0,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v1H8V5z"
          />
        </svg>
      ),
      badge: null,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Proyek",
      href: "/admin/projects",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      badge: stats.projects,
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Skills",
      href: "/admin/skills",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      badge: stats.skills,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      name: "Tentang Saya",
      href: "/admin/about",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      badge: null,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      name: "Pengaturan",
      href: "/admin/settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      badge: null,
      gradient: "from-slate-500 to-slate-600",
    },
  ];

  return (
    <>
      {/* Mobile menu button - only show when sidebar is closed */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-40 lg:hidden p-3 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg shadow-blue-500/25 transition-transform duration-200 hover:scale-105"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 shadow-md ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-[width,transform] duration-200 ease-in-out flex flex-col`}
      >
        {/* Logo Header - Fixed height yang sama dengan AdminHeader */}
        {!isCollapsed ? (
          <div className="relative h-[73px] px-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 flex-shrink-0">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-indigo-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>

            <div className="relative flex items-center justify-between h-full">
              <div className="flex items-center gap-4">
                {/* Modern Logo */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-200"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-200 group-hover:scale-105">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Brand Text */}
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
                    Portfolio
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Admin Dashboard
                  </p>
                </div>
              </div>

              {/* Close button for mobile */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50"
              >
                <svg
                  className="w-5 h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Desktop collapse button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105"
              >
                <svg
                  className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform duration-200 ${
                    isCollapsed ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* Collapsed Header - Same height */
          <div className="h-[73px] flex items-center justify-center border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 flex-shrink-0">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-colors duration-200 hover:scale-105 group"
            >
              <svg
                className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" &&
                pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center rounded-xl transition-colors duration-200 ${
                  isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-3 py-2.5"
                } ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-md shadow-blue-500/25 scale-105`
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white hover:scale-105"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div
                  className={`flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  }`}
                >
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <>
                    <span className="font-medium whitespace-nowrap flex-1">
                      {item.name}
                    </span>

                    {/* Badge */}
                    {item.badge !== null && (
                      <div
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {stats.isLoading ? "..." : item.badge}
                      </div>
                    )}
                  </>
                )}

                {/* Glow effect for active item */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-sm -z-10"></div>
                )}
              </Link>
            );
          })}

          {/* Quick Stats - Enhanced Design */}
          {!isCollapsed && (
            <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="mb-4">
                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 0a6 6 0 100 12A6 6 0 006 0zM5 3.5A.5.5 0 015.5 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM5 6.5A.5.5 0 015.5 6h1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-2z" />
                  </svg>
                  Quick Stats
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Enhanced Stats Cards */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl blur opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-3 border border-blue-100 dark:border-blue-800/30 hover:border-blue-300 dark:hover:border-blue-600/50 group-hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 shadow-lg group-hover:shadow-blue-500/25">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
                        Proyek
                      </p>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        {stats.isLoading ? "..." : stats.projects}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl blur opacity-0 group-hover:opacity-100"></div>
                  <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-3 border border-amber-100 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-600/50 group-hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-2 shadow-lg group-hover:shadow-amber-500/25">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">
                        Skills
                      </p>
                      <p className="text-lg font-bold text-amber-700 dark:text-amber-300">
                        {stats.isLoading ? "..." : stats.skills}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
