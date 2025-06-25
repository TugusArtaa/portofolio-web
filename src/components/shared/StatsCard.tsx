"use client";

import Link from "next/link";

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: string;
  icon: React.ReactNode;
  bgGradient: string;
  textColor: string;
  lightBg: string;
  darkBg: string;
  href?: string;
  showProgressBar?: boolean;
  isLoading?: boolean;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  bgGradient,
  textColor,
  lightBg,
  darkBg,
  href,
  showProgressBar = false,
  isLoading = false,
  className = "",
}: StatsCardProps) {
  const cardContent = (
    <div
      className={`group relative overflow-hidden bg-gradient-to-br ${lightBg} dark:${darkBg} backdrop-blur-sm shadow-md rounded-3xl p-6 border dark:border-slate-700/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-200 hover:-translate-y-2 ${
        href ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-14 h-14 bg-gradient-to-br ${bgGradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
          >
            {icon}
          </div>
          {change && (
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {change}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p
            className={`text-3xl lg:text-4xl font-bold ${textColor} dark:text-white`}
          >
            {isLoading ? "..." : value}
          </p>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
        </div>

        {/* Progress bar */}
        {showProgressBar && typeof value === "number" && value > 0 && (
          <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${bgGradient} rounded-full transition-all duration-1000 ease-out`}
              style={{
                width: `${Math.min(100, (value / 10) * 100)}%`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
