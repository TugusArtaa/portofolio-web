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
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Selamat Datang di Dashboard! 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Kelola portfolio Anda dengan mudah. Terakhir diperbarui:{" "}
            {stats.lastUpdated}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Projects Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <Link
                href="/admin/projects"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                {stats.projects}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Total Proyek
              </p>
            </div>
          </div>

          {/* Skills Stats */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <Link
                href="/admin/skills"
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                {stats.skills}
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                Skills Aktif
              </p>
            </div>
          </div>

          {/* Tech Stack Stats - Updated from Views */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-100 dark:border-violet-800/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div className="text-violet-500 dark:text-violet-400">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-violet-700 dark:text-violet-300 mb-1">
                {stats.views}
              </p>
              <p className="text-sm text-violet-600 dark:text-violet-400 font-medium">
                Tech Stack
              </p>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="text-amber-500 dark:text-amber-400">
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
                    d="M5 3l14 9-14 9V3z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-bold text-amber-700 dark:text-amber-300 mb-1">
                {Math.floor(Math.random() * 40) + 60}%
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                Performance
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}
                  >
                    {action.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        {stats.recentProjects.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Proyek Terbaru
              </h2>
              <Link
                href="/admin/projects"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
              >
                Lihat Semua
                <svg
                  className="w-4 h-4"
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
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack?.slice(0, 2).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack?.length > 2 && (
                        <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">
                          +{project.techStack.length - 2}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
