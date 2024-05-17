'use server';

import { LoginSchema } from '@/lib/schemas';
import { z } from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/User';
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from '@/lib/tokens';
import { sendVerificationEmail, sendTwoFactorEmail } from '@/lib/mail';
import {
  createTwoFactorConfirmation,
  deleteTwoFactorConfirmation,
  getTwoFactorConfirmationByUserId,
} from '@/data/two-factor-confirmation';
import {
  deleteTwoFactorToken,
  getTwoFactorTokenByEmail,
} from '@/data/two-factor-token';
import { user } from '@/lib/auth';

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const alreadyLogged = await user();
  if (alreadyLogged) {
    return { error: "Can't log in multiple times." };
  }
  console.log('LOGS FROM LOGIN FUNC');
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email invalid!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    if (!verificationToken) {
      return { error: 'Oops..something went wrong' };
    }
    await sendVerificationEmail(email, verificationToken.token);
    return {
      success:
        'Please confirm your email. A confirmation email was sent to your address.',
    };
  }

  //console.log(email, password);

  // 2FA CHECK HERE:
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      //verify code;
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        console.log('No 2FA code;');
        return { error: 'Invalid code!' };
      }
      if (twoFactorToken.token !== code) {
        console.log('2FA CODE INVALID');
        return { error: 'Invalid code!' };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        console.log('EXPIRED 2FA');
        return { error: 'Code expired. Please try logging in again.' };
      }
      await deleteTwoFactorToken(twoFactorToken.token);
      // check and delete a 2fa confirmation:
      const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (twoFactorConfirmation) {
        await deleteTwoFactorConfirmation(existingUser.userId);
      }

      await createTwoFactorConfirmation(existingUser.id);
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  // normal flow:
  try {
    await signIn('credentials', {
      email,
      password,
      //redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT  -- for callbacks, to be redirected to old page before login
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    //console.log({ error });
    if (error instanceof AuthError) {
      console.log(error.type, error.message);
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Wrong email or password.' };
        case 'OAuthAccountNotLinked':
          return { error: 'OAuthAccountNotLinked.' };
        default:
          return { error: 'Oops! Something went wrong..' };
      }
    }
    throw error;
  }

  return { success: 'Confirmation email sent!' };

  /*const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent!' };
  } */
};
