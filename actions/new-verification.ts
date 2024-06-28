'use server';

import { getUserByEmail, verifyUserEmail } from '@/data/User';

import {
  deleteVerificationToken,
  getVerificationTokenByToken,
} from '@/data/verification-token';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const NewVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token doesn't exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Invalid token format.' };
  }
  if (hasExpired) {
    await deleteVerificationToken(token);
    const newToken = await generateVerificationToken(existingToken.email);
    if (!newToken) return { error: 'Token has expired' };
    await sendVerificationEmail(existingUser.email, newToken?.token);
    return {
      error: 'This token has expired. A new token has been sent to your email.',
    };
  }

  const success = await verifyUserEmail(existingUser.id, existingToken.email);

  await deleteVerificationToken(token);
  return success
    ? { success: 'Your account has been verified.', id: existingUser.id }
    : {
        error:
          'It seems like an error occured. If this persists, contact support.',
      };
};
