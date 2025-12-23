import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes
  const protectedRoutes = [
    "/profile",
    "/cart",
    "/product", // This will match /product/[id]
    "/checkout",
    "/payment",
  ];

  // Check if the current path starts with any of the protected routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // If no access token but has refresh token, allow through
    // The client-side will handle token refresh
    if (!accessToken && !refreshToken) {
      // No tokens at all - redirect to login
      const loginUrl = new URL("/auth", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If has refresh token but no access token, allow through
    // Client-side interceptor will refresh the token
    if (!accessToken && refreshToken) {
      console.log("No access token but has refresh token - allowing through for client-side refresh");
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (auth pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
