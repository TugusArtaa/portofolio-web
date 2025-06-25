"use client";

import Link from "next/link";

interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  index?: number;
  className?: string;
}

export default function QuickActionCard({
  title,
  description,
  href,
  icon,
  gradient,
  index = 0,
  className = "",
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <div
        className={`group relative overflow-hidden shadow-md bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-200 ${className}`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50/50 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200`}
            >
              {icon}
            </div>
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors duration-200"
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
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
