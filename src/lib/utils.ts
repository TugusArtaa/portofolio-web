import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Fungsi utilitas untuk menggabungkan className Tailwind & kondisi dinamis
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
