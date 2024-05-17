import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Twitter from 'next-auth/providers/twitter';
import Google from 'next-auth/providers/google';

import { LoginSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/data/User';

const authConfig = {
  providers: [
    Google({
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      clientId: process.env.AUTH_GOOGLE_ID,
      allowDangerousEmailAccountLinking: true,
    }),
    Twitter({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
} satisfies NextAuthConfig;

export default authConfig;
