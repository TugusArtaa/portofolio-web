"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "../admin/ThemeToggle";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/projects", label: "Proyek" },
  { href: "/contact", label: "Kontak" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              Portfolio
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm hover:underline",
                  pathname === link.href
                    ? "font-semibold underline"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
