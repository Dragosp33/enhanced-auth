export const publicRoutes = [
  '/',
  '/auth/new-verification-token',
  '/privacypolicy',
  '/terms',
  '/home',
];

/**
 * Array of routes that are used for authentication.
 */
export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset-password',
  '/auth/new-password',
];

/**
 * Prefix of the routes that are used for authentication. These will call the API authentication,
 * which is always needed to be public.
 */
export const authApiPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/settings';
