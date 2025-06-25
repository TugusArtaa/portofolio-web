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
          className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg border border-white/20 dark:border-slate-700/50"
        >
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/50 ${
          isCollapsed ? "w-16" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{
          transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/20 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
            </div>
            <span
              className={`font-bold text-slate-900 dark:text-white whitespace-nowrap ${
                isCollapsed
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto"
              }`}
              style={{
                transition:
                  "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              Halaman Admin
            </span>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 text-slate-500"
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
            className="hidden lg:block p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
          >
            <svg
              className={`w-4 h-4 text-slate-500 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              style={{
                transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
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

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-blue-500/25`
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  }`}
                >
                  {item.icon}
                </div>

                <span
                  className={`font-medium whitespace-nowrap ${
                    isCollapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto"
                  }`}
                  style={{
                    transition:
                      "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {item.name}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <div
                    className={`absolute right-2 w-2 h-2 bg-white rounded-full ${
                      isCollapsed ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      transition: "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  ></div>
                )}
              </Link>
            );
          })}

          {/* Quick Stats - Tepat setelah menu navigation */}
          {!isCollapsed && (
            <div className="pt-4 mt-4 border-t border-white/20 dark:border-slate-700/50">
              <div className="grid grid-cols-2 gap-2">
                {/* Total Proyek */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-2 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center mb-1">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-0.5">
                      Proyek
                    </p>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
                      {stats.isLoading ? "..." : stats.projects}
                    </p>
                  </div>
                </div>

                {/* Total Skills */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-2 border border-amber-100 dark:border-amber-800/30">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-5 h-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-md flex items-center justify-center mb-1">
                      <svg
                        className="w-2.5 h-2.5 text-white"
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
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-0.5">
                      Skills
                    </p>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                      {stats.isLoading ? "..." : stats.skills}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Enhanced Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-white/20 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
          <div
            className={`flex items-center gap-3 px-3 py-2 ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xs">AD</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
            </div>
            <div
              className={`${
                isCollapsed
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto"
              }`}
              style={{
                transition:
                  "opacity 500ms cubic-bezier(0.4, 0, 0.2, 1), width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Admin
                </p>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Online -{" "}
                {new Date().toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
