// Optionally, don't invoke Middleware on some paths
import NextAuth from 'next-auth';

import {
  authApiPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from '@/routes';

import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  console.log('route: ', nextUrl.pathname);
  // console.log('LOGGED: ', isLoggedIn);
  const isApiRoute = nextUrl.pathname.startsWith(authApiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log('REDIRECTED TO: ', DEFAULT_LOGIN_REDIRECT);
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log('WATAFAK');
    return Response.redirect(new URL('/auth/login', nextUrl));
  }
  return;
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
