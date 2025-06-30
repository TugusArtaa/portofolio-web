import "@/styles/globals.css";
import { ReactNode } from "react";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/components/ui/toast";

// Metadata untuk SEO dan informasi halaman
export const metadata = {
  title: "Portofolio Saya",
  description: "Web portofolio pribadi dibangun dengan Next.js + Supabase",
};

// Root layout untuk seluruh aplikasi
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white dark:bg-slate-950">
        {/* Provider untuk tema dark/light */}
        <ThemeProvider>
          {/* Provider untuk notifikasi toast */}
          <ToastProvider>
            {/* Layout bersyarat untuk halaman tertentu */}
            <ConditionalLayout>{children}</ConditionalLayout>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
