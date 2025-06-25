import "@/styles/globals.css";
import { ReactNode } from "react";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Portofolio Saya",
  description: "Web portofolio pribadi dibangun dengan Next.js + Supabase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
