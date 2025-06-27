"use client";

import React from "react";

interface ToolsCardProps {
  tool: {
    id: string;
    name: string;
    level: string;
    icon?: string;
  };
  index: number;
  onEdit: (tool: any) => void;
  onDelete: (tool: any) => void;
  showActions?: boolean;
  variant?: "admin" | "public";
}

export default function ToolsCard({
  tool,
  index,
  onEdit,
  onDelete,
  showActions = true,
  variant = "admin",
}: ToolsCardProps) {
  return (
    <div
      className="group relative bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-500 overflow-hidden transform hover:-translate-y-1 hover:scale-[1.0]"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="p-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md">
          {tool.icon ? (
            tool.icon.startsWith("http") ||
            tool.icon.startsWith("/uploads/") ||
            tool.icon.startsWith("data:image/") ? (
              <img
                src={tool.icon}
                alt={tool.name}
                className="object-contain w-10 h-10"
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{ __html: tool.icon }}
                className="text-lg"
              />
            )
          ) : (
            <span className="text-2xl font-bold">
              {tool.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            {tool.name}
          </h3>
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            {tool.level}
          </div>
        </div>
        {showActions && variant === "admin" && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 hover:shadow-md transition-all duration-200"
              onClick={() => onEdit(tool)}
            >
              Edit
            </button>
            <button
              type="button"
              className="px-3 py-1 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 font-medium border border-red-200/50 dark:border-red-800/30 hover:bg-red-100 dark:hover:bg-red-900/50 hover:shadow-md transition-all duration-200"
              onClick={() => onDelete(tool)}
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
