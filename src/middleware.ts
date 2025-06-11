import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  //console.log("Token:", token);
  const { pathname } = req.nextUrl;

  // 🔒 Rutas que requieren login
  const protectedPaths = ["/favoritos"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

    if (isProtected) {
        // 1. No autenticado
        if (!token) {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
 

    }

  return NextResponse.next();
}
export const config = {
  matcher: ["/favoritos/:path*"], // más claro
};
