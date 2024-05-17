import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import authconfig from '@/auth.config';
import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { LoginSchema } from '@/lib/schemas';
import {
  deleteUser,
  getUserAccounts,
  getUserByEmail,
  getUserById,
} from '@/data/User';
import bcrypt from 'bcryptjs';
import {
  deleteTwoFactorConfirmation,
  getTwoFactorConfirmationByUserId,
} from '@/data/two-factor-confirmation';

//import session

export const AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
};

import { type DefaultSession, User } from 'next-auth';
import {
  getAccountsByEmailAndProvider,
  updateAccountUserid,
} from './data/Accounts';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address.
       * this is just an example of a field that can be added to the user session.
       */

      address: string;
      // By default, TypeScript merges new interface properties and overwrite existing ones. In this case, the default session user properties will be overwritten, with the new one defined above. To keep the default session user properties, you need to add them back into the newly declared interface
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession['user']; // To keep the default types
  }

  export interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: 'ADMIN' | 'USER';
    isTwoFactorEnabled?: boolean;
    address?: string;
  }

  interface AdapterUser extends User {
    id: string;
    email: string | null;
    emailVerified: Date | null;
    role: 'ADMIN' | 'USER';
    address?: string;
  }

  interface AccountExtension {
    /** Email address associated with the account */
    email: string;
  }

  // Extend the Account interface by intersecting it with AccountExtension
  interface Account extends AccountExtension {}
}

declare module '@auth/core/adapters' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: 'ADMIN' | 'USER';
    address: string;
  }

  interface AdapterUser extends User {
    id: string;
    email: string;
    emailVerified: Date | null;
    role: 'ADMIN' | 'USER';
    address: string;
  }

  interface AccountExtension {
    /** Email address associated with the account */
    email: string;
  }

  // Extend the Account interface by intersecting it with AccountExtension
  interface Account extends AccountExtension {}

  interface AdapterAccount extends Account {}
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },

  ...authconfig,

  providers: [
    ...authconfig.providers,
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            console.log('USER: ', user);
            return {
              ...user,
              address: 'blabla',
              role: user.role || 'USER',
            };
          }
          return null;
        }
      },
    }),
  ],
  events: {
    async signIn({ user, profile, account }) {
      console.log('SIGN IN EVENT: ', { user, profile, account });
    },
    async updateUser({ user }) {
      console.log('UPDATE USER: ', { user });
    },
    async linkAccount({ user, profile, account }) {
      console.log('FROM LINK ACCOUNT: ', { user, profile, account });
      if (AuthOptions.adapter.updateUser && profile && user.id) {
        // here search for the email in the users collection and update the role.
        const client = await clientPromise;
        const db = client.db().collection('accounts');

        // add email to the account in collection so you can display them in the /settings page,
        // where a user can link accounts from different providers with different emails.
        // we do this because in the case of a new, different, unused email, we implicitly
        // linked the account to the current userId, so we can't know what email was used for this new
        // linked account.
        await db.findOneAndUpdate(
          { providerAccountId: account.providerAccountId },
          {
            $set: {
              email: profile.email,
            },
          }
        );
        //AuthOptions.adapter.linkAccount()
        await AuthOptions.adapter.updateUser({
          emailVerified: new Date(),
          role: 'USER',
          id: user.id,
          image: user.image || profile.image || null,
        });
      }
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email }) {
      // here are checks for linking an account when an user is already logged in, inside the /settings page.
      const loggedIn = await auth();

      console.log({ loggedIn });

      // if loggedIn is present it means a user is trying to link accounts.
      if (loggedIn) {
        console.log({ account, user, profile });
        if (account?.provider === 'credentials') {
          return '/settings/accounts?error=credentialLink';
        }
        // console.log({ user, account, profile, email });
        const toLinkAccount = await getAccountsByEmailAndProvider(
          user.email,
          account?.provider
        );
        if (account?.type === 'credentials') {
          return '/settings/accounts?error=credentialLink';
        }
        // if toLinkAccount is found, it means that this account has been linked / registered before.
        if (toLinkAccount) {
          toLinkAccount.id;
          console.log({ toLinkAccount });
          const toLinkUser = await getUserById(toLinkAccount.userId);
          if (toLinkUser) {
            console.log({ toLinkUser });
            if (toLinkUser.password) {
              return '/settings/accounts?error=credentialLink';
            }

            const alreadyLinkedAccounts = await getUserAccounts(
              toLinkUser?._id.toString()
            );
            if (alreadyLinkedAccounts && alreadyLinkedAccounts.length > 1) {
              return '/settings/accounts?error=alreadyLinked';
            }
            // else => this account has just been registered with, so we can link it, and delete the previous user.
            const updated = await updateAccountUserid(
              toLinkAccount.id,
              loggedIn.user.id
            );
            if (!updated) {
              return '/settings/accounts?error=unknownError';
            }
            const deleted = await deleteUser(toLinkUser._id.toString());
            console.log('deleted user: ', toLinkUser, deleted);
          }
        } else {
          // create account here.
          if (AuthOptions.adapter.linkAccount && loggedIn.user.id && account) {
            AuthOptions.adapter.linkAccount({
              ...account,
              email: user.email || profile?.email || '',
              userId: loggedIn.user.id,
              type: account.type,
            });
          }
        }

        return '/settings/accounts';
      }

      // from here on starts the basic checks for a sign in authorization.

      // OAuth accounts do not need an email verification.
      if (account?.provider !== 'credentials') {
        return true;
      }

      //console.log({ user });

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }

      // TODO: ADD 2FA CHECK;
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser._id.toString()
        );
        if (!twoFactorConfirmation) {
          console.log(
            'AUTH FAILS BECAUSE THERE IS NO twoFactorConfirmation...'
          );
          return false;
        }

        // delete the 2fa after log in:
        await deleteTwoFactorConfirmation(existingUser._id.toString());
      }

      return true;
    },
    async session({ token, session, user }) {
      //console.log({ sessionToken: token, session, user });
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.address) {
        session.user.address = token.address as string;
      }
      if (token.role) {
        session.user.role = token.role as 'USER' | 'ADMIN';
      } else {
        session.user.role = 'USER';
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      //console.log({ modified: session });
      return session;
    },
    async jwt({ token, user, account }) {
      //console.log('jwt');
      //console.log({ token, user, account });

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return null;

      //if (user && user.role && user.address) {
      // console.log('USER ROLE: ', user.role);
      token.name = existingUser.name;
      token.isOAuth = !existingUser.password;
      token.role = existingUser.role;
      token.address = existingUser.address;
      token.email = existingUser.email;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      //}

      //console.log({ modifiedToken: token });

      return token;
    },
  },
});
