"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/shared/StatsCard";
import QuickActionCard from "@/components/shared/QuickActionCard";
import WelcomeSection from "@/components/shared/WelcomeSection";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";

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

  const statsCardsData = [
    {
      title: "Total Proyek",
      value: stats.projects,
      change: stats.projects > 0 ? `${stats.projects} proyek` : "Belum ada",
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
      showProgressBar: true,
    },
    {
      title: "Skills Aktif",
      value: stats.skills,
      change: stats.skills > 0 ? `${stats.skills} skills` : "Belum ada",
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
      showProgressBar: true,
    },
    {
      title: "Tech Stack",
      value: stats.views,
      change: stats.views > 0 ? `${stats.views} teknologi` : "Belum ada",
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
      showProgressBar: true,
    },
    {
      title: "Proyek Terbaru",
      value: stats.recentProjects.length,
      change:
        stats.recentProjects.length > 0
          ? `${stats.recentProjects.length} terbaru`
          : "Belum ada",
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
      showProgressBar: true,
    },
  ];

  const quickActionsData = [
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
    },
  ];

  if (stats.isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton variant="header" />
            <LoadingSkeleton variant="stats" count={4} />
            <LoadingSkeleton variant="quickActions" count={4} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <WelcomeSection
            title="Selamat Datang Kembali!"
            subtitle="Kelola portfolio Anda dengan mudah dan efisien"
            lastUpdated={stats.lastUpdated}
            icon={
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
            }
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCardsData.map((card) => (
              <StatsCard
                key={card.title}
                {...card}
                isLoading={stats.isLoading}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Aksi Cepat
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActionsData.map((action, index) => (
                <QuickActionCard key={action.title} {...action} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
