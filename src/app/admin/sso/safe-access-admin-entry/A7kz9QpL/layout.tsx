"use client";

import { ThemeProvider } from "@/context/ThemeContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-hidden">{children}</div>
    </ThemeProvider>
  );
}
