// import { NextResponse } from "next/server";
// // import { getToken } from "next-auth/jwt";
// import { auth } from "./lib/auth";

// export async function middleware(req) {
// const session = await auth();


//   console.log("🔍 Middleware Debug: Request to", req.nextUrl.pathname);
//   console.log("🔑 Middleware Session:", session);

//   const protectedRoutes = ["/dashboard", "/create-blog", "/blog", "/edit-blog"];
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     req.nextUrl.pathname.startsWith(route)
//   );

//   if (isProtectedRoute && !session) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// // Config to apply middleware only to specific routes
// export const config = {
//   matcher: ["/dashboard", "/create-blog", "/blog", "/edit-blog"],
// };