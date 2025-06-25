"use client";

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "form";
  count?: number;
}

export default function LoadingSkeleton({
  variant = "card",
  count = 6,
}: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(count)].map((_, i) => (
              <div
                key={i}
                className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-slate-700/50 p-6 animate-pulse"
              >
                <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Add other variants as needed
  return null;
}
