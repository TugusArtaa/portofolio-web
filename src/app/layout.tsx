import "@/styles/globals.css";
import { ReactNode } from "react";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/ui/toast";

export const metadata = {
  title: "Portofolio Saya",
  description: "Web portofolio pribadi dibangun dengan Next.js + Supabase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
        <ThemeProvider>
          <ToastProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
