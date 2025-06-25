"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardStats {
  projects: number;
  skills: number;
  views: number;
  lastUpdated: string;
  recentProjects: any[];
  isLoading: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    views: 0,
    lastUpdated: "",
    recentProjects: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, skillsRes] = await Promise.all([
          fetch("/api/project"),
          fetch("/api/skills"),
        ]);

        const projects = await projectsRes.json();
        const skills = await skillsRes.json();

        // Get recent projects (last 3)
        const recentProjects = projects
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        // Calculate total unique tech stack from all projects
        const allTechStacks = projects.flatMap(
          (project: any) => project.techStack || []
        );
        const uniqueTechStacks = [...new Set(allTechStacks)];

        setStats({
          projects: projects.length || 0,
          skills: skills.length || 0,
          views: uniqueTechStacks.length || 0, // Changed to use tech stack count
          lastUpdated: new Date().toLocaleDateString("id-ID"),
          recentProjects,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStats((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const statsCards = [
    {
      title: "Total Proyek",
      value: stats.projects,
      change: stats.projects > 0 ? `${stats.projects} proyek` : "Belum ada",
      trend: "neutral",
      icon: (
        <svg
          className="w-8 h-8"
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
      bgGradient: "from-blue-500 via-blue-600 to-blue-700",
      textColor: "text-blue-600",
      lightBg: "from-blue-50 to-blue-100",
      darkBg: "from-blue-900/20 to-blue-800/30",
      href: "/admin/projects",
    },
    {
      title: "Skills Aktif",
      value: stats.skills,
      change: stats.skills > 0 ? `${stats.skills} skills` : "Belum ada",
      trend: "neutral",
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      bgGradient: "from-emerald-500 via-emerald-600 to-emerald-700",
      textColor: "text-emerald-600",
      lightBg: "from-emerald-50 to-emerald-100",
      darkBg: "from-emerald-900/20 to-emerald-800/30",
      href: "/admin/skills",
    },
    {
      title: "Tech Stack",
      value: stats.views,
      change: stats.views > 0 ? `${stats.views} teknologi` : "Belum ada",
      trend: "neutral",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      bgGradient: "from-purple-500 via-purple-600 to-purple-700",
      textColor: "text-purple-600",
      lightBg: "from-purple-50 to-purple-100",
      darkBg: "from-purple-900/20 to-purple-800/30",
      href: "/admin/projects",
    },
    {
      title: "Proyek Terbaru",
      value: stats.recentProjects.length,
      change:
        stats.recentProjects.length > 0
          ? `${stats.recentProjects.length} terbaru`
          : "Belum ada",
      trend: "neutral",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgGradient: "from-amber-500 via-amber-600 to-amber-700",
      textColor: "text-amber-600",
      lightBg: "from-amber-50 to-amber-100",
      darkBg: "from-amber-900/20 to-amber-800/30",
      href: "/admin/projects",
    },
  ];

  const quickActions = [
    {
      title: "Tambah Proyek",
      description: "Buat proyek baru",
      href: "/admin/projects/new",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Kelola Skills",
      description: "Update keahlian",
      href: "/admin/skills",
      icon: (
        <svg
          className="w-6 h-6"
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
      gradient: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Edit Profil",
      description: "Update info personal",
      href: "/admin/about",
      icon: (
        <svg
          className="w-6 h-6"
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
      gradient: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Pengaturan",
      description: "Konfigurasi sistem",
      href: "/admin/settings",
      icon: (
        <svg
          className="w-6 h-6"
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
        </svg>
      ),
      gradient: "from-slate-500 to-slate-600",
      textColor: "text-slate-600 dark:text-slate-400",
    },
  ];

  if (stats.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              {/* Header skeleton */}
              <div className="space-y-3">
                <div className="h-10 bg-white/60 dark:bg-slate-700/60 rounded-2xl w-1/3"></div>
                <div className="h-6 bg-white/40 dark:bg-slate-700/40 rounded-xl w-1/2"></div>
              </div>

              {/* Stats cards skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-40 bg-white/60 dark:bg-slate-700/60 rounded-3xl"
                  ></div>
                ))}
              </div>

              {/* Quick actions skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-white/60 dark:bg-slate-700/60 rounded-2xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Enhanced Welcome Section*/}
          <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-md p-6 sm:p-8 lg:p-10 mb-8 overflow-hidden">
            {/* Background decoration - matching PageHeader */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
                  Selamat Datang Kembali!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg lg:text-xl font-medium">
                  Kelola portfolio Anda dengan mudah dan efisien
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Terakhir diperbarui: {stats.lastUpdated}</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-slate-100/50 dark:bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-slate-200/50 dark:border-slate-600/50">
                  <svg
                    className="w-16 h-16 text-slate-600 dark:text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((card, index) => (
              <Link key={card.title} href={card.href}>
                <div
                  className={`group relative overflow-hidden bg-gradient-to-br ${card.lightBg} dark:${card.darkBg} backdrop-blur-sm shadow-md rounded-3xl p-6 border dark:border-slate-700/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-200 hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${card.bgGradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                      >
                        {card.icon}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {card.change}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p
                        className={`text-3xl lg:text-4xl font-bold ${card.textColor} dark:text-white`}
                      >
                        {card.value}
                      </p>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {card.title}
                      </p>
                    </div>

                    {/* Progress bar - only show if there's data */}
                    {card.value > 0 && (
                      <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${card.bgGradient} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: `${Math.min(100, (card.value / 10) * 100)}%`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Enhanced Quick Actions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Aksi Cepat
              </h2>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-sm font-medium">Produktivitas</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={action.title} href={action.href}>
                  <div className="group relative overflow-hidden shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/50 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200`}
                        >
                          {action.icon}
                        </div>
                        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                          <svg
                            className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
