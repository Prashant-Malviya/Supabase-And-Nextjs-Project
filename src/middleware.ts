import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const { data: { session } } = await supabase.auth.getSession();

    console.log("Session:", session);

    const { pathname } = req.nextUrl;

    // If user is authenticated, allow access to the requested page
    if (session) {
        if (pathname === "/login" || pathname === "/signup") {
            return NextResponse.redirect(new URL("/", req.url)); // Redirect to home or default page
        }
        return res;
    }

    // If user is not authenticated, determine redirect logic
    if (pathname !== "/login" && pathname !== "/signup") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return res;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply middleware to all non-static routes
    ],
};
