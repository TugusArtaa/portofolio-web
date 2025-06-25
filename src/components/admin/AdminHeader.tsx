"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

interface AdminHeaderProps {
  session: any;
}

export default function AdminHeader({ session }: AdminHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Handle client-side mounting
  useEffect(() => {
    setIsClient(true);

    // Update time immediately
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();

    // Update time every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get page info based on pathname
  const getPageInfo = () => {
    if (pathname === "/admin/dashboard") {
      return {
        title: "Dashboard",
        subtitle: "Ringkasan dan overview sistem",
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
        breadcrumb: [{ name: "Dashboard", href: "/admin/dashboard" }],
      };
    } else if (pathname.startsWith("/admin/projects")) {
      const isNew = pathname.includes("/new");
      const isEdit = pathname.includes("/edit");
      return {
        title: isNew
          ? "Tambah Proyek"
          : isEdit
          ? "Edit Proyek"
          : "Manajemen Proyek",
        subtitle: isNew
          ? "Buat proyek baru"
          : isEdit
          ? "Edit detail proyek"
          : "Kelola semua proyek Anda",
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        ),
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Proyek", href: "/admin/projects" },
          ...(isNew ? [{ name: "Tambah Proyek", href: pathname }] : []),
          ...(isEdit ? [{ name: "Edit Proyek", href: pathname }] : []),
        ],
      };
    } else if (pathname.startsWith("/admin/skills")) {
      return {
        title: "Manajemen Skills",
        subtitle: "Kelola keahlian dan kemampuan",
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
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Skills", href: "/admin/skills" },
        ],
      };
    } else if (pathname.startsWith("/admin/about")) {
      return {
        title: "Tentang Saya",
        subtitle: "Edit profil dan informasi personal",
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
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Tentang Saya", href: "/admin/about" },
        ],
      };
    } else if (pathname.startsWith("/admin/settings")) {
      return {
        title: "Pengaturan",
        subtitle: "Konfigurasi sistem dan preferensi",
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
        breadcrumb: [
          { name: "Dashboard", href: "/admin" },
          { name: "Pengaturan", href: "/admin/settings" },
        ],
      };
    }
    return {
      title: "Admin Panel",
      subtitle: "Kelola konten website Anda",
      icon: null,
      breadcrumb: [],
    };
  };

  const pageInfo = getPageInfo();

  return (
    <header className="sticky top-0 z-10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/50">
      <div className="px-4 lg:px-6 py-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Breadcrumb Section */}
          <div className="flex items-center gap-4">
            {/* Mobile hamburger space */}
            <div className="w-12 md:hidden"></div>

            {/* Mobile title - only visible on mobile */}
            <div className="md:hidden">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Halaman Admin
              </h1>
            </div>

            {/* Breadcrumb Navigation - hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              {pageInfo.breadcrumb.map((item, index) => (
                <div key={item.href} className="flex items-center">
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 text-slate-400 mx-2"
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
                  )}
                  {index === pageInfo.breadcrumb.length - 1 ? (
                    <span className="text-slate-900 dark:text-white font-semibold text-lg">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Time Display - Hidden on mobile, only render on client */}
            {isClient && (
              <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 rounded-lg">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{currentTime}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications - Hidden on mobile */}
            <button className="hidden sm:block relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50">
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
                  d="M15 17h5l-5-5V9a5 5 0 00-10 0v3L0 17h5m10 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {session?.user?.name?.[0] || "A"}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Online
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-slate-700/50 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/admin/settings"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Pengaturan
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
