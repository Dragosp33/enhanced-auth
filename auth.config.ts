import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Twitter from 'next-auth/providers/twitter';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

import { LoginSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/data/User';

const authConfig = {
  providers: [
    Google({
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      clientId: process.env.AUTH_GOOGLE_ID,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientSecret: process.env.GITHUB_SECRET,
      clientId: process.env.GITHUB_ID,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
} satisfies NextAuthConfig;

export default authConfig;
