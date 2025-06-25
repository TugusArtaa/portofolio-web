"use client";

interface StatItem {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  bgGradient: string;
  textColor: string;
  lightBg: string;
  darkBg: string;
  borderColor: string;
  hoverBorderColor: string;
  shadowColor: string;
}

interface SidebarStatsProps {
  stats: StatItem[];
  isLoading?: boolean;
  title?: string;
  className?: string;
}

export default function SidebarStats({
  stats,
  isLoading = false,
  title = "Quick Stats",
  className = "",
}: SidebarStatsProps) {
  return (
    <div
      className={`pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-700/50 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
            <path d="M6 0a6 6 0 100 12A6 6 0 006 0zM5 3.5A.5.5 0 015.5 3h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zM5 6.5A.5.5 0 015.5 6h1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-2z" />
          </svg>
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative group">
            <div
              className={`absolute inset-0 ${stat.bgGradient} rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
            ></div>
            <div
              className={`relative bg-gradient-to-br ${stat.lightBg} dark:${stat.darkBg} rounded-xl p-3 border ${stat.borderColor} hover:${stat.hoverBorderColor} transition-all duration-300 group-hover:scale-105`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-6 h-6 bg-gradient-to-br ${stat.bgGradient} rounded-lg flex items-center justify-center mb-2 shadow-lg group-hover:${stat.shadowColor} transition-shadow duration-200`}
                >
                  {stat.icon}
                </div>
                <p className={`text-xs ${stat.textColor} font-semibold mb-1`}>
                  {stat.label}
                </p>
                <p
                  className={`text-lg font-bold ${stat.textColor
                    .replace("600", "700")
                    .replace("400", "300")}`}
                >
                  {isLoading ? "..." : stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
