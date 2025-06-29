// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Middleware logic bisa ditambahkan di sini jika diperlukan
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to login page without token
        if (pathname === "/admin/sso/safe-access-admin-entry/A7kz9QpL") {
          return true;
        }

        // Protect all /admin routes
        if (pathname.startsWith("/admin")) {
          return !!token;
        }

        // Protect all /api routes (optional: allow public API if needed)
        if (pathname.startsWith("/api")) {
          // Contoh: jika ada API publik, tambahkan pengecualian di sini
          // if (pathname === "/api/public-endpoint") return true;
          return !!token;
        }

        // Allow access to all other non-admin, non-api routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (NextAuth routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
