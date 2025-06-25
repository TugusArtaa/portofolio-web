"use client";

import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "url" | "textarea";
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  icon?: React.ReactNode;
  iconColor?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  iconColor = "blue-500",
  rows = 4,
  required = false,
  disabled = false,
  helpText,
}: FormInputProps) {
  const inputClasses = `w-full px-4 py-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-slate-300/50 dark:border-slate-600/50 rounded-xl focus:border-${iconColor} dark:focus:border-${iconColor.replace(
    "500",
    "400"
  )} focus:ring-2 focus:ring-${iconColor}/20 transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 ${
    type === "textarea" ? "resize-none" : ""
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
        {icon && <div className={`w-4 h-4 text-${iconColor}`}>{icon}</div>}
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      )}

      {helpText && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helpText}</p>
      )}
    </div>
  );
}
