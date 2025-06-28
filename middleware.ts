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

        // Protect all other admin routes
        if (pathname.startsWith("/admin")) {
          return !!token;
        }

        // Allow access to all non-admin routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (NextAuth routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
