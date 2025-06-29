"use client";

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative mt-20 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-700/50">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start space-x-2 text-xs lg:text-sm text-slate-600 dark:text-slate-400">
            <span>
              &copy; {new Date().getFullYear()} I Putu Agus Seniartawan.
            </span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">
              •
            </span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          {/* Additional Legal Text */}
          <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-500 text-center sm:text-right">
            <span>Made with</span>
            <HeartIcon className="w-3 h-3 text-slate-500 dark:text-slate-500 inline mx-1" />
            <span>in Bali, Indonesia</span>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-0 right-0 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </footer>
  );
}
