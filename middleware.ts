import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/route";

const { auth } = NextAuth(authConfig);
//@ts-ignore
export default auth((req) => {
  // runs in everyroute

  //   console.log("ROUTE",req.nextUrl.pathname)
  //   We will use the combination of logged in state and pathname to decide what to do with the route
  //   I want my app to be protected by default
  // We will have fewer public route then private route, Currently we will put whole our app to be accessed by the authorized users only then we will allow only certain route to be accessed by public like landing page

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // always allow these routes
  // example : /api/auth/providers these are required by the nextAuth to function properly
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  // if user is already logged in then we are not gonna allow users to go to the login section again, and if the user is logged out and try to access the settings page then they will be redirected to the login page
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // allow every single Api route
  // Make sure you can visit localhost:3000/api/auth/provider
  if (isApiAuthRoute) {
    return null;
  }

  // authroute are technically public route we need to check them first before we check the public orute
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      // so that it create an absolute URL ,localhost:3000/settings
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
  // allowing everyother route
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // Everything except the static files and the next images won't invoke the middleware
};
