"use client";

interface NotificationButtonProps {
  count?: number;
  onClick?: () => void;
  className?: string;
}

export default function NotificationButton({
  count = 0,
  onClick,
  className = "",
}: NotificationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`hidden sm:block relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 ${className}`}
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
          d="M15 17h5l-5-5V9a5 5 0 00-10 0v3L0 17h5m10 0v1a3 3 0 01-6 0v-1m6 0H9"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
